// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

contract SupportHistory {
    enum SupportType { Donation, Item, Wishlist }
    enum SupportStatus { Pending, Failed, Success, Deleted}

    // event SupportReceived(address indexed from, address to, uint256 amount, string donationType);

    struct SupportSol{
        uint256 id;
        address from;
        address to;
        uint256 amount;
        uint256 sendTimestamp;
        SupportType supportType;
        SupportStatus supportStatus;
    }



    mapping(address => mapping(uint256 => SupportSol)) public supportList;
    mapping(address => uint256) public supportCount;

    // 서포트를 기록합니다.
    function recordSupport(address _from, address _to, uint256 _amount, SupportType _supportType) internal returns (uint256) {
        uint256 _id = supportCount[_to]++;
        supportList[_to][_id] = SupportSol({
            id: _id,
            from: _from,
            to: _to,
            amount: _amount,
            sendTimestamp: block.timestamp,
            supportType: _supportType,
            supportStatus: SupportStatus.Pending
        });
        return _id;
    }

    function updateSupportStatus(address _from, address _to,uint256 _id, SupportStatus _status) internal {
        require(supportList[_to][_id].from == _from, "It's Not your support history");
        supportList[_to][_id].supportStatus = _status;
    }

    function getSupportListCount(address _address) internal view returns (uint256){
        return supportCount[_address];
    }

    function _getSupportList(address _address) internal view returns (SupportSol[] memory){
        uint256 count = supportCount[_address];
        SupportSol[] memory mySupport = new SupportSol[](count);

        for (uint256 i = 0; i < count; i++) {
            mySupport[i] = supportList[_address][i];
        }

        return mySupport;
    }

    function _getSupportDetail(address _address, uint256 _id) internal view returns(SupportSol memory){
        uint256 count = supportCount[_address];
        require(_id <= count, "Invalid index");
        return supportList[_address][_id];
    }

}