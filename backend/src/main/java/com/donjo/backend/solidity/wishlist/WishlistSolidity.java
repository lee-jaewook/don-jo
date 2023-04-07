package com.donjo.backend.solidity.wishlist;

import com.donjo.backend.exception.BadRequestException;
import com.donjo.backend.exception.UnAuthorizationException;
import com.donjo.backend.util.Web3jUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.applicationhandler.ApplicationHandler;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class WishlistSolidity {

    private ApplicationHandler contract;

    @Autowired
    public WishlistSolidity(Web3jUtil web3jUtil) {
        this.contract = web3jUtil.getContractApi();
    }

    public Optional<List<WishlistSol>> getMemberWishLists(String address){
        List<WishlistSol> list = null;
        try {
            // Address로 List에 담기
            List<ApplicationHandler.WishlistSol> response = contract.getMemberWishLists(address).send();
            list = new ArrayList<>();
            for (ApplicationHandler.WishlistSol wishlist : response) {
//                if(wishlist.isClosed) continue;
                list.add(WishlistSol.fromSol(wishlist));
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return Optional.ofNullable(list);
    }

    public Optional<WishlistSol> getMemberWishListDetail(Long id){
        WishlistSol wishlistSol = null;
        try {
            //id로 디테일 정보 가져오기
            ApplicationHandler.WishlistSol response = contract.getMemberWishListDetail(BigInteger.valueOf(id)).send();
            // wishlistSol에 담기
            wishlistSol = WishlistSol.fromSol(response);
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
        return Optional.ofNullable(wishlistSol);
    }

    public void addMemberWishList(WishlistSol wishlistSol){
        try {
            log.info("call add wishlist sol");
            // 위시리스트 형태 변환해서 넘기기(위시리스트 추가)
            contract.addMemberWishList(wishlistSol.toSol()).send();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    public void deleteMemberWishlist(String address, Long id){
        try {
            // id로 디테일 가져오기
            String seller = contract.getMemberWishListDetail(BigInteger.valueOf(id)).send().seller;
            if(!seller.equalsIgnoreCase(address)) throw new UnAuthorizationException("판매자가 아닙니다");
            // id로 삭제하기
            contract.deleteMemberWishlist(address, BigInteger.valueOf(id)).send();
        }
        catch (UnAuthorizationException e1){
            throw new UnAuthorizationException(e1.getMessage());
        }
        catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    public void updateMemberWishlist(WishlistSol wishlistSol){
        try {
            // id로 위시리스트 가져오기
            String seller = contract.getMemberWishListDetail(BigInteger.valueOf(wishlistSol.getId())).send().seller;
            log.info("위시리스트 seller : {}", seller);
            if(!seller.equalsIgnoreCase(wishlistSol.getSeller())) throw new UnAuthorizationException("판매자가 아닙니다.");

            // 위시리스트 업데이트
            contract.updateMemberWishlist(wishlistSol.toSol()).send();
            log.info("위시리스트 블록체인 수정 완료");
        }
        catch (UnAuthorizationException e1){
            log.info("판매자가 아닙니다.");
            throw new UnAuthorizationException(e1.getMessage());
        }
        catch (Exception e) {
            log.info("위시리스트 블록체인 수정 실패");
            throw new BadRequestException(e.getMessage());
        }
    }
}
