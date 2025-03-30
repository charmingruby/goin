import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Goin", () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Goin = await hre.ethers.getContractFactory("Goin");
    const goin = await Goin.deploy();

    return { goin, owner, otherAccount };
  }

  describe("ERC-20 state variables", () => {
    it("should have the correct name", async () => {
      const { goin, owner, otherAccount } = await loadFixture(deployFixture);

      expect(await goin.name()).to.equal("Goin");
    });

    it("should have the correct symbol", async () => {
      const { goin, owner, otherAccount } = await loadFixture(deployFixture);

      expect(await goin.symbol()).to.equal("GOIN");
    });

    it("should have the correct decimals", async () => {
      const { goin, owner, otherAccount } = await loadFixture(deployFixture);

      expect(await goin.decimals()).to.equal(18);
    });

    it("should have the correct totalSupply", async () => {
      const { goin, owner, otherAccount } = await loadFixture(deployFixture);

      expect(await goin.totalSupply()).to.equal(1000n * 10n ** 18n);
    });
  });

  describe("ERC-20 methods", () => {
    describe("balanceOf", () => {
      it("should return the correct balance for the owner", async () => {
        const { goin, owner, otherAccount } = await loadFixture(deployFixture);

        expect(await goin.balanceOf(owner.address)).to.equal(1000n * 10n ** 18n);
      });
    });

    describe("transfer", () => {
      it("should transfer tokens between accounts", async () => {
        const { goin, owner, otherAccount } = await loadFixture(deployFixture);

        const initialOwnerBalance = await goin.balanceOf(owner.address);
        const initialOtherAccountBalance = await goin.balanceOf(otherAccount.address);

        await goin.transfer(otherAccount.address, 100n);

        const finalOwnerBalance = await goin.balanceOf(owner.address);
        const finalOtherAccountBalance = await goin.balanceOf(otherAccount.address);

        expect(initialOwnerBalance).to.equal(1000n * 10n ** 18n);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance - 100n);
        expect(initialOtherAccountBalance).to.equal(0);
        expect(finalOtherAccountBalance).to.equal(100n);
      });

      it("should be not able to transfer tokens between accounts if the sender does not have enough balance", async () => {
        const { goin, owner, otherAccount } = await loadFixture(deployFixture);

        const otherAccountInstance = goin.connect(otherAccount);

        await expect(otherAccountInstance.transfer(owner.address, 1n)).to.be.revertedWith("Insufficient balance");
      });
    });

    describe("approval and allowance", () => {
      it("should approve a spender", async () => {
        const { goin, owner, otherAccount } = await loadFixture(deployFixture);

        await goin.approve(otherAccount.address, 100n);

        expect(await goin.allowance(owner.address, otherAccount.address)).to.equal(100n);
      });
    });
  });
});
