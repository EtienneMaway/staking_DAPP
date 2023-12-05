/** @format */
// "use client";

import {
	useAccount,
	useBalance,
	useContractRead,
	useContractWrite,
} from "wagmi";

import { UseIsMounted } from "../../../useIsMounted";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "@/app/contracts";
import { parseEther } from "viem";
import { useState } from "react";

const Stake = () => {
	const mounted = UseIsMounted();

	const account = useAccount();

	const [amount, setAmount] = useState(0);

	const [successStake, setSuccessStake] = useState(false);

	// runner's balance
	const balance = useBalance({
		address: account.address,
	});

	// staking Ether function
	const stakeEther = useContractWrite({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: "stakeEther",
	});

	// contract balance
	const getContractBalance = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: "getContractBalance",
	});

	// check the interest rate based on the number of days
	const getInterestRate = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: "getInterestRate",
		args: [0],
	});

	const getPositionIdsForAddress = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: "getPositionIdsForAddress",
		args: [account.address],
	});

	// assetIds(account.address);
	// if (isLoading) return <div>Fetching balance…</div>;
	// if (isError) return <div>Error fetching balance</div>;
	return (
		<div className=' flex flex-col items-center h-[100%]  bg-purple-200 mt-4 rounded-xl'>
			<p className='font-bold text-sm uppercase flex justify-center text-blue-300 py-1 '>
				<span className='text-red-500'>7% </span>APY
			</p>
			<div className=' w-full bg-white flex flex-col pb-4 rounded-[12px]  px-5 gap-2'>
				<h3 className='text-black text-center font-extrabold my1.5 text-sm mt-3'>
					Stake
				</h3>
				<input
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					type='number'
					name='number'
					className='bg-gray-200 text-[10px] py-[3px] p-[1.5px] outline-none focus:border-b-2 text-gray-500 pl-4 placeholder:text-gray-400  rounded-[15px] mb-1'
					placeholder='0'
					required={true}
				/>

				{mounted ? (
					<span className='text-black mt-3 text-xs'>
						Balance: {balance.data?.formatted.slice(0, 5)}{" "}
						{balance.data?.symbol}
					</span>
				) : (
					0
				)}

				<hr className='' />
				<span className='text-black text-xs mt-2.5'>
					Exchange Rate: 1.0382146
				</span>
				<hr />

				<button
					disabled={stakeEther.isLoading}
					onClick={() =>
						stakeEther.write({
							args: [0],
							from: account.address,
							value: parseEther(amount),
						})
					}
					className='bg-blue-400 py-2 rounded-md text-white mt-[60%] text-xs uppercase disabled:opacity-40'>
					{stakeEther.isLoading ? "Processing..." : "Stake"}
				</button>
			</div>
		</div>
	);
};

export default Stake;
