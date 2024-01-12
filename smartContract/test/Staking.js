/** @format */

const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
const { assert } = require("console");
const { formatEther } = require("ethers");

const toWei = (n) => hre.ethers.parseEther(n);
const toEther = (n) => hre.ethers.formatEther(n);

describe("Staking", function () {
  let owner, user;

  /**
   * Asynchronous function to deploy the Staking contract for testing purposes.
   * The function initializes with 10 ETH sent along with the deployment.
   *
   * @returns {Object} An object containing the deployed Staking contract, owner's signer, and user's signer.
   */
  async function deployStakingFixture() {
    // Define the amount of Ether to be sent with deployment (10 ETH in wei)
    const TEN_ETH = toWei("10");

    // Get the signers for the owner and user accounts using Hardhat Runtime Environment (hre)
    [owner, user] = await hre.ethers.getSigners();

    // Deploy the Staking contract with the specified value (10 ETH)
    const Staking = await hre.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy({ value: TEN_ETH });

    // Log the deployed Staking contract's address to the console
    console.log("Contracts deployed:", await staking.getAddress());

    // Return an object with the deployed Staking contract, owner's signer, and user's signer
    return { staking, owner, user };
  }

  describe("Deployment", function () {
    /**
     * Test case to ensure that the Staking contract sets the correct owner during deployment.
     */
    it("Should set the right owner", async function () {
      // Load the fixture to deploy the Staking contract and obtain the owner's signer
      const { staking, owner } = await loadFixture(deployStakingFixture);

      // Verify that the owner address stored in the Staking contract matches the expected owner address
      expect(await staking.owner()).to.equal(owner.address);
    });

    /**
     * Test case to ensure that the Staking contract can receive Ether when a user stakes a specified amount.
     */
    it("should receive Ether", async () => {
      // Load the fixture to deploy the Staking contract and obtain the owner's signer
      const { staking, owner } = await loadFixture(deployStakingFixture);

      // Get the current balance of the Staking contract
      const oldBalance = await staking.getContractBalance();

      // Specify the amount of Ether to be staked (20 ETH in wei)
      const amount = toWei("20");

      // Call the stakeEther function, simulating a user staking 30 tokens with the specified amount of Ether
      await staking.stakeEther(30, { value: amount });

      // Get the updated balance of the Staking contract after the stake
      const currentBalance = await staking.getContractBalance();

      // Assert that the contract balance increased by the staked amount

      assert(
        oldBalance + amount === currentBalance,
        "Contract balance did not increase by the staked amount",
      );
    });

    /**
     * Test case to ensure that a user can withdraw the staked amount along with accrued interest.
     */
    it("should withdraw the staked amount + interest", async () => {
      // Load the fixture to deploy the Staking contract and obtain the owner and user signers
      const { staking, owner, user } = await loadFixture(deployStakingFixture);

      // Specify the amount of Ether to be staked (100 ETH in wei)
      const amount = toWei("100");

      // Get the contract balance before any staking
      const contractBalanceBeforeStaking = await staking.getContractBalance();

      // Stake Ether and get the staked amount
      const stakedAmount = await staking
        .connect(user)
        .stakeEther(30, { value: amount });

      // Get the contract balance after the staking
      const contractBalanceAfterStaking = await staking.getContractBalance();

      // Assert that the contract balance increased by the staked amount
      assert(
        contractBalanceAfterStaking ===
          contractBalanceBeforeStaking + stakedAmount,

        "Contract balance did not increase by the correct amount after staking",
      );

      // Get the position ID of the user's staked position
      const positionId = await staking.positionIdsByAddress(user.address, 0);

      // Log the staked amount for reference
      console.log("Staked amount:", stakedAmount.value);

      // User closes the staked position, withdrawing the staked amount along with accrued interest
      await staking.connect(user).closePosition(positionId);

      // Get the total withdrawable amount (staked amount + interest)
      const withdrawAmountWithInterest = await staking.getWalletBalance(
        user.address,
      );

      // Assert that the staked amount is less than the total withdrawable amount
      assert(
        withdrawAmountWithInterest > stakedAmount,
        "Staked amount is not less than the total withdrawable amount",
      );

      // Log the withdrawn amount for reference
      console.log("Withdrawn amount:", withdrawAmountWithInterest);
    });
  });
});
