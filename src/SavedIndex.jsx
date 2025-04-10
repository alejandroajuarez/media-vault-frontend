import axios from "axios";
import { useEffect, useState } from "react";

export function SavedIndex() {
  const [savedMedia, setSavedMedia] = useState([]);
  const getSavedMedia = () => {
    console.log("Fetching saved media...");
    axios.get("http://localhost:3000/saved.json").then(response => {
      setSavedMedia(response.data);
    });
  }

  useEffect(getSavedMedia, []);


  console.log("Saved Media:", savedMedia);
  return (
    <div>
      <h1>Your Saved Entries</h1>
      <hr />
      {savedMedia.map((sm) => (
        <div key={sm.id}>
          <h2>{sm.media_entry.title}</h2>
          <img
            className="cover_image"
            src={sm.media_entry.image_url}
            alt={sm.media_entry.title}
            />
          <p>{sm.rating}</p>
          <p>{sm.media_entry.description}</p>
          <p>Type: {sm.media_type}</p>
          <p>Progress: {sm.progress}</p>
          <p>Creator: {sm.media_entry.creator}</p>
          <p>Status: {sm.media_status}</p>
          <br />
          <hr />
          <br />
        </div>
      ))}
    </div>
  )
}