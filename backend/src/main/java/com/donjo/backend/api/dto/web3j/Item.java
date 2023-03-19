package com.donjo.backend.api.dto;

import java.math.BigInteger;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.StaticStruct;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;

public class Item extends StaticStruct {
    public Item(BigInteger id, Utf8String title, Utf8String imgPath, Utf8String description,
                Uint256 price, Utf8String message, Utf8String filePath, Bool isDeleted, Address seller) {
        super(new Uint256(id),
                title,
                imgPath,
                description,
                price,
                message,
                filePath,
                isDeleted,
                seller
        );
    }

    public static TypeReference<Item> getTypeReference() {
        return new TypeReference<Item>() {};
    }
}

