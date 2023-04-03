// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

contract SupportHistory {
    enum SupportType { Donation, Item, Wishlist }

    struct SupportSol{
        uint64 id;
        address from;
        address to;
        uint256 amount;
        uint256 arriveTime;
        SupportType supportType;
    }

    mapping(address => mapping(uint64 => SupportSol)) public supportList;
    mapping(address => uint64) public supportCount;

    // 서포트를 기록합니다.
    function recordSupport(address _from, address _to, uint256 _amount, SupportType _supportType) internal returns (uint64) {
        uint64 _id = ++supportCount[_to];
        supportList[_to][_id] = SupportSol({
        id: _id,
        from: _from,
        to: _to,
        amount: _amount,
        arriveTime: block.timestamp,
        supportType: _supportType
        });
        return _id;
    }

    function getSupportListCount(address _address) internal view returns (uint64){
        return supportCount[_address];
    }

    function _getSupportList(address _address) internal view returns (SupportSol[] memory){
        uint64 count = supportCount[_address];
        SupportSol[] memory mySupport = new SupportSol[](count);

        for (uint64 i = 0; i < count; i++) {
            mySupport[i] = supportList[_address][i+1];
        }

        return mySupport;
    }

    function _getSupportDetail(address _address, uint64 _id) internal view returns(SupportSol memory){
        uint64 count = supportCount[_address];
        require(_id != 0, "Invalid index");
        require(_id <= count, "Invalid index");
        return supportList[_address][_id];
    }

}