import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import LoginForm from '../components/pages/login/login-form';
import authService from '../services/auth-service';
import StorageService from '../services/storage-service';

import { userStore } from '../stores/user-store';
import { UserProfile } from '../interfaces/user-profile';

export type LoginData = {
	email: string;
	password: string;
};

type LoginResults = {
	token: string;
	userId: string;
	hasSpotifyToken: boolean;
	name: string;
	email: string;
};

export default function Login() {
	let navigate = useNavigate();

	const submit = useCallback((data: LoginData): void => {
		authService.login(data.email, data.password).then((res) => {
			if (res) {
				const { token, userId, hasSpotifyToken, name, email } =
					res as LoginResults;

				StorageService.storeJWT(token);
				const userProfile: UserProfile = {
					name,
					email,
					userId,
					hasSpotifyToken,
				};

				StorageService.storeUserProfile(userProfile);
				userStore.setAccessToken(token);
				userStore.setUserProfile(userProfile);
				navigate('/');
			}
		});
	}, []);

	return <LoginForm submit={submit} />;
}
