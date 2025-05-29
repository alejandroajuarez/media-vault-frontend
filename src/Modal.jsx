import { useEffect } from "react";

export function Modal({ children, show, onClose }) {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (show) {
			window.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [show, onClose]);

	if (!show) return null;

	return (
		// Use an explicit RGBA value for the overlay instead of bg-opacity,
		// so only the overlay is affected.
		<div
			className="fixed inset-0 flex items-center justify-center z-50"
			style={{
				background:
					"linear-gradient(to bottom right, rgba(18,20,32,0.95), rgba(27,36,50,0.95))",
			}}
		>
			{/* Modal container with its own opaque background */}
			<div className="relative bg-[#1E2938] border border-[#1b2432] rounded-xl shadow-xl w-[80vw] h-[85vh] overflow-auto p-8">
				{children}
				<button
					onClick={onClose}
					aria-label="Close modal"
					className="absolute top-4 right-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2c2b3c] hover:bg-[#1b2432] text-white focus:outline-none focus:ring-2 focus:ring-white"
				>
					&#x2715;
				</button>
			</div>
		</div>
	);
}