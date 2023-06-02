// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import "./CommunityItemsFactory.sol";

import "../Community.sol";

/** @title Energy Community Factory Contract
 *  @author EcoVerse Team
 *  @notice This factory contract allows creating and tracking the Community contract
 */
contract CommunityFactory {
    //----------------- Type declarations -----------------

    //----------------- State variables -------------------
    CommunityItemsFactory private s_communityItemsFactory;

    address[] private s_allCommunities;

    //----------------- Events ----------------------------
    event NewCommunity(
        address indexed community,
        address communityItems,
        int256 epicenterLon,
        int256 epicenterLat
    );

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(address _communityItemsFactory) {
        s_communityItemsFactory = CommunityItemsFactory(_communityItemsFactory);
    }

    function createCommunity(
        string memory _name,
        int256 _epicenterLon,
        int256 _epicenterLat
    ) public {
        Community newCommunity = new Community(_name, _epicenterLon, _epicenterLat, msg.sender);
        address communityAddress = address(newCommunity);

        address communityItemsAddress = s_communityItemsFactory.createCommunityItems();

        s_allCommunities.push(communityAddress);
        emit NewCommunity(communityAddress, communityItemsAddress, _epicenterLon, _epicenterLat);
    }

    /* Getter Functions */
    function getAllCommunities() public view returns (address[] memory) {
        return s_allCommunities;
    }
}
