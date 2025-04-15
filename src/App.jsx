import axios from "axios";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { MediaVaultPage } from "./MediaVaultPage";
import { MediaVaultNew } from "./MediaVaultNew";
import { SavedIndex } from "./SavedIndex";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { LogoutLink } from "./LogoutLink";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import "./App.css";

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.withCredentials = true;

const router = createBrowserRouter([
	{
		element: (
			<div className="min-h-screen flex flex-col">
				<Header />
				<Outlet />
				<Footer />
				<ScrollToTop />
			</div>
		),
		children: [
			{
				path: "/",
				element: <MediaVaultPage />,
			},
			{
				path: "/signup",
				element: <SignupPage />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/media/new",
				element: <MediaVaultNew />,
			},
			{
				path: "/saved",
				element: <SavedIndex />,
				loader: () => {
					axios
						.get("http://localhost:3000/saved.json")
						.then((response) => response.data);
				},
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;