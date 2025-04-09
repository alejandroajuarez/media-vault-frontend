import axios from "axios";
import { useEffect, useState } from "react";

export function MediaVaultShow({ media, onUpdate, onDestroy }) {

	const [savedMedia, setSavedMedia] = useState([]);
	const getSavedMedia = () => {
		axios.get("http://localhost:3000/media.json").then((response) => {
			setSavedMedia(response.data);
		});
	}

	useEffect(getSavedMedia, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const params = new FormData(form);
		const successCallback = () => form.reset();
		onUpdate(media, params, successCallback);
		window.location.href = "/";
	};

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
			<form onSubmit={handleSubmit}>
				<div>
					Title: <input defaultValue={media.title} name="title" type="text" />
				</div>
				<div>
					Description:
					<input
						defaultValue={media.description}
						name="description"
						type="text"
					/>
				</div>
				<div>
					Media Type:
					<select defaultValue={media.media_type} name="media_type" required>
						<option>TV Show</option>
						<option>Movie</option>
						<option>Book</option>
					</select>
				</div>
				<div>
					Cover Image:{" "}
					<input defaultValue={media.image_url} name="image_url" type="text" />
				</div>
				<div>
					Creator:{" "}
					<input defaultValue={media.creator} name="creator" type="text" />
				</div>
				<button type="submit">Update</button>
			</form>
			<button onClick={() => onDestroy(media)}>Delete</button>
			<hr />
			<form onSubmit={handleSubmitSaved}>
				<input type="hidden" name="media_entry_id" value={media.id} />
				<button type="submit">Save to Vault</button>
			</form>
		</div>
	);
}