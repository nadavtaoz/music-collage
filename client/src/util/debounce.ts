export function debounce<T extends (...args: any[]) => void>(
	func: T,
	time: number
) {
	let timer: number;

	return function (this: unknown, ...args: Parameters<T>) {
		clearTimeout(timer);

		timer = setTimeout(() => {
			func.apply(this, args);
		}, time);
	};
}
