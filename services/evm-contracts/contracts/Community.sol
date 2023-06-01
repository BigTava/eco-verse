// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
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
    //----------------- Type declarations -----------------
    enum MemberStatus {
        INACTIVE, // not participating in the community currently
        PENDING, // has applied for membership but it's not approved yet
        ACTIVE, // is in good standing
        SUSPENDED // has been temporarily suspended
    }

    struct Location {
        int256 lat;
        int256 lon;
    }

    struct Member {
        Location location;
        string _memberIdentifier;
        MemberStatus status;
    }

    //----------------- State variables -------------------
    string private i_name;
    Location private i_epicenter;
    CommunityItems private i_communityItems;
    TimelockController private s_timelock;
    Governance private s_governance;
    ICrowdlendingFactory private s_crowdlendingFactory;

    mapping(address => Member) private s_members; // member -> details

    //----------------- Events ----------------------------
    event MemberEnter(address indexed member);
    event GovernanceCreation(address indexed governance, address indexed timelock);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(string memory _name, int256 _epicenterLat, int256 _epicenterLon, address _creator) {
        i_name = _name;
        i_epicenter = Location(_epicenterLat, _epicenterLon);

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
        Member memory newMember = s_members[msg.sender];

        if (newMember.status != MemberStatus.INACTIVE) {
            revert Community__MemberIsInCommunity();
        }
        s_members[msg.sender] = Member(
            Location(_locationLat, _locatinoLon),
            _meterId,
            MemberStatus.PENDING
        );
    }

    /* Setter Functions */
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
