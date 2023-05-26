export interface networkConfigItem {
    name?: string
    subscriptionId?: string
    keepersUpdateInterval?: string
    raffleEntranceFee?: string
    callbackGasLimit?: string
    vrfCoordinatorV2?: string
    gasLane?: string
    ethUsdPriceFeed?: string
    mintFee?: string
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        subscriptionId: "0000",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
    },
    11155111: {
        name: "sepolia",
        subscriptionId: "1223",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
    },
    1: {
        name: "mainnet",
        keepersUpdateInterval: "30",
    },
}

export interface tablelandConfigItem {
    tableland: string
}
export interface tablelandConfigInfo {
    [key: string]: tablelandConfigItem
}

export const tablelandDirectory = {
    sepolia: { tableland: "0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D" },
    mainnet: { tableland: "0x012969f7e3439a9B04025b5a049EB9BAD82A8C12" },
}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6
