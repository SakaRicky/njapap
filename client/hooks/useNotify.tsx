import { useStateValue } from "../contexts";
import { AlertType } from "../types";

export const useNotify = () => {
	const [, dispatch] = useStateValue();

	const notify = (title: string, message: string, type: AlertType) => {
		dispatch({
			type: "SET_ALERT",
			payload: {
				show: true,
				title,
				message,
				type: type
			}
		});
		setTimeout(() => {
			dispatch({ type: "SET_ALERT", payload: null });
		}, 5000);
	};

	return notify;
};
