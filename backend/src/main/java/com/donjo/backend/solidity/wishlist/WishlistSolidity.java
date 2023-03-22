package com.donjo.backend.solidity.wishlist;

import com.donjo.backend.exception.BadRequestException;
import com.donjo.backend.exception.UnAuthorizationException;
import com.donjo.backend.util.Web3jUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.applicationhandler.ApplicationHandler;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
public class WishlistSolidity {

    private ApplicationHandler contract;

    @Autowired
    public WishlistSolidity(Web3jUtil web3jUtil) {
        this.contract = web3jUtil.getContractApi();
    }

    public Optional<List<Wishlist>> getMemberWishLists(String address){
        List<Wishlist> list = null;
        try {
            List<ApplicationHandler.Wishlist> response = contract.getMemberWishLists(address).send();
            list = new ArrayList<>();
            for (ApplicationHandler.Wishlist wishlist : response) {
//                if(wishlist.isClosed) continue;
                list.add(Wishlist.fromSol(wishlist));
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return Optional.ofNullable(list);
    }

    public Optional<Wishlist> getMemberWishListDetail(Long id){
        Wishlist wishlist = null;
        try {
            ApplicationHandler.Wishlist response = contract.getMemberWishListDetail(BigInteger.valueOf(id)).send();
            wishlist = Wishlist.fromSol(response);
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
        return Optional.ofNullable(wishlist);
    }

    public void addMemberWishList(Wishlist wishlist){
        try {
            contract.addMemberWishList(wishlist.toSol()).send();
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

    public void updateMemberWishlist(Wishlist wishlist){
        try {
            String seller = contract.getMemberWishListDetail(BigInteger.valueOf(wishlist.getId())).send().seller;
            if(!seller.equals(wishlist.getSeller())) throw new UnAuthorizationException("판매자가 아닙니다.");
            contract.updateMemberWishlist(wishlist.toSol()).send();
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }
}
