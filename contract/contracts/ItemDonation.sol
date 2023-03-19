// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";

contract ItemDonation is SupportHistory {
    struct Item {
        uint256 id;
        string title;
        string imgPath;
        string description;
        uint price; // wei
        string message;
        string filePath;
        bool isDeleted;
        address seller;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256[]) public myItems;
    uint256 internal itemCount;
    mapping(address => mapping(uint256 => bool)) public purchasedItems;

    event ItemPurchased(address indexed buyer, address indexed seller, uint256 itemId);

    function _buyItem(address _address, uint256 _itemId, uint256 _value) internal returns(uint256){
        require(_value <= address(this).balance, "Insufficient balance");
        // 요청이 왔음을 기록.
        uint256 _id = recordSupport(msg.sender, _address, _value, SupportType.Item);

        Item memory item = items[_itemId];
        
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

    function _createItem(
        string memory _title,
        string memory _imgPath,
        string memory _description,
        uint _price,
        string memory _message,
        string memory _filePath,
        address _seller
    ) internal {
        itemCount++;
        items[itemCount] = Item({
            id: itemCount,
            title: _title,
            imgPath: _imgPath,
            description: _description,
            price: _price,
            message: _message,
            filePath: _filePath,
            isDeleted: false,
            seller: _seller
        });
        myItems[_seller].push(itemCount);
    }
    function _getItemList(uint256[] memory indexes) internal view returns (Item[] memory) {
        Item[] memory result = new Item[](indexes.length);
        for (uint i = 0; i < indexes.length; i++) {
            require(indexes[i] <= itemCount, "Invalid index");
            Item storage item = items[indexes[i]];
            result[i] = item;
        }
        return result;
    }

    function _getItemDetail(uint256 id) internal view returns (Item memory) {
        require(id <= itemCount, "Invalid index");
        Item storage item = items[id];
        require(!item.isDeleted, "Item does not exist");
        return item;
    }

    function _deleteItem(address _address, uint256 id) internal {
        require(id <= itemCount, "Invalid index");
        Item memory item = items[id];
        require(!item.isDeleted, "Item does not exist");
        require(item.seller == _address, "Item does not exist");
        items[id].isDeleted = true;
    }

    function _updateItem(
        string memory _title,
        string memory _imgPath,
        string memory _description,
        uint _price,
        string memory _message,
        string memory _filePath,
        address _seller,
        uint256 _id
    ) internal {
        require(_id <= itemCount, "Invalid index");
        items[_id] = Item({
            id: _id,
            title: _title,
            imgPath: _imgPath,
            description: _description,
            price: _price,
            message: _message,
            filePath: _filePath,
            isDeleted: false,
            seller: _seller
        });
        myItems[_seller].push(itemCount);
    }
}