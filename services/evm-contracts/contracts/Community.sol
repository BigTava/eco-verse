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
        uint256 lat;
        uint256 lon;
    }

    struct Member {
        Location location;
        MemberStatus status;
    }

    //----------------- State variables -------------------
    string private i_name;
    Location private i_epicenter;
    CommunityItems private i_communityItems;
    TimelockController private i_timelock;
    Governance private i_governance;
    ICrowdlendingFactory private s_crowdlendingFactory;

    mapping(address => Member) private s_members; // member -> details

    //----------------- Events ----------------------------
    event MemberEnter(address indexed member);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(
        string memory _name,
        int256 _epicenterLat,
        int256 _epicenterLon,
        address _creator,
        string memory _uri,
        string memory _nameEIP721,
        string memory _versionEIP721,
        uint256 _minDelay,
        uint256 _quorumPercentage,
        uint256 _votingPeriod,
        uint256 _votingDelay
    ) {
        i_name = _name;
        i_epicenter = Location(_epicenterLat, _epicenterLon);

        // CommunityItems
        i_communityItems = new CommunityItems(_uri, _nameEIP721, _versionEIP721);
        i_communityItems.mintCreatorMembership(_creator);

        // TimeLock
        address[] memory proposers;
        address[] memory executors;
        i_timelock = new TimelockController(_minDelay, proposers, executors, address(this));
        i_governance = new Governance(
            i_communityItems,
            i_timelock,
            _quorumPercentage,
            _votingPeriod,
            _votingDelay
        );
        i_timelock.grantRole(i_timelock.EXECUTOR_ROLE(), address(0));
        i_timelock.grantRole(i_timelock.PROPOSER_ROLE(), address(i_governance));
        i_timelock.revokeRole(i_timelock.TIMELOCK_ADMIN_ROLE(), address(this));

        transferOwnership(address(i_timelock));
    }

    function enterCommunity(uint256 _locationLat, uint256 _locatinoLon) public onlyOwner {
        Member memory newMember = s_members[msg.sender];

        if (newMember.status != MemberStatus.INACTIVE) {
            revert Community__MemberIsInCommunity();
        }
        s_members[msg.sender] = Member(Location(_locationLat, _locatinoLon), MemberStatus.PENDING);
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
        return address(i_timelock);
    }

    function getGovernance() public view returns (address) {
        return address(i_governance);
    }
}
