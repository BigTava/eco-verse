// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./Crowdlending.sol";

contract CrowdlendingFactory {
    address[] public allCampaigns;

    constructor() {}

    function createCampaign(
        address _owner,
        uint32 _apy,
        address _token,
        uint _goal,
        uint256 _startAt,
        uint256 _endAt
    ) public returns (address campaignAddress) {
        Crowdlending newCampaign = new Crowdlending(_token);
        newCampaign.launch(_owner, _apy, _goal, _startAt, _endAt);
        campaignAddress = address(newCampaign);
        allCampaigns.push(campaignAddress);
    }

    function getAllCampaigns() public view returns (address[] memory) {
        return allCampaigns;
    }
}
