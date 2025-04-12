import axios from "axios";
import { useEffect, useState } from "react";

export function SavedIndex() {
	const [savedMedia, setSavedMedia] = useState([]);

	const getSavedMedia = () => {
		console.log("Fetching saved media...");
		axios.get("http://localhost:3000/saved.json").then((response) => {
			setSavedMedia(response.data);
		});
	};

	useEffect(getSavedMedia, []);

	// Filter the saved media by status
	const savedGroup = savedMedia.filter((sm) => sm.media_status === "saved");
	const inProgressGroup = savedMedia.filter(
		(sm) => sm.media_status === "in_progress"
	);
	const archivedGroup = savedMedia.filter(
		(sm) => sm.media_status === "archived"
	);

	// A helper function to render each media entry
	const renderMediaEntry = (sm) => (
		<div
			key={sm.id}
			style={{
				marginBottom: "10px",
				borderBottom: "1px solid #ccc",
				paddingBottom: "10px",
			}}
		>
			<h3>{sm.media_entry.title}</h3>
			<img
				className="cover_image"
				src={sm.media_entry.image_url}
				alt={sm.media_entry.title}
				style={{ maxWidth: "100%", height: "auto" }}
			/>
			<p>{sm.rating}</p>
			<p>{sm.media_entry.description}</p>
			<p>Type: {sm.media_type}</p>
			<p>Progress: {sm.progress}</p>
			<p>Creator: {sm.media_entry.creator}</p>
		</div>
	);

	return (
		<div>
			<h1>Your Saved Entries</h1>
			<hr />
			{/* Using a flex container in column direction to stack sections vertically */}
			<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				<div>
					<h2>Saved</h2>
					{savedGroup.length > 0 ? (
						savedGroup.map(renderMediaEntry)
					) : (
						<p>No saved entries</p>
					)}
				</div>
				<div>
					<h2>In Progress</h2>
					{inProgressGroup.length > 0 ? (
						inProgressGroup.map(renderMediaEntry)
					) : (
						<p>No in-progress entries</p>
					)}
				</div>
				<div>
					<h2>Archived</h2>
					{archivedGroup.length > 0 ? (
						archivedGroup.map(renderMediaEntry)
					) : (
						<p>No archived entries</p>
					)}
				</div>
			</div>
		</div>
	);
}
