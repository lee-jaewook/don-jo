// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";

contract WishlistDonation is SupportHistory {
    enum wishlistStatus { complete, Deleted}

    struct Wishlist {
        uint256 id;
        bytes imgPath;
        bytes title;
        bytes description;
        uint256 collectedAmount;
        uint256 targetAmount;
        bytes message;
        bool isClosed;
        address seller;
    }

    mapping(uint =>  Wishlist) public wishlists;
    mapping(address => uint256[]) public myWishlists;
    uint256 internal wishlistCount;

    // event WishlistCreated(address indexed creator, uint256 wishlistId);

    function _buyWishlist(address _address, uint256 _wishlistId, uint256 _value) internal returns(uint256){
        require(_value <= address(this).balance, "Insufficient balance");
        // 요청이 왔음을 기록.
        uint256 _id = recordSupport(msg.sender, _address, _value, SupportType.Wishlist);

        Wishlist memory wishlist = wishlists[_wishlistId];
        
        require(!wishlist.isClosed, "This fundraising campaign for the wishlist has closed.");
        // require(!purchasedItems[msg.sender][_wishlistId], "This address is not the item's seller.");
        // emit ItemPurchased(msg.sender, item.seller, _itemId);

        (bool success, ) = _address.call{value: _value}("");

        if (!success) {
            updateSupportStatus(msg.sender, _address, _id, SupportStatus.Failed);
            revert("Transfer to wishlistOwner failed");
        }
        updateSupportStatus(msg.sender, _address, _id, SupportStatus.Success);
        
        return _id;
    }

    function _createWishlist(Wishlist memory _wishlist) internal {
        wishlistCount++;
        wishlists[wishlistCount] = _wishlist;
        myWishlists[_wishlist.seller].push(wishlistCount);
    }

    function _getWishlists(uint256[] memory indexes) internal view returns (Wishlist[] memory) {
        Wishlist[] memory result = new Wishlist[](indexes.length);
        for (uint i = 0; i < indexes.length; i++) {
            require(indexes[i] <= wishlistCount, "Invalid index");
            Wishlist storage wishlist = wishlists[indexes[i]];
            result[i] = wishlist;
        }
        return result;
    }

    function _getWishlistDetail(uint256 id) internal view returns (Wishlist memory) {
        require(id <= wishlistCount, "Invalid index");
        Wishlist memory wishlist = wishlists[id];
        // require(!wishlist.isClosed, "Item does not exist"); // 차후 고민
        return wishlist;
    }

    function _deleteWishlist(address _address, uint256 id) internal {
        require(id <= wishlistCount, "Invalid index");
        Wishlist memory wishlist = wishlists[id];
        require(!wishlist.isClosed, "The wishlist has already closed");
        require(wishlist.seller == _address, "You do not have the authority to close the wishlist");
        wishlists[id].isClosed = true;
    }

    function _updateWishlist(address _address, Wishlist memory _wishlist) internal {
        require(_wishlist.id <= wishlistCount, "Invalid index");
        require(_wishlist.seller == _address, "You do not have the authority to close the wishlist");
        wishlists[_wishlist.id] = _wishlist;
    }
}