import { createContext, useCallback, useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import LeftMenu from "../HomePage/LeftMenu/LeftMenu";
import FriendsList from "../HomePage/RightMenu/FriendsList";
import Posts from "../HomePage/TheFeed/Posts";
import UpMenu from "../HomePage/UpMenu/UpMenu";
import Profile from "./Profile";
import Sponsored from "../HomePage/RightMenu/Sponsored";
import { fetchUser } from "../services/Api";
import { setComments } from "../HomePage/HomePage";
import { userContext } from '../App';
export const ThemeContext = createContext(null);

function ProfilePage() {
    const { activeUser, setActiveUser } = useContext(userContext)
	const { email, correnttheme } = useParams();
	const [theme, setTheme] = useState(correnttheme);
	const [postsList, setPostsList] = useState([]);
	const [userPage, setUserPage] = useState(undefined);
	const sameUser = userPage?.email === activeUser?.email;
	const friends = activeUser?.friends?.includes(userPage?.email);
	const [userFriends, setUserFriends] = useState([]);

	const changeTheme = () => {
		setTheme((curr) => {
			return curr === "light" ? "dark" : "light";
		});
	};

	const getUser = useCallback(async () => {
		const response = await fetch(
			"/api/users/" + email,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${activeUser.token}`,
				},
			}
		);
		const data = await response.json();
		await setUserPage(data);
	}, [activeUser, email]);

	useEffect(() => {
		getUserPosts();
		getUser();
	}, [getUser]);

	useEffect(() => {
		const getFriendsUsers = async () => {
			if (userPage?.friends !== undefined) {
				try {
					const usersPromises = userPage.friends.map(
						async (email) => {
							const response = await fetchUser(
								activeUser.token,
								email
							);
							const user = await response.json();
							return user;
						}
					);

					const users = await Promise.all(usersPromises);
					await setUserFriends([...users]);
				} catch (error) {
					console.error("Error fetching users:", error);
				}
			}
		};

		getFriendsUsers();
	}, [activeUser.token, userPage]);

	const getUserPosts = async () => {
		const response = await fetch(
			"/api/users/" + email + "/posts",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${activeUser.token}`,
				},
			}
		);
		const data = await response.json();
		const sortData = [...data].sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);
		setPostsList(sortData);
	};

	return (
		<ThemeContext.Provider value={{ theme, changeTheme }}>
			<div className="container- fluid" id={theme}>
				<div className="row upfeed">
					<UpMenu
						activeUser={activeUser}
						changeTheme={changeTheme}
						setActiveUser={setActiveUser}
						postsList={postsList}
						setPostsList={setPostsList}
					/>
				</div>
				<div className="row feed">
					<div className="col-3">
						<LeftMenu
							activeUser={activeUser}
							correnttheme={theme}
						/>
					</div>
					<div className="row col-6">
						{userPage === undefined ? (
							"Loading..."
						) : (
							<>
								<Profile
									userPage={userPage}
									sameUser={sameUser}
									setUserPage={setUserPage}
								/>

								{(friends || sameUser) &&
									postsList.map((post) => (
										<Posts
											{...post}
											activeUser={activeUser}
											theme={theme}
											postsList={postsList}
											setPostsList={setPostsList}
											key={post._id}
                                            setCommentsList={(comments) =>
                                                setComments(
                                                    postsList,
                                                    setPostsList,
                                                    post._id,
                                                    comments
                                                )
                                            }
										/>
									))}
							</>
						)}
					</div>
					<div className="col-3">
						{userPage === undefined
							? "Loading..."
							: userFriends.map((user) => (
									(friends||sameUser) && <FriendsList user={user} />
							  ))}
						<Sponsored />
					</div>
				</div>
			</div>
		</ThemeContext.Provider>
	);
}

export default ProfilePage;
