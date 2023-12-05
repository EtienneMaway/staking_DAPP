/** @format */

import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";
import "./navbar.css";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
	const { isConnected } = useAccount();
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	useEffect(() => {
		if (!isConnected) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [isConnected]);

	return (
		<div className='flex justify-center'>
			<div className='flex items-center justify-center w-[1000px] '>
				<div className='text-black navbar flex justify-between w-full'>
					<span className='logo hidden sm:flex italic font-bold'>
						ETMW <span className='ml-1 '> Staking</span>
					</span>
					<div className='connectButton '>
						<ConnectButton
							showBalance={false}
							chainStatus='none'
							accountStatus='address'
							label='Connect Web3'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
