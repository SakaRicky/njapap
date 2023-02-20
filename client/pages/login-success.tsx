import React, { useEffect } from "react";

const LoginSuccess = () => {
	useEffect(() => {
		setTimeout(() => {
			window.opener.postMessage("login_success", "*");
			window.close();
		}, 1000);
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-4xl">Thanks for login in</h1>
		</div>
	);
};

export default LoginSuccess;
