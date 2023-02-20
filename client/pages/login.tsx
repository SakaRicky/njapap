import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Title } from "../components";
import { LoginForm } from "../components/Form/LoginForm";
import { setUser, useStateValue } from "../contexts";
import { getAuthUser } from "../services";

const Login = () => {
	const [loginError, setLoginError] = useState("");
	const [state, dispatch] = useStateValue();

	const router = useRouter();

	// Clean up the event listener when the component unmounts
	useEffect(() => {
		return () => {
			window.removeEventListener("message", listener);
		};
	}, []);

	const handleLoginError = (error: any) => {
		setLoginError(error);
		setTimeout(() => {
			setLoginError("");
		}, 3000);
	};

	// Listen for a message from the child window
	const listener = async (event: MessageEvent) => {
		console.log("auth success getting user");

		if (event.data === "login_success") {
			// If the login is successful, route to the dashboard
			const authUser = await getAuthUser();
			localStorage.setItem("loggedUser", JSON.stringify(authUser));
			dispatch({ type: "SET_LOGGED_USER", payload: authUser });
			router.push("/feed");
		} else if (event.data === "login_failure") {
			// If the login fails, route to the error page
			router.push("/error");
		}
	};

	const authentifyWithGoogle = () => {
		window.open(
			"http://localhost:3001/auth/google",
			"_blank",
			"width=500,height=700"
		);

		window.addEventListener("message", listener);
	};

	const authentifyWithLinkedIn = () => {
		window.open(
			"http://localhost:3001/auth/linkedin",
			"_blank",
			"width=500,height=700"
		);

		window.addEventListener("message", listener);
	};

	const authentifyWithFacebook = () => {
		window.open(
			"http://localhost:3001/auth/facebook",
			"_blank",
			"width=500,height=700"
		);

		window.addEventListener("message", listener);
	};

	return (
		<div className="flex flex-col items-center">
			<Title
				heading="Sign In"
				subheading={`Welcome back , you've been missed!`}
			/>

			<LoginForm
				authentifyWithGoogle={authentifyWithGoogle}
				authentifyWithLinkedIn={authentifyWithLinkedIn}
				authentifyWithFacebook={authentifyWithFacebook}
			/>
		</div>
	);
};
export default Login;
