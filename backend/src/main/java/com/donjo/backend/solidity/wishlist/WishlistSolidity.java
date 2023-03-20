package com.donjo.backend.solidity.wishlist;

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
                if(wishlist.isClosed) continue;
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
            throw new RuntimeException(e);
        }
        return Optional.ofNullable(wishlist);
    }

    public void addMemberWishList(Wishlist wishlist){
        CompletableFuture<TransactionReceipt> future = contract.addMemberWishList(wishlist.toSol()).sendAsync();

        // 비동기 callback block
        future.whenComplete((transactionReceipt, throwable) -> {
            if (throwable != null) {
                System.out.println("Error sending transaction: " + throwable.getMessage());
            } else {
                System.out.println("Transaction sent, transaction hash: " + transactionReceipt.getTransactionHash());
            }
        });
    }

    public void deleteMemberWishlist(String address, Long id){
        CompletableFuture<TransactionReceipt> future = contract.deleteMemberWishlist(address, BigInteger.valueOf(id)).sendAsync();

        // 비동기 callback block
        future.whenComplete((transactionReceipt, throwable) -> {
            if (throwable != null) {
                System.out.println("Error sending transaction: " + throwable.getMessage());
            } else {
                System.out.println("Transaction sent, transaction hash: " + transactionReceipt.getTransactionHash());
            }
        });
    }

    public void updateMemberWishlist(String address, Wishlist wishlist){
        CompletableFuture<TransactionReceipt> future = contract.updateMemberWishlist(address, wishlist.toSol()).sendAsync();

        // 비동기 callback block
        future.whenComplete((transactionReceipt, throwable) -> {
            if (throwable != null) {
                System.out.println("Error sending transaction: " + throwable.getMessage());
            } else {
                System.out.println("Transaction sent, transaction hash: " + transactionReceipt.getTransactionHash());
            }
        });
    }
}
