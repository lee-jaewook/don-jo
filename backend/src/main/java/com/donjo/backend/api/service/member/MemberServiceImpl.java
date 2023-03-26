package com.donjo.backend.api.service.member;

import com.amazonaws.services.kms.model.NotFoundException;
import com.donjo.backend.api.dto.member.DonationSettingItem;
import com.donjo.backend.api.dto.member.MemberInfoItem;
import com.donjo.backend.api.dto.member.WishListItem;
import com.donjo.backend.api.dto.member.request.LoginMemberCond;
import com.donjo.backend.api.dto.member.request.ModifyMemberCond;
import com.donjo.backend.api.dto.member.request.SignUpMemberCond;
import com.donjo.backend.api.dto.member.response.FindMemberPayload;
import com.donjo.backend.api.dto.member.response.FindPageInfoPayload;
import com.donjo.backend.config.jwt.JwtFilter;
import com.donjo.backend.config.jwt.TokenProvider;
import com.donjo.backend.db.entity.Authority;
import com.donjo.backend.db.entity.DonationSetting;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Social;
import com.donjo.backend.db.repository.MemberRepository;
import com.donjo.backend.exception.BadRequestException;
import com.donjo.backend.exception.DuplicateDataException;
import com.donjo.backend.exception.DuplicateMemberException;

import com.donjo.backend.exception.NoContentException;

import com.donjo.backend.solidity.support.SupportSolidity;

import io.jsonwebtoken.ExpiredJwtException;
import java.math.BigInteger;
import java.util.*;

import com.donjo.backend.exception.UnAuthorizationException;
import com.donjo.backend.solidity.wishlist.WishlistSol;
import com.donjo.backend.solidity.wishlist.WishlistSolidity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.HttpServletRequest;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.ECDSASignature;
import org.web3j.crypto.Hash;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

@Slf4j
@Service("MemberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  public static final String PERSONAL_MESSAGE_PREFIX = "\u0019Ethereum Signed Message:\n";

  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenProvider tokenProvider;
  private final String PAGE_NAME = "pageName";
  private final WishlistSolidity wishlistSolidity;

  @Override
  public Optional<Member> findMember(String memberAddress) {
    return Optional.ofNullable(memberRepository.findByAddress(memberAddress));
  }

  @Override
  public Optional<Member> isPageNameDuplicate(String pageName) {
    return Optional.ofNullable(memberRepository.findByPageName(pageName));
  }

  @Override
  public Map<String, Object> signUpMember(SignUpMemberCond signUpMemberCond) {
    if (memberRepository.findByAddress(signUpMemberCond.getAddress()) != null) {
      throw new DuplicateMemberException("이미 존재하는 회원입니다.");
    }

    if (memberRepository.findByPageName(signUpMemberCond.getPageName()) != null) {
      throw new DuplicateDataException("이미 존재하는 페이지입니다.");
    }

    Authority userAuthority = Authority.user();

    List<Social> socialList = new ArrayList<>();
    socialList.add(Social.builder().socialLink("").build());
    socialList.add(Social.builder().socialLink("").build());
    socialList.add(Social.builder().socialLink("").build());

    Member member = Member.builder()
        .address(signUpMemberCond.getAddress())
        .nickname(signUpMemberCond.getNickname())
        .pageName(signUpMemberCond.getPageName())
        .password(passwordEncoder.encode(signUpMemberCond.getPassword()))
        .profileImagePath(signUpMemberCond.getProfileImgPath())
        .authorities(Set.of(userAuthority))
        .social(socialList)
        .build();

    DonationSetting donationSetting = DonationSetting.builder()
        .member(member)
        .memberAddress(signUpMemberCond.getAddress())
        .build();

    member.setDonationSetting(donationSetting);
    memberRepository.save(member);

    Map<String, Object> result = returnToken(member);
    result.put(PAGE_NAME, member.getPageName());

    return result;
  }

  @Override
  public Map<String, Object> loginMember(LoginMemberCond loginMemberCond) {
    boolean check = verifySignature(loginMemberCond.getMemberAddress(), loginMemberCond.getMemberSignature(), loginMemberCond.getSignMessage());
    if (check) {
      Member member = Optional.ofNullable(memberRepository.findByAddress(loginMemberCond.getMemberAddress())).orElseThrow(() -> new UnAuthorizationException("아이디가 존재하지 않습니다."));
      Map<String, Object> result = returnToken(member);
      result.put(PAGE_NAME, member.getPageName());

      return result;
    }

    throw new BadRequestException("잘못된 요청");
  }

  @Override
  public Map<String, Object> refreshAccessToken(String refreshToken) {
    Member object = getMemberInfoWithToken(refreshToken);

    if (object != null) {
      Member member = object;
      if (refreshToken.equals(member.getRefreshToken())) {
        if (tokenProvider.validateToken(refreshToken)) {
          HashMap<String, Object> token = returnToken(member);
          member.setRefreshToken((String) token.get(JwtFilter.REFRESH_HEADER));
          memberRepository.save(member);
          return token;
        } else {
          throw new UnAuthorizationException("refreshToken 만료");
        }
      } else {
        throw new UnAuthorizationException("refreshToken 매칭 오류");
      }
    } else {
      throw new BadRequestException("회원이 존재 하지 않습니다.");
    }
  }

  @Override
  public void logout(String accessToken) {
    Member member = getMemberInfoWithToken(accessToken);

    if (member != null) {
      member.setRefreshToken("");
      memberRepository.save(member);
    } else {
      throw new BadRequestException("회원이 존재 하지 않습니다.");
    }

  }
  @Override
  public String getMemberAddress(HttpServletRequest request) {
    String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
    Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
    String memberAddress = authentication.getName();
    return memberAddress;
  }

  @Override
  public FindPageInfoPayload getPageInfoByPageName(String pageName) {
    Member member = memberRepository.findByPageName(pageName);
    if (member == null) {
      throw new NoContentException("페이지가 존재하지 않습니다.");
    }

    MemberInfoItem memberInfoItem = MemberInfoItem.builder(member).build();
    DonationSettingItem donationSettingItem = DonationSettingItem.builder(member).build();

    // 위시리스트 추가
    List<WishListItem> wishList = memberWishList(member);
    int maxItems = Math.min(3, wishList.size()); // 최대 3개의 아이템만 포함되도록 함

    FindPageInfoPayload findPageInfoPayload = new FindPageInfoPayload(memberInfoItem, donationSettingItem, wishList.subList(0, maxItems));

    return findPageInfoPayload;
  }

//  @Override
  public FindMemberPayload getMemberInfo(String memberAddress) {
    Member member = memberRepository.findByAddress(memberAddress);
    if (member == null) {
      new NotFoundException("유저 정보가 없습니다.");
    }

    FindMemberPayload findMemberPayload = FindMemberPayload.builder(member).build();
    return findMemberPayload;
  }

  @Override
  @Transactional
  public void modifyMemberInfo(String memberAdress, ModifyMemberCond modifyMemberCond) {
    Member member = memberRepository.findByAddress(memberAdress);

    // 유저 체크
    if (member == null) {
      new NotFoundException("유저 정보가 없습니다.");
    }

    // 중복 페이지 검사
    Member duplicatePageMember = memberRepository.findByPageName(modifyMemberCond.getPageName());
    if (duplicatePageMember != null && !member.getAddress().equals(duplicatePageMember.getAddress()) && modifyMemberCond.getPageName().equals(duplicatePageMember.getPageName())) {
      throw new DuplicateMemberException("다른 유저의 페이지 네임과 중복");
    }

    modifyMemberCond.updateMember(member);

  }

  @Override
  @Transactional
  public void modifyMemberBackgroundImage(String backgroundImageSrc, HttpServletRequest request) {
    Member member = getMemberInfoWithToken(request.getHeader(JwtFilter.ACCESS_HEADER).substring(7));

    member.setBackgroundImgPath(backgroundImageSrc);
  }

  @Override
  public boolean verifySignature(String memberAddress, String signature, String message) {
    String prefix = PERSONAL_MESSAGE_PREFIX + message.length();
    byte[] msgHash = Hash.sha3((prefix + message).getBytes());

    byte[] signatureBytes = Numeric.hexStringToByteArray(signature);
    byte v = signatureBytes[64];
    if (v < 27) {
      v += 27;
    }

    Sign.SignatureData sd =
            new Sign.SignatureData(
                    v,
                    (byte[]) Arrays.copyOfRange(signatureBytes, 0, 32),
                    (byte[]) Arrays.copyOfRange(signatureBytes, 32, 64));

    String addressRecovered = null;
    boolean match = false;

    // Iterate for each possible key to recover
    for (int i = 0; i < 4; i++) {
      BigInteger publicKey =
              Sign.recoverFromSignature(
                      (byte) i,
                      new ECDSASignature(
                              new BigInteger(1, sd.getR()), new BigInteger(1, sd.getS())),
                      msgHash);

      if (publicKey != null) {
        addressRecovered = "0x" + Keys.getAddress(publicKey);

        if (addressRecovered.equals(memberAddress)) {
          match = true;
          break;
        }
      }
    }
    return memberAddress.equals(addressRecovered);
  }

  @Override
  public boolean checkPassword(String requestPassword, HttpServletRequest request) {
    String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
    String findPassword = getMemberInfoWithToken(accessToken.substring(7)).getPassword();

    if (passwordEncoder.matches(requestPassword, findPassword)) {
      return true;
    }
    throw new BadRequestException("유저 정보와 비밀번호가 일치하지 않음");
  }

  private List<WishListItem> memberWishList(Member member) {
    List<WishListItem> wishList = new ArrayList<>();
    List<WishlistSol> memberWishLists = wishlistSolidity.getMemberWishLists(member.getAddress()).orElse(Collections.emptyList());

    for (WishlistSol wishlistSol : memberWishLists) {
      WishListItem item = WishListItem.builder(wishlistSol).build();
      wishList.add(item);
    }

    return wishList;
  }

//  private List<SupportItem> memberSupport(Member member) {
//    List<SupportItem> support = new ArrayList<>();
//    List<Support> supports = supportRepository.findByToAddress(member);
//
//    for (Support supportInfoInDb : supports) {
//      Optional<com.donjo.backend.solidity.support.Support> optionalBlockSupport =
//          supportSolidity.getSupportDetail(supportInfoInDb.getToAddress(), supportInfoInDb.getSupportUid());
//
//      optionalBlockSupport.ifPresent(supportInfoInBlockchain -> {
//        FromMemberItem fromMemberItem = FromMemberItem.builder(memberRepository.findByAddress(supportInfoInDb.getFromAddress())).build();
//        ToMemberItem toMemberItem = ToMemberItem.builder(member).build();
//        SupportItem item = SupportItem.builder(supportInfoInDb, fromMemberItem, toMemberItem, supportInfoInBlockchain);
//        support.add(item);
//      });
//    }
//
//    return support;
//  }

  public HashMap<String, Object> returnToken(Member member) {
    String accessToken = tokenProvider.createAccessToken(member);
    String refreshToken = tokenProvider.createRefreshToken(member);

    member.setRefreshToken(refreshToken);
    memberRepository.save(member);

    return new HashMap<>() {{
      put(JwtFilter.ACCESS_HEADER, accessToken);
      put(JwtFilter.REFRESH_HEADER, refreshToken);
    }};
  }

  public Member getMemberInfoWithToken(String token) {
    Authentication authentication = tokenProvider.getAuthentication(token);
    return memberRepository.findByAddress(authentication.getName());
  }
}
