// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

contract SupportHistory {
    enum SupportType { Donation, Item, Wishlist }
    enum SupportStatus { Pending, Failed, Success, Deleted}

    event SupportReceived(address indexed from, address to, uint256 amount, string donationType);

    struct Support{
        address from;
        address to;
        uint256 amount;
        uint256 sendTimestamp;
        SupportType supportType;
        SupportStatus supportStatus;
    }



    mapping(address => mapping(uint256 => Support)) public supportList;
    mapping(address => uint256) public memberEarningList;
    mapping(address => uint256) public supportCount;

    // 서포트를 기록합니다.
    function recordSupport(address _from, address _to, uint256 _amount, SupportType _supportType) internal returns (uint256) {
        uint256 id = supportCount[_to]++;
        supportList[_to][id] = Support({
            from: _from,
            to: _to,
            amount: _amount,
            sendTimestamp: block.timestamp,
            supportType: _supportType,
            supportStatus: SupportStatus.Pending
        });
        return id;
    }

    function updateSupportStatus(address _from, address _to,uint256 _id, SupportStatus _status) internal {
        require(supportList[_to][_id].from == _from, "It's Not your support history");
        supportList[_to][_id].supportStatus = _status;
    }

    function getSupportListCount(address _address) public view returns (uint256){
        return supportCount[_address];
    }

    function getSupportList(address _address) public view returns (Support[] memory){
        uint256 count = supportCount[_address];
        Support[] memory mySupport = new Support[](count);

        for (uint256 i = 0; i < count; i++) {
            mySupport[i] = supportList[_address][i];
        }

        return mySupport;
    }

    function addMemberEarning(address _to) internal{
        memberEarningList[_to] += msg.value;
    }
}