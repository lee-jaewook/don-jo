// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;


contract Donation {
  address payable public owner;

  struct Member {
    address donor;
    uint256 amount;
    uint256 time;
  }

  struct DonationData {
    // 유효성 check
    bool effectiveness;
    // ETH
    uint amount;
    // 지갑 주소
    address owner;
    uint index;
    string donationType;
    string title;
    Member[] donationInfo;
  }
    

  mapping(address => DonationData) public donations;
  mapping(address => mapping(uint16 => DonationData)) public wishlist;
  mapping(address => mapping(uint16 => DonationData)) public items;

  event DonationReceived(address indexed donor, uint256 amount, string donationType);

  constructor() {
    owner = payable(msg.sender);
  }
    
  // 기부 지갑 만들기
  // 지갑을 만들 때는 site Manager가 gas fee 지불
  function makeWallet(address _to) public payable {
    // 할당받은 주소 체크
    require(donations[_to].owner == address(0), "Address already exists!");
    
    // 할당받은 주소가 없다면 주소를 할당해준다.
    DonationData memory myWallet = DonationData({
      title: "",
      amount: 0,
      owner: _to,
      index: 0,
      donationType: "donation",
      donationInfo: new Member[](0),
      effectiveness: true
    });

    donations[_to] = myWallet;
  }
  
  // 1. 기부하기
  // 2. 지갑에서 ETH 인출하기
  // 3. 지갑에서 ETH 정보 가져오기
  // 4. 지갑에서 wishList, items 정보 가져오기...



  // 지갑에서 ETH정보 가져오기
  // 0


  // 지갑에서 ETH 인출하기
  
  // 기부하기..
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
