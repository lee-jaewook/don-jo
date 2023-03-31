package com.donjo.backend.solidity.Item;

import com.donjo.backend.exception.BadRequestException;
import com.donjo.backend.exception.NoContentException;
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
public class ItemSolidity {

//    private Web3jUtil web3jUtil;

    private ApplicationHandler contract;

    @Autowired
    public ItemSolidity(Web3jUtil web3jUtil) {
        this.contract = web3jUtil.getContractApi();
    }

    public void addMemberItem(ItemSol cond){
        // cond안에 있는 toSol불러서 넣기
        ApplicationHandler.ItemSol item = cond.toSol();
        try {
            //  TransactionReceipt 반환
            contract.addMemberItem(item).send();
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    public Optional<List<ItemSol>> getMemberItemList(String address){
        // 스마트 컨트랙트 호출
        List<ApplicationHandler.ItemSol> items = null;
        try {
            // address를 이용하여 아이템 리스트 가져오기
            items = contract.getMemberItemList(address).send();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // 형 변환 및 isDeleted 여부 판별
        List<ItemSol> result = new ArrayList<>();
        // result에 값 넣기
        for (int i = 0, size = items.size(); i < size; i++) {
            ApplicationHandler.ItemSol item = items.get(i);
            if(item.isDeleted || item == null) continue;
            result.add(ItemSol.fromSol(item));
        }
        return Optional.ofNullable(result);
    }

    public Optional<ItemSol> getItemDetail(Long id){
        ItemSol itemSol = null;
        try {
            // id로 특정 Item 가져오기
            ApplicationHandler.ItemSol response = contract.getItemDetail(BigInteger.valueOf(id)).send();
            // ItemSol에 가져온 값 넣기
            itemSol = ItemSol.fromSol(response);
        } catch (Exception e) {
            throw new NoContentException(e.getMessage());
        }
        return Optional.ofNullable(itemSol);
    }

    public void deleteMemberItem(String address, Long id){
        try {
            // id로 아이템 가져오기
            String seller = contract.getItemDetail(BigInteger.valueOf(id)).send().seller;
            if(!seller.equalsIgnoreCase(address)) throw new UnAuthorizationException("판매자가 아닙니다.");
            // 아이템 삭제
            contract.deleteMemberItem(address, BigInteger.valueOf(id)).send();
        }
        catch (UnAuthorizationException e1){
            throw new UnAuthorizationException(e1.getMessage());
        }
        catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    public void updateMemberItem(ItemSol cond){
        ApplicationHandler.ItemSol item = cond.toSol();
        try {
            // id로 아이템 가져오기
            String address =  contract.getItemDetail(item.id).send().seller;
            if(!address.equalsIgnoreCase(cond.getSeller())){
                throw new UnAuthorizationException("판매자가 아닙니다");
            }
            // Item Update
            contract.updateMemberItem(item).send();
        }
        catch (UnAuthorizationException e1){
            throw new UnAuthorizationException(e1.getMessage());
        }
        catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    public boolean isPurchased(String memberAddress, Long uid){
        try {
            // 아이템 구매여부 리턴
            return contract.purchasedItems(memberAddress, BigInteger.valueOf(uid)).send();
        }catch (Exception e){
            throw new BadRequestException(e.getMessage());
        }
    }
}
