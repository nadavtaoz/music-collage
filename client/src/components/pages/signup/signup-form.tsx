import {
	useCallback,
	useState,
	type ChangeEvent,
	ComponentPropsWithRef,
	useEffect,
} from 'react';

import Input from '../../global/input';

type FormState = {
	name: string;
	email: string;
	country: string;
	password: string;
	cpassword: string;
};

const formInitialState = {
	name: '',
	email: '',
	country: '',
	password: '',
	cpassword: '',
};

type SignupFormProps = ComponentPropsWithRef<'form'>;

export default function SignupForm({ onSubmit, ...props }: SignupFormProps) {
	const [formState, setFormState] = useState<FormState>(formInitialState);

	const [formErrors, setFormErrors] = useState<{
		[key in keyof FormState]: string | undefined;
	}>(formInitialState);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const { name, value } = e.target;

		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	// password match validation
	useEffect(() => {
		const value =
			formState.cpassword !== formState.password ? 'Password Mismatch' : '';
		setFormErrors((prevState) => ({
			...prevState,
			cpassword: value,
			password: value,
		}));
	}, [formState.cpassword, formState.password]);

	const isFormError = (
		Object.keys(formErrors) as Array<keyof typeof formErrors>
	).find((key) => formErrors[key]);

	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-col gap-y-4">
				<Input
					error={formErrors.name}
					value={formState.name}
					label="First Name"
					type="text"
					placeholder="Enter full name"
					name="name"
					onChange={handleChange}
				/>

				<Input
					error={formErrors.email}
					value={formState.email}
					label="Email"
					name="email"
					type="email"
					placeholder="Enter your@email.com"
					onChange={handleChange}
				/>

				<Input
					error={formErrors.country}
					value={formState.country}
					label="Country"
					name="country"
					type="text"
					placeholder="Enter your Country"
					onChange={handleChange}
				/>

				<Input
					error={formErrors.password}
					value={formState.password}
					label="Password"
					name="password"
					type="password"
					minLength={8}
					placeholder="Enter password"
					onChange={handleChange}
				/>

				<Input
					error={formErrors.cpassword}
					value={formState.cpassword}
					label="Confirm Password"
					name="cpassword"
					type="password"
					placeholder="Enter confirm password"
					onChange={handleChange}
				/>
			</div>

			<div className="mt-8">
				<button
					disabled={isFormError !== undefined}
					type="submit"
					className="cursor-pointer mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
				>
					Sign up
				</button>
			</div>
		</form>
	);
}
