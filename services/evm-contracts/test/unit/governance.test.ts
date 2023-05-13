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
        await deployments.fixture(["all"])
        governor = await ethers.getContract("GovernorContract")
        timeLock = await ethers.getContract("TimeLock")
        governanceToken = await ethers.getContract("GovernanceToken")
        box = await ethers.getContract("Box")
    })

    it("can only be changed through governance", async () => {
        await expect(box.store(55)).to.be.revertedWith("Ownable: caller is not the owner")
    })
})
