export function MediaVaultIndex({ media_entries, onShow }) {
	const books = media_entries.filter((media) => media.media_type === "Book");
	const tvShows = media_entries.filter((media) => media.media_type === "TV Show");
	const movies = media_entries.filter((media) => media.media_type === "Movie");

	const renderCard = (media) => (
		<div
			key={media.id}
			className="bg-white rounded-lg shadow-md w-70 h-auto flex-shrink-0 snap-center flex flex-col"
		>
			{/* Image */}
			<div className="relative pt-6 h-86 w-full">
				<img
					src={media.image_url}
					alt={media.title}
					className="w-full h-full object-contain"
				/>
			</div>

			{/* Content container */}
			<div className="p-4 flex flex-col flex-grow overflow-hidden">
				{/* Title */}
				<h2 className="text-xl font-semibold mb-2 truncate">{media.title}</h2>

				{/* Scrollable description */}
				<div className="text-sm mb-2 overflow-y-auto max-h-[100px]">
					{media.description}
				</div>

				{/* Creator line */}
				<p className="text-sm mb-2">
					<strong>Creator:</strong> {media.creator}
				</p>

				{/* Button pinned to bottom */}
				<button
					onClick={() => onShow(media)}
					className="mt-4 bg-blue-500 text-white px-4 py-1 rounded"
				>
					More Info
				</button>
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