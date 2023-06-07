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
    mapping(address => address) private s_campaigns; // owner address -> community address

    //----------------- Temp variables (for indexer) ------
    address[] private s_campaigns_array; // array of members

    //----------------- Events ----------------------------
    event NewCampaign(address indexed campaign);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor() {}

    function createCampaign(
        uint32 _apy,
        address _token,
        uint _goal,
        uint256 _startAt,
        uint256 _endAt
    ) public returns (address campaignAddress) {
        Crowdloan newCampaign = new Crowdloan(_token);

        newCampaign.launch(msg.sender, _apy, _goal, _startAt, _endAt);
        campaignAddress = address(newCampaign);
        s_campaigns_array.push(campaignAddress);

        s_campaigns[msg.sender] = campaignAddress;
        emit NewCampaign(campaignAddress);
    }

    /* Getter Functions */
    function getAllCampaigns() public view returns (address[] memory) {
        return s_campaigns_array;
    }
}
