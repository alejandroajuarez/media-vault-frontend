import { MediaVaultNew } from "./MediaVaultNew";
import { MediaVaultIndex } from "./MediaVaultIndex";
import { MediaVaultShow } from "./MediaVaultShow";
import { useEffect, useState } from "react";
import axios from "axios";

export function MediaVaultPage() {
	const [media_entries, setMediaEntries] = useState([]);

	const handleIndex = () => {
		console.log("handleIndex called");
		axios.get("/media.json").then((response) => {
			console.log("Response data:", response.data);
			setMediaEntries(response.data);
		});
	};

	const handleCreate = (params, successCallback) => {
		console.log("handleCreate called");
		// Logic for creating a new media entry
		axios.post("/media.json", params).then((response) => {
			// console.log("Response data:", response.data);
			setMediaEntries([...media_entries, response.data]);
			successCallback();
		});
	};

	useEffect(handleIndex, []);

	return (
		<main>
			<MediaVaultIndex media_entries={media_entries} />
			<MediaVaultNew onCreate={handleCreate} />
		</main>
	);
}
