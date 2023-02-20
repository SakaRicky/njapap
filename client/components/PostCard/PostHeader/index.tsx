// import { MyImage } from '../../MyImage';
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { PostProfileImage } from "../PostProfileImage";
import { PostSubMenuType } from "../../../pages/feed";
import { Post } from "../../../types";
import { format } from "date-fns";

interface PostHeaderProps {
	headerImageSRC: string;
	post: Post;
	setdisplayPostSubMenu: Dispatch<SetStateAction<PostSubMenuType[]>>;
	displayPostSubMenu: PostSubMenuType[];
	Loggedusername: string;
}

export const PostHeader = ({
	headerImageSRC,
	post,
	setdisplayPostSubMenu,
	displayPostSubMenu,
	Loggedusername
}: PostHeaderProps) => {
	const dateTime = format(new Date(post.createdAt), "yyyy-MM-dd");
	const [svgSource, setSvgSource] = useState("/icons/threeDots.svg");
	console.log();

	const handleDisplaySubMenu = () => {
		const newSubMenuState = displayPostSubMenu.map(postSubMenu => {
			if (postSubMenu.id === post.id) {
				return { ...postSubMenu, show: !postSubMenu.show };
			}
			return { ...postSubMenu, show: false };
		});
		setdisplayPostSubMenu(newSubMenuState);
	};

	const userIsPostAuthor = Loggedusername === post.user.username;

	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center gap-4 rounded-full">
				{headerImageSRC && <PostProfileImage imageSRC={headerImageSRC} />}
				<div className="text-xl">
					<p className="text-sm">{post?.user.username}</p>
					<p className="text-gray-400 text-xs">{dateTime}</p>
				</div>
			</div>
			{userIsPostAuthor && (
				<div
					className="hover:text-blue-400 cursor-pointer"
					onMouseEnter={() => setSvgSource("/icons/blueThreeDots.svg")}
					onMouseLeave={() => setSvgSource("/icons/threeDots.svg")}
				>
					<Image
						src={svgSource}
						width={20}
						height={20}
						alt="menu"
						className=" "
						onClick={handleDisplaySubMenu}
					/>
				</div>
			)}
		</div>
	);
};
