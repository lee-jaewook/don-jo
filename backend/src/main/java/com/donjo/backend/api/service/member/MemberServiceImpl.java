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
import com.donjo.backend.api.dto.member.LoginItem;
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
  // PERSONAL_MESSAGE_PREFIX 선언
  public static final String PERSONAL_MESSAGE_PREFIX = "\u0019Ethereum Signed Message:\n";
  // MemberRepository 선언
  private final MemberRepository memberRepository;
  // PasswordEncoder 선언
  private final PasswordEncoder passwordEncoder;
  // TokenProvider 선언
  private final TokenProvider tokenProvider;
  // PAGE_NAME 선언
  private final String PAGE_NAME = "pageName";
  // NICK_NAME
  private final String NICK_NAME = "nickName";
  // THEME_COLOR 선언
  private final String THEME_COLOR = "themeColor";
  // IMAGE_PATH 선언
  private final String IMAGE_PATH = "imagePath";
  // WishlistSolidity 선언
  private final WishlistSolidity wishlistSolidity;

  @Override
  public Optional<Member> findMember(String memberAddress) {
    // memberAddress로 데이터베이스에 맴버가 있는지 확인
    return Optional.ofNullable(memberRepository.findByAddress(memberAddress));
  }

  @Override
  public Optional<Member> isPageNameDuplicate(String pageName) {
    // 데이터베이스에 pageName이 있는지 중복검사
    return Optional.ofNullable(memberRepository.findByPageName(pageName));
  }

  @Override
  public Map<String, Object> signUpMember(SignUpMemberCond signUpMemberCond) {
    // 회원가입할 때 회원 중복 검사
    if (memberRepository.findByAddress(signUpMemberCond.getAddress()) != null) {
      throw new DuplicateMemberException("이미 존재하는 회원입니다.");
    }
    // 회원가입할 때 pageName 중복 검사
    if (memberRepository.findByPageName(signUpMemberCond.getPageName()) != null) {
      throw new DuplicateDataException("이미 존재하는 페이지입니다.");
    }

    Authority userAuthority = Authority.user();

    // 소셜리스트 기본 셋팅
    List<Social> socialList = new ArrayList<>();
    socialList.add(Social.builder().socialLink("").build());
    socialList.add(Social.builder().socialLink("").build());
    socialList.add(Social.builder().socialLink("").build());

    // 맴버 객체에 저장
    Member member = Member.builder()
        .address(signUpMemberCond.getAddress())
        .nickname(signUpMemberCond.getNickname())
        .pageName(signUpMemberCond.getPageName())
        .password(passwordEncoder.encode(signUpMemberCond.getPassword()))
        .profileImagePath(signUpMemberCond.getProfileImgPath())
        .authorities(Set.of(userAuthority))
        .social(socialList)
        .build();

    // 기본 도네이션 셋팅
    DonationSetting donationSetting = DonationSetting.builder()
        .member(member)
        .memberAddress(signUpMemberCond.getAddress())
        .build();

    member.setDonationSetting(donationSetting);
    memberRepository.save(member);

    // 토큰 발급 result 리턴
    Map<String, Object> result = returnToken(member);
    result.put(PAGE_NAME, member.getPageName());

    return result;
  }

  @Override
  public LoginItem loginMember(LoginMemberCond loginMemberCond) {
    boolean check = verifySignature(loginMemberCond.getMemberAddress(), loginMemberCond.getMemberSignature(), loginMemberCond.getSignMessage());
    // 서명 검증을 진행
    if (check) {
      // 주어진 회원 주소를 기반으로 데이터베이스에서 해당 회원을 조회 해당 회원의 정보를 이용하여 토큰을 생성하고, 회원 정보와 함께 결과값으로 반환
      Member member = Optional.ofNullable(memberRepository.findByAddress(loginMemberCond.getMemberAddress())).orElseThrow(() -> new UnAuthorizationException("아이디가 존재하지 않습니다."));
      Map<String, Object> result = returnToken(member);
      LoginItem loginItem = LoginItem.getInfo(result,member);


      // 추가 정보를 포함한 결과값 반환
      return loginItem;
    }

    throw new BadRequestException("잘못된 요청");
  }

  @Override
  public Map<String, Object> refreshAccessToken(String refreshToken) {
    // getMemberInfoWithToken(refreshToken) 메서드를 호출하여, refreshToken을 기반으로 회원 정보를 조회합니다.
    Member object = getMemberInfoWithToken(refreshToken);

    if (object != null) {
      Member member = object;
      if (refreshToken.equals(member.getRefreshToken())) {
        // 메서드를 사용하여 refreshToken이 유효한지 검증합니다. 이 검증 과정에서 refreshToken이 만료되었거나, 서명이 잘못되었거나 등의 이유로 검증에 실패하면 UnAuthorizationException을 발생시켜 예외 처리합니다.
        if (tokenProvider.validateToken(refreshToken)) {
          // 메서드를 호출하여 회원 정보를 기반으로 새로운 토큰을 발급합니다.
          HashMap<String, Object> token = returnToken(member);
          // 회원 객체의 refreshToken 값을 새로운 액세스 토큰으로 갱신
          member.setRefreshToken((String) token.get(JwtFilter.REFRESH_HEADER));
          // 토큰 갱신
          memberRepository.save(member);
          // token 맵을 반환
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
    //  accessToken을 기반으로 회원 정보를 조회합니다
    Member member = getMemberInfoWithToken(accessToken);
    // 회원의 refreshToken을 빈 문자열로 갱신
    if (member != null) {
      member.setRefreshToken("");
      memberRepository.save(member);
    } else {
      throw new BadRequestException("회원이 존재 하지 않습니다.");
    }

  }
  @Override
  public String getMemberAddress(HttpServletRequest request) {
    // HTTP 요청에서 ACCESS_HEADER에 해당하는 값을 추출
    String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
    // 액세스 토큰 문자열에서 "Bearer " 문자열을 제거하고, 나머지 액세스 토큰 문자열을 인자로 전달
    Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
    // 회원주소 반환
    String memberAddress = authentication.getName();
    return memberAddress;
  }

  @Override
  public FindPageInfoPayload getPageInfoByPageName(String pageName) {
    // 해당 페이지의 정보를 memberRepository에서 조회합니다. 이 때, 조회한 결과가 null이라면 NoContentException을 던집니다.
    Member member = memberRepository.findByPageName(pageName);
    if (member == null) {
      throw new NoContentException("페이지가 존재하지 않습니다.");
    }
    // 조회한 member 객체를 이용하여 MemberInfoItem과 DonationSettingItem 객체를 생성합니다.
    MemberInfoItem memberInfoItem = MemberInfoItem.builder(member).build();
    DonationSettingItem donationSettingItem = DonationSettingItem.builder(member).build();

    // 위시리스트 추가
    List<WishListItem> wishList = memberWishList(member);
    int maxItems = Math.min(3, wishList.size()); // 최대 3개의 아이템만 포함되도록 함

    // 생성된 FindPageInfoPayload 객체를 반환
    FindPageInfoPayload findPageInfoPayload = new FindPageInfoPayload(memberInfoItem, donationSettingItem, wishList.subList(0, maxItems));

    return findPageInfoPayload;
  }

//  @Override
  public FindMemberPayload getMemberInfo(String memberAddress) {
    // memberAddress를 가진 Member를 데이터베이스에서 조회
    Member member = memberRepository.findByAddress(memberAddress);
    // 조회된 Member가 null일 경우, NotFoundException 예외를 발생시킵니다.
    if (member == null) {
      new NotFoundException("유저 정보가 없습니다.");
    }
    // 조회된 Member 정보를 바탕으로 FindMemberPayload 객체를 생성합니다.
    FindMemberPayload findMemberPayload = FindMemberPayload.builder(member).build();
    return findMemberPayload;
  }

  @Override
  @Transactional
  public void modifyMemberInfo(String memberAdress, ModifyMemberCond modifyMemberCond) {
    // memberAddress를 이용하여 해당하는 회원 정보를 조회합니다.
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
    // modifyMemberCond 객체를 이용하여 member 객체를 수정합니다.
    modifyMemberCond.updateMember(member);

  }

  @Override
  @Transactional
  public void modifyMemberBackgroundImage(String backgroundImageSrc, HttpServletRequest request) {
    // 토큰을 이용하여 맴버 정보 가져오기
    Member member = getMemberInfoWithToken(request.getHeader(JwtFilter.ACCESS_HEADER).substring(7));
    // 배경이미지 저장(@Transactional)
    member.setBackgroundImgPath(backgroundImageSrc);
  }

  @Override
  @Transactional
  public void modifyMemberProfileImage(String profileImageSrc, HttpServletRequest request) {
    // 토큰을 이용하여 맴버 정보 가져오기
    Member member = getMemberInfoWithToken(request.getHeader(JwtFilter.ACCESS_HEADER).substring(7));
    // 프로필 저장(@Transactional)
    member.setProfileImagePath(profileImageSrc);
  }

  @Override
  @Transactional
  public void modifyMemberIntroduction(String introduction, HttpServletRequest request) {
    // 토큰을 이용하여 맴버 정보 가져오기
    Member member = getMemberInfoWithToken(request.getHeader(JwtFilter.ACCESS_HEADER).substring(7));
    // 소개글 저장(Transactional)
    member.setIntroduction(introduction);
  }

  @Override
  public boolean verifySignature(String memberAddress, String signature, String message) {
    // 메시지의 길이를 결합하여 새 문자열 prefix를 만듭니다. 서명 메시지에 대한 prefix 역할을 합니다.
    String prefix = PERSONAL_MESSAGE_PREFIX + message.length();
    // 문자열을 바이트 배열로 변환한 다음, SHA3 알고리즘을 사용하여 해시 값을 계산합니다.
    byte[] msgHash = Hash.sha3((prefix + message).getBytes());

    // 서명을 16진수 문자열에서 바이트 배열로 변환합니다.
    byte[] signatureBytes = Numeric.hexStringToByteArray(signature);

    // v 값을 계산합니다. 서명 바이트 배열에서 마지막 바이트는 v 값으로 사용됩니다. 그러나 v 값은 27 미만이 될 수 있으므로, 27을 더하여 v 값을 조정합니다.
    byte v = signatureBytes[64];
    if (v < 27) {
      v += 27;
    }
    // 서명 바이트 배열에서 r 값과 s 값의 일부를 추출하여 ECDSA 서명 데이터를 만듭니다. 이 데이터는 서명된 메시지의 검증에 사용됩니다
    Sign.SignatureData sd =
            new Sign.SignatureData(
                    v,
                    (byte[]) Arrays.copyOfRange(signatureBytes, 0, 32),
                    (byte[]) Arrays.copyOfRange(signatureBytes, 32, 64));
    // addressRecovered 복구된 주소를 저장할 변수이고, match는 서명된 주소가 memberAddress와 일치하는지 여부를 저장하는 변수입니다.
    String addressRecovered = null;
    boolean match = false;

    // Iterate for each possible key to recover
    // 모든 가능한 공개 키에 대해 복구를 시도합니다. . 이 공개 키는 이전에 서명된 메시지와 연관된 개인 키로부터 생성된 공개 키를 나타냅니다.
    for (int i = 0; i < 4; i++) {
      // 복구에 실패하면 null을 반환합니다.
      BigInteger publicKey =
              Sign.recoverFromSignature(
                      (byte) i,
                      new ECDSASignature(
                              new BigInteger(1, sd.getR()), new BigInteger(1, sd.getS())),
                      msgHash);
      // 키가 성공적으로 복구되면, Keys.getAddress() 메서드를 호출하여 복구된 공개 키에 대한 주소를 가져옵니다.
      if (publicKey != null) {
        addressRecovered = "0x" + Keys.getAddress(publicKey);
        //  복구된 주소가 memberAddress와 일치하는지 확인합니다. 이 경우, match 변수를 true로 설정하고 루프를 종료합니다.
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
    //  JWT 토큰을 이용하여 해당 사용자의 정보를 가져옵니다. 그리고 해당 사용자 정보의 비밀번호를 findPassword 변수에 저장합니다.
    String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
    String findPassword = getMemberInfoWithToken(accessToken.substring(7)).getPassword();
    // 마지막으로, passwordEncoder.matches(requestPassword, findPassword)를 호출하여 요청받은 비밀번호와 저장된 비밀번호를 비교합니다.
    if (passwordEncoder.matches(requestPassword, findPassword)) {
      return true;
    }
    throw new BadRequestException("유저 정보와 비밀번호가 일치하지 않음");
  }

  private List<WishListItem> memberWishList(Member member) {
    // 사용자의 위시리스트 정보를 가져오기
    List<WishListItem> wishList = new ArrayList<>();
    List<WishlistSol> memberWishLists = wishlistSolidity.getMemberWishLists(member.getAddress()).orElse(Collections.emptyList());
    // 리스트에 포함된 각각의 위시리스트 정보를 순회하며 wishList 리스트에 추가합니다.
    for (WishlistSol wishlistSol : memberWishLists) {
      if(wishlistSol.isClosed()) continue;
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
    //  사용자 정보(member)를 기반으로 Access Token을 생성합니다. 사용자 정보를 기반으로 Refresh Token을 생성합니다.
    String accessToken = tokenProvider.createAccessToken(member);
    String refreshToken = tokenProvider.createRefreshToken(member);

    // 변경된 사용자 정보를 DB에 저장합니다.
    member.setRefreshToken(refreshToken);
    memberRepository.save(member);
    //  put 메서드를 사용하여 Access Token과 Refresh Token 값을 key-value 형태로 저장한 뒤, 이를 반환합니다.
    return new HashMap<>() {{
      put(JwtFilter.ACCESS_HEADER, accessToken);
      put(JwtFilter.REFRESH_HEADER, refreshToken);
    }};
  }

  public Member getMemberInfoWithToken(String token) {
    // 주어진 토큰(token)을 이용하여 인증(authentication)을 수행합니다. 이때, 인증된 사용자 정보는 authentication 객체로 반환됩니다.
    Authentication authentication = tokenProvider.getAuthentication(token);
   // 인증된 사용자의 주소를 이용하여 DB에서 사용자 정보를 찾아 반환합니다.
    return memberRepository.findByAddress(authentication.getName());
  }
}
