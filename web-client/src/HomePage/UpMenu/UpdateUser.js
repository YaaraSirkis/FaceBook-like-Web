import { useState } from "react";
import "./UpdateUser.css";
import { uploadImage } from "../../services/Api";
import { setComments } from "../HomePage";

function UpdateUser({
	activeUser,
	setEditOpen,
	editOpen,
	setActiveUser,
	postsList,
	setPostsList,
}) {
	const [pic, setPic] = useState(activeUser.picture);
	const [firstName, setFirstName] = useState(activeUser.firstName);
	const [lastName, setLastName] = useState(activeUser.lastName);

	const editUser = async () => {
		if (firstName === "") {
			setFirstName(activeUser.firstName);
		}
		if (lastName === "") {
			setLastName(activeUser.lastName);
		}
		if (pic === "") {
			setPic(activeUser.picture);
		}

		setEditOpen(!editOpen);
		updateUser(firstName, lastName, pic);
		await updateUserComments();
		await updateUserPosts(firstName, lastName, pic);
	};

	const updateUserPosts = (firstName, lastName, pic) => {
		if (activeUser.posts.length !== 0) {
			setPostsList((postsList) => {
				activeUser.posts.forEach((pid) => {
					const postIndex = postsList.findIndex(
						(post) => post._id === pid
					);
					postsList[postIndex].name = firstName + " " + lastName;
					postsList[postIndex].userPic = pic;
					console.log(postIndex);
					updateUserPostsOnServer(pid);
				});
                return [...postsList]
			});
		}
	};

	const updateUserComments = async () => {
		if (activeUser.userComments.length !== 0) {
			for (const cid of activeUser.userComments) {
				await updateUserCommentsOnServer(cid);
			}
		}
	};

	const updateUserCommentsOnServer = async (cid) => {
		console.log("start");
		try {
			const response = await fetch(
				"/api/users/" +
					activeUser.email +
					"/comments/" +
					cid,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${activeUser.token}`,
					},
					body: JSON.stringify({
						name: activeUser.displayName,
						photo: activeUser.picture,
					}),
				}
			);
			const post = await response.json();
			if (!post) return;
			setComments(postsList, setPostsList, post._id, post.commentsInfo);
		} catch (error) {
			console.error("Error edit commet user:", error);
			// Handle error (e.g., display error message to the user)
		}
	};

	const updateUserPostsOnServer = async (pid) => {
		try {
			const response = await fetch(
				"/api/users/" +
					activeUser.email +
					"/posts/" +
					pid,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${activeUser.token}`,
					},
					body: JSON.stringify({
						name: activeUser.displayName,
						userPic: activeUser.picture,
					}),
				}
			);
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("Error edit user:", error);
			// Handle error (e.g., display error message to the user)
		}
	};

	const updateUser = (firstName, lastName, pic) => {
		activeUser.firstName = firstName;
		activeUser.lastName = lastName;
		activeUser.displayName = firstName + " " + lastName;
		activeUser.picture = pic;
		setActiveUser({ ...activeUser });
		updateUserOnServer(activeUser);
	};

	const updateUserOnServer = async (activeUser) => {
		try {
			const response = await fetch(
				"/api/users/" + activeUser.email,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${activeUser.token}`,
					},
					body: JSON.stringify({
						// Include only the fields to be updated
						// (e.g., name, email, etc.)
						// Do not include the token
						// For example:
						firstName: activeUser.firstName,
						lastName: activeUser.lastName,
						displayName: activeUser.displayName,
						picture: activeUser.picture,
					}),
				}
			);
			await response.json();

			if (!response.ok) {
				throw new Error("Failed to edit user");
			}
		} catch (error) {
			console.error("Error edit user:", error);
			// Handle error (e.g., display error message to the user)
		}
	};

	return (
		<div className="updaetUsers">
			<div className="card-edit updaetUser">
				<div className="row">
					<div className="editStatuse">
						<div className="editStatusetext">
							<input
								value={firstName}
								onChange={(e) =>
									setFirstName(e.currentTarget.value)
								}
								class="search"
								placeholder={activeUser.firstName}
								aria-label="Search"
							></input>
						</div>
						<div className="editStatusetext">
							<input
								value={lastName}
								onChange={(e) =>
									setLastName(e.currentTarget.value)
								}
								class="search"
								placeholder={activeUser.lastName}
								aria-label="Search"
							></input>
						</div>
						<div className="editStatusePic">
							<input
								className="form-control"
								onChange={async (e) =>
									setPic(await uploadImage(e.target.files[0]))
								}
								type="file"
								id="formFile"
							></input>
						</div>
					</div>
				</div>
				<div className="editStatusButton">
					<button
						type="button"
						className="btn btn-light"
						onClick={() => editUser(firstName, lastName, pic)}
					>
						Save Edit
					</button>
				</div>
			</div>
		</div>
	);
}
export default UpdateUser;
