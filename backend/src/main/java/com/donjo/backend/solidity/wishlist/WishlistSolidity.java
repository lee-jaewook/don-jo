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
            ApplicationHandler.WishlistSol response = contract.getMemberWishListDetail(BigInteger.valueOf(id)).send();
            wishlistSol = WishlistSol.fromSol(response);
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
        return Optional.ofNullable(wishlistSol);
    }

    public void addMemberWishList(WishlistSol wishlistSol){
        try {
            contract.addMemberWishList(wishlistSol.toSol()).send();
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    public void deleteMemberWishlist(String address, Long id){
        try {
            String seller = contract.getMemberWishListDetail(BigInteger.valueOf(id)).send().seller;
            if(!seller.equals(address)) throw new UnAuthorizationException("판매자가 아닙니다");
            contract.deleteMemberWishlist(address, BigInteger.valueOf(id)).send();
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    public void updateMemberWishlist(WishlistSol wishlistSol){
        try {
            String seller = contract.getMemberWishListDetail(BigInteger.valueOf(wishlistSol.getId())).send().seller;
            if(!seller.equals(wishlistSol.getSeller())) throw new UnAuthorizationException("판매자가 아닙니다.");
            contract.updateMemberWishlist(wishlistSol.toSol()).send();
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }
}
