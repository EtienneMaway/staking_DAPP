/** @format */

import { ABI, CONTRACT_ADDRESS } from "@/app/contracts";
import { useState } from "react";
import { formatEther } from "viem";
import {
	useAccount,
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
} from "wagmi";

const Unstake = () => {
	const { address: walletAddress } = useAccount();
	const [unstakeValue, setUnstakeValue] = useState(0);

	const { data: arrayOfIds } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: "getPositionIdsForAddress",
		args: [walletAddress],
	});

	// getting the last position ID
	const lastID = arrayOfIds?.length > 0 ? arrayOfIds[arrayOfIds.length - 1] : 0;

	const { data: positionById } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: "getPositionById",
		args: [lastID],
	});

	// const calcDaysRemaining = (unlockDate) => {
	// 	const nowTime = Date.now() / 1000;
	// 	const timeRemaining = unlockDate - nowTime;
	// 	const daysRemaining = Math.max((timeRemaining / 60 / 60 / 24).toFixed(), 0);
	// 	return daysRemaining;
	// };

	const { config } = usePrepareContractWrite({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: "closePosition",
		args: [lastID],
	});
	const { writeAsync } = useContractWrite(config);

	const unstakeOnClick = async () => {
		try {
			await writeAsync?.();
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<div className='apyBoard flex flex-col items-center h-[100%]  bg-purple-200 mt-4 rounded-xl'>
			<p className='font-bold text-sm uppercase flex justify-center text-blue-300 py-1 '>
				<span className='text-red-500'>7% </span>APY
			</p>
			<div className=' w-full bg-white flex flex-col pb-4 rounded-[12px]  px-5 gap-2'>
				<h3 className='text-black text-center font-extrabold my1.5 text-sm mt-3'>
					Unstake
				</h3>
				<input
					value={unstakeValue}
					onChange={(e) => setUnstakeValue(e.target.value)}
					type='number'
					name='number'
					className='bg-gray-200 text-[10px] py-[3px] p-[1.5px] outline-none focus:border-b-2 text-gray-500 pl-4 placeholder:text-gray-400  rounded-[15px] mb-1'
					placeholder='0'
				/>

				<span className='text-black mt-3 text-xs'>
					Balance:{" "}
					{positionById?.open === true ? (
						formatEther(positionById.weiStaked)
					) : (
						<span>0</span>
					)}
				</span>
				<hr />
				<span className='text-black text-xs mt-2.5'>
					You Receive:
					{unstakeValue == 0 ? (
						<span className='text-[10px] inline-block ml-2 text-gray-400'>
							Your deposit + Interest
						</span>
					) : (
						(Number(formatEther(positionById.weiStaked)) * 1.07)
							.toString()
							.slice(0, 5)
					)}{" "}
				</span>
				<hr />

				<button
					className='bg-blue-400 py-2 rounded-md text-white mt-[60%] text-xs uppercase'
					onClick={() => unstakeOnClick()}>
					unstake
				</button>
			</div>
		</div>
	);
};

export default Unstake;
