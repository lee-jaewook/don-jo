// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./Donation.sol";

contract Member {
  uint public priceInWei;
  utin public paidWei;
  utin public index;

  Donation parentContarct;

  constructor(Donation _parentContract, uint _priceInwei, uint _index) {
    priceInWei = _parentContract;
    index = _index;
    parentContarct = _parentContract;
  }

  receive()

}