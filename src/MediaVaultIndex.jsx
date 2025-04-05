export function MediaVaultIndex({ media_entries, onShow }) {
	return (
		<div>
			<h1>Media Vault Index</h1>
			{media_entries.map((entry) => (
				<div key={entry.id}>
					<h2>{entry.title}</h2>
					<p>{entry.description}</p>
					<img
						className="cover_image"
						src={entry.image_url}
						alt={entry.title}
					/>
					<p>Type: {entry.media_type}</p>
					<p>Creator: {entry.creator}</p>
					<button onClick={() => onShow(entry)}>More Info</button>
				</div>
			))}
		</div>
	);
}
