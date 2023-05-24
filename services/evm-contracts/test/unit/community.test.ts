import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {
    CommunityFactory,
    Community,
    CrowdlendingFactory,
    TimeLock,
} from "../../typechain/contracts"
import { deployments, ethers, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { assert, expect } from "chai"
import {
    MIN_DELAY,
    QUORUM_PERCENTAGE,
    VOTING_DELAY,
    VOTING_PERIOD,
} from "../../constants/governance"
import { NAME, EPICENTER_LAT, EPICENTER_LON } from "../../constants/community"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Community Factory", async () => {
          let crowdlendingFactory: CrowdlendingFactory
          let communityFactory: CommunityFactory
          let community: Community
          let deployer: SignerWithAddress
          let creator: SignerWithAddress
          let accounts: SignerWithAddress[]

          before(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              creator = accounts[1]
              await deployments.fixture(["crowdlendingFactory", "communityFactory"])

              communityFactory = await ethers.getContract("CommunityFactory", deployer.address)
          })

          describe("constructor", function () {
              it("initializes the communityFactory correctly", async () => {
                  const allCommunities = await communityFactory.getAllCommunities()
                  assert.equal(allCommunities.length, 0)
              })
          })

          describe("createCommunity", function () {
              it("emits event on community creation", async () => {
                  const transactionResponse = await communityFactory
                      .connect(creator)
                      .createCommunity(
                          NAME,
                          EPICENTER_LAT,
                          EPICENTER_LON,
                          "",
                          "",
                          "",
                          MIN_DELAY,
                          QUORUM_PERCENTAGE,
                          VOTING_PERIOD,
                          VOTING_DELAY
                      )

                  expect(transactionResponse).to.emit(communityFactory, "NewCommunity")

                  const transactionReceipt = await transactionResponse.wait()

                  const eventsLength = transactionReceipt.events!.length
                  const communityAddress =
                      transactionReceipt.events![eventsLength - 1].args!.community

                  const Community = await ethers.getContractFactory("Community")
                  community = Community.attach(communityAddress) as Community
              })

              it("initializes the community correctly", async () => {
                  const epicenter = await community.getEpicenter()
                  const name = await community.getName()
                  assert.equal(epicenter[0].toString(), EPICENTER_LAT.toString())
                  assert.equal(epicenter[1].toString(), EPICENTER_LON.toString())
                  assert.equal(name, NAME)
              })

              it("community has a crowdlending factory", async () => {
                  const crowdlendingFactoryAddress = await community.getCrowdlendingFactory()
                  assert(ethers.utils.isAddress(crowdlendingFactoryAddress))
              })

              it("community has an items contract", async () => {
                  const communityItemsAddress = await community.getCommunityItems()
                  assert(ethers.utils.isAddress(communityItemsAddress))
              })

              it("community has a governance contract", async () => {
                  const governanceAddress = await community.getGovernance()
                  assert(ethers.utils.isAddress(governanceAddress))
              })

              it("community has a timelock contract", async () => {
                  const timelockAddress = await community.getTimelock()
                  assert(ethers.utils.isAddress(timelockAddress))
              })
          })
      })
