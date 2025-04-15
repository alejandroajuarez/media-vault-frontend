import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
	// Check if a token is present in localStorage
	const isLoggedIn = !!localStorage.getItem("jwt");

	return (
		<header>
			<nav className="flex justify-between items-center bg-gray-800 text-white p-4">
				{/* Left side: Always show these links */}
				<div className="flex space-x-4">
					<Link to="/" className="hover:underline">
						Home
					</Link>
					<Link to="/saved" className="hover:underline">
						Saved
					</Link>
				</div>

				{/* Right side: Conditional rendering */}
				<ul className="flex space-x-4">
					{!isLoggedIn ? (
						<>
							<li>
								<Link to="/signup" className="hover:underline">
									Signup
								</Link>
							</li>
							<li>
								<Link to="/login" className="hover:underline">
									Login
								</Link>
							</li>
						</>
					) : (
						<li>
							<LogoutLink />
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}
