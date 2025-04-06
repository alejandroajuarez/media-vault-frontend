import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
	return (
		<header>
			<nav>
				<a href="/">Home</a> | <a href="/media/new">New Entry</a> |{" "}
				<a href="/profile">Profile</a> | <a href="/login">Login</a> |{" "}
				<a href="/signup">Signup</a> | <LogoutLink />
			</nav>
		</header>
	);
}
