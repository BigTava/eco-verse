// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import "./libs/MemberLib.sol";

import "./Governance.sol";
import "./CommunityItems.sol";
import "./interfaces/ICrowdlendingFactory.sol";

/* Errors */
error Community__MemberIsInCommunity();

/** @title Energy Community Contract
 *  @author EcoVerse
 *  @notice This contract is for creating a decentalized energy community
 */
contract Community is Ownable {
    using MemberLib for MemberLib.Member;

    //----------------- Type declarations -----------------

    //----------------- State variables -------------------
    string private i_name;
    MemberLib.Location private i_epicenter;
    CommunityItems private i_communityItems;
    TimelockController private s_timelock;
    Governance private s_governance;
    ICrowdlendingFactory private s_crowdlendingFactory;

    mapping(address => MemberLib.Member) private s_members; // member -> details

    //----------------- Events ----------------------------
    event MemberEnter(address indexed member);
    event GovernanceCreation(address indexed governance, address indexed timelock);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(string memory _name, int256 _epicenterLat, int256 _epicenterLon, address _creator) {
        i_name = _name;
        i_epicenter = MemberLib.Location(_epicenterLat, _epicenterLon);

        // CommunityItems
        i_communityItems = new CommunityItems("", "", "");
        i_communityItems.mintCreatorMembership(_creator);

        transferOwnership(_creator);
    }

    function enterCommunity(
        int256 _locationLat,
        int256 _locatinoLon,
        string memory _meterId
    ) public onlyOwner {
        MemberLib.Member memory newMember = s_members[msg.sender];

        if (newMember.status != MemberLib.MemberStatus.INACTIVE) {
            revert Community__MemberIsInCommunity();
        }
        s_members[msg.sender] = MemberLib.Member(
            MemberLib.Location(_locationLat, _locatinoLon),
            _meterId,
            MemberLib.MemberStatus.PENDING
        );
    }

    /* Setter Functions */
    function setCrowdlendingFactory(address _crowdlendingFactory) public onlyOwner {
        s_crowdlendingFactory = ICrowdlendingFactory(_crowdlendingFactory);
    }

    function setGovernance(address _governance) public onlyOwner {
        s_crowdlendingFactory = ICrowdlendingFactory(_crowdlendingFactory);
    }

    function setCrowdlendingFactory(address _crowdlendingFactory) public onlyOwner {
        s_crowdlendingFactory = ICrowdlendingFactory(_crowdlendingFactory);
    }

    /* Getter Functions */
    function getEpicenter() public view returns (int256, int256) {
        return (i_epicenter.lat, i_epicenter.lon);
    }

    function getName() public view returns (string memory) {
        return i_name;
    }

    function getCommunityItems() public view returns (address) {
        return address(i_communityItems);
    }

    function getCrowdlendingFactory() public view returns (address) {
        return address(s_crowdlendingFactory);
    }

    function getTimelock() public view returns (address) {
        return address(s_timelock);
    }

    function getGovernance() public view returns (address) {
        return address(s_governance);
    }
}
