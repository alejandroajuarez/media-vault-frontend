import axios from "axios";

export function MediaVaultShow({ media }) {
	const handleSubmitSaved = (event) => {
		event.preventDefault();
		console.log("Saving Entry to Vault");
		const params = new FormData(event.target);

		// No manual transformation is needed if the <select> provides the correct values

		axios
			.post("http://localhost:3000/saved.json", params)
			.then((response) => {
				console.log("Response:", response.data);
				// Optionally, you can redirect or update UI here:
				// window.location.href = "/";
			})
			.catch((error) => console.error("Error during saving:", error));
	};

	return (
		<div className="media-vault-show">
			<h1>Vault Entry Information</h1>
			<p>Title: {media.title}</p>
			<p>Description: {media.description}</p>
			<p>Media Type: {media.media_type}</p>
			<p>Cover Image: {media.image_url}</p>
			<p>Creator: {media.creator}</p>
			<hr />
			<form onSubmit={handleSubmitSaved}>
				<div>
					How would you like to save this?
					<select defaultValue={media.media_status} name="media_status">
						<option value="saved" className="saved">
							Save for Later
						</option>
						<option value="in_progress" className="in_progress">
							In-Progress
						</option>
						<option value="archived" className="archived">
							Archived
						</option>
					</select>
				</div>
				<div>
					Where have you left off?
					<input defaultValue={media.progress} type="text" name="progress" />
				</div>
				<div>// Favorite logic will go here</div>
				<input type="hidden" name="creator" value={media.creator} />
				<input type="hidden" name="media_entry_id" value={media.id} />
				<button type="submit">Save to Vault</button>
			</form>
		</div>
	);
}
