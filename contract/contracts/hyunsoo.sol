// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

contract Donation2 {
  event DonationReceived(address indexed sender, uint256 amount, string donationType);

  struct Member {
    uint256 time;
    address donor;
    uint256 amount;
    string nickName; 
  }

  struct DonationData {
    uint index;
    uint amount;
    string title;
    address owner;
    bool effectiveness;
    string donationType;
    mapping(uint => Member) donationInfo;
  } 

  mapping(address => DonationData) public donations;
  mapping(address => DonationData) public items;


    // 기부하기
  function makeDonation(address _to, string memory _donationType, string memory _nickName, bytes memory _signature) public payable {
    // Verify signature
    bytes32 message = keccak256(abi.encodePacked(msg.sender, msg.value, _donationType));
    require(ecrecover(message, uint8(_signature[64]), bytes32(bytes20(msg.sender)), bytes32(bytes20(_to))) == msg.sender, "InValid signature");
    
    DonationData storage donation = donations[msg.sender];
    
    donation.amount += msg.value;

    // Add the member to the donation info mapping
    uint index = donation.index++;
    donation.donationInfo[index] = Member({
      time: block.timestamp,
      donor: msg.sender,
      amount: msg.value,
      nickName: _nickName
    });

    // Log the donation
    emit DonationReceived(msg.sender, msg.value, _donationType);
  }

  // 기부정보 가져오기
  function getDonationInfo(address _to, bytes memory _signature) public view returns (uint256, uint, string memory, address, bool, string memory) {
    bytes32 message = keccak256(abi.encodePacked(_to));
    require(ecrecover(message, uint8(_signature[64]), bytes32(bytes20(msg.sender)), bytes32(bytes20(_to))) == msg.sender, "Invalid Signature");
    
    // Fetch the donation data
    DonationData storage donation = donations[_to];

    // Return the donation data
    return (
        donation.amount,
        donation.index,
        donation.title,
        donation.owner,
        donation.effectiveness,
        donation.donationType
    );
  }

  // 
}