import axios from "axios";

export function MediaVaultNew() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handling Submit");
    const params = new FormData(event.target);
    axios.post("http://localhost:3000/media.json", params).then(response => {
      console.log(response.data);
      window.location.href = "/"
    })
  }

	return (
		<div>
			<h1>Create New Media Entry</h1>
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
					Cover Image:
					<input type="url" name="image_url" />
				</label>
				<br />
				<label>
					Type:
					<select name="media_type" required>
						<option>TV Show</option>
						<option>Movie</option>
						<option>Book</option>
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
		</div>
	);
}
