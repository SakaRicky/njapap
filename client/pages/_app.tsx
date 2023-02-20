import "../styles/globals.css";
import { Container } from "../components";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StateProvider } from "../contexts";
import { MantineProvider, createEmotionCache } from "@mantine/core";

const myCache = createEmotionCache({
	key: "mantine",
	prepend: false
});

// Create a client
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
	<MantineProvider emotionCache={myCache}>
		<QueryClientProvider client={queryClient}>
			<StateProvider>
				<Container>
					<Component {...pageProps} />;
				</Container>
			</StateProvider>
		</QueryClientProvider>
	</MantineProvider>
);

export default MyApp;
