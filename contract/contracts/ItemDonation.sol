// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";

contract ItemDonation is SupportHistory {
    struct ItemSol {
        uint256 id;
        bytes title;
        bytes imgPath;
        bytes description;
        uint price; // wei
        bytes message;
        bytes filePath;
        bool isDeleted;
        address seller;
    }

    mapping(uint256 => ItemSol) public items;
    mapping(address => uint256[]) public myItems;
    uint256 internal itemCount;
    mapping(address => mapping(uint256 => bool)) public purchasedItems;

    // event ItemPurchased(address indexed buyer, address indexed seller, uint256 itemId);

    function _buyItem(address _address, uint256 _itemId, uint256 _value) internal returns(uint256){
        require(_value <= address(this).balance, "Insufficient balance");
        // 요청이 왔음을 기록.
        uint256 _id = recordSupport(msg.sender, _address, _value, SupportType.Item);

        ItemSol memory item = items[_itemId];
        
        require(_value >= item.price, "Insufficient payment");
        require(!item.isDeleted, "Insufficient payment");
        require(item.seller == _address, "This address is not the item's seller.");
        require(!purchasedItems[msg.sender][_itemId], "This item has already been purchased.");
        // emit ItemPurchased(msg.sender, item.seller, _itemId);

        (bool success, ) = _address.call{value: _value}("");

        if (!success) {
            updateSupportStatus(msg.sender, _address, _id, SupportStatus.Failed);
            revert("Transfer to wishlistOwner failed");
        }
        updateSupportStatus(msg.sender, _address, _id, SupportStatus.Success);
        purchasedItems[msg.sender][_itemId] = true;
        return _id;
    }

    function _createItem(ItemSol memory _item) internal {
        itemCount++;
        _item.id = itemCount;
        items[itemCount] = _item;
        myItems[_item.seller].push(itemCount);
    }
    function _getItemList(uint256[] memory indexes) internal view returns (ItemSol[] memory) {
        ItemSol[] memory result = new ItemSol[](indexes.length);
        for (uint i = 0; i < indexes.length; i++) {
            require(indexes[i] <= itemCount, "Invalid index");
            ItemSol storage item = items[indexes[i]];
            result[i] = item;
        }
        return result;
    }

    function _getItemDetail(uint256 id) internal view returns (ItemSol memory) {
        require(id <= itemCount, "Invalid index");
        require(id != 0, "Invalid index");
        ItemSol storage item = items[id];
        // require(!item.isDeleted, "Item does not exist");
        return item;
    }

    function _deleteItem(address _address, uint256 id) internal {
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