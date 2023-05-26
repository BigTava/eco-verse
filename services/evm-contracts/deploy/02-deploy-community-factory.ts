import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

import {
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    tablelandDirectory,
    networkConfig,
} from "../helper-hardhat-config"
import verify from "../utils/verify"
import { getChainId } from "hardhat"

const deployCommunityFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    // change from sepolia to mainnet before deploying to mainnet!
    const args: any[] = [tablelandDirectory.sepolia.tableland]
    const communityFactory = await deploy("CommunityFactory", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(communityFactory.address, args)
    }

    log("----------------------------------------------------")
}
export default deployCommunityFactory
deployCommunityFactory.tags = ["all", "communityFactory"]
