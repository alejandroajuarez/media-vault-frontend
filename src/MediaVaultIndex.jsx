import { useState } from "react";

export function MediaVaultIndex({ media_entries, onShow }) {
	const [searchQuery, setSearchQuery] = useState("");

	// Filter media entries by title (case-insensitive)
	const filteredMedia = media_entries.filter((media) =>
		media.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const books = filteredMedia.filter((media) => media.media_type === "Book");
	const tvShows = filteredMedia.filter((media) => media.media_type === "TV Show");
	const movies = filteredMedia.filter((media) => media.media_type === "Movie");

	// Render a single card with a refined look
	const renderCard = (media) => (
		<div
			key={media.id}
			className="bg-[#1E2938] rounded-xl border border-[var(--gunmetal, #1b2432)] shadow-sm w-72 flex-shrink-0 snap-center flex flex-col hover:shadow-xl transform transition duration-200 hover:scale-105"
		>
			{/* Image Container – Increased top padding */}
			<div className="relative pt-8 px-4 pb-4 h-[360px] w-full">
				<img
					src={media.image_url}
					alt={media.title}
					className="w-full h-full object-contain"
				/>
			</div>

			{/* Content Container with additional padding and a subtle gradient overlay */}
			<div className="p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-transparent to-[#1E2938]">
				{/* Title */}
				<h2 className="text-lg font-bold text-gray-200 mb-2 truncate">
					{media.title}
				</h2>

				{/* Divider */}
				<hr className="border-t border-[var(--gunmetal, #1b2432)] mb-2" />

				{/* Description Section */}
				<div className="relative mb-2">
					<p className="text-sm text-gray-200 line-clamp-4">
						{media.description}
					</p>
					<div className="pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#1E2938]"></div>
				</div>

				{/* Creator / Additional Details */}
				<div className="flex items-center text-sm text-gray-100 mb-4">
					<span className="mr-1">
						{media.media_type === "Book" ? "Author:" : "Director:"}
					</span>
					<span className="font-medium">{media.creator}</span>
				</div>

				{/* More Info Button */}
				<div>
					<button
						onClick={() => onShow(media)}
						className="w-full bg-[#d78c3c] hover:bg-[#a65c5f] text-gray-100 py-2 rounded-md transition-colors duration-200"
					>
						More Info
					</button>
				</div>
			</div>
		</div>
	);

	// Render a row for a given category.
	const renderRow = (label, items) => (
		<div className="mb-10">
			<h2 className="text-xl font-semibold mb-4 text-gray-100">{label}</h2>
			{items.length > 0 ? (
				<div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
					{items.map(renderCard)}
				</div>
			) : (
				<p className="text-gray-500">No {label} found.</p>
			)}
		</div>
	);

	return (
		<div className="p-8 bg-gradient-to-br from-[#121420] to-[#1b2432] min-h-screen">
			<h1 className="text-3xl font-extrabold mb-6 text-gray-100">
				Media Vault Index
			</h1>

			{/* Search Input */}
			<div className="mb-8">
				<input
					type="text"
					placeholder="Search by title..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-[#1E2938] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E2938]"
				/>
			</div>

			{renderRow("Books", books)}
			{renderRow("TV Shows", tvShows)}
			{renderRow("Movies", movies)}
		</div>
	);
}