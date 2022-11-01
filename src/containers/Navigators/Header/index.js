import { useLocation, NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import { pagesList } from "./../../../utils/constants";

import BigCollection from "../../Collection/BigCollection";
import BigNFT from "../../NFT/BigNFT";

import * as Pages from './../../../svgs/Pages'
import * as Buttons from './../../../svgs/Buttons'
import * as Modals from './components/Modals'

function Nagivator({ account, setAccount }) {
	const [bigNFT, setBigNFT] = useState(false)
	const [bigCollection, setBigCollection] = useState(false)

	const [nft, setNFT] = useState('');
	const [collection, setCollection] = useState('');

	const [nftInfo, setNFTInfo] = useState([]);
	const [collectionInfo, setCollectionInfo] = useState([]);

	const [nfts, setNFTs] = useState([])

	const navigate = useNavigate();
	const logout = () => {
		setAccount({ address: '', wallet: null })
		navigate('NFTee/')
	}


	const location = useLocation();

	const pageTag = (i) => {
		const Tag = Pages[pagesList.Sub[i]];
		return <Tag active={`/NFTee/${pagesList.Sub[i].toLowerCase().slice(0, 1)}` === location.pathname.slice(0, 8)} />;
	};

	const [open, setOpen] = useState('');


	const buttonTag = (i) => {
		const Tag = Buttons[pagesList.Button[i]];
		return <Tag address={account.address} active={open === pagesList.Button[i]} />;
	};

	const modalTag = (i) => {
		const Tag = Modals[pagesList.Button[i]];
		return <Tag address={account.address} active={(open === pagesList.Button[i])} setOpen={setOpen} setCollection={setCollection} setNFTs={setNFTs} setCollectionInfo={setCollectionInfo} setBigCollection={setBigCollection} nft={nft} setNFT={setNFT} setNFTInfo={setNFTInfo} setBigNFT={setBigNFT} />;
	};

	const handleModal = (i) => {
		if (open === pagesList.Button[i]) {
			setOpen('');
		} else {
			setOpen(pagesList.Button[i]);
		}
	};


	return (
		<>
			{bigCollection &&
				<div className="fixed w-screen h-screen z-30">
					<BigCollection address={account.address} setBigCollection={setBigCollection} collection={collection} collectionInfo={collectionInfo} nfts={nfts} isPublic={false} />
				</div>}

			{bigNFT &&
				<div className="fixed w-screen h-screen z-30">
					<BigNFT address={account.address} nft={nft} nftInfo={nftInfo} setBigNFT={setBigNFT} />
				</div>}

			<nav className="absolute top-0 z-50">
				<div className="flex fixed w-full h-20 inset-x-0 z-10 items-center place-items-center justify-items-center 
		rounded-b-xl backdrop-blur-lg bg-white/50 dark:bg-black/50">
					<div className="flex w-[15%] justify-center">
						<Link
							to="NFTee/"
							className="text-center font-sans font-bold text-4xl hover:scale-110 transform transition duration-300 bg-clip-text text-transparent bg-gradient-to-br from-blue-700 dark:from-blue-400 to-violet-700 dark:to-violet-400"
						>
							NFTee
						</Link>
					</div>

					<div className="flex w-[40%] h-1/2 items-center place-items-center justify-items-center place-content-around
			border-x-[1px] border-black dark:border-white transition-all duration-300 ease-in-out">
						{pagesList.Main.map((_, i) => {
							return (
								<NavLink
									to={`NFTee/${pagesList.Main[i].toLowerCase().slice(0, 1)}/`}
									className={({ isActive }) =>
										isActive
											? "text-xl text-indigo-800 dark:text-indigo-200 font-semibold bg-bottom bg-gradient-to-r from-indigo-800 dark:from-indigo-200 to-indigo-800 dark:to-indigo-200 bg-no-repeat bg-[length:100%_3px]"
											: "text-xl font-semibold text-slate-800 dark:text-slate-200 bg-bottom bg-gradient-to-r from-slate-800 dark:from-slate-200 to-slate-800 dark:to-slate-200 bg-[length:0%_3px] bg-no-repeat hover:bg-[length:100%_3px] transition-all duration-200 ease-out"
									}
								>
									{pagesList.Main[i]}
								</NavLink>
							);
						})}
					</div>


					{account.address &&
						<>

							<div className="flex w-[27%] justify-evenly">
								{pagesList.Sub.map((_, i) => {
									return (
										<NavLink
											to={`NFTee/${pagesList.Sub[i].toLowerCase().slice(0, 1)}/${i === 1 ? account.wallet ? account.wallet.getAddress() : account.address : ''}`}
											className="flex w-[7.5rem] h-[2.75rem] cursor-pointer justify-center"
										>
											{pageTag(i)}
										</NavLink>
									);
								})}

							</div>

							<div className="flex justify-evenly w-[13%] border-x-[1px] border-black dark:border-white">
								{pagesList.Button.map((_, i) => {
									return (
										<div className="flex justify-evenly w-14 h-14 cursor-pointer" onClick={() => handleModal(i)}>
											{buttonTag(i)}
										</div>
									);
								})}
							</div>


							<div>
								{pagesList.Button.map((_, i) => {
									return (
										modalTag(i)
									)
								})}
							</div>
							<div className="w-[6rem] h-[2.75rem] grid place-content-center">
								<svg onClick={() => logout()} className="w-8 h-8 cursor-pointer fill-slate-700 dark:fill-slate-300 hover:fill-violet-700 dark:hover:fill-violet-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
									<path d="M11.476,15a1,1,0,0,0-1,1v3a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7.476a3,3,0,0,1,3,3V8a1,1,0,0,0,2,0V5a5.006,5.006,0,0,0-5-5H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7.476a5.006,5.006,0,0,0,5-5V16A1,1,0,0,0,11.476,15Z" /><path d="M22.867,9.879,18.281,5.293a1,1,0,1,0-1.414,1.414l4.262,4.263L6,11a1,1,0,0,0,0,2H6l15.188-.031-4.323,4.324a1,1,0,1,0,1.414,1.414l4.586-4.586A3,3,0,0,0,22.867,9.879Z" />
								</svg>
							</div>
						</>
					}
					{!account.address &&
						<p className="w-[45%] text-center text-xl text-slate-800 dark:text-slate-200">Please
							<Link
								to="NFTee/"
								className="px-2 text-center font-semibold bg-clip-text text-slate-900 dark:text-slate-100 hover:text-transparent hover:bg-gradient-to-br hover:from-blue-700 hover:dark:from-blue-400 hover:to-violet-700 hover:dark:to-violet-400"
							>
								LOGIN
							</Link>
							to have fully access to the service.</p>
					}
				</div>
			</nav>
		</>
	);
}

export default Nagivator;
