import { FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router';

import SignupForm from '../components/pages/signup/signup-form';
import authService, { UserSignupData } from '../services/auth-service';

export default function Signup() {
	let navigate = useNavigate();

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>): Promise<unknown> => {
			e.preventDefault();

			const formData = new FormData(e.currentTarget);
			const data = Object.fromEntries(formData);
			const res = await authService.signup(data as UserSignupData);
			if (res) {
				navigate('/login');
			}
			return res;
		},
		[]
	);

	return (
		<div className="w-1/2 mx-auto">
			<SignupForm onSubmit={handleSubmit} />
		</div>
	);
}
