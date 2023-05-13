// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error CommunityItems__MemberAlreadyHasThisMembership();

contract CommunityFactory {

    address[] private allCommunities;

    constructor() {}

    function createCommunity(
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

    function getAllCommunities() public view returns (address[] memory) {
        return allCampaigns;
    }
}

}
