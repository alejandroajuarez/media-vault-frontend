export function MediaVaultIndex({ media_entries, onShow }) {
	// Group media entries by type
	const books = media_entries.filter((media) => media.media_type === "Book");
	const tvShows = media_entries.filter(
		(media) => media.media_type === "TV Show"
	);
	const movies = media_entries.filter((media) => media.media_type === "Movie");

	// Card component for each media entry
	const renderCard = (media) => (
		<div
			key={media.id}
			className="bg-white rounded-lg shadow-md overflow-hidden w-80 h-[500px] flex flex-col"
		>
			{/* Image container */}
			<div className="relative h-64 w-full">
				<img
					src={media.image_url}
					alt={media.title}
					className="w-full h-full object-contain"
				/>
			</div>
			{/* Card content */}
			<div className="p-4 flex flex-col flex-grow">
				<h2 className="text-xl font-semibold mb-2 truncate">{media.title}</h2>
				<p className="text-sm mb-2">{media.description}</p>
				<p className="text-sm mb-2">
					<strong>Type:</strong> {media.media_type}
				</p>
				<p className="text-sm mb-2">
					<strong>Creator:</strong> {media.creator}
				</p>
				<button
					onClick={() => onShow(media)}
					className="mt-auto bg-blue-500 text-white px-4 py-2 rounded"
				>
					More Info
				</button>
			</div>
		</div>
	);

	return (
		<div className="p-5">
			<h1 className="text-2xl font-bold mb-4">Media Vault Index</h1>

			{/* Books Row */}
			<div className="mb-10">
				<h2 className="text-xl font-semibold mb-2">Books</h2>
				{books.length > 0 ? (
					<div className="flex flex-row gap-5 overflow-x-auto">
						{books.map(renderCard)}
					</div>
				) : (
					<p>No Books found.</p>
				)}
			</div>

			{/* TV Shows Row */}
			<div className="mb-10">
				<h2 className="text-xl font-semibold mb-2">TV Shows</h2>
				{tvShows.length > 0 ? (
					<div className="flex flex-row gap-5 overflow-x-auto">
						{tvShows.map(renderCard)}
					</div>
				) : (
					<p>No TV Shows found.</p>
				)}
			</div>

			{/* Movies Row */}
			<div>
				<h2 className="text-xl font-semibold mb-2">Movies</h2>
				{movies.length > 0 ? (
					<div className="flex flex-row gap-5 overflow-x-auto">
						{movies.map(renderCard)}
					</div>
				) : (
					<p>No Movies found.</p>
				)}
			</div>
		</div>
	);
}
