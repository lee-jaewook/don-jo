// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";

contract BasicDonation is SupportHistory {
    function _transfer(address payable to, uint256 value) internal returns(uint256) {
        require(value <= address(this).balance, "Insufficient balance");
        // 요청이 왔음을 기록.
        uint256 _id = recordSupport(msg.sender, to, value, SupportType.Donation);

        (bool success, ) = to.call{value: value}("");
        if (!success) {
            updateSupportStatus(msg.sender, to, _id, SupportStatus.Failed);
            revert("Transfer to wishlistOwner failed");
        }
        updateSupportStatus(msg.sender, to, _id, SupportStatus.Success);
        return _id;
    }
}