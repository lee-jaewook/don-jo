// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";

contract BasicDonation is SupportHistory {
    function _transfer(address payable _to, uint256 _value, SupportType _type, address payable _owner) internal returns(uint64) {
        require(_value <= address(this).balance, "Insufficient balance");

        // 요청이 왔음을 기록.
        uint64 _id = recordSupport(msg.sender, _to, _value, _type);

        uint256 ownerShare = (_value * 5) / 1000;
        uint256 sellerShare = _value - ownerShare;

        // 송금
        _owner.transfer(ownerShare);
        _to.transfer(sellerShare);
        return _id;
    }
}