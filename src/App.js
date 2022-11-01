import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { getUsers, getPublicCollections } from "./utils/ReadonlyContracts";
import { pagesList } from "./utils/constants";

import Header from "./containers/Navigators/Header";
import * as Pages from "./pages";

import ExternalCollection from "./pages/External/Collection/ExternalCollection";
import ExternalProfile from "./pages/External/Profile/ExternalProfile";

function App() {
	const allPagesList = [pagesList.Special, ...pagesList.Main, ...pagesList.Sub];
	const [account, setAccount] = useState({
		address: '',
		privateKey: '',
		wallet: null,
	});

	const [users, setUsers] = useState([]);
	const [collections, setCollections] = useState([]);



	const pageTag = (i) => {
		const Tag = Pages[allPagesList[i]];
		return <Tag account={account} setAccount={setAccount} target={account.wallet ? account.wallet.getAddress() : account.address} />;
	};

	const usersAwait = async () => {
		await getUsers().then((res) => setUsers(res));
	}

	const collectionsAwait = async () => {
		await getPublicCollections().then((res) => setCollections(res));
	}

	useEffect(() => {
		usersAwait();
		collectionsAwait();
	}, []);

	return (
		<div className="h-screen main-overflow">
			{/* {
				claimNFT && <div className="fixed top-0 left-0 w-screen h-screen z-[100] grid justify-center items-center backdrop-lg select-none">
					<div className="w-[60vw] h-[30vh] bg- bg-cover bg-center overflow-hidde rounded-xl justify-self-center"
						style={{
							backgroundImage: `url(${findPublicGateWay(claimNFT)})`,
						}}>
					</div>

					<div className="w-full h-full flex flex-col justify-center items-center">
						<p className="text-huge">You have won the auction!</p>
						<p className="text-huge mt-2">Please claim your NFT</p>
						<button className="button-medium text-black dark:text-white text-xl py-4 px-6 font-semibold mt-5 rounded-lg" >Claim</button>
					</div>
				</div>
			} */}
			<Router>
				<Header account={account} setAccount={setAccount} />
				<Routes>
					{allPagesList.map((_, i) => {
						return (
							<Route path={"NFTee/" + (i ? allPagesList[i].toLowerCase().slice(0, 1) : '') + '/' + (
								i === 6 ? (account.wallet ? account.wallet.getAddress() : account.address) : ''
							)} element={pageTag(i)} />
						);
					})}
					{users && users.map((user) => {
						return (
							<Route path={"NFTee/p/" + user} element={
								<ExternalProfile account={account} setAccount={setAccount} target={user} />
							} />
						);
					})}
					{collections && collections.map((collection) => {
						return (
							<Route path={"NFTee/p/" + collection} element={
								<ExternalCollection account={account} setAccount={setAccount} target={collection} />
							} />
						);
					})}
					<Route path={"NFTee/p/*/"} element={
						<ExternalProfile account={account} setAccount={setAccount} />
					} />
				</Routes>
			</Router>
			<div class="fixed h-14 w-14 flex left-8 bottom-8 ml-[-0.5rem] z-20 rounded-full backdrop-blur-sm bg-white/50 dark:bg-black/50">
			</div>
		</div >
	);
}

export default App;