// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donation {
    address payable public owner;

    struct DonationData {
        address donor;
        uint256 amount;
        string donationType;
    }

    DonationData[] public donations;

    event DonationReceived(address indexed donor, uint256 amount, string donationType);

    constructor() {
        owner = payable(msg.sender);
    }

    function donate(address donor, string memory donationType) public payable {
        require(msg.value > 0, "You must send a positive amount.");
        DonationData memory donation = DonationData(donor, msg.value, donationType);
        donations.push(donation);
        emit DonationReceived(donor, msg.value, donationType);
    }

    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Only the contract owner can withdraw funds.");
        require(amount <= address(this).balance, "Insufficient funds in the contract.");
        owner.transfer(amount);
    }

    function getDonationAmount(string memory donationType) public view returns(uint256) {
        uint256 totalDonationAmount = 0;
        for (uint256 i = 0; i < donations.length; i++) {
            if (keccak256(abi.encodePacked(donations[i].donationType)) == keccak256(abi.encodePacked(donationType))) {
                totalDonationAmount += donations[i].amount;
            }
        }
        return totalDonationAmount;
    }
}

pragma solidity ^0.8.0;

contract Donation {
    address payable public owner;
    mapping(address => mapping(string => uint256)) public donations;

    event DonationReceived(address indexed donor, uint256 amount, string donationType);

    constructor() {
        owner = payable(msg.sender);
    }

    function donate(string memory donationType) public payable {
        require(msg.value > 0, "You must send a positive amount.");
        donations[msg.sender][donationType] += msg.value;
        emit DonationReceived(msg.sender, msg.value, donationType);
    }

    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Only the contract owner can withdraw funds.");
        require(amount <= address(this).balance, "Insufficient funds in the contract.");
        owner.transfer(amount);
    }

    function getDonationAmount(address donor, string memory donationType) public view returns(uint256) {
        return donations[donor][donationType];
    }
}
