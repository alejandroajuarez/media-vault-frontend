import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

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
      {savedMedia.map((sm) => (
        <div key={sm.id}>
          <h2>{sm.media_entry.title}</h2>
          <p>{sm.rating}</p>
          <img
            className="cover_image"
            src={sm.media_entry.image_url}
            alt={sm.media_entry.title}
          />
          <p>{sm.description}</p>
          <p>Type: {sm.media_type}</p>
          <p>Creator: {sm.creator}</p>
          <br />
          <hr />
          <br />
        </div>
      ))}
    </div>
  )
}