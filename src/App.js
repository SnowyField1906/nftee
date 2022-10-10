import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { pagesList } from "./utils/constants";

import Navbar from "./containers/Navigators/Header";
import * as Pages from "./pages";

function App() {
	const allPagesList = [pagesList.Special, ...pagesList.Main, ...pagesList.Sub];

	const pageTag = (i) => {
		const Tag = Pages[allPagesList[i]];
		return <Tag />;
	};

	return (
		<div className="h-screen">
			<Router>
				<Navbar />
				<Routes>
					{allPagesList.map((_, i) => {
						return (
							<Route path={i ? allPagesList[i].toLowerCase() : '/'} element={pageTag(i)} />
						);
					})}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
