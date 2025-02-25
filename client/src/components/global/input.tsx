import {
	type ComponentPropsWithoutRef,
	memo,
	useEffect,
	useState,
} from 'react';

type InputProps = ComponentPropsWithoutRef<'input'> & {
	label?: string;
	error?: string;
};

const Input = memo(
	({
		label,
		name,
		type,
		placeholder,
		value,
		onChange,
		error,
		...props
	}: InputProps) => {
		const [innerError, setInnerError] = useState<string>('');

		// validations
		useEffect(() => {
			// minLength validation

			if (props.minLength) {
				if (
					value &&
					typeof value === 'string' &&
					value.length < props.minLength
				) {
					setInnerError('Min length is ' + props.minLength);
				} else {
					setInnerError('');
				}
			}
		}, [value]);

		const showError = error || innerError;

		return (
			<div className="relative">
				<label className="text-gray-600 text-sm mb-2 block">{label}</label>
				{label && (
					<input
						{...props}
						value={value}
						name={name}
						type={type}
						onChange={onChange}
						className={`bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all ${
							showError ? 'error' : ''
						}`}
						placeholder={placeholder}
					/>
				)}

				{showError && (
					<span className="absolute -bottom-4 left-0 text-xs text-red-500">
						{`*${showError}`}
					</span>
				)}
			</div>
		);
	}
);

export default Input;
