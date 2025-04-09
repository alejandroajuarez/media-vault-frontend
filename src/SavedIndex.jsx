import { useLoaderData } from "react-router-dom";

export function SavedIndex() {
  const savedMedia = useLoaderData();
  console.log("Saved Media:", savedMedia);
  return (
    <div>
      <h1>Your Saved Entries</h1>
      {savedMedia.map((media) => (
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
          <br />
          <hr />
          <br />
        </div>
      ))}
    </div>
  )
}