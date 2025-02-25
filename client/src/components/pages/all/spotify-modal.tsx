import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import Modal from '../../global/modal';
import { userStore } from '../../../stores/user-store';

const spotifyURL: string = `https://accounts.spotify.com/authorize?client_id=${
	import.meta.env.VITE_SPOTIFY_CLIENT_ID
}&response_type=code&redirect_uri=${
	import.meta.env.VITE_REDIRECT_URI
}&scope=user-top-read`;

type SpotifyModalProps = {
	onClose?: () => void;
};

const SpotifyModal = ({ onClose }: SpotifyModalProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (userStore.isLoggedIn && !userStore.userProfile?.hasSpotifyToken) {
			setIsOpen(true);
		} else if (!userStore.isLoggedIn && isOpen) {
			setIsOpen(false);
		}
	}, [userStore.isLoggedIn]);

	const handleClose = useRef(() => {
		setIsOpen(false);
		if (onClose) {
			onClose();
		}
	});

	return (
		<Modal isOpen={isOpen} onClose={handleClose.current}>
			<div>
				<h3>
					To continue, please log in to your Spotify account. You'll be
					redirected to Spotify for authentication.
				</h3>
				<a
					href={spotifyURL}
					className="text-green-500 font-bold hover:underline"
				>
					Link
				</a>
			</div>
		</Modal>
	);
};

export default observer(SpotifyModal);
