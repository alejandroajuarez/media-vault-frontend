import axios from "axios";
import { useEffect, useState } from "react";
import { Rating, ThinStar } from "@smastrom/react-rating";

// Styles for the thin stars remain unchanged.
const myStyles = {
	itemShapes: ThinStar,
	activeFillColor: "#ffb700",
	inactiveFillColor: "#fbf1a9",
};

export function SavedIndex() {
	const [savedMedia, setSavedMedia] = useState([]);
	const [selectedMediaType, setSelectedMediaType] = useState("Book");

	// Fetch saved media on component mount.
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

	// Toggle the favorite status for a given saved media item.
	const handleToggleFavorite = (savedMediaId, currentFavorite) => {
		axios
			.patch(`http://localhost:3000/saved/${savedMediaId}.json`, {
				favorite: !currentFavorite,
			})
			.then(() => {
				setSavedMedia((prevMedia) =>
					prevMedia.map((item) =>
						item.id === savedMediaId
							? { ...item, favorite: !currentFavorite }
							: item
					)
				);
			})
			.catch((error) => console.error("Error toggling favorite:", error));
	};

	// Filter the saved media by the selected media type.
	const filteredMedia = savedMedia.filter(
		(sm) => sm.media_entry.media_type === selectedMediaType
	);

	// Group filtered media by status.
	const savedGroup = filteredMedia.filter((sm) => sm.media_status === "saved");
	const inProgressGroup = filteredMedia.filter(
		(sm) => sm.media_status === "in_progress"
	);
	const archivedGroup = filteredMedia.filter(
		(sm) => sm.media_status === "archived"
	);

	// Render each media entry as a card.
	const renderMediaEntry = (sm) => (
		<div
			key={sm.id}
			className="bg-white rounded-lg p-4 shadow-md overflow-hidden w-80 h-[500px] flex flex-col"
		>
			{/* Image container with favorite heart positioned at top right */}
			<div className="relative h-74 w-full">
				<img
					src={sm.media_entry.image_url}
					alt={sm.media_entry.title}
					className="w-full h-full object-contain"
				/>
				<button
					onClick={() => handleToggleFavorite(sm.id, sm.favorite)}
					className="absolute top-2 right-2 p-0 bg-transparent border-0 cursor-pointer"
					aria-label="Toggle Favorite"
				>
					{sm.favorite ? (
						<span className="text-red-500 text-2xl">❤️</span>
					) : (
						<span className="text-gray-500 text-2xl">♡</span>
					)}
				</button>
			</div>
			{/* Card content */}
			<div className="p-4 flex flex-col flex-grow">
				<h3 className="text-xl font-semibold mb-2 truncate">
					{sm.media_entry.title}
				</h3>
				<div className="mb-2" style={{ maxWidth: "150px" }}>
					<Rating
						value={Number(sm.rating)}
						onChange={(value) => {
							console.log(`New rating for ${sm.id}:`, value);
							setSavedMedia((prevMedia) =>
								prevMedia.map((item) =>
									item.id === sm.id ? { ...item, rating: value } : item
								)
							);
						}}
						itemStyles={myStyles}
						fractions={2}
						style={{ maxWidth: 150 }}
					/>
				</div>
				<p className="text-sm mb-1">{sm.media_entry.description}</p>
				<p className="text-sm mb-1">Progress: {sm.progress}</p>
				<p className="text-sm">Creator: {sm.media_entry.creator}</p>
			</div>
		</div>
	);

	return (
		<div className="p-5">
			<h1 className="text-2xl font-bold mb-4">Your Vaulted Media</h1>
			{/* Filter Buttons */}
			<div className="mb-5">
				<button
					onClick={() => setSelectedMediaType("Book")}
					className={`mr-2 ${
						selectedMediaType === "Book" ? "font-bold" : "font-normal"
					}`}
				>
					Books
				</button>
				<button
					onClick={() => setSelectedMediaType("TV Show")}
					className={`mr-2 ${
						selectedMediaType === "TV Show" ? "font-bold" : "font-normal"
					}`}
				>
					TV Shows
				</button>
				<button
					onClick={() => setSelectedMediaType("Movie")}
					className={`${
						selectedMediaType === "Movie" ? "font-bold" : "font-normal"
					}`}
				>
					Movies
				</button>
			</div>
			{/* Status Groups arranged as horizontal rows */}
			<div className="space-y-10">
				{/* Saved Row */}
				<div>
					<h2 className="text-xl font-bold mb-4">Saved</h2>
					{savedGroup.length > 0 ? (
						<div className="flex flex-row gap-5 overflow-x-auto">
							{savedGroup.map(renderMediaEntry)}
						</div>
					) : (
						<p>No saved entries</p>
					)}
				</div>
				{/* In Progress Row */}
				<div>
					<h2 className="text-xl font-bold mb-4">In Progress</h2>
					{inProgressGroup.length > 0 ? (
						<div className="flex flex-row gap-5 overflow-x-auto">
							{inProgressGroup.map(renderMediaEntry)}
						</div>
					) : (
						<p>No in-progress entries</p>
					)}
				</div>
				{/* Archived Row */}
				<div>
					<h2 className="text-xl font-bold mb-4">Archived</h2>
					{archivedGroup.length > 0 ? (
						<div className="flex flex-row gap-5 overflow-x-auto">
							{archivedGroup.map(renderMediaEntry)}
						</div>
					) : (
						<p>No archived entries</p>
					)}
				</div>
			</div>
		</div>
	);
}
