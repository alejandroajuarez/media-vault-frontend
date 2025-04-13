import axios from "axios";
import { useEffect, useState } from "react";

export function SavedIndex() {
	// savedMedia holds the entire list from the backend
	const [savedMedia, setSavedMedia] = useState([]);
	// selectedMediaType holds the filter value; you may choose a different default (or add an "All" option)
	const [selectedMediaType, setSelectedMediaType] = useState("Books");

	// Fetch saved media on component mount
	useEffect(() => {
		console.log("Fetching saved media...");
		axios
			.get("http://localhost:3000/saved.json")
			.then((response) => {
				console.log("Response from backend:", response.data);
				setSavedMedia(response.data);
			})
			.catch((error) => console.error("Error fetching saved media:", error));
	}, []);

	// Filter the saved media by the selected media type.
	// Assumes that each savedMedia record contains a nested media_entry
	// with a media_type field that exactly equals one of "Books", "TV Shows", or "Movies".
	const filteredMedia = savedMedia.filter(
		(sm) => sm.media_entry.media_type === selectedMediaType
	);

	// Group the filtered media by status
	const savedGroup = filteredMedia.filter((sm) => sm.media_status === "saved");
	const inProgressGroup = filteredMedia.filter(
		(sm) => sm.media_status === "in_progress"
	);
	const archivedGroup = filteredMedia.filter(
		(sm) => sm.media_status === "archived"
	);

	// Helper function to render each media entry
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
			<p>Type: {sm.media_entry.media_type}</p>
			<p>Progress: {sm.progress}</p>
			<p>Creator: {sm.media_entry.creator}</p>
		</div>
	);

	return (
		<div style={{ padding: "20px" }}>
			<h1>Your Vaulted Media</h1>

			{/* 
        Filter Buttons: Clicking a button changes the filter.
        The currently selected filter is highlighted by bold text.
      */}
			<div style={{ marginBottom: "20px" }}>
				<button
					onClick={() => setSelectedMediaType("Book")}
					style={{
						fontWeight: selectedMediaType === "Book" ? "bold" : "normal",
						marginRight: "10px",
					}}
				>
					Books
				</button>
				<button
					onClick={() => setSelectedMediaType("TV Show")}
					style={{
						fontWeight: selectedMediaType === "TV Show" ? "bold" : "normal",
						marginRight: "10px",
					}}
				>
					TV Shows
				</button>
				<button
					onClick={() => setSelectedMediaType("Movie")}
					style={{
						fontWeight: selectedMediaType === "Movie" ? "bold" : "normal",
					}}
				>
					Movies
				</button>
			</div>

			{/* Debug: Uncomment the next line to view the raw JSON data */}
			{/* <pre>{JSON.stringify(filteredMedia, null, 2)}</pre> */}

			{/* Layout the status groups vertically */}
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
