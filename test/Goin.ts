import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Goin", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Goin = await hre.ethers.getContractFactory("Goin");
    const goin = await Goin.deploy();

    return { goin, owner, otherAccount };
  }

  it("should receive a ping", async function () {
    const { goin, owner, otherAccount } = await loadFixture(deployFixture);

    expect(await goin.ping()).to.equal("pong");
  });
});
