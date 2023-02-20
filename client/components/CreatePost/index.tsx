import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import { createNewPost } from "../../services";
import { PostProfileImage } from "../PostCard/PostProfileImage";
import { PostInput } from "../PostInput";
import { PreviewImage } from "./PreviewImage";
import { useStateValue } from "../../contexts";
import { Modal, Button, Group } from "@mantine/core";
import { IconPhoto, IconMoodSmile, IconChevronDown } from "@tabler/icons";
import { useNotify } from "../../hooks/useNotify";
import { PostError } from "../../errors/postError";

interface CreatePostProps {
	fetchPosts: () => void;
}

type ImageObject = {
	imageBlob: string;
	name: string;
	image: File;
};

export interface MyFile {
	readonly lastModified: number;
	readonly name: string;
	readonly size: number;
	readonly type: string;
	readonly webkitRelativePath: string;
	prototype: any;
	arrayBuffer(): Promise<ArrayBuffer>;
	slice(start?: number, end?: number, contentType?: string): Blob;
	stream(): ReadableStream;
	text(): Promise<string>;
}

export const CreatePost = ({ fetchPosts }: CreatePostProps) => {
	const [state] = useStateValue();
	const [newPostText, setNewPostText] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [createPost, setCreatePost] = useState(false);
	const [textInputError, setTextInputError] = useState(false);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const notify = useNotify();

	// images that will be uploaded
	const [imagesFiles, setImagesFiles] = useState<File[]>([]);
	// const [videosURLS, setVideosURLS] = useState([]);

	const openCreatePost = () => {
		setIsModalOpen(true);
		setCreatePost(true);
	};

	const closeCreatePost = () => {
		handleCancelCreatePost();
		fetchPosts();
	};

	const handleCancelCreatePost = () => {
		setIsModalOpen(false);
		setCreatePost(false);
		setNewPostText("");
		setImagesFiles([]);
		setTextInputError(false);
		setLoading(false);
	};

	const handleTextChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setNewPostText(e.target.value);
		setTextInputError(false);
	};

	useEffect(() => {}, [newPostText]);

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) {
			return;
		}
		const uploadedFiles = e.target.files;
		setImagesFiles(imagesFiles.concat([...uploadedFiles]));
		e.target.files = null;
	};

	const handleDeleteImage = (imageFileName: string) => {
		const updatedImages = imagesFiles.filter(i => i.name !== imageFileName);
		setImagesFiles(updatedImages);
	};

	const handlePost = async () => {
		if (!newPostText || newPostText.length < 10) {
			setTextInputError(true);
			return;
		}
		setLoading(true);
		const imagesFilesBlob = imagesFiles.map(imageFile => {
			const file = new File([imageFile], imageFile.name, {
				type: imageFile.type
			});
			return new Blob([file]);
		});

		const data = new FormData();
		data.append("postText", newPostText);
		imagesFiles.forEach(image => data.append("files", image, image.name));
		try {
			await createNewPost(data);
			notify(
				"Posting Created",
				"Your post have been successfully created",
				"success"
			);
			closeCreatePost();
		} catch (error: any) {
			closeCreatePost();
			if (error instanceof PostError) {
				notify("Posting Error", error.message, "error");
			}
			notify("Posting Error", error.message, "error");
		}
	};

	const handleKeyUp = (
		e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		if (e.key === "Enter") {
			handlePost();
		}
	};

	if (createPost) {
		return (
			<Modal
				opened={isModalOpen}
				onClose={handleCancelCreatePost}
				withCloseButton={false}
				size={500}
			>
				<div className="text-sm lg:text-md flex justify-between items-center ">
					<h3 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
						Create a post
					</h3>
					<div className="flex items-center gap-1 lg:gap-4">
						<div className="text-gray-400">Visible for</div>
						<div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
							Friends
							<IconChevronDown className="w-5 h-5 lg:w-6 lg:h-6" />
						</div>
					</div>
				</div>
				<hr className="border border-gray-300 my-2" />
				<div className="flex gap-4 mt-4">
					<div className="w-[15%] lg:w-[10%]">
						<PostProfileImage imageSRC={state.loggedUser?.profilePicture} />
					</div>
					<div className="grow">
						<PostInput
							text={newPostText}
							handleInputChange={handleTextChange}
							onKeyUp={handleKeyUp}
							size="large"
							error={textInputError}
						/>
					</div>
				</div>
				<div className="flex gap-2 mt-4">
					{imagesFiles?.map(image => (
						<PreviewImage
							key={image.name}
							imageFile={image}
							handleDeleteImage={handleDeleteImage}
						/>
					))}
				</div>
				<div className="lg:flex items-center justify-between gap-4 text-md">
					<div className="lg:flex gap-4 my-2 lg:my-0">
						<div>
							<label
								htmlFor="post-image"
								className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"
							>
								<IconPhoto size={24} />
								Photo/Video
							</label>
							<input
								style={{ display: "none" }}
								id="post-image"
								type="file"
								accept="image/*,video/*"
								name="image-file"
								multiple={true}
								onChange={handleFileInputChange}
							/>
						</div>
						<div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mt-2 lg:mt-0">
							<IconMoodSmile size={24} />
							Feeling
						</div>
					</div>
					<div className="flex justify-end lg:flex-row gap-2">
						<Button variant="default" onClick={handleCancelCreatePost}>
							Cancel
						</Button>
						<Button loading={loading} onClick={handlePost}>
							Post
						</Button>
					</div>
				</div>
			</Modal>
		);
	}
	return (
		<div
			className="bg-white md:rounded-xl p-5 
     md:mx-auto flex 
    flex-col justify-between 
    gap-5 drop-shadow-xl
    w-full max-w-[700px]
    h-auto text-gray-600 my-0"
		>
			<div className="flex gap-4 items-center">
				<PostProfileImage imageSRC={state.loggedUser?.profilePicture} />
				<PostInput
					size="small"
					text={newPostText}
					error={textInputError}
					handleInputChange={handleTextChange}
					onKeyUp={handleKeyUp}
				/>
			</div>
			<div className="flex flex-row-reverse mt-2">
				{newPostText ? (
					<Button type="submit" loading={loading} onClick={handlePost}>
						Post
					</Button>
				) : (
					<Button onClick={openCreatePost}>Create a Post</Button>
				)}
			</div>
		</div>
	);
};

export default CreatePost;
