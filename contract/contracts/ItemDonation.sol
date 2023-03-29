// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";
import "./BasicDonation.sol";

contract ItemDonation is SupportHistory, BasicDonation {
    struct ItemSol {
        uint64 id;
        bytes title;
        bytes imgPath;
        bytes description;
        uint256 price; // wei
        uint64 salesCount;
        bytes message;
        bytes filePath;
        bool isDeleted;
        address seller;
    }

    mapping(uint64 => ItemSol) public items;
    mapping(address => uint64[]) public myItems;
    uint64 internal itemCount;
    mapping(address => mapping(uint64 => bool)) public purchasedItems;

    // event ItemPurchased(address indexed buyer, address indexed seller, uint256 itemId);

    function _buyItem(address payable _seller, uint64 _itemId, uint256 _value, address payable _owner) internal returns(uint64){
        require(_value <= address(this).balance, "Insufficient balance");
        ItemSol memory item = items[_itemId];
        require(_value >= item.price, "Insufficient payment");
        require(!item.isDeleted, "Insufficient payment");
        require(item.seller == _seller, "This address is not the item's seller.");
        require(!purchasedItems[msg.sender][_itemId], "This item has already been purchased.");

        uint64 supportId = _transfer(_seller, _value, SupportType.Item, _owner);

        purchasedItems[msg.sender][_itemId] = true;
        items[_itemId].salesCount += 1;
        return supportId;
    }

    function _createItem(ItemSol memory _item) internal {
        itemCount++;
        _item.id = itemCount;
        items[itemCount] = _item;
        myItems[_item.seller].push(itemCount);
    }
    function _getItemList(uint64[] memory indexes) internal view returns (ItemSol[] memory) {
        ItemSol[] memory result = new ItemSol[](indexes.length);
        for (uint i = 0; i < indexes.length; i++) {
            require(indexes[i] <= itemCount, "Invalid index");
            ItemSol storage item = items[indexes[i]];
            result[i] = item;
        }
        return result;
    }

    function _getItemDetail(uint64 id) internal view returns (ItemSol memory) {
        require(id <= itemCount, "Invalid index");
        require(id != 0, "Invalid index");
        ItemSol memory item = items[id];
        require(!item.isDeleted, "Item does not exist");
        return item;
    }

    function _deleteItem(address _address, uint64 id) internal {
        require(id <= itemCount, "Invalid index");
        ItemSol memory item = items[id];
        require(!item.isDeleted, "Item does not exist");
        require(item.seller == _address, "You are not seller");
        items[id].isDeleted = true;
    }

    function _updateItem(ItemSol memory _item) internal {
        require(_item.id <= itemCount, "Invalid index");
        items[_item.id] = _item;
    }
}