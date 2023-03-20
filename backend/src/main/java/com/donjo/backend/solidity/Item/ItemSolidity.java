package com.donjo.backend.solidity.Item;

import com.donjo.backend.util.Web3jUtil;
import lombok.RequiredArgsConstructor;
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
public class ItemSolidity {

//    private Web3jUtil web3jUtil;

    private ApplicationHandler contract;

    @Autowired
    public ItemSolidity(Web3jUtil web3jUtil) {
//        this.web3jUtil = web3jUtil;
        this.contract = web3jUtil.getContractApi();
    }

    public void addMemberItem(Item cond){
        ApplicationHandler.Item item = cond.toSol();
        CompletableFuture<TransactionReceipt> future = contract.addMemberItem(item).sendAsync();

        // 비동기 callback block
        future.whenComplete((transactionReceipt, throwable) -> {
            if (throwable != null) {
                System.out.println("Error sending transaction: " + throwable.getMessage());
            } else {
                System.out.println("Transaction sent, transaction hash: " + transactionReceipt.getTransactionHash());
            }
        });
    }

    public Optional<List<Item>> getMemberItemList(String address){
        // 스마트 컨트랙트 호출
        List<ApplicationHandler.Item> items = null;
        try {
            items = contract.getMemberItemList(address).send();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // 형 변환 및 isDeleted 여부 판별
        List<Item> result = new ArrayList<>();
        for (int i = 0, size = items.size(); i < size; i++) {
            ApplicationHandler.Item item = items.get(i);
            if(item.isDeleted || item == null) continue;
            result.add(Item.fromSol(item));
        }
        return Optional.ofNullable(result);
    }

    public Optional<Item> getItemDetail(Long id){
        Item item = null;
        try {
            ApplicationHandler.Item response = contract.getItemDetail(BigInteger.valueOf(id)).send();
            item = Item.fromSol(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return Optional.ofNullable(item);
    }

    public void deleteMemberItem(String address, Long id){
        CompletableFuture<TransactionReceipt> future = contract.deleteMemberItem(address, BigInteger.valueOf(id)).sendAsync();

        // 비동기 callback block
        future.whenComplete((transactionReceipt, throwable) -> {
            if (throwable != null) {
                System.out.println("Error sending transaction: " + throwable.getMessage());
            } else {
                System.out.println("Transaction sent, transaction hash: " + transactionReceipt.getTransactionHash());
            }
        });
    }

    public void updateMemberItem(Item cond){
        ApplicationHandler.Item item = cond.toSol();
        CompletableFuture<TransactionReceipt> future = contract.updateMemberItem(item).sendAsync();

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
