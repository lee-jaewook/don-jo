// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";

contract WishlistDonation is SupportHistory {
    struct WishlistItem {
        string title;
        uint256 targetAmount;
        uint256 collectedAmount;
    }

    mapping(address => mapping(uint256 => WishlistItem)) public wishlists;
    mapping(address => uint256) public wishlistCounts;

    event WishlistCreated(address indexed creator, uint256 wishlistId);

    function createWishlist(string memory title, uint256 targetAmount) public {
        uint256 wishlistId = wishlistCounts[msg.sender]++;
        wishlists[msg.sender][wishlistId] = WishlistItem(title, targetAmount, 0);
        emit WishlistCreated(msg.sender, wishlistId);
    }

    function addToWishlist(address wishlistOwner, uint256 wishlistId) public payable {
        WishlistItem storage wishlist = wishlists[wishlistOwner][wishlistId];
        require(msg.value <= wishlist.targetAmount - wishlist.collectedAmount, "Wishlist target amount exceeded");

        wishlist.collectedAmount += msg.value;
        wishlistOwner.transfer(msg.value);

        recordSupport(_from, _to, _amount, _supportType);(msg.sender, wishlistOwner, msg.value);
    }
}