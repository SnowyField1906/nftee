import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { pagesList } from "./utils/constants";

import Header from "./containers/Navigators/Header";
import * as Pages from "./pages";


import IconService from 'icon-sdk-js';

function App() {
	const allPagesList = [pagesList.Special, ...pagesList.Main, ...pagesList.Sub];

	const pageTag = (i) => {
		const Tag = Pages[allPagesList[i]];
		return <Tag />;
	};



	// const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3');
	// console.log('httpProvider', httpProvider)
	// const iconService = new IconService(httpProvider);

	// const createWallet = async function () {
	// 	const wallet = IconService.IconWallet.create(); //Wallet Creation
	// 	const address = wallet.getAddress(); // Get Address
	// 	const privateKey = wallet.getPrivateKey(); // Get Private Key

	// 	console.log(address, privateKey);
	// }

	// createWallet();


	// const getBalance = async function () {
	// 	const balance = await iconService.getBalance('hxf9bfff62e92b621dfd823439c822d73c7df8e698').execute();
	// 	console.log(balance);
	// }

	// getBalance();






	return (
		<div className="h-screen">
			<Router>
				<Header />
				<Routes>
					{allPagesList.map((_, i) => {
						return (
							<Route path={"NFTee/" + (i ? allPagesList[i].toLowerCase() : '')} element={pageTag(i)} />
						);
					})}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
