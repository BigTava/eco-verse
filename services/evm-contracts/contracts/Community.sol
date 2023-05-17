// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./Governance.sol";
import "./CrowdlendingFactory.sol";
import "./CommunityItems.sol";

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
        MemberStatus status;
    }

    //----------------- State variables -------------------
    string private i_name;
    Location private i_epicenter;
    CommunityItems private i_communityItems;
    CrowdlendingFactory private i_crowdlendingFactory;
    Governance private i_governance;

    mapping(address => Member) private s_members; // member -> details

    //----------------- Events ----------------------------
    event MemberEnter(address indexed member);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(
        string memory _name,
        int256 _epicenterX,
        int256 _epicenterY,
        TimelockController _timelock,
        uint256 _quorumPercentage,
        uint256 _votingPeriod,
        uint256 _votingDelay
    ) {
        i_name = _name;
        i_epicenter = Location(_epicenterX, _epicenterY);

        i_communityItems = new CommunityItems();
        i_crowdlendingFactory = new CrowdlendingFactory();
        i_governance = new Governance(
            i_communityItems,
            _timelock,
            _quorumPercentage,
            _votingPeriod,
            _votingDelay
        );

        transferOwnership(address(i_governance));
    }

    function enterCommunity(int256 _locationX, int256 _locatinoY) public {
        Member memory newMember = s_members[msg.sender];

        if (newMember.status != MemberStatus.INACTIVE) {
            revert Community__MemberIsInCommunity();
        }
        s_members[msg.sender] = Member(Location(_locationX, _locatinoY), MemberStatus.PENDING);
    }

    /* Getter Functions */
    function getEpicenter() public view returns (int256, int256) {
        return (i_epicenter.lat, i_epicenter.lon);
    }

    function getName() public view returns (string memory) {
        return i_name;
    }
}
