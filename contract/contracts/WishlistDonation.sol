// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";
import "./BasicDonation.sol";

contract WishlistDonation is SupportHistory, BasicDonation {

    struct WishlistSol {
        uint64 id;
        bytes imgPath;
        bytes title;
        bytes description;
        uint256 collectedAmount;
        uint256 targetAmount;
        bytes message;
        bool isClosed;
        address seller;
    }

    mapping(uint =>  WishlistSol) public wishlists;
    mapping(address => uint64[]) public myWishlists;
    uint64 internal wishlistCount;

    // event WishlistCreated(address indexed creator, uint256 wishlistId);

    function _buyWishlist(address payable _to, uint64 _wishlistId, uint256 _value, address payable _owner) internal returns(uint64){
        require(_value <= address(this).balance, "Insufficient balance");
        WishlistSol memory wishlist = wishlists[_wishlistId];
        require(!wishlist.isClosed, "This fundraising campaign for the wishlist has closed.");

        uint64 supportId = _transfer(_to, _value, SupportType.Wishlist, _owner);
        wishlists[_wishlistId].collectedAmount += _value;
        if(wishlists[_wishlistId].collectedAmount >= wishlists[_wishlistId].targetAmount){
            wishlists[_wishlistId].isClosed = true;
        }
        return supportId;
    }

    function _createWishlist(WishlistSol memory _wishlist) internal {
        wishlistCount++;
        _wishlist.id = wishlistCount;
        wishlists[wishlistCount] = _wishlist;
        myWishlists[_wishlist.seller].push(wishlistCount);
    }

    function _getWishlists(uint64[] memory indexes) internal view returns (WishlistSol[] memory) {
        WishlistSol[] memory result = new WishlistSol[](indexes.length);
        for (uint i = 0; i < indexes.length; i++) {
            require(indexes[i] <= wishlistCount, "Invalid index");
            WishlistSol memory wishlist = wishlists[indexes[i]];
            result[i] = wishlist;
        }
        return result;
    }

    function _getWishlistDetail(uint64 id) internal view returns (WishlistSol memory) {
        require(id <= wishlistCount, "Invalid index");
        require(id != 0, "Invalid index");
        WishlistSol memory wishlist = wishlists[id];
        // require(!wishlist.isClosed, "Item does not exist"); // 차후 고민
        return wishlist;
    }

    function _deleteWishlist(address _address, uint256 id) internal {
        require(id <= wishlistCount, "Invalid index");
        WishlistSol memory wishlist = wishlists[id];
        require(!wishlist.isClosed, "The wishlist has already closed");
        require(wishlist.seller == _address, "You do not have the authority to close the wishlist");
        wishlists[id].isClosed = true;
    }

    function _updateWishlist(WishlistSol memory _wishlist) internal {
        require(_wishlist.id <= wishlistCount, "Invalid index");
        wishlists[_wishlist.id] = _wishlist;
    }
}