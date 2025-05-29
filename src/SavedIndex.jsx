import axios from "axios";
import { useEffect, useState } from "react";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { Modal } from "./Modal"; // Adjust the path as needed
import { MediaVaultShow } from "./MediaVaultShow"; // Adjust the path as needed

// Styles for the thin stars remain unchanged.
const myStyles = {
	itemShapes: ThinStar,
	activeFillColor: "#ffb700",
	inactiveFillColor: "#fbf1a9",
};

export function SavedIndex() {
	const [savedMedia, setSavedMedia] = useState([]);
	const [selectedMediaType, setSelectedMediaType] = useState("Book");
	const [selectedMedia, setSelectedMedia] = useState(null); // State for modal media

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
		const newFavoriteValue = !currentFavorite;
		console.log(
			`Toggling favorite for id ${savedMediaId}: current value is ${currentFavorite}, sending ${newFavoriteValue}`
		);
		axios
			.patch(
				`http://localhost:3000/saved/${savedMediaId}.json`,
				{ favorite: newFavoriteValue },
				{ headers: { "Content-Type": "application/json" } }
			)
			.then((response) => {
				console.log("PATCH response for favorite:", response.data);
				setSavedMedia((prevMedia) =>
					prevMedia.map((item) =>
						item.id === savedMediaId
							? { ...item, favorite: response.data.favorite }
							: item
					)
				);
			})
			.catch((error) => console.error("Error updating favorite:", error));
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

	// Render each media entry as a card using Tailwind-based styling.
	const renderMediaEntry = (sm) => (
		<div
			key={sm.id}
			className="bg-white rounded-lg shadow-md w-70 h-auto flex-shrink-0 snap-center flex flex-col"
		>
			{/* Image container with favorite button */}
			<div className="relative p-4 h-90 w-full">
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
						<span className="text-red-500 text-1xl">❤️</span>
					) : (
						<span className="text-gray-500 text-2xl">♡</span>
					)}
				</button>
			</div>

			{/* Content container */}
			<div className="p-4 flex flex-col flex-grow justify-between overflow-hidden">
				<div>
					{/* Title */}
					<h3 className="text-xl font-semibold mb-2 truncate">
						{sm.media_entry.title}
					</h3>

					{/* Rating */}
					<div className="mb-2" style={{ maxWidth: "150px" }}>
						<Rating
							value={Number(sm.rating)}
							onChange={(value) => {
								console.log(`New rating for ${sm.id}:`, value);
								// Send PATCH request to update the rating in the database
								axios
									.patch(`http://localhost:3000/saved/${sm.id}.json`, {
										rating: value,
									})
									.then(() => {
										// Only update local state once the backend has been updated successfully
										setSavedMedia((prevMedia) =>
											prevMedia.map((item) =>
												item.id === sm.id ? { ...item, rating: value } : item
											)
										);
									})
									.catch((error) =>
										console.error("Error updating rating:", error)
									);
							}}
							itemStyles={myStyles}
							fractions={2}
							style={{ maxWidth: 150 }}
						/>
					</div>

					{/* Truncated description using Tailwind line clamp */}
					<div className="text-sm mb-2 overflow-hidden line-clamp-3">
						{sm.media_entry.description}
					</div>

					{/* Progress */}
					<p className="text-sm mb-2">
						<strong>Progress: </strong>
						{sm.progress}
					</p>

					{/* Creator line */}
					<p className="text-sm mb-2">
						<strong>
							{sm.media_entry.media_type === "Book" ? "Author" : "Director"}:
						</strong>{" "}
						{sm.media_entry.creator}
					</p>
				</div>

				{/* More Info Button pinned to bottom */}
				<div className="mt-4">
					<button
						onClick={() =>
							setSelectedMedia({ ...sm.media_entry, savedId: sm.id })
						}
						className="bg-blue-500 text-white px-4 py-1 rounded"
					>
						More Info
					</button>
				</div>
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
						<div className="flex flex-row gap-5 overflow-x-auto pb-4">
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
						<div className="flex flex-row gap-5 overflow-x-auto pb-4">
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
						<div className="flex flex-row gap-5 overflow-x-auto pb-4">
							{archivedGroup.map(renderMediaEntry)}
						</div>
					) : (
						<p>No archived entries</p>
					)}
				</div>
			</div>

			{/* Modal: Displays MediaVaultShow when a card's More Info is clicked */}
			{selectedMedia && (
				<Modal show={true} onClose={() => setSelectedMedia(null)}>
					<MediaVaultShow media={selectedMedia} />
				</Modal>
			)}
		</div>
	);
}
