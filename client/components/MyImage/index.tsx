import Image from "next/image";

interface MyImageProps {
	src: string;
	alt: string;
	classes?: string;
	width: number;
	height: number;
}
export const MyImage = ({ src, alt, classes, width, height }: MyImageProps) => (
	<Image
		src={src}
		alt={alt}
		layout="fill"
		objectFit="cover"
		className={`${classes}`}
	/> // loader={myLoader}
);
