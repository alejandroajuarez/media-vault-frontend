import axios from "axios";

export function MediaVaultNew() {
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Handling Submit");
		const params = new FormData(event.target);
		axios.post("http://localhost:3000/media.json", params).then(response => {
			console.log(response.data);
			window.location.href = "/";
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121420] to-[#1b2432] p-8">
			<div className="bg-[#F1EFEC] rounded-xl border border-[#D4C9BE] shadow-xl max-w-lg w-full p-8">
				<h1 className="text-3xl font-bold text-[#123458] mb-6 text-center">
					Create New Media Entry
				</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-[#123458] font-semibold mb-1">
							Title:
						</label>
						<input
							type="text"
							name="title"
							required
							className="w-full border border-[#D4C9BE] rounded-lg px-4 py-2 bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458]"
						/>
					</div>
					<div>
						<label className="block text-[#123458] font-semibold mb-1">
							Description:
						</label>
						<textarea
							name="description"
							required
							className="w-full border border-[#D4C9BE] rounded-lg px-4 py-2 bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458]"
						></textarea>
					</div>
					<div>
						<label className="block text-[#123458] font-semibold mb-1">
							Cover Image:
						</label>
						<input
							type="url"
							name="image_url"
							className="w-full border border-[#D4C9BE] rounded-lg px-4 py-2 bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458]"
						/>
					</div>
					<div>
						<label className="block text-[#123458] font-semibold mb-1">
							Type:
						</label>
						<select
							name="media_type"
							required
							className="w-full border border-[#D4C9BE] rounded-lg px-4 py-2 bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458]"
						>
							<option>TV Show</option>
							<option>Movie</option>
							<option>Book</option>
						</select>
					</div>
					<div>
						<label className="block text-[#123458] font-semibold mb-1">
							Creator:
						</label>
						<input
							type="text"
							name="creator"
							required
							className="w-full border border-[#D4C9BE] rounded-lg px-4 py-2 bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458]"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-[#123458] hover:bg-[#0f2f50] text-white rounded-lg px-4 py-2 transition-colors duration-200"
					>
						Create Media Entry
					</button>
				</form>
				<p className="text-center text-gray-600 mt-4">
					Click the button to create a new media entry.
				</p>
			</div>
		</div>
	);
}