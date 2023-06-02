// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library MemberLib {
    enum MemberStatus {
        INACTIVE,
        PENDING,
        ACTIVE,
        SUSPENDED
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

    function isActive(Member memory self) public pure returns (bool) {
        return self.status == MemberStatus.ACTIVE;
    }
}
