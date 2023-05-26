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
    uint256 private immutable i_id;
    TimelockController private immutable i_timelock;
    Governance private immutable i_governance;
    ICrowdlendingFactory private s_crowdlendingFactory;
    CommunityItems private communityItems;

    mapping(address => Member) private s_members; // member -> details

    //----------------- Events ----------------------------
    event MemberEnter(address indexed member);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(
        uint256 _id,
        address _creator,
        string memory _uri,
        string memory _nameEIP721,
        string memory _versionEIP721,
        uint256 _minDelay,
        uint256 _quorumPercentage,
        uint256 _votingPeriod,
        uint256 _votingDelay
    ) {
        i_id = _id;

        // CommunityItems
        communityItems = new CommunityItems(_uri, _nameEIP721, _versionEIP721);
        communityItems.mintCreatorMembership(_creator);

        // TimeLock
        address[] memory proposers;
        address[] memory executors;
        i_timelock = new TimelockController(_minDelay, proposers, executors, address(this));
        i_governance = new Governance(
            communityItems,
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

    function getCommunityItems() public view returns (address) {
        return address(communityItems);
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
