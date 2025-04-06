import { MediaVaultNew } from "./MediaVaultNew";
import { MediaVaultIndex } from "./MediaVaultIndex";
import { MediaVaultShow } from "./MediaVaultShow";
import { Modal } from "./Modal";
import { useEffect, useState } from "react";
import axios from "axios";

export function MediaVaultPage() {
	const [media_entries, setMediaEntries] = useState([]);
	const [isMediaShowVisible, setIsMediaShowVisible] = useState(false);
	const [currentMedia, setCurrentMedia] = useState({});

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

	const handleShow = (media) => {
		console.log("handleShow called with media:", media);
		setIsMediaShowVisible(true);
		setCurrentMedia(media);
	};

	const handleUpdate = (media, params, successCallback) => {
		console.log("handleUpdate");
		axios.patch(`/media/${media.id}.json`, params).then((response) => {
			setMediaEntries(
				media_entries.map((entry) =>
					entry.id === response.data.id ? response.data : entry
				)
			);
			successCallback();
			setIsMediaShowVisible(false);
		});
	};

	const handleDestroy = (media) => {
		console.log("handleDestroy called with media:", media);
		axios.delete(`/media/${media.id}.json`).then(() => {
			setMediaEntries(media_entries.filter((entry) => entry.id !== media.id));
			setIsMediaShowVisible(false);
		});
	};

	useEffect(handleIndex, []);

	return (
		<main>
			<MediaVaultIndex media_entries={media_entries} onShow={handleShow} />
			<MediaVaultNew onCreate={handleCreate} />
			<Modal
				show={isMediaShowVisible}
				onClose={() => setIsMediaShowVisible(false)}
			>
				<MediaVaultShow
					media={currentMedia}
					onUpdate={handleUpdate}
					onDestroy={handleDestroy}
				/>
			</Modal>
		</main>
	);
}
