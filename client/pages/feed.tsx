import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { CreatePost, PostCard, Sidebar, FriendsList } from "../components";
import MobileSidebar from "../components/Container/Sidebar/MobileSidebar";
import { useStateValue } from "../contexts";
import { getPosts } from "../services";
import { LoggedUser, Post } from "../types";

export type PostSubMenuType = {
	id: string;
	show: boolean;
};

const Feed = () => {
	const [state, dispatch] = useStateValue();
	const [posts, setPosts] = useState<Post[]>();
	// used to display sub menu when post threeDots is clicked
	const [displayPostSubMenu, setdisplayPostSubMenu] = useState<
		PostSubMenuType[]
	>([]);

	const router = useRouter();

	const fetchPosts = async () => {
		try {
			const receivedPosts = await getPosts();
			// const receivedPostsSortedByRecentDate = receivedPosts.sort(
			// 	(a, b) => b.createdDate - a.createdDate
			// );
			setdisplayPostSubMenu(
				receivedPosts.map((post: Post) => ({ id: post.id, show: false }))
			);
			console.log("receivedPosts: ", receivedPosts);

			setPosts(receivedPosts);
		} catch (error: any) {
			if (error.message === "Auth expired, Login") {
				localStorage.removeItem("loggedUser");
				dispatch({ type: "SET_LOGGED_USER", payload: null });
				router.push("/login");
			}
		}
	};

	useEffect(() => {
		const loggedUser: LoggedUser = JSON.parse(
			localStorage.getItem("loggedUser") || "{}"
		);

		console.log("loggedUser: ", loggedUser);
		console.log("state.loggedUser: ", state.loggedUser);

		if (Object.keys(loggedUser).length === 0) {
			router.push("/login");
		}
		if (!state.loggedUser) {
			dispatch({
				type: "SET_LOGGED_USER",
				payload: loggedUser
			});
		} else {
			console.log(
				"!state.loggedUser in pages/index.tsx useEffect: ",
				state.loggedUser
			);
		}
	}, []);

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className="relative flex flex-row justify-center">
			<div className="hidden lg:block fixed top-20 left-0 bottom-0 w-[19%] mx-auto bg-white border-t-2">
				<Sidebar />
			</div>
			<div className="post-content-container flex flex-col items-center w-full lg:w-[60%] py-2 lg:ml-4 lg:mr-8 lg:pb-8 lg:rounded-xl mb-12 lg:mb-0">
				<div className="w-full lg:w-[80%]">
					<CreatePost fetchPosts={fetchPosts} />
					{posts ? (
						posts.map(post => (
							<PostCard
								key={post.id}
								post={post}
								fetchPosts={fetchPosts}
								displayPostSubMenu={displayPostSubMenu}
								setdisplayPostSubMenu={setdisplayPostSubMenu}
							/>
						))
					) : (
						<div className="mt-24 flex justify-center">
							<SyncLoader />
						</div>
					)}
				</div>
			</div>
			<div className="hidden lg:block fixed right-0 bottom-0 top-20 bg-white w-[20%] mx-auto max-w-[300px] border-t-2">
				<FriendsList />
			</div>
			<div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white">
				<MobileSidebar />
			</div>
		</div>
	);
};

export default Feed;
