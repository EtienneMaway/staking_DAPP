/** @format */

import { ethers } from "ethers";
// ("0x02E2F19F4E92810dF89A361074daB03DcE359dA3");
export const CONTRACT_ADDRESS = "0x193788A382F02A4c0bAf6122E67d0c48000cA00F";
export const ABI = [
	{
		inputs: [],
		stateMutability: "payable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "positionId",
				type: "uint256",
			},
		],
		name: "closePosition",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "getContractBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "numberOfDays",
				type: "uint256",
			},
		],
		name: "getInterestRate",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "positionId",
				type: "uint256",
			},
		],
		name: "getPositionById",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "positionId",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "walletAddress",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "createdDate",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "unlockDate",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "percentInterest",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "weiStaked",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "weiInterest",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "open",
						type: "bool",
					},
				],
				internalType: "struct Staking.Position",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "walletAddress",
				type: "address",
			},
		],
		name: "getPositionIdsForAddress",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "walletAddress",
				type: "address",
			},
		],
		name: "getWalletBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "walletBalance",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "lockPeriods",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "positionIdsByAddress",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "positions",
		outputs: [
			{
				internalType: "uint256",
				name: "positionId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "walletAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "createdDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "unlockDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "percentInterest",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "weiStaked",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "weiInterest",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "open",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "numberOfDays",
				type: "uint256",
			},
		],
		name: "stakeEther",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "tiers",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		stateMutability: "payable",
		type: "receive",
	},
];
