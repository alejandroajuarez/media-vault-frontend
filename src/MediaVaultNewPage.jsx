import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MediaVaultNew } from "./MediaVaultNew";

export function MediaVaultNewPage() {
	const navigate = useNavigate();

	const handleCreate = (params) => {
		console.log("handleCreate called", params);
		axios.post("/media.json", params).then((response) => {
			console.log("Response data:", response.data);
			navigate("/media"); // Redirect to the Media Vault page after creation
		});
	};

	return (
		<div>
			<MediaVaultNew onCreate={handleCreate} />
		</div>
	);
}
