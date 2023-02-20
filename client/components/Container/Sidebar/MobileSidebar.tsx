import { useRouter } from "next/router";
import React from "react";
import { navs } from ".";
import Link from "next/link";

const MobileSidebar = () => {
	const router = useRouter();

	const baseClassName =
		"flex flex-col justify-center items-center hover:border-b-4 hover:border-b-[#4E5D78] cursor-pointer m-2 pb-2";

	return (
		<div>
			<ul className="flex gap-6 md:gap-8 justify-center items-center text-xs">
				{navs.map(nav => {
					const className =
						router.asPath === nav.path
							? `${baseClassName} border-b-4 border-b-[#4E5D78]`
							: `${baseClassName} border-b-4 border-b-[transparent]`;

					return (
						// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
						<li key={nav.path} className={className}>
							{nav.icon}
							<Link href={nav.path}>{nav.name}</Link>
							{nav.notification ? (
								<div className="flex items-center justify-center bg-red-500 rounded-full text-white h-5 w-5">
									2
								</div>
							) : null}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default MobileSidebar;
