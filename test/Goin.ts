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

  describe("ERC-20 state variables", function () {
    it("should have the correct name", async function () {
      const { goin, owner, otherAccount } = await loadFixture(deployFixture);

      expect(await goin.name()).to.equal("Goin");
    });

    it("should have the correct symbol", async function () {
      const { goin, owner, otherAccount } = await loadFixture(deployFixture);

      expect(await goin.symbol()).to.equal("GOIN");
    });

    it("should have the correct decimals", async function () {
      const { goin, owner, otherAccount } = await loadFixture(deployFixture);

      expect(await goin.decimals()).to.equal(18);
    });

    it("should have the correct totalSupply", async function () {
      const { goin, owner, otherAccount } = await loadFixture(deployFixture);

      expect(await goin.totalSupply()).to.equal(1000n * 10n ** 18n);
    });
  });
});
