/* eslint-disable @next/next/no-img-element */
import { MyImage } from "../../MyImage";

export const PostImage = ({ src, height }: { src: string; height: number }) => (
	<div className={`rounded-lg w-full h-${height} relative overflow-hidden`}>
		{/* <MyImage
			classes="rounded-lg"
			src={src}
			height={0}
			width={0}
			alt="Profile picture"
		/> */}
		<img
			src={src}
			alt={src}
			className="rounded-lg object-cover w-full h-full"
		/>
	</div>
);
