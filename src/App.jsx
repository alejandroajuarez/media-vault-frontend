import axios from "axios";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { MediaVaultPage } from "./MediaVaultPage";
import { MediaVaultNew } from "./MediaVaultNew";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { LogoutLink } from "./LogoutLink";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./App.css";

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.withCredentials = true;

const router = createBrowserRouter([
	{
		element: (
			<div>
				<Header />
				<Outlet />
				<Footer />
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
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
