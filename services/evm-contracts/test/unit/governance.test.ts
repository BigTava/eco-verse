import { Governance, GovernanceToken, TimeLock, Box } from "../../typechain/contracts"
import { deployments, ethers } from "hardhat"
import { assert, expect } from "chai"
import {
    FUNC,
    PROPOSAL_DESCRIPTION,
    NEW_STORE_VALUE,
    VOTING_DELAY,
    VOTING_PERIOD,
    MIN_DELAY,
} from "../../constants/governance"
import { moveBlocks } from "../../utils/move-blocks"
import { moveTime } from "../../utils/move-time"

describe("Governance Flow", async () => {
    let governace: Governance
    let timeLock: TimeLock

    const voteWay = 1 // for
    const reason = "I lika do da cha cha"
    beforeEach(async () => {
    })

    it("can only be changed through governance", async () => {
    })
})
