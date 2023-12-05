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
	// We define a fixture to reuse the same setup in every test.
	// We use loadFixture to run this setup once, snapshot that state,
	// and reset Hardhat Network to that snapshot in every test.
	async function deployStakingFixture() {
		const TEN_ETH = toWei("10");

		// Contracts are deployed using the first signer/account by default
		[owner, user] = await hre.ethers.getSigners();

		const Staking = await hre.ethers.getContractFactory("Staking");
		const staking = await Staking.deploy({ value: TEN_ETH });

		console.log("contracts deployed:", await staking.getAddress());

		return { staking, owner, user };
	}

	describe("Deployment", function () {
		it("Should set the right owner", async function () {
			const { staking, owner } = await loadFixture(deployStakingFixture);

			expect(await staking.owner()).to.equal(owner.address);
		});

		it("should recieve Ether", async () => {
			const { staking, owner } = await loadFixture(deployStakingFixture);

			const oldBalance = await staking.getContractBalance();

			const amount = toWei("20");

			await staking.stakeEther(30, { value: amount });

			const currentBalance = await staking.getContractBalance();

			assert(oldBalance + amount === currentBalance, "values don't match");
		});

		it("should withdraw the staked amount + interest", async () => {
			const { staking, owner, user } = await loadFixture(deployStakingFixture);

			console.log(
				"contract balance before: ",
				toEther(await staking.getContractBalance())
			);

			console.log(
				"account balance before deposit: ",
				toEther(await staking.getWalletBalance(user.address))
			);

			const amount = toWei("100");

			await staking.connect(user).stakeEther(30, { value: amount });

			const positionId = await staking.positionIdsByAddress(user.address, 0);

			console.log("the position Id:", positionId);

			// const arrayOfIds = await staking.getPositionIdsForAddress(acc1.address);

			// const lastId = arrayOfIds[arrayOfIds.length - 1];

			console.log(
				"account balance after deposit: ",
				toEther(await staking.getWalletBalance(user.address))
			);

			await staking.connect(user).closePosition(positionId);

			console.log(
				"account balance after withdraw: ",
				toEther(await staking.getWalletBalance(user.address))
			);
			console.log(
				"current contract balance: ",
				toEther(await staking.getContractBalance())
			);
		});
	});
	// 	it("Should receive ETHER", async function () {
	// 		const { staking, acc1 } = await loadFixture(deployStakingFixture);

	// 		console.log("Contract Balance: ", await staking.getContractBalance());

	// 		expect(await staking.getContractBalance()).to.be.greaterThan(0);
	// 	});
	// });
});
