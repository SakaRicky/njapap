interface PostInputProps {
	handleInputChange: (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
	size?: string;
	text: string;
	error?: boolean;
	onKeyUp: (
		e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
}

export const PostInput = ({
	handleInputChange,
	size,
	text,
	error,
	onKeyUp
}: PostInputProps) => {
	if (size === "small") {
		return (
			<div className="w-full relative">
				<input
					className={`flex w-full p-2 rounded-xl border-2 ${
						error ? "border-red-500" : ""
					} outline-none bg-[#4E5D780D]`}
					type="text"
					placeholder="What's happening?"
					required
					onChange={handleInputChange}
					onKeyUp={onKeyUp}
					value={text}
					minLength={10}
				/>

				{error && (
					<small className={`text-red-500 absolute text-xs `}>
						Post text should be atleast 10 characters
					</small>
				)}
			</div>
		);
	}

	return (
		<div>
			<textarea
				cols={40}
				rows={5}
				className={`flex w-full rounded-xl border-2 ${
					error ? "border-red-500" : ""
				} outline-none bg-[#4E5D780D]`}
				placeholder="What's happening?"
				required
				onChange={handleInputChange}
				onKeyUp={onKeyUp}
				value={text}
				minLength={10}
			/>
			{error && (
				<small className="text-red-500 ml-6">
					Post text should be atleast 10 characters
				</small>
			)}
		</div>
	);
};
