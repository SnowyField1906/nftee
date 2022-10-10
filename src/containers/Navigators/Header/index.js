import { useLocation, NavLink, Link } from "react-router-dom";

import { pagesList } from "./../../../utils/constants";

import * as Pages from './../../../svgs/Pages'

function Nagivator() {
	const location = useLocation();

	console.log(pagesList);

	const pageTag = (i) => {
		const Tag = Pages[pagesList.Sub[i]];
		return <Tag active={`/${pagesList.Sub[i].toLowerCase()}` === location.pathname} />;
	};

	return (
		<nav className="flex fixed w-full h-20 inset-x-0 items-center place-items-center justify-items-center 
		rounded-b-xl backdrop-blur-md bg-white/50 dark:bg-slate-900/50">
			<div className="flex w-1/6 justify-center">
				<Link
					to="/"
					className="text-center font-sans font-bold text-5xl hover:scale-110 transform transition duration-300 bg-clip-text text-transparent bg-gradient-to-br from-blue-700 dark:from-blue-400 to-violet-700 dark:to-violet-400"
				>
					NFTee
				</Link>
			</div>

			<div className="flex w-1/2 px-[5%] items-center place-items-center justify-items-cente place-content-around transition-all duration-300 ease-in-out">
				{pagesList.Main.map((_, i) => {
					return (
						<NavLink
							to={`/${pagesList.Main[i].toLowerCase()}`}
							className={({ isActive }) =>
								isActive
									? "text-xl text-violet-700 dark:text-violet-300 font-semibold bg-bottom bg-gradient-to-r from-violet-700 dark:from-violet-300 to-violet-700 dark:to-violet-300 bg-no-repeat bg-[length:100%_3px]"
									: "text-xl font-semibold text-slate-600 dark:text-slate-200 bg-bottom bg-gradient-to-r from-slate-600 dark:from-slate-200 to-slate-600 dark:to-slate-200 bg-[length:0%_3px] bg-no-repeat hover:bg-[length:100%_3px] transition-all duration-300 ease-out"
							}
						>
							{pagesList.Main[i]}
						</NavLink>
					);
				})}
			</div>

			<div className="flex w-1/3 justify-evenly">
				{pagesList.Sub.map((_, i) => {
					return (
						<NavLink
							to={`/${pagesList.Sub[i].toLowerCase()}`}
							className="grid w-32 h-14 cursor-pointer"
						>
							{pageTag(i)}
						</NavLink>
					);
				})}

			</div>
		</nav>
	);
}

export default Nagivator;
