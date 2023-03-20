package com.donjo.backend.solidity.Item;

import com.donjo.backend.util.Web3jUtil;
import lombok.*;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.applicationhandler.ApplicationHandler;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {
    private Long id;
    private String title;
    private String imgPath;
    private String description;
    private Long price; // wei
    private String message;
    private String filePath;
    private boolean isDeleted;
    private String seller;

    public ApplicationHandler.Item toSol(){
        BigInteger solId = BigInteger.valueOf(id);
        byte[] solTitle = title.getBytes(StandardCharsets.UTF_8);
        byte[] solImgPath = imgPath.getBytes(StandardCharsets.UTF_8);
        byte[] solDescription = description.getBytes(StandardCharsets.UTF_8);
        BigInteger solPrice = BigInteger.valueOf(price);
        byte[] solMessage = message.getBytes(StandardCharsets.UTF_8);
        byte[] solFilePath = filePath.getBytes(StandardCharsets.UTF_8);
        Boolean solIsDeleted = isDeleted;
        String solSeller = seller;
        return new ApplicationHandler.Item(solId, solTitle, solImgPath, solDescription, solPrice, solMessage, solFilePath, solIsDeleted, solSeller);
    }

    public static Item fromSol(ApplicationHandler.Item item){
        return Item.builder()
                .id(item.id.longValue())
                .title(new String(item.title, StandardCharsets.UTF_8))
                .imgPath(new String(item.imgPath, StandardCharsets.UTF_8))
                .description(new String(item.description, StandardCharsets.UTF_8))
                .price(item.price.longValue())
                .message(new String(item.message, StandardCharsets.UTF_8))
                .filePath(new String(item.filePath, StandardCharsets.UTF_8))
                .isDeleted(item.isDeleted.booleanValue())
                .seller(item.seller)
                .build();
    }
}
