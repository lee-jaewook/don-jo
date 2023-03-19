// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./SupportHistory.sol";

contract BasicDonation is SupportHistory {
    function transfer(address payable to) external payable{
        require(msg.value <= address(this).balance, "Insufficient balance");
        // 요청이 왔음을 기록.
        uint256 _id = recordSupport(msg.sender, to, msg.value, SupportType.Donation);

        (bool success, ) = to.call{value: msg.value}("");
        if (!success) {
            updateSupportStatus(msg.sender, to, _id, SupportStatus.Failed);
            revert("Transfer to wishlistOwner failed");
        }
        updateSupportStatus(msg.sender, to, _id, SupportStatus.Success);
        addMemberEarning(to);
    }
}