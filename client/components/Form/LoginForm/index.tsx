import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { TextInput } from "../TextInput";
import {
	GoogleExternalSignup,
	FacebookExternalSignup,
	LinkedInExternalSignup
} from "../ExternalSignup";
import { Button } from "../../Button";
import { PasswordInput } from "../PasswordInput";
import { useStateValue } from "../../../contexts";
import { useNotify } from "../../../hooks/useNotify";
import { loginUser } from "../../../services";

interface LoginFormProps {
	authentifyWithGoogle: () => void;
	authentifyWithLinkedIn: () => void;
	authentifyWithFacebook: () => void;
}

export const LoginForm = ({
	authentifyWithGoogle,
	authentifyWithLinkedIn,
	authentifyWithFacebook
}: LoginFormProps) => {
	const [state, dispatch] = useStateValue();
	const notify = useNotify();
	const router = useRouter();

	useEffect(() => {}, []);

	useEffect(() => {}, []);

	const initialValues = {
		email: "",
		password: ""
	};

	const validationSchema = yup.object({
		email: yup
			.string()
			.email("Invalid email address")
			.required("Please enter your Email"),
		password: yup
			.string()
			.required("No password provided.")
			.min(8, "Password is too short - should be 8 chars minimum.")
	});

	const handleLogin = async (values: { email: string; password: string }) => {
		try {
			const loggedInUser = await loginUser(values);
			localStorage.setItem("loggedUser", JSON.stringify(loggedInUser));
			dispatch({ type: "SET_LOGGED_USER", payload: loggedInUser });
			router.push("/feed");
		} catch (error: any) {
			console.log("error.message: ", error.message);
			notify("Loggin Error", error.message, "error");
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={values => {
				handleLogin(values);
			}}
		>
			<Form className="bg-white rounded-lg p-5 min-w-[400px] w-full max-w-xl mx-4 md:mx-auto flex flex-col justify-between gap-5 drop-shadow-xl">
				<div className="signup-with grid grid-cols-2 gap-1">
					<GoogleExternalSignup login callback={authentifyWithGoogle} />
					<FacebookExternalSignup login callback={authentifyWithFacebook} />
					<LinkedInExternalSignup login callback={authentifyWithLinkedIn} />
				</div>
				{/* <h1>User {state.user?.email}</h1> */}
				<div className="relative flex py-2 items-center">
					<div className="flex-grow border-t border-gray-300" />
					<span className="flex-shrink mx-4 text-gray-600">OR</span>
					<div className="flex-grow border-t border-gray-300" />
				</div>
				<TextInput
					label="Your Email"
					name="email"
					type="email"
					placeholder="Your Email"
				/>

				<PasswordInput
					name="password"
					type="password"
					label="Password"
					placeholder="Your password here"
				/>
				<Button type="submit">Sign In</Button>
				<small className="mx-auto">
					{`Don't have an account?  `}
					<button
						type="button"
						className="text-blue-500 hover:text-blue-700 ml-2"
						tabIndex={0}
						onClick={() => router.push("/signup")}
						onKeyPress={() => router.push("/signup")}
					>
						Sign Up
					</button>
				</small>
			</Form>
		</Formik>
	);
};
