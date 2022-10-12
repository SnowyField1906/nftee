import { useLocation, NavLink, Link } from "react-router-dom";
import { useState } from "react";

import { pagesList } from "./../../../utils/constants";

import * as Pages from './../../../svgs/Pages'
import * as Buttons from './../../../svgs/Buttons'
import * as Modals from './components/Modals'

function Nagivator() {
	const location = useLocation();

	const pageTag = (i) => {
		const Tag = Pages[pagesList.Sub[i]];
		return <Tag active={`/${pagesList.Sub[i].toLowerCase()}` === location.pathname} />;
	};

	const [open, setOpen] = useState('');

	const buttonTag = (i) => {
		const Tag = Buttons[pagesList.Button[i]];
		return <Tag active={open === pagesList.Button[i]} />;
	};

	const modalTag = (i) => {
		const Tag = Modals[pagesList.Button[i]];
		return <Tag active={(open === pagesList.Button[i])} />;
	};

	const handleModal = (i) => {
		if (open === pagesList.Button[i]) {
			setOpen('');
		} else {
			setOpen(pagesList.Button[i]);
		}
	};


	return (
		<nav className="flex fixed w-full h-20 inset-x-0 z-10 items-center place-items-center justify-items-center 
		rounded-b-xl backdrop-blur-md bg-white/50 dark:bg-black/50">
			<div className="flex w-2/12 justify-center">
				<Link
					to="/"
					className="text-center font-sans font-bold text-5xl hover:scale-110 transform transition duration-300 bg-clip-text text-transparent bg-gradient-to-br from-blue-700 dark:from-blue-400 to-violet-700 dark:to-violet-400"
				>
					NFTee
				</Link>
			</div>

			<div className="flex w-5/12 h-1/2 items-center place-items-center justify-items-center place-content-around
			border-x-[1px] border-black dark:border-white transition-all duration-300 ease-in-out">
				{pagesList.Main.map((_, i) => {
					return (
						<NavLink
							to={`/${pagesList.Main[i].toLowerCase()}`}
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

			<div className="flex w-3/12 justify-evenly">
				{pagesList.Sub.map((_, i) => {
					return (
						<NavLink
							to={`/${pagesList.Sub[i].toLowerCase()}`}
							className="flex w-32 h-14 cursor-pointer justify-center"
						>
							{pageTag(i)}
						</NavLink>
					);
				})}

			</div>

			<div className="flex w-[10%] justify-evenly border-x-[1px] border-black dark:border-white">
				{pagesList.Button.map((_, i) => {
					return (
						<div className="grid w-14 h-14 cursor-pointer" onClick={() => handleModal(i)}>
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
		</nav>
	);
}

export default Nagivator;
