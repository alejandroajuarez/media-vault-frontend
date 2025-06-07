import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
	const [error, setError] = useState("");

	// Check login status
	const isLoggedIn = !!localStorage.getItem("jwt");

	// Only fetch saved media if logged in.
	useEffect(() => {
		if (!isLoggedIn) {
			setError("You must be logged in to view your saved media.");
			return;
		}
		axios
			.get("http://localhost:3000/saved.json")
			.then((response) => {
				setSavedMedia(response.data);
			})
			.catch(() => setError("Error fetching saved media."));
	}, [isLoggedIn]);

	// Toggle favorite status
	const handleToggleFavorite = (id, current) => {
		axios
			.patch(
				`http://localhost:3000/saved/${id}.json`,
				{ favorite: !current },
				{ headers: { "Content-Type": "application/json" } }
			)
			.then((response) => {
				setSavedMedia((prev) =>
					prev.map((item) =>
						item.id === id
							? { ...item, favorite: response.data.favorite }
							: item
					)
				);
			})
			.catch(console.error);
	};

	// Grouping logic
	const filteredMedia = savedMedia.filter(
		(sm) => sm.media_entry.media_type === selectedMediaType
	);
	const favoritesGroup = savedMedia.filter((sm) => sm.favorite);
	const savedGroup = filteredMedia.filter((sm) => sm.media_status === "saved");
	const inProgressGroup = filteredMedia.filter(
		(sm) => sm.media_status === "in_progress"
	);
	const archivedGroup = filteredMedia.filter(
		(sm) => sm.media_status === "archived"
	);

	// Single card renderer
	const renderMediaEntry = (sm) => (
		<div
			key={sm.id}
			className="bg-[#1E2938] rounded-xl border border-[var(--gunmetal, #1b2432)] shadow-sm pt-2 w-72 flex-shrink-0 flex flex-col hover:shadow-xl transform transition duration-200 hover:scale-102 select-none"
			draggable={false}
		>
			<div
				className="relative pt-8 px-4 pb-4 h-[400px] w-full select-none"
				draggable={false}
			>
				<img
					src={sm.media_entry.image_url}
					alt={sm.media_entry.title}
					className="w-full h-full object-contain select-none"
					draggable={false}
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
			<div className="p-4 flex flex-col flex-grow justify-between overflow-hidden">
				<div>
					<h3 className="text-xl font-semibold mb-2 truncate text-white">
						{sm.media_entry.title}
					</h3>
					<div className="mb-2" style={{ maxWidth: "150px" }}>
						<Rating
							value={Number(sm.rating)}
							onChange={(value) => {
								axios
									.patch(
										`http://localhost:3000/saved/${sm.id}.json`,
										{ rating: value },
										{ headers: { "Content-Type": "application/json" } }
									)
									.then((response) => {
										setSavedMedia((prev) =>
											prev.map((item) =>
												item.id === sm.id
													? { ...item, rating: response.data.rating }
													: item
											)
										);
									})
									.catch(console.error);
							}}
							itemStyles={myStyles}
							fractions={2}
							style={{ maxWidth: 150 }}
						/>
					</div>
					<div className="text-sm mb-2 overflow-hidden line-clamp-3 text-white">
						{sm.media_entry.description}
					</div>
					<p className="text-sm mb-2 text-white">
						<strong>Progress: </strong>
						{sm.progress}
					</p>
					<p className="text-sm mb-2 text-white">
						<strong>
							{sm.media_entry.media_type === "Book" ? "Author:" : "Director:"}
						</strong>{" "}
						{sm.media_entry.creator}
					</p>
				</div>
				<div className="mt-4 flex gap-2">
					<button
						onClick={() =>
							setSelectedMedia({ ...sm.media_entry, savedId: sm.id })
						}
						className="w-1/2 hover:bg-[#d78c3c] bg-[#c19565] text-white px-4 py-1 rounded transition-colors duration-200"
					>
						More Info
					</button>
					<button
						onClick={() => {
							if (confirm("Are you sure you want to delete this entry?")) {
								axios
									.delete(`http://localhost:3000/saved/${sm.id}.json`)
									.then(() => {
										setSavedMedia((prev) =>
											prev.filter((item) => item.id !== sm.id)
										);
									})
									.catch(() => alert("Failed to delete entry."));
							}
						}}
						className="w-1/2 bg-red-800 hover:bg-red-700 text-white px-4 py-1 rounded transition-colors duration-200"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);

	// Reusable row renderer with arrows & wheel scroll
	const renderRow = (label, items) => {
		const scrollContainerRef = useRef(null);
		const [showLeft, setShowLeft] = useState(false);
		const [showRight, setShowRight] = useState(false);
		const itemWidth = 288 + 20;
		const scrollByAmount = itemWidth * 5.5;

		const scrollLeft = () => {
			scrollContainerRef.current?.scrollBy({
				left: -scrollByAmount,
				behavior: "smooth",
			});
		};
		const scrollRight = () => {
			scrollContainerRef.current?.scrollBy({
				left: scrollByAmount,
				behavior: "smooth",
			});
		};

		useEffect(() => {
			const c = scrollContainerRef.current;
			if (!c) return;
			const update = () => {
				setShowLeft(c.scrollLeft > 0);
				setShowRight(c.scrollLeft < c.scrollWidth - c.clientWidth - 1);
			};
			update();
			c.addEventListener("scroll", update);
			window.addEventListener("resize", update);
			return () => {
				c.removeEventListener("scroll", update);
				window.removeEventListener("resize", update);
			};
		}, [items.length]);

		return (
			<div className="mb-10 relative">
				<h2 className="text-xl font-bold mb-4 text-white">{label}</h2>
				{items.length > 0 ? (
					<>
						{showLeft && (
							<button
								onClick={scrollLeft}
								className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-500 text-white p-2 rounded-full shadow hover:bg-blue-600"
								aria-label={`Scroll left in ${label}`}
							>
								◀
							</button>
						)}
						{showRight && (
							<button
								onClick={scrollRight}
								className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-500 text-white p-2 rounded-full shadow hover:bg-blue-600"
								aria-label={`Scroll right in ${label}`}
							>
								▶
							</button>
						)}
						<div
							ref={scrollContainerRef}
							onWheel={(e) => {
								e.preventDefault();
								const d = e.deltaY || e.deltaX;
								scrollContainerRef.current.scrollLeft += d;
							}}
							className="flex gap-5 overflow-x-auto pb-4 pt-2 scrollbar-hide"
							style={{
								scrollBehavior: "smooth",
								overscrollBehavior: "contain",
							}}
						>
							{items.map(renderMediaEntry)}
						</div>
					</>
				) : (
					<p className="text-gray-500">No {label} found.</p>
				)}
			</div>
		);
	};

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-[#121420] to-[#1b2432]">
			<div className="flex-grow p-5">
				<h1 className="text-2xl font-bold mb-4 text-white">
					Your Vaulted Media
				</h1>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<div className="mb-5 text-white">
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
				{isLoggedIn ? (
					<div className="space-y-10">
						{renderRow("Favorites", favoritesGroup)}
						{renderRow("Saved", savedGroup)}
						{renderRow("In Progress", inProgressGroup)}
						{renderRow("Archived", archivedGroup)}
					</div>
				) : (
					<p className="text-gray-300">
						<Link
							to="/login"
							className="text-blue-400 underline hover:text-blue-300"
						>
							Log in
						</Link>{" "}
						to view and manage your saved media.
					</p>
				)}
				{selectedMedia && (
					<Modal show={true} onClose={() => setSelectedMedia(null)}>
						<MediaVaultShow media={selectedMedia} />
					</Modal>
				)}
			</div>
		</div>
	);
}
