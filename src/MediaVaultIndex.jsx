export function MediaVaultIndex({ media_entries, onShow }) {
	return (
		<div>
			<h1>Media Vault Index</h1>
			{media_entries.map((media) => (
				<div key={media.id}>
					<h2>{media.title}</h2>
					<img
						className="cover_image"
						src={media.image_url}
						alt={media.title}
						/>
					<p>{media.description}</p>
					<p>Type: {media.media_type}</p>
					<p>Creator: {media.creator}</p>
					<button onClick={() => onShow(media)}>More Info</button>
					<br />
					<hr />
					<br />
				</div>
			))}
		</div>
	);
}
