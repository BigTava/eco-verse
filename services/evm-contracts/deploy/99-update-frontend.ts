import fs from "fs"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import path from "path"

const COMMON_PATH = path.resolve(__dirname, "../..", "frontend", "src", "utils", "constants")

const FRONTEND_END_ADDRESSES_FILE = path.resolve(COMMON_PATH, "contractAddresses.json")

const CROWDLENDING_FACTORY_FRONTEND_END_ABI_FILE = path.resolve(
    COMMON_PATH,
    "crowdlendingFactoryAbi.json"
)

const COMMUNITY_FACTORY_FRONTEND_END_ABI_FILE = path.resolve(
    COMMON_PATH,
    "communityFactoryAbi.json"
)

const updateUI: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { network, ethers } = hre
    const chainId = network.config.chainId?.toString()!

    if (process.env.UPDATE_FRONTEND) {
        // Contract Addresses file
        console.log("Writing to front end contract addresses...")
        const crowdlendingFactory = await ethers.getContract("CrowdlendingFactory")
        const communityFactory = await ethers.getContract("CommunityFactory")

        let contractAddresses
        try {
            const parsedData = JSON.parse(fs.readFileSync(FRONTEND_END_ADDRESSES_FILE, "utf8"))
            contractAddresses =
                typeof parsedData === "object" && !Array.isArray(parsedData) ? parsedData : {}
        } catch (error) {
            contractAddresses = {}
        }

        if (contractAddresses && chainId in contractAddresses) {
            if (!contractAddresses[chainId].values().includes(crowdlendingFactory.address)) {
                contractAddresses[chainId]["crowdlendingFactory"] = crowdlendingFactory.address
            }

            if (!contractAddresses[chainId].values().includes(communityFactory.address)) {
                contractAddresses[chainId]["communityFactory"] = communityFactory.address
            }
        } else {
            contractAddresses[chainId] = {
                crowdlendingFactory: crowdlendingFactory.address,
                communityFactory: communityFactory.address,
            }
        }

        // ABI files
        console.log("Writing to front end contracts ABIs...")
        fs.writeFileSync(FRONTEND_END_ADDRESSES_FILE, JSON.stringify(contractAddresses))

        const crowdlendingFactoryFormattedData = crowdlendingFactory.interface.format(
            ethers.utils.FormatTypes.json
        )
        const communityFactoryFormattedData = communityFactory.interface.format(
            ethers.utils.FormatTypes.json
        )
        !Array.isArray(crowdlendingFactoryFormattedData) &&
            fs.writeFileSync(
                CROWDLENDING_FACTORY_FRONTEND_END_ABI_FILE,
                crowdlendingFactoryFormattedData
            )
        !Array.isArray(communityFactoryFormattedData) &&
            fs.writeFileSync(COMMUNITY_FACTORY_FRONTEND_END_ABI_FILE, communityFactoryFormattedData)

        console.log("Front end written!")
    }
}

export default updateUI
updateUI.tags = ["all", "deploy", "frontend"]
