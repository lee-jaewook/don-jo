// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleConstruct {
    uint256 value;


    struct ItemStruct{
        uint idx;
        mapping(uint256 => Item) items;
    }

    struct Item{
        uint idx;
        string title;

    }

    mapping(address => ItemStruct) myItem;

    function read() public view returns (uint256) {
        return myItem[msg.sender].idx;
    }

    function readMyItems() public view returns (uint ,Item[] memory){
        uint _idx = myItem[msg.sender].idx;
        Item[] memory _items = new Item[](_idx);
        for (uint i = 0; i < _idx; i++) {
            _items[i] = myItem[msg.sender].items[i];
        }
        return (_idx, _items);
    }

    function addMyItems(Item memory _item) public{
        uint _idx = myItem[msg.sender].idx;
        myItem[msg.sender].items[_idx] = _item;
        myItem[msg.sender].idx++;
    }

    function write(uint256 newValue) public {
        value = newValue;
    }
}
