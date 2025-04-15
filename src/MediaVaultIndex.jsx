export function MediaVaultIndex({ media_entries, onShow }) {
	const books = media_entries.filter((media) => media.media_type === "Book");
	const tvShows = media_entries.filter(
		(media) => media.media_type === "TV Show"
	);
	const movies = media_entries.filter((media) => media.media_type === "Movie");

	const renderCard = (media) => (
		<div
			key={media.id}
			className="bg-white rounded-lg shadow-md w-70 h-auto flex-shrink-0 snap-center flex flex-col"
		>
			{/* Image */}
			<div className="relative p-4 h-90 w-full">
				<img
					src={media.image_url}
					alt={media.title}
					className="w-full h-full object-contain"
				/>
			</div>

			{/* Content container */}
			<div className="p-4 flex flex-col flex-grow justify-between overflow-hidden">
				{/* Title */}
				<h2 className="text-xl font-semibold mb-2 truncate">{media.title}</h2>

				{/* Truncated description using Tailwind line clamp */}
				<div className="text-sm mb-2 overflow-hidden line-clamp-3">
					{media.description}
				</div>

				{/* Creator line */}
				<p className="text-sm mb-2">
					<strong>
						{media.media_type === "Book" ? "Author" : "Director"}:
					</strong>{" "}
					{media.creator}
				</p>

				{/* Button pinned to bottom */}
				<div className="mt-4">
					<button
						onClick={() => onShow(media)}
						className="bg-blue-500 text-white px-4 py-1 rounded"
					>
						More Info
					</button>
				</div>
			</div>
		</div>
	);

	const renderRow = (label, items) => (
		<div className="mb-10">
			<h2 className="text-xl font-semibold mb-2">{label}</h2>
			{items.length > 0 ? (
				<div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
					{items.map(renderCard)}
				</div>
			) : (
				<p>No {label} found.</p>
			)}
		</div>
	);

	return (
		<div className="p-5">
			<h1 className="text-2xl font-bold mb-4">Media Vault Index</h1>
			{renderRow("Books", books)}
			{renderRow("TV Shows", tvShows)}
			{renderRow("Movies", movies)}
		</div>
	);
}
