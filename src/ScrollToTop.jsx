import { useEffect, useState } from "react";

export function ScrollToTop() {
	const [visible, setVisible] = useState(false);

	// Show button after scrolling down 300px (adjust as necessary)
	useEffect(() => {
		const handleScroll = () => {
			if (window.pageYOffset > 300) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Smooth scroll back to top on click.
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			{visible && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-20 right-4 z-50 p-3 bg-gray-500 text-white text-4xl rounded-full shadow-lg hover:bg-blue-600 transition-colors"
					aria-label="Scroll to top"
				>
					↑
				</button>
			)}
		</>
	);
}
