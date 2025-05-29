import axios from "axios";

export function MediaVaultShow({ media }) {
	const handleSubmitSaved = (event) => {
		event.preventDefault();
		const params = new FormData(event.target);

		// Make endpoint dynamic based on media type
		const url = media.savedId ? `/saved/${media.savedId}.json` : "/saved.json";

		// Decide whether to create or update
		const method = media.savedId ? axios.patch : axios.post;

		// Use the selected URL and method to send the request
		method(url, params)
			.then((response) => {
				console.log("Response:", response.data);
				window.location.href = "/"; // Redirect to saved index
			})
			.catch((error) => {
				console.error("Error saving media:", error);
			});
	};

	return (
		<div className="flex flex-wrap gap-5 p-2">
			{/* Left Column: Cover Image */}
			<div className="basis-[40%] items-center border-r border-gray-300 pr-5">
				<img
					src={media.image_url}
					alt={media.title}
					className="w-full h-full object-contain"
				/>
			</div>

			{/* Right Column: Media Info and Form */}
			<div className="flex-1 basis-[55%] pl-5">
				<h1 className="text-2xl font-bold mb-4">Vault Entry Information</h1>
				<p className="mb-2">
					<strong>Title:</strong> {media.title}
				</p>
				<p className="mb-2">
					<strong>Description:</strong> {media.description}
				</p>
				<p className="mb-2">
					<strong>
						{media.media_type === "Book" ? "Author" : "Director"}:
					</strong>{" "}
					{media.creator}
				</p>
				<hr className="my-4" />
				<form onSubmit={handleSubmitSaved}>
					<div className="mb-4">
						<label className="block mb-2">
							How would you like to save this?
						</label>
						<select
							defaultValue={media.media_status}
							name="media_status"
							className="border border-gray-300 rounded px-2 py-1"
						>
							<option value="saved">Save for Later</option>
							<option value="in_progress">In-Progress</option>
							<option value="archived">Archived</option>
						</select>
					</div>
					<div className="mb-4">
						<label className="block mb-2">
							Enter your current progress (e.g., page number, chapter, or
							episode):
						</label>
						<input
							defaultValue={media.progress}
							type="text"
							name="progress"
							className="border border-gray-300 rounded px-2 py-1 w-full"
						/>
					</div>
					<input type="hidden" name="creator" value={media.creator} />
					<input type="hidden" name="media_entry_id" value={media.id} />
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Save to Vault
					</button>
				</form>
			</div>
		</div>
	);
}
