import { createContext, useState } from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import "./HomePage/HomePage.css";
import HomePage from "./HomePage/HomePage.js";
import "./LogIn/logIn.css";
import LogIn from "./LogIn/logIn.js";
import ProfilePage from "./Profile/ProfilePage";
import SignUp from "./SignUp/SignUp.js";

export const userContext = createContext({});
const STORAGE_KEY = "activeUser";

function App() {
	const getActiveUser = () => {
		const userJson = localStorage.getItem(STORAGE_KEY);
		try {
			return JSON.parse(userJson);
		} catch {
			return;
		}
	};

	const [activeUser, setActiveUserState] = useState(getActiveUser());

	const setActiveUser = (user) => {
		setActiveUserState(user);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
	};

	return (
		<div className="App">
			<header className="App-header">
				<userContext.Provider value={{ activeUser, setActiveUser }}>
					<Router>
						<Routes>
							<Route
								path=""
								element={
									<LogIn setActiveUser={setActiveUser} />
								}
							/>
							<Route path="/SignUp" element={<SignUp />} />
							<Route
								path="/HomePage"
								element={
									activeUser ? (
										<HomePage
											activeUser={activeUser}
											setActiveUser={setActiveUser}
										/>
									) : (
										<Navigate to="/" />
									)
								}
							/>
							<Route
								path="/Profile/:email/:correnttheme"
								element={
									<ProfilePage
										activeUser={activeUser}
										setActiveUser={setActiveUser}
									/>
								}
							/>
						</Routes>
					</Router>
				</userContext.Provider>
			</header>
		</div>
	);
}

export default App;
