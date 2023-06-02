// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import "./CommunityItemsFactory.sol";
import "./GovernanceFactory.sol";

import "../Community.sol";

/** @title Energy Community Factory Contract
 *  @author EcoVerse Team
 *  @notice This factory contract allows creating and tracking the Community contract
 */
contract CommunityFactory {
    //----------------- Type declarations -----------------

    //----------------- State variables -------------------
    CommunityItemsFactory private s_communityItemsFactory;
    GovernanceFactory private s_governanceFactory;

    address[] private s_allCommunities;

    //----------------- Events ----------------------------
    event NewCommunity(
        address indexed community,
        address communityItems,
        address governance,
        address timelock,
        int256 epicenterLon,
        int256 epicenterLat
    );

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(address _communityItemsFactory, address _governanceFactory) {
        s_communityItemsFactory = CommunityItemsFactory(_communityItemsFactory);
        s_governanceFactory = GovernanceFactory(_governanceFactory);
    }

    function createCommunity(
        string memory _name,
        int256 _epicenterLon,
        int256 _epicenterLat,
        uint256 _minDelay,
        uint256 _quorumPercentage,
        uint256 _votingPeriod,
        uint256 _votingDelay
    ) public {
        Community newCommunity = new Community(_name, _epicenterLon, _epicenterLat, msg.sender);
        address communityAddress = address(newCommunity);

        address communityItemsAddress = s_communityItemsFactory.createCommunityItems();

        (address governanceAddress, address timelockAddress) = s_governanceFactory.createGovernance(
            communityAddress,
            communityItemsAddress,
            _minDelay,
            _quorumPercentage,
            _votingPeriod,
            _votingDelay
        );

        s_allCommunities.push(communityAddress);

        emit NewCommunity(
            communityAddress,
            communityItemsAddress,
            governanceAddress,
            timelockAddress,
            _epicenterLon,
            _epicenterLat
        );
    }

    /* Getter Functions */
    function getAllCommunities() public view returns (address[] memory) {
        return s_allCommunities;
    }
}
