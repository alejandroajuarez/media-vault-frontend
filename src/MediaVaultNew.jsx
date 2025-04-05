import axios from "axios";
import { useState } from "react";

export function MediaVaultNew({ onCreate }) {
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const params = new FormData(form);
		const successCallback = () => form.reset();
		// Convert FormData to a regular object
		onCreate(params, successCallback);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Title:
					<input type="text" name="title" required />
				</label>
				<br />
				<label>
					Description:
					<textarea name="description" required></textarea>
				</label>
				<br />
				<label>
					Image URL:
					<input type="url" name="image_url" required />
				</label>
				<br />
				<label>
					Type:
					<select name="media_type" required>
						<option value="show">TV Show</option>
						<option value="video">Movie</option>
						<option value="book">Book</option>
					</select>
				</label>
				<br />
				<label>
					Creator:
					<input type="text" name="creator" required />
				</label>
				<br />
				<button type="submit">Create Media Entry</button>
			</form>
			<p>Click the button to create a new media entry.</p>
			{/* Add any additional content or styling here */}
		</div>
	);
}
