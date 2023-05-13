// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/** @title Energy Community Contract
 *  @author EcoVerse
 *  @notice This contract is for creating a decentalized energy community
 *
 */
contract Community {
    //----------------- Type declarations -----------------
    struct Location {
        uint256 x;
        uint256 y;
    }

    struct Member {
        Location location;
        address pkey;
    }

    //----------------- State variables -------------------
    Location immutable i_epicenter;
    Member[] private s_members;

    //----------------- Events ----------------------------
    event RaffleEnter(address indexed member);

    //----------------- Modifiers -------------------------

    //----------------- Functions -------------------------
    constructor(uint256 _epicenterX, uint256 _epicenterY) {
        i_epicenter = Location(_epicenterX, _epicenterY);
    }

    function joinCommunity(string memory _name, string memory _location) public {
        require(!members[msg.sender].isActive, "Already a member of the community");

        members[msg.sender] = Member(_name, _location, true);
        memberAddresses.push(msg.sender);
    }

    function getMembers() public view returns (address[] memory) {
        return memberAddresses;
    }

    function getMember(
        address _memberAddress
    ) public view returns (string memory, string memory, bool) {
        Member memory member = members[_memberAddress];
        return (member.name, member.location, member.isActive);
    }

    function leaveCommunity() public {
        require(members[msg.sender].isActive, "Not a member of the community");

        members[msg.sender].isActive = false;
    }
}
