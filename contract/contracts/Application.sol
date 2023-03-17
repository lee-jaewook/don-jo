// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./ItemDonation.sol";
import "./BasicDonation.sol";
import "./WishlistDonation.sol";

contract Application is ItemDonation, BasicDonation, WishlistDonation {

}