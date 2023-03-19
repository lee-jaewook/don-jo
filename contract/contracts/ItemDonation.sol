// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";

contract ItemDonation is SupportHistory {
    struct Item {
        string name;
        string description;
        uint256 price;
        string downloadLink;
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;

    event ItemPurchased(address indexed buyer, address indexed seller, uint256 itemId);

    function createItem(string memory name, string memory description, uint256 price, string memory downloadLink) public {
        itemCount++;
        items[itemCount] = Item(name, description, price, downloadLink);
    }

    function buyItem(uint256 itemId) public payable {
        Item storage item = items[itemId];
        require(msg.value >= item.price, "Insufficient payment");

        address seller = msg.sender;
        seller.transfer(msg.value);

        emit ItemPurchased(msg.sender, seller, itemId);
        recordSupport(msg.sender, iteam.owner, msg.value, SupportType.Item);
    }
}