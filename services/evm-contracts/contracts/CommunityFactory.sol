// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./Community.sol";
import "./interfaces/ITablelandTables.sol";
import "./utils/SQLHelpers.sol";

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
    event NewCommunity(address indexed community, int256 epicenterLon, int256 epicenterLat);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(address tablelandAddress) {
        tableland = ITablelandTables(tablelandAddress);

        communityTableId = tableland.create(
            address(this),
            SQLHelpers.toCreateFromSchema("id integer primary key, name text, integer epicenterLon, integer epicenterLat", "Community")
        );


    }

    function createCommunity(
        uint256 _id,
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
            _id
            msg.sender,
            _uri,
            _nameEIP721,
            _versionEIP721,
            _minDelay,
            _quorumPercentage,
            _votingPeriod,
            _votingDelay
        );

        tableland.mutate(address(this),communityTableId,
        SQLHelpers.toInsert("Community",communityTableId,"name, epicenterLon, epicenterLat",string.concat(_name,Strings.toString(_epicenterLon),Strings.toString(_epicenterLat))));
        

        address communityAddress = address(newCommunity);
        allCommunities.push(communityAddress);

        emit NewCommunity(communityAddress, _epicenterLon, _epicenterLat);
    }

    /* Getter Functions */
    function getAllCommunities() public view returns (address[] memory) {
        return allCommunities;
    }
}
