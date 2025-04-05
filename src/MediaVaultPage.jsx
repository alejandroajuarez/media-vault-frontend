import { MediaVaultNew } from "./MediaVaultNew";
import { MediaVaultIndex } from "./MediaVaultIndex";
import { MediaVaultShow } from "./MediaVaultShow";
import axios from "axios";

export function MediaVaultPage() {
	return (
		<main>
			<MediaVaultIndex />
			<MediaVaultNew />
		</main>
	);
}
