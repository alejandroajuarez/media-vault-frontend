import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
	return (
		<header className="bg-gradient-to-r from-[#123458] to-[#0f2f50] text-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo or Site Name */}
					<div className="flex-shrink-0">
						<Link to="/" className="text-2xl font-extrabold tracking-wide">
							Media Vault
						</Link>
					</div>
					{/* Navigation Links */}
					<nav className="flex space-x-6 items-center">
						<Link
							to="/saved"
							className="text-lg hover:text-gray-200 transition-colors duration-200"
						>
							Saved
						</Link>
						{localStorage.getItem("jwt") ? (
							<div className="flex items-center">
								<LogoutLink className="text-lg hover:text-gray-200 transition-colors duration-200" />
							</div>
						) : (
							<>
								<Link
									to="/login"
									className="text-lg hover:text-gray-200 transition-colors duration-200"
								>
									Login
								</Link>
								<Link
									to="/signup"
									className="text-lg hover:text-gray-200 transition-colors duration-200"
								>
									Signup
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}