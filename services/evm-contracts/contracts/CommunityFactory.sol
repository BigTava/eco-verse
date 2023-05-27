// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./Community.sol";
import "./interfaces/ITablelandTables.sol";

/** @title Energy Community Factory Contract
 *  @author EcoVerse
 *  @notice This factory contract allows creating and tracking the Community contract
 */
contract CommunityFactory is ERC721Holder {
    //----------------- Type declarations -----------------

    //----------------- State variables -------------------
    address[] private allCommunities;
    ITablelandTables tableland;
    uint256 private communityTableId;

    //----------------- Events ----------------------------
    event NewCommunity(address indexed community, uint256 epicenterLon, uint256 epicenterLat);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(address tablelandAddress) {
        tableland = ITablelandTables(tablelandAddress);

        communityTableId = tableland.create(
            address(this),
            string.concat(
                "CREATE TABLE ",
                "Community",
                "_",
                Strings.toString(block.chainid),
                " (id integer primary key, name text, integer epicenterLon, integer epicenterLat);"
            )
        );
    }

    function createCommunity(
        uint256 _id,
        string calldata _name,
        uint256 _epicenterLon,
        uint256 _epicenterLat,
        string calldata _uri,
        uint256 _minDelay,
        uint256 _quorumPercentage,
        uint256 _votingPeriod,
        uint256 _votingDelay
    ) public {
        Community newCommunity = new Community(
            _id,
            _name,
            msg.sender,
            _uri,
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
