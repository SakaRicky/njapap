// import { langCodes } from '../../constants/constants';
import React from "react";
import { useStateValue } from "../../contexts";
import { Alert } from "@mantine/core";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons";
import { IconInfoCircle } from "@tabler/icons";
import { IconAlertOctagon } from "@tabler/icons";
import TopBar from "./TopBar";

export const Container = ({ children }: { children: React.ReactNode }) => {
	const [state] = useStateValue();

	let alertColor = "";
	let alertIcon;
	switch (state.alert?.type) {
		case "error":
			alertColor = "red";
			alertIcon = <IconAlertCircle size={16} />;
			break;

		case "success":
			alertColor = "green";
			alertIcon = <IconCircleCheck size={16} />;
			break;

		case "info":
			alertColor = "indigo";
			alertIcon = <IconInfoCircle size={16} />;
			break;

		case "warning":
			alertColor = "orange";
			alertIcon = <IconAlertOctagon size={16} />;
			break;

		default:
			break;
	}

	return (
		<div className="relative h-full w-full flex flex-col bg-gray-200">
			<TopBar />
			<div className="fixed z-10 top-8 left-1/2 transform -translate-x-1/2">
				{state.alert?.show ? (
					<Alert title={state.alert.title} icon={alertIcon} color={alertColor}>
						{state.alert.message}
					</Alert>
				) : null}
			</div>
			<div className="mt-24">{children}</div>
		</div>
	);
};

export default Container;
