import axios from "axios";
import { useEffect, useState } from "react";
import { Rating, ThinStar } from "@smastrom/react-rating";

// Custom star styling for the Rating component
const myStyles = {
	itemShapes: ThinStar,
	activeFillColor: "#ffb700",
	inactiveFillColor: "#fbf1a9",
};

export function SavedIndex() {
	// State to manage saved media and selected media type filter
	const [savedMedia, setSavedMedia] = useState([]);
	const [selectedMediaType, setSelectedMediaType] = useState("Book");

	// Fetch saved media from the backend on component mount
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

	// Filter savedMedia based on the selected media type.
	// Assumes each savedMedia has a nested media_entry with a media_type property.
	const filteredMedia = savedMedia.filter(
		(sm) => sm.media_entry.media_type === selectedMediaType
	);

	// Group media by status
	const savedGroup = filteredMedia.filter((sm) => sm.media_status === "saved");
	const inProgressGroup = filteredMedia.filter(
		(sm) => sm.media_status === "in_progress"
	);
	const archivedGroup = filteredMedia.filter(
		(sm) => sm.media_status === "archived"
	);

	// Render a single media entry
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
			<Rating
				style={{ maxWidth: 300 }}
				value={Number(sm.rating)}
				onChange={(value) => {
					console.log(`New rating for ${sm.media_entry.title}:`, value);
					// Update local state
					setSavedMedia((prevMedia) =>
						prevMedia.map((item) =>
							item.id === sm.id ? { ...item, rating: value } : item
						)
					);
				}}
				itemStyles={myStyles}
			/>

			<p>{sm.media_entry.description}</p>
			{/* Uncomment if needed: <p>Type: {sm.media_entry.media_type}</p> */}
			<p>Progress: {sm.progress}</p>
			<p>Creator: {sm.media_entry.creator}</p>
		</div>
	);

	return (
		<div style={{ padding: "20px" }}>
			{/* Header */}
			<h1>Your Vaulted Media</h1>

			{/* Media Type Filter Buttons */}
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

			{/* Render grouped media entries */}
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
