import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { pagesList } from "./utils/constants";

import Header from "./containers/Navigators/Header";
import * as Pages from "./pages";



function App() {
	const allPagesList = [pagesList.Special, ...pagesList.Main, ...pagesList.Sub];

	const [account, setAccount] = useState({
		address: '',
		privateKey: '',
		login: false,
	});

	const pageTag = (i) => {
		const Tag = Pages[allPagesList[i]];
		return <Tag account={account} setAccount={setAccount} />;
	};


	return (
		<div className="h-screen">
			<Router>
				<Header account={account} setAccount={setAccount} />
				<Routes>
					{allPagesList.map((_, i) => {
						return (
							<Route path={"NFTee/" + (i ? allPagesList[i].toLowerCase() : '')} element={pageTag(i)} />
						);
					})}
				</Routes>
			</Router>
			<div class="fixed h-14 w-14 flex left-8 bottom-8 ml-[-0.5rem] z-20 rounded-full backdrop-blur-sm bg-white/50 dark:bg-black/50">
			</div>
		</div>
	);
}

export default App;