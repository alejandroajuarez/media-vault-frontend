export function MediaVaultShow({ media }) {
	return (
		<div className="media-vault-show">
			<h1>Vault Entry Information</h1>
			<p>Title: {media.title}</p>
			<p>Description: {media.description}</p>
			<p>Media Type: {media.media_type}</p>
			<p>Cover Image: {media.cover_image}</p>
			<p>Creator: {media.creator}</p>
		</div>
	);
}
