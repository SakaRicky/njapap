import { MyImage } from "../../MyImage";

export const PostProfileImage = ({
	imageSRC
}: {
	imageSRC: string | undefined;
}) => (
	<div className="overflow-hidden h-[50px] w-[50px] relative cursor-pointer p-0 m-0">
		{imageSRC && (
			<MyImage
				classes="rounded-full"
				src={imageSRC}
				alt="Profile picture"
				width={0}
				height={0}
			/>
		)}
	</div>
);
