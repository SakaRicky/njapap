interface ButtonProps {
	type?: "submit" | "button";
	callback?: () => void;
	children?: React.ReactNode;
}

export const Button = ({ type, callback, children }: ButtonProps) => (
	<button
		className="bg-blue-500 hover:bg-blue-700 
      text-white w-full font-bold py-2 px-4 rounded-lg 
      focus:outline-none focus:shadow-outline h-[40px]"
		onClick={callback}
		type={type}
	>
		{children}
	</button>
);

export default Button;
