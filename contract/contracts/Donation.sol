// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

contract Donation {

  // 기부금 보내기
  function transfer(address payable _to) external payable {
    _to.transfer(msg.value);
  }


}