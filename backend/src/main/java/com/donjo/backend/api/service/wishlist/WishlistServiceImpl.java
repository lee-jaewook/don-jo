package com.donjo.backend.api.service.wishlist;

import com.donjo.backend.api.dto.wishlist.request.AddWishlistCond;
import com.donjo.backend.api.dto.wishlist.request.UpdateWishlistCond;
import com.donjo.backend.api.dto.wishlist.response.GetWishlistsPayload;
import com.donjo.backend.api.dto.wishlist.response.WishlistDetailPayload;
import com.donjo.backend.exception.BadRequestException;
import com.donjo.backend.exception.NoContentException;
import com.donjo.backend.solidity.wishlist.WishlistSol;
import com.donjo.backend.solidity.wishlist.WishlistSolidity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService{
    // WishlistSolidity 선언
    private final WishlistSolidity wishlistSolidity;

    @Override
    public GetWishlistsPayload getAllWishlist(String address, int pageNum, int pageSize) {
        // null 체크
        // 사용자의 위시리스트 목록을 가져오기 만약 데이터가 없으면 NoContentException을 발생
        List<WishlistSol> list = wishlistSolidity.getMemberWishLists(address).orElseThrow(()-> new NoContentException());

        // 역순으로 정렬
        Collections.reverse(list);

        // 페이지네이션
        int startIdx = pageNum * pageSize;
        int endIdx = (pageNum + 1) * pageSize - 1;
        if(list.size() == 0 || list.size() <= startIdx) {
            throw new NoContentException();
        }
        // result 리스트에 목록 추가
        List<WishlistSol> result = new ArrayList<>();
        for (int i = startIdx; i < list.size(); i++) {
            if(i > endIdx) break;
            result.add(list.get(i));
        }
        // 페이지네이션 처리된 목록을 반환
        return GetWishlistsPayload.from(list.size(), pageNum, pageSize, result);
    }

    @Override
    //  uid를 기반으로 특정 WishlistSol 반환합니다
    public WishlistDetailPayload getOneWishlist(Long id) {
        WishlistSol sol = wishlistSolidity.getMemberWishListDetail(id).orElseThrow(()-> new NoContentException());
        return WishlistDetailPayload.from(sol);
    }

    @Override
    public void addWishlist(String memberAddress, AddWishlistCond cond) {
        // cond 객체를 이용하여 새로운 위시리스트(WishlistSol)를 생성하고, 이를 wishlistSolidity를 통해 블록체인에 저장합니다.
        wishlistSolidity.addMemberWishList(cond.toWishlist(memberAddress));
    }

    @Override
    // 삭제하려는 회원의 지갑 주소, 삭제하려는 위시리스트의 고유 식별자 두 인자를 이용해 wishlistSolidity라는 객체를 통해 블록체인 상에서 해당 회원의 위시리스트에서 해당 아이템을 삭제
    public void deleteWishlist(String memberAddress, Long uid) {
        wishlistSolidity.deleteMemberWishlist(memberAddress, uid);
    }

    @Override
    public void updateWishlist(String memberAddress, UpdateWishlistCond cond) {
        //  wishlistSolidity 객체의 updateMemberWishlist 메서드를 호출합니다.
        log.info("위시리스트 업데이트 Solidity 변환 시작");
        WishlistSol sol = wishlistSolidity.getMemberWishListDetail(cond.getId()).orElseThrow(()-> new BadRequestException());
        log.info("위시리스트 업데이트 Solidity 변환 완료");
        wishlistSolidity.updateMemberWishlist(cond.toWishlist(memberAddress, sol));
    }
}
