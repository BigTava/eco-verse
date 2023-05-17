import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { CommunityFactory, Community } from "../../typechain/contracts"
import { deployments, ethers, network } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import { assert, expect } from "chai"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Community Factory", async () => {
          let communityFactory: CommunityFactory
          let community: Community
          let deployer: SignerWithAddress
          let creator: SignerWithAddress
          let accounts: SignerWithAddress[] = []
          const EPICENTER_LAT = 41.17779e6
          const EPICENTER_LON = -8.60293e6
          const NAME = "EcoDAO"

          before(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              creator = accounts[1]
              await deployments.fixture(["all"])

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
                      .createCommunity(NAME, EPICENTER_LAT, EPICENTER_LON)

                  expect(transactionResponse).to.emit(communityFactory, "NewCommunity")

                  const transactionReceipt = await transactionResponse.wait()
                  const communityAddress = transactionReceipt.events![0].args!.community

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
          })
      })
