/** @format */
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/navbar/navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { sepolia, hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const inter = Inter({ subsets: ["latin"] });

import { infuraProvider } from "wagmi/providers/infura";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
const dotenv = require("dotenv");
dotenv.config();

const { chains, publicClient } = configureChains(
	[sepolia, hardhat],

	[
		infuraProvider({
			apiKey: process.env.API_KEY,
		}),
		publicProvider(),
	]
);
const { connectors } = getDefaultWallets({
	appName: "Staking App",
	projectId: "3a033cdb9caf3796a537ea546ff8916b",
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<WagmiConfig config={wagmiConfig}>
					<RainbowKitProvider chains={chains}>
						<Navbar />
						{children}
					</RainbowKitProvider>
				</WagmiConfig>
			</body>
		</html>
	);
}
