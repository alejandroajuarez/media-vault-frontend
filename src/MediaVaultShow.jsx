import axios from "axios";

export function MediaVaultShow({ media }) {

	const handleSubmitSaved = (event) => {
		event.preventDefault();
		console.log("Saving Entry to Vault");
		const params = new FormData(event.target);
		axios.post("http://localhost:3000/saved.json", params).then((response) => {
			console.log(response.data);
			// window.location.href = "/";
		});
	}

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
							<option>Save for Later</option>
							<option>In-Progress</option>
							<option>Archived</option>
						</select>
					</div>	
					<div>
						Where have you left off?
							<input defaultValue={media.progress} type="text" name="progress" />
					</div>
					<div>
					// Favorite logic will go here
					</div>
					<input type="hidden" name="creator" value={media.creator} />
					<input type="hidden" name="media_entry_id" value={media.id} />
				<button type="submit">Save to Vault</button>
			</form>
		</div>
	);
}