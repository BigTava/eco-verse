// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ICrowdlendingFactory {
    function createCampaign(
        address _owner,
        uint32 _apy,
        address _token,
        uint _goal,
        uint256 _startAt,
        uint256 _endAt
    ) external returns (address campaignAddress);

    function getAllCampaigns() external view returns (address[] memory);
}
