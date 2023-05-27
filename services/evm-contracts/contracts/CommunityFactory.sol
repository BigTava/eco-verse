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
    event NewCommunity(address indexed community, uint256 epicenterLon, uint256 epicenterLat);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor() {}

    function createCommunity(
        string memory _name,
        int256 _epicenterLon,
        int256 _epicenterLat,
        string memory _uri,
        string memory _nameEIP721,
        string memory _versionEIP721,
        uint256 _minDelay,
        uint256 _quorumPercentage,
        uint256 _votingPeriod,
        uint256 _votingDelay
    ) public {
        Community newCommunity = new Community(
            _name,
            _epicenterLon,
            _epicenterLat,
            msg.sender,
            _uri,
            _nameEIP721,
            _versionEIP721,
            _minDelay,
            _quorumPercentage,
            _votingPeriod,
            _votingDelay
        );

        address communityAddress = address(newCommunity);
        allCommunities.push(communityAddress);

        addCommunityToDb(_name, _epicenterLon, _epicenterLat);

        emit NewCommunity(communityAddress, _epicenterLon, _epicenterLat);
    }

    function addCommunityToDb(string calldata _name, uint256 _lon, uint256 _lat) internal {
        tableland.mutate(
            address(this),
            communityTableId,
            string.concat(
                "INSERT INTO ",
                "Community",
                "(",
                "name, epicenterLon, epicenterLat",
                ")VALUES(",
                string.concat(_name, Strings.toString(_lon), Strings.toString(_lat)),
                ")"
            )
        );
    }

    /* Getter Functions */
    function getAllCommunities() public view returns (address[] memory) {
        return allCommunities;
    }
}
