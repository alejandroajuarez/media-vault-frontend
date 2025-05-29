import axios from "axios";
import { useState } from "react";

export function SignupPage() {
	const [errors, setErrors] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrors([]);
		const params = new FormData(event.target);
		axios
			.post("http://localhost:3000/users.json", params)
			.then((response) => {
				console.log(response.data);
				event.target.reset();
				window.location.href = "/"; // Change this as needed.
			})
			.catch((error) => {
				console.log(error.response.data.errors);
				setErrors(error.response.data.errors);
			});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#121420] to-[#1b2432] flex items-center justify-center p-8">
			<div className="bg-[#F1EFEC] rounded-xl border border-[#D4C9BE] shadow-xl w-full max-w-md p-8">
				<h1 className="text-3xl font-bold text-[#123458] mb-6 text-center">Signup</h1>
				{errors.length > 0 && (
					<ul className="mb-4">
						{errors.map((error) => (
							<li key={error} className="text-red-500 text-center">{error}</li>
						))}
					</ul>
				)}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-[#123458] font-semibold mb-1">Name:</label>
						<input
							name="name"
							type="text"
							className="w-full border border-[#D4C9BE] rounded-lg px-4 py-2 bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458]"
						/>
					</div>
					<div>
						<label className="block text-[#123458] font-semibold mb-1">Email:</label>
						<input
							name="email"
							type="email"
							className="w-full border border-[#D4C9BE] rounded-lg px-4 py-2 bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458]"
						/>
					</div>
					<div>
						<label className="block text-[#123458] font-semibold mb-1">Password:</label>
						<input
							name="password"
							type="password"
							className="w-full border border-[#D4C9BE] rounded-lg px-4 py-2 bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458]"
						/>
					</div>
					<div>
						<label className="block text-[#123458] font-semibold mb-1">Confirm your Password:</label>
						<input
							name="password_confirmation"
							type="password"
							className="w-full border border-[#D4C9BE] rounded-lg px-4 py-2 bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458]"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-[#123458] hover:bg-[#0f2f50] text-white rounded-lg px-4 py-2 transition-colors duration-200"
					>
						Signup
					</button>
				</form>
			</div>
		</div>
	);
}