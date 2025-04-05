export function MediaVaultIndex({ media_entries }) {
	return (
		<div>
			<h1>Media Vault Index</h1>
			{media_entries.map((entry) => (
				<div key={entry.id}>
					<h2>{entry.title}</h2>
					<p>{entry.description}</p>
					<img src={entry.image_url} alt={entry.title} />
					<p>Type: {entry.media_type}</p>
					<p>Creator: {entry.creator}</p>
				</div>
			))}
		</div>
	);
}
