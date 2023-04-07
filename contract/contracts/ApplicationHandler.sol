// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./ItemDonation.sol";
import "./WishlistDonation.sol";

contract ApplicationHandler is ItemDonation, WishlistDonation {
  address payable public owner;

  event SupportIdEvent(uint64 indexed id);
  constructor(){
    owner = payable(msg.sender);
  }

  // ================= Frontend Call =================
  // 기본 도네이션 실행
  function callBasicDonation(address payable _to) external payable returns(uint64) {
    uint64 id = _transfer(_to, msg.value, SupportType.Donation, owner);
    emit SupportIdEvent(id);
    return id;
  }
  // 아이템 구매
  function buyItemDonation(address payable _to, uint64 _itemId) external payable returns(uint64) {
    uint64 id = _buyItem(_to, _itemId, msg.value, owner);
    emit SupportIdEvent(id);
    return id;
  }
  // 위시 리스트 구매
  function buyWishlistDonation(address payable _to, uint64 _wishlistId) external payable returns(uint64) {
    uint64 id = _buyWishlist(_to, _wishlistId, msg.value, owner);
    emit SupportIdEvent(id);
    return id;
  }

  // ================= Backend Call =================
  // 멤버의 아이템 리스트 가져오기  
  function getMemberItemList(address _address) external view returns(ItemSol[] memory){
    return _getItemList(myItems[_address]);
  }

  // 특정 아이템 상세 조회하기
  function getItemDetail(uint64 _id) external view returns(ItemSol memory){
    return _getItemDetail(_id);
  }

  // 멤버의 아이템 추가하기
  function addMemberItem(ItemSol memory _item) external{
    _createItem(_item);
  }

  // 멤버의 아이템 삭제하기
  function deleteMemberItem(address _address, uint64 _id) external {
    _deleteItem(_address, _id);
  }

  // 멤버의 아이템 수정하기
  function updateMemberItem(ItemSol memory _item) external {
    _updateItem(_item);
  }

  // 멤버의 위시리스트 목록 가져오기
  function getMemberWishLists(address _address) external view returns(WishlistSol[] memory){
    return _getWishlists(myWishlists[_address]);
  }

  // 멤버의 위시리스트 상제 조회하기
  function getMemberWishListDetail(uint64 _id) external view returns(WishlistSol memory){
    return _getWishlistDetail(_id);
  }

  // 멤버의 위시리스트 추가하기
  function addMemberWishList(WishlistSol memory _wishlist) external{
    _createWishlist(_wishlist);
  }

  // 멤버의 위시리스트 삭제하기
  function deleteMemberWishlist(address _address, uint64 _id) external {
    _deleteWishlist(_address, _id);
  }

  // 멤버의 위시리스트 수정하기
  function updateMemberWishlist(WishlistSol memory _wishlist) external {
    _updateWishlist(_wishlist);
  }

  // 후원 상세 정보 조회
  function getSupportDetail(address _address, uint64 _id) external view returns(SupportSol memory){
    return _getSupportDetail(_address, _id);
  }

  // 후원 받은 내역 조회
  function getSupportList(address _address) external view returns(SupportSol[] memory){
    return _getSupportList(_address);
  }

  // 후원 요청 시간 조회
  function getSupportArriveTime(address _address, uint64 _id) external view returns(uint256){
    return _getSupportDetail(_address, _id).arriveTime;
  }
}