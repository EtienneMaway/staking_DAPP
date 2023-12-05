/** @format */

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.20",
	networks: {
		// defaultNetwork: "localhost",
		hardhat: {},
		localhost: {
			url: "http://127.0.0.1:8545",
			chainId: 31337,
		},
		sepolia: {
			url: `https://sepolia.infura.io/v3/d750ee2e31774d7abfde309634a4d450`,
			accounts: [
				"cb8cfebc56ef7c3b175e7d0d5ca5839a8930cb630566d1b07bdb33579ec3d8b4",
			],
			chainId: 11155111,
		},
	},
};

// require("@nomiclabs/hardhat-waffle");
// require("hardhat-gas-reporter");
// require("./tasks/block-number");
// require("@nomiclabs/hardhat-etherscan");
// require("dotenv").config();
// require("solidity-coverage");
// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more
// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */

// const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
// const SEPOLIA_RPC_URL =
// 	process.env.SEPOLIA_RPC_URL ||
// 	"https://eth-sepolia.g.alchemy.com/v2/your-api-key";
// const PRIVATE_KEY =
// 	process.env.PRIVATE_KEY ||
// 	"0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a";
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

// module.exports = {
// 	defaultNetwork: "hardhat",
// 	networks: {

// 		hardhat: {},
// 		sepolia: {
// 			url: SEPOLIA_RPC_URL,
// 			accounts: [PRIVATE_KEY],
// 			chainId: 11155111,
// 		},
// 		localhost: {
// 			url: "http://localhost:8545",
// 			chainId: 31337,
// 		},
// 	},
// 	solidity: "0.8.8",
// 	etherscan: {
// 		apiKey: ETHERSCAN_API_KEY,
// 	},
// 	gasReporter: {
// 		enabled: true,
// 		currency: "USD",
// 		outputFile: "gas-report.txt",
// 		noColors: true,
// 		coinmarketcap: COINMARKETCAP_API_KEY,
// 	},
// };
