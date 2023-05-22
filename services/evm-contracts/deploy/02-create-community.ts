import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

import { MIN_DELAY, QUORUM_PERCENTAGE, VOTING_DELAY, VOTING_PERIOD } from "../constants/governance"
import { NAME, EPICENTER_LAT, EPICENTER_LON } from "../constants/community"
import { ethers } from "hardhat"

const createCommunity: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network } = hre
    const { log } = deployments
    const { deployer } = await getNamedAccounts()

    const communityFactory = await ethers.getContract("CommunityFactory", deployer)
    const args = [
        NAME,
        EPICENTER_LAT,
        EPICENTER_LON,
        "",
        "",
        "",
        MIN_DELAY,
        QUORUM_PERCENTAGE,
        VOTING_PERIOD,
        VOTING_DELAY,
    ]
    log("----------------------------------------------------")
    log("Creating community...")
    const transactionResponse = await communityFactory.createCommunity(...args)
    const transactionReceipt = await transactionResponse.wait(1)

    const eventsLength = transactionReceipt.events!.length
    const communityAddress = transactionReceipt.events![eventsLength - 1].args!.community
    log(`Community at ${communityAddress}`)
    log("----------------------------------------------------")
}
export default createCommunity
createCommunity.tags = ["all", "createCommunity"]
createCommunity.dependencies = ["communityFactory"]
