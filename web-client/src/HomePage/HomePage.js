import React from "react";
import "./HomePage.css";
import UpMenu from "./UpMenu/UpMenu";
import LeftMenu from "./LeftMenu/LeftMenu";
import UserStatus from "./TheFeed/UserStatus";
import RightMenu from "./RightMenu/RightMenu";
import Posts from "./TheFeed/Posts";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

export const ThemeContext = createContext(null);

export const setComments = (_, setPostsList, postId, comments) => {
  setPostsList(postsList => {
    const postIndex = postsList?.findIndex((post) => post._id === postId);
    postsList[postIndex].commentsInfo = [...comments];
    return [...postsList]
  })
};

function HomePage({ activeUser, setActiveUser }) {
	const [postsList, setPostsList] = useState();
	const [theme, setTheme] = useState("light");


	useEffect(() => {
		// Call the getPosts function when the component is mounted
		getPosts();
	}, [activeUser?.friends]);

	const getPosts = async () => {
		const response = await fetch("/api/posts", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${activeUser.token}`,
			},
		});
		const data = await response.json();

		await setPostsList(data);
	};

	const changeTheme = () => {
		setTheme((curr) => {
			return curr === "light" ? "dark" : "light";
		});
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
						<UserStatus
							activeUser={activeUser}
							setPostsList={setPostsList}
							postsList={postsList}
						/>
						{postsList?.map((post) => (
							<Posts
								{...post}
								key={post._id}
								activeUser={activeUser}
								postsList={postsList}
								setPostsList={setPostsList}
								correnttheme={theme}
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
					</div>
					<div className="col-3">
						<RightMenu />
					</div>
				</div>
			</div>
		</ThemeContext.Provider>
	);
}

export default HomePage;
