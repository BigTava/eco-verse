// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./Community.sol";

/** @title Energy Community Factory Contract
 *  @author EcoVerse
 *  @notice This factory contract allows creating and tracking the Community contract
 */
contract CommunityFactory {
    //----------------- Type declarations -----------------

    //----------------- State variables -------------------
    address[] private allCommunities;

    //----------------- Events ----------------------------
    event NewCommunity(address indexed community, int256 epicenterLon, int256 epicenterLat);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor() {}

    function createCommunity(
        string memory _name,
        int256 _epicenterLon,
        int256 _epicenterLat
    ) public {
        Community newCommunity = new Community(_name, _epicenterLon, _epicenterLat, msg.sender);

        address communityAddress = address(newCommunity);
        allCommunities.push(communityAddress);

        emit NewCommunity(communityAddress, _epicenterLon, _epicenterLat);
    }

    /* Getter Functions */
    function getAllCommunities() public view returns (address[] memory) {
        return allCommunities;
    }
}
