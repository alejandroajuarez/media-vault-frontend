import "./Modal.css";

export function Modal({ children, show, onClose }) {
	if (show) {
		return (
			<div className="modal-background w-3/4">
				<section className="modal-main">
					{children}
					<button className="close" type="button" onClick={onClose}>
						&#x2715;
					</button>
				</section>
			</div>
		);
	}
}
