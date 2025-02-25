import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { userStore } from '../stores/user-store';
import authService from '../services/auth-service';
import StorageService from '../services/storage-service';

export default function SpotifyCallback() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const authCode = searchParams.get('code');

	useEffect(() => {
		const callAPI = async () => {
			if (authCode) {
				const userProfile = await authService.storeSpotifyToken(
					authCode,
					userStore.userProfile?.userId
				);
				if (userProfile) {
					userStore.setUserProfile(userProfile);
					StorageService.storeUserProfile(userProfile);
					console.log(userProfile);
					navigate('/');
				}
			}
		};

		callAPI();
	}, []);

	if (!userStore.isLoggedIn) return <Navigate to="/login" replace />;

	return <div></div>;
}
