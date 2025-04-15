import axios from "axios";
import { useState } from "react";

export function MediaVaultShow({ media }) {
	const [error, setError] = useState("");

	const handleSubmitSaved = (event) => {
		event.preventDefault();

		// Check login status before submitting the form.
		if (!localStorage.getItem("jwt")) {
			setError("You must be logged in to save this");
			return;
		}

		// Clear any prior errors
		setError("");
		console.log("Saving Entry to Vault");
		const params = new FormData(event.target);

		axios
			.post("http://localhost:3000/saved.json", params)
			.then((response) => {
				console.log("Response:", response.data);
				window.location.href = "/";
			})
			.catch((err) => {
				console.error("Error during saving:", err);
				setError("An error occurred while saving the entry");
			});
	};

	return (
		<div className="p-8">
			<div className="flex flex-wrap gap-5">
				{/* Left Column: Cover Image */}
				<div className="basis-[40%] items-center border-r border-gray-300 pr-5">
					<img
						src={media.image_url}
						alt={media.title}
						className="w-full h-full object-contain"
					/>
				</div>

				{/* Right Column: Media Info and Save Form */}
				<div className="flex-1 basis-[55%] pl-5">
					<h1 className="text-2xl text-gray-200 font-bold mb-4">Vault Entry Information</h1>
					<p className="mb-2 text-gray-300">
						<strong>Title:</strong> {media.title}
					</p>
					<p className="mb-2 text-gray-300">
						<strong>Description:</strong> {media.description}
					</p>
					<p className="mb-2 text-gray-300">
						<strong>
							{media.media_type === "Book" ? "Author:" : "Director:"}
						</strong>{" "}
						{media.creator}
					</p>
					<hr className="my-4 " />
					<form onSubmit={handleSubmitSaved}>
						<div className="mb-4">
							<label className="block mb-2 text-gray-200">
								How would you like to save this?
							</label>
							<select
								defaultValue={media.media_status}
								name="media_status"
								className="border border-gray-300 text-gray-300 rounded px-2 py-1"
							>
								<option value="saved">Save for Later</option>
								<option value="in_progress">In-Progress</option>
								<option value="archived">Archived</option>
							</select>
						</div>
						<div className="mb-4">
							<label className="block mb-2 text-gray-200">
								Enter your current progress (e.g., page number, chapter, or episode):
							</label>
							<input
								defaultValue={media.progress}
								type="text"
								name="progress"
								className="border border-gray-300 text-gray-300 rounded px-2 py-1 w-full"
							/>
						</div>

						{/* Additional Notes Field */}
						<div className="mb-4">
							<label className="block mb-2 text-gray-200">Additional Notes:</label>
							<textarea
								name="notes"
								placeholder="Enter any additional notes here..."
								className="border border-gray-300 text-gray-300 rounded px-2 py-1 w-full"
							/>
						</div>

						<input type="hidden" name="creator" value={media.creator} />
						<input type="hidden" name="media_entry_id" value={media.id} />

						{/* Error Display */}
						{error && <p className="text-red-500 mb-4">{error}</p>}
						<button
							type="submit"
							className="w-full bg-[#b79168] hover:bg-[#a65c5f] text-gray-100 py-2 rounded-md transition-colors duration-200"
						>
							Save to Vault
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}