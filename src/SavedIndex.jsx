import axios from "axios";
import { Link } from "react-router-dom";
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
	const [selectedMedia, setSelectedMedia] = useState(null); // For modal media
	const [error, setError] = useState(""); // To display errors for non-logged in users

	// Check login status
	const isLoggedIn = !!localStorage.getItem("jwt");

	// Only fetch saved media if logged in.
	useEffect(() => {
		if (!isLoggedIn) {
			setError("You must be logged in to view your saved media.");
			return;
		}
		console.log("Fetching saved media...");
		axios
			.get("http://localhost:3000/saved.json")
			.then((response) => {
				console.log("Response from backend:", response.data);
				setSavedMedia(response.data);
			})
			.catch((error) => {
				console.error("Error fetching saved media:", error);
				setError("Error fetching saved media.");
			});
	}, [isLoggedIn]);

	// Toggle the favorite status for a given saved media item.
	const handleToggleFavorite = (savedMediaId, currentFavorite) => {
		axios
			.patch(
				`http://localhost:3000/saved/${savedMediaId}.json`,
				{ favorite: !currentFavorite },
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

	// New: Filter for favorites regardless of type.
	const favoritesGroup = savedMedia.filter((sm) => sm.favorite === true);

	// Group the rest by status.
	const savedGroup = filteredMedia.filter((sm) => sm.media_status === "saved");
	const inProgressGroup = filteredMedia.filter(
		(sm) => sm.media_status === "in_progress"
	);
	const archivedGroup = filteredMedia.filter(
		(sm) => sm.media_status === "archived"
	);

	// Render a single media card.
	const renderMediaEntry = (sm) => (
		<div
			key={sm.id}
			className="bg-[#1E2938] rounded-xl border border-[var(--gunmetal, #1b2432)] shadow-sm w-72 flex-shrink-0 snap-center flex flex-col hover:shadow-xl transform transition duration-200 hover:scale-105"
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
						<span className="text-red-500 text-2xl">❤️</span>
					) : (
						<span className="text-gray-500 text-2xl">♡</span>
					)}
				</button>
			</div>

			{/* Content container */}
			<div className="p-4 flex flex-col flex-grow justify-between overflow-hidden">
				<div>
					{/* Title */}
					<h3 className="text-xl font-semibold mb-2 truncate text-white">
						{sm.media_entry.title}
					</h3>

					{/* Rating */}
					<div className="mb-2" style={{ maxWidth: "150px" }}>
						<Rating
							value={Number(sm.rating)}
							onChange={(value) => {
								console.log(`New rating for ${sm.id}:`, value);
								// PATCH request to update rating on the backend.
								axios
									.patch(
										`http://localhost:3000/saved/${sm.id}.json`,
										{ rating: value },
										{ headers: { "Content-Type": "application/json" } }
									)
									.then((response) => {
										console.log("PATCH response for rating:", response.data);
										setSavedMedia((prevMedia) =>
											prevMedia.map((item) =>
												item.id === sm.id
													? { ...item, rating: response.data.rating }
													: item
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

					{/* Truncated description */}
					<div className="text-sm mb-2 overflow-hidden line-clamp-3 text-white">
						{sm.media_entry.description}
					</div>

					{/* Progress */}
					<p className="text-sm mb-2 text-white">
						<strong>Progress: </strong>
						{sm.progress}
					</p>

					{/* Creator */}
					<p className="text-sm mb-2 text-white">
						<strong>
							{sm.media_entry.media_type === "Book" ? "Author:" : "Director:"}
						</strong>{" "}
						{sm.media_entry.creator}
					</p>
				</div>

				{/* Button Row: More Info + Delete */}
				<div className="mt-4 flex gap-2">
					<button
						onClick={() => setSelectedMedia(sm.media_entry)}
						className="w-1/2 bg-blue-500 text-white px-4 py-1 rounded transition-colors duration-200"
					>
						More Info
					</button>
					<button
						onClick={() => {
							if (confirm("Are you sure you want to delete this entry?")) {
								axios
									.delete(`http://localhost:3000/saved/${sm.id}.json`)
									.then(() => {
										setSavedMedia((prevMedia) =>
											prevMedia.filter((item) => item.id !== sm.id)
										);
									})
									.catch((err) => {
										console.error("Failed to delete:", err);
										alert("Failed to delete entry.");
									});
							}
						}}
						className="w-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition-colors duration-200"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);

	// Reusable renderRow function for a category.
	const renderRow = (label, items) => (
		<div className="mb-10">
			<h2 className="text-xl font-bold mb-4 text-white">{label}</h2>
			{items.length > 0 ? (
				<div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
					{items.map(renderMediaEntry)}
				</div>
			) : (
				<p className="text-gray-500">No {label} found.</p>
			)}
		</div>
	);

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-[#121420] to-[#1b2432]">
			<div className="flex-grow p-5">
				<h1 className="text-2xl font-bold mb-4 text-white">
					Your Vaulted Media
				</h1>

				{error && <p className="text-red-500 mb-4">{error}</p>}

				{/* Filter Buttons */}
				<div className="mb-5 text-white">
					<button
						onClick={() => setSelectedMediaType("Book")}
						className={`mr-2 ${selectedMediaType === "Book" ? "font-bold" : "font-normal"}`}
					>
						Books
					</button>
					<button
						onClick={() => setSelectedMediaType("TV Show")}
						className={`mr-2 ${selectedMediaType === "TV Show" ? "font-bold" : "font-normal"}`}
					>
						TV Shows
					</button>
					<button
						onClick={() => setSelectedMediaType("Movie")}
						className={`${selectedMediaType === "Movie" ? "font-bold" : "font-normal"}`}
					>
						Movies
					</button>
				</div>

				{isLoggedIn ? (
					<div className="space-y-10">
						{renderRow("Favorites", favoritesGroup)}
						{renderRow("Saved", savedGroup)}
						{renderRow("In Progress", inProgressGroup)}
						{renderRow("Archived", archivedGroup)}
					</div>
				) : (
					<p className="text-gray-300">
						<Link to="/login" className="text-blue-400 underline hover:text-blue-300">
							Log in
						</Link>{" "}
						to view and manage your saved media.
					</p>
				)}

				{/* Modal for More Info */}
				{selectedMedia && (
					<Modal show={true} onClose={() => setSelectedMedia(null)}>
						<MediaVaultShow media={selectedMedia} />
					</Modal>
				)}
			</div>
		</div>
	);
}