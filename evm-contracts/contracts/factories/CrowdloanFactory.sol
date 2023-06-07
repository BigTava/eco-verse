// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import "../Crowdloan.sol";

/** @title Crowdloan Factory Contract
 *  @author EcoVerse Team
 *  @notice This factory contract allows creating and tracking crowdlending campaigns for energy communities
 */
contract CrowdloanFactory is Ownable {
    //----------------- Type declarations -----------------

    //----------------- State variables -------------------
    address[] private allCampaigns;

    //----------------- Events ----------------------------

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor() {}

    function createCampaign(
        address _owner,
        uint32 _apy,
        address _token,
        uint _goal,
        uint256 _startAt,
        uint256 _endAt
    ) public onlyOwner returns (address campaignAddress) {
        Crowdloan newCampaign = new Crowdloan(_token);

        newCampaign.launch(_owner, _apy, _goal, _startAt, _endAt);
        campaignAddress = address(newCampaign);
        allCampaigns.push(campaignAddress);
    }

    /* Getter Functions */
    function getAllCampaigns() public view returns (address[] memory) {
        return allCampaigns;
    }
}
