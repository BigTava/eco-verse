import {
    Governance,
    CommunityItems,
    TimeLock,
    Community,
    CommunityFactory,
} from "../../typechain/contracts"
import {
    Community__factory,
    TimeLock__factory,
    CommunityItems__factory,
    Governance__factory,
} from "../../typechain/factories/contracts"
import { VOTING_DELAY, VOTING_PERIOD, MIN_DELAY } from "../../constants/governance"
import { deployments, ethers } from "hardhat"
import { assert, expect } from "chai"
import { moveBlocks } from "../../utils/move-blocks"
import { moveTime } from "../../utils/move-time"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

describe.only("Governance Flow", async () => {
    let communityFactory: CommunityFactory
    let community: Community
    let timeLock: TimeLock
    let communityItems: CommunityItems
    let governance: Governance
    let accounts: SignerWithAddress[]

    beforeEach(async () => {
        accounts = await ethers.getSigners()

        await deployments.fixture(["createCommunity"])
        communityFactory = await ethers.getContract("CommunityFactory")

        const communityAddress = (await communityFactory.getAllCommunities())[0]
        community = Community__factory.connect(communityAddress, ethers.provider)

        const timeLockAddress = await community.getTimelock()
        timeLock = TimeLock__factory.connect(timeLockAddress, ethers.provider)

        const communityItemsAddress = await community.getCommunityItems()
        communityItems = CommunityItems__factory.connect(communityItemsAddress, ethers.provider)

        const governanceAddress = await community.getGovernance()
        governance = Governance__factory.connect(governanceAddress, ethers.provider)
    })

    describe("enterCommunity", function () {
        it("does not allow non-owner to add a member to the community", async () => {
            const nonOwner = accounts[1]
            const locationX = 0
            const locationY = 0

            await expect(
                community.connect(nonOwner).enterCommunity(locationX, locationY)
            ).to.be.revertedWith("Ownable: caller is not the owner")
        })

        it("proposes a member to enter the community, votes, waits, queues, and then executes", async () => {
            const func = "enterCommunity"
            const locationLat = 0
            const locationLon = 0
            const proposalDescription = "a new member"
            const voteWay = 1
            const reason = "I lika do da cha cha"
            const proposer = accounts[0]

            // propose
            const encodedFunctionCall = community.interface.encodeFunctionData(func, [
                locationLat,
                locationLon,
            ])
            const proposeTx = await governance
                .connect(proposer)
                .propose([community.address], [0], [encodedFunctionCall], proposalDescription, {
                    gasLimit: 200000,
                })

            const proposeReceipt = await proposeTx.wait(1)
            const proposalId = proposeReceipt.events![0].args!.proposalId
            let proposalState = await governance.state(proposalId)
            console.log(`Current Proposal State: ${proposalState}`)

            await moveBlocks(VOTING_DELAY + 1)

            // vote
            const voteTx = await governance
                .connect(proposer)
                .castVoteWithReason(proposalId, voteWay, reason)
            await voteTx.wait(1)
            proposalState = await governance.state(proposalId)
            console.log(`\n\Current Proposal State: ${proposalState}`)
            assert.equal(proposalState.toString(), "1")

            await moveBlocks(VOTING_PERIOD + 1)

            // queue
            proposalState = await governance.state(proposalId)
            console.log(`\n\Current Proposal State: ${proposalState}`)
            const descriptionHash = ethers.utils.id(proposalDescription)
            const queueTx = await governance
                .connect(proposer)
                .queue([community.address], [0], [encodedFunctionCall], descriptionHash, {
                    gasLimit: 200000,
                })
            await queueTx.wait(1)
            await moveTime(MIN_DELAY + 1)
            await moveBlocks(1)

            proposalState = await governance.state(proposalId)
            console.log(`Current Proposal State: ${proposalState}`)

            // execute
            console.log("Executing...")
            console.log
            const exTx = await governance
                .connect(proposer)
                .execute([community.address], [0], [encodedFunctionCall], descriptionHash)
            await exTx.wait(1)
        })
    })

    describe("createCampaign", function () {})
})
