import { Dispatch, SetStateAction, useState } from "react";
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostReacted } from "./PostReacted";
import { PostReactions } from "./PostReactions";
import { PostComments } from "./PostComments";
import { useStateValue } from "../../contexts";
import { Comments } from "./Comments";
import { PostMenu } from "./PostMenu";
import { Post } from "../../types";
import { PostSubMenuType } from "../../pages/feed";

interface PostCardProps {
	post: Post;
	fetchPosts: () => void;
	displayPostSubMenu: PostSubMenuType[];
	setdisplayPostSubMenu: Dispatch<SetStateAction<PostSubMenuType[]>>;
}

export const PostCard = ({
	post,
	fetchPosts,
	displayPostSubMenu,
	setdisplayPostSubMenu
}: PostCardProps) => {
	const [state] = useStateValue();
	const [showComments, setShowComments] = useState(false);

	const toggleShowComments = () => {
		setShowComments(prevState => !prevState);
	};
	const postSubmenu = displayPostSubMenu.find(
		subMenuState => subMenuState.id === post.id
	);
	const showSubMenu = postSubmenu?.show;

	const postImages =
		post?.images?.length === 1 //if only 1 image then it should be larger with bigger height
			? post.images.map(image => (
					<PostImage key={image} src={image} height={72} />
			  ))
			: post?.images?.length > 1
			? post.images.map(image => (
					<PostImage key={image} src={image} height={48} />
			  ))
			: null;

	return (
		<div className="bg-white mt-4 md:rounded-lg p-5 flex flex-col justify-between gap-5 drop-shadow-xl w-full max-w-[700px] mx-auto h-auto text-gray-600 border">
			<div className="relative">
				{state.loggedUser && (
					<PostHeader
						headerImageSRC={post.user.profilePicture}
						post={post}
						setdisplayPostSubMenu={setdisplayPostSubMenu}
						displayPostSubMenu={displayPostSubMenu}
						Loggedusername={state.loggedUser.username}
					/>
				)}
				{showSubMenu ? <PostMenu post={post} fetchPosts={fetchPosts} /> : null}
			</div>
			<p className="text-gray-600">{post.body}</p>
			<div
				className={`grid grid-cols-${
					post?.images?.length > 1 ? "2" : "1" //if only 1 image the grid-cols-1
				} gap-2`}
			>
				{postImages}
			</div>
			{/* <PostReacted comments={post?.comments} likes={post?.likes} />
      <PostReactions
        post={post}
        toggleShowComments={toggleShowComments}
        showCommentsButton={post?.comments?.length > 0}
        fetchPosts={fetchPosts}
      />
      <PostComments postId={post.postId} user={state.user} fetchPosts={fetchPosts} />
      {post.comments && showComments && (
        <Comments comments={post.comments} postId={post.postId} fetchPosts={fetchPosts} />
      )} */}
		</div>
	);
};
