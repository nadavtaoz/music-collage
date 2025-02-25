import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
	isOpen: boolean;
	onClose?: () => void;
	children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
		return () => document.body.classList.remove('overflow-hidden');
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 flex items-center justify-center bg-gray-300/75 bg-opacity-40 transition-opacity duration-300">
			<div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative animate-fadeIn">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
				>
					✖
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
}
