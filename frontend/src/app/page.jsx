/** @format */
"use client";

import {
	useAccount,
	useBalance,
	useContractWrite,
	usePrepareContractWrite,
} from "wagmi";

import Stake from "./components/ui/stake/Stake";
import Unstake from "./components/ui/unstake/Unstake";
import { useState } from "react";
import { ABI, CONTRACT_ADDRESS } from "./contracts";
import { parseEther } from "viem";

export default function Home() {
	const { address } = useAccount();

	const [stakingTab, setStakingTab] = useState(true);
	const [unstakingTab, setUnstakingTab] = useState(false);

	const [stakingLength, setStakingLength] = useState(0);
	const [amount, setAmount] = useState(0);

	const switchToStake = async () => {
		setStakingTab(true);
		setUnstakingTab(false);
	};

	const switchToUnstake = async () => {
		setUnstakingTab(true);
		setStakingTab(false);
	};

	// staking Ether function
	const stakeEther = useContractWrite({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: "stakeEther",
	});

	return (
		<main className='flex sm:min-h-screen  flex-col justify-between px-[10rem] pt-16 items-center'>
			<div className='container mx-[7rem]  flex sm:h-[100dvh] w-[640px] items-center overflow-hidden flex-col pb-6'>
				<div className=' flex flex-col mx-3'>
					<div className='sm:flex  px-9 upperDivider'>
						<div className='left sm:w-[260px] w-[300px] flex flex-col rounded-xl sm:mx-4 '>
							<div className='links flex items-center justify-center mx-auto  bg-white min-w-fit rounded-full'>
								<button
									className='px-5 py-1 text-xs hover:bg-purple-300 focus:bg-purple-200 text-black rounded-full  text-center'
									onClick={switchToStake}>
									Stake
								</button>
								<button
									onClick={switchToUnstake}
									className='px-4 py-1  text-xs text-black rounded-full hover:bg-purple-300 focus:bg-purple-200'>
									Unstake
								</button>
							</div>
							{stakingTab ? <Stake /> : unstakingTab ? <Unstake /> : null}
						</div>

						{/* Locked staking side */}
						<div className='right sm:w-[260px] w-[300px]  flex flex-col rounded-xl sm:mx-4'>
							<div className=' flex flex-col items-center h-[100%]  bg-teal-200 rounded-xl'>
								<div className=' w-full bg-white flex flex-col pb-4 rounded-[12px] px-8 gap-2 '>
									<h3 className='text-black text-center font-[900] my1.5 text-sm mt-3'>
										Locked Staking
									</h3>
									<label htmlFor='' className='text-[12px] text-black mt-3'>
										Locked 30 days
									</label>
									<span className='text-[8px] text-red-400'>8% APY</span>
									<input
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										type='number'
										name='number'
										className='bg-gray-200 text-[10px] py-[2px] p-[1.5px] outline-none focus:border-b-2 text-gray-500 pl-4 placeholder:text-gray-400  rounded-[15px] mb-1 w-[60%]'
										placeholder='Enter amount'
										required={true}
									/>
									<hr />

									<label htmlFor='' className='text-[12px] text-black mt-3'>
										Locked 60 days
									</label>
									<span className='text-[8px] text-red-400'>9% APY</span>
									<input
										type='number'
										name='number'
										className='bg-gray-200 text-[10px] py-[2px] p-[1.5px] outline-none focus:border-b-2 text-gray-500 pl-4 placeholder:text-gray-400  rounded-[15px] mb-1 w-[60%]'
										placeholder='Enter amount'
									/>
									<hr />

									<label htmlFor='' className='text-[12px] text-black mt-3'>
										Locked 90 days
									</label>
									<span className='text-[8px] text-red-400'>12% APY</span>
									<input
										type='number'
										name='number'
										className='bg-gray-200 text-[10px] py-[2px] p-[1.5px] outline-none focus:border-b-2 text-gray-500 pl-4 placeholder:text-gray-400  rounded-[15px] mb-1 w-[60%]'
										placeholder='Enter amount'
									/>
									<hr />

									<button
										className='bg-blue-400 py-2 rounded-md  text-white mt-[28px] text-xs uppercase '
										onClick={() =>
											stakeEther.write({
												args: [30],
												from: address,
												value: parseEther(amount),
											})
										}>
										stake
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* staking info */}

					<div className='sm:m-auto'>
						<div className='downContainer flex justify-evenly sm:justify-between sm:w-[640px]  px-[50px] mt-20  '>
							<div className='flex flex-col sm:w-[130px] w-[100px] justify-between items-center py-3 px-[15px] bg-white rounded-[8px] text-[10px]  text-black gap-2'>
								<p className=' font-extrabold'>Total Staked Token</p>
								<p className='text-gray-700'>$ 8,234,019</p>
							</div>
							<div className='sm:w-[130px] w-[100px] flex flex-col justify-between items-center py-3 px-[15px] bg-white rounded-[8px] text-[10px] text-black gap-2'>
								<p className=' font-extrabold'>Total Renewal Paid</p>
								<p className='text-gray-700'>$ 2,234,019</p>
							</div>
							<div className='sm:w-[130px] w-[100px] flex flex-col justify-between items-center py-3 px-[15px] bg-white rounded-[8px] text-[10px] text-black gap-2'>
								<p className=' font-extrabold '>Stakers</p>
								<p className='text-gray-700'>49,234</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
