import Image from "next/image";

interface ExternalSignupProps {
	login: boolean;
	callback: () => void;
}

/* eslint-disable jsx-a11y/anchor-is-valid */
export const GoogleExternalSignup = ({
	login,
	callback
}: ExternalSignupProps) => (
	<button
		type="button"
		onClick={callback}
		className="bg-gray-200 hover:bg-gray-300 w-full md:px-4 flex gap-3 items-center justify-center rounded-lg shrink-0"
	>
		<Image src="/icons/google.svg" width={20} height={20} alt="Google Signup" />
		<span className="text-[#4E5D78] text-sm my-2 font-semibold md:text-base leading-6">
			{login ? "Login" : "Signup"} with Google
		</span>
	</button>
);

export const FacebookExternalSignup = ({
	login,
	callback
}: ExternalSignupProps) => (
	<button
		type="button"
		onClick={callback}
		className="bg-gray-200 hover:bg-gray-300 w-full md:px-4 flex gap-3 items-center justify-center rounded-lg shrink-0"
	>
		<Image
			src="/icons/facebook.svg"
			width={20}
			height={20}
			alt="LinkedIn Signup"
		/>

		<span className="text-[#4E5D78] text-sm my-2 font-semibold md:text-base leading-6">
			{login ? "Login" : "Signup"} with Facebook
		</span>
	</button>
);

export const LinkedInExternalSignup = ({
	login,
	callback
}: ExternalSignupProps) => (
	<button
		type="button"
		onClick={callback}
		className="bg-gray-200 hover:bg-gray-300 w-full md:px-4 flex gap-3 items-center justify-center rounded-lg shrink-0"
	>
		<Image
			src="/icons/linkedin.svg"
			width={20}
			height={20}
			alt="LinkedIn Signup"
		/>

		<span className="text-[#4E5D78] text-sm my-2 font-semibold md:text-base leading-6">
			{login ? "Login" : "Signup"} with LinkedIn
		</span>
	</button>
);
