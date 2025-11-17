import { MixedValue } from '../types/mixedValue';

export const getMixedValue = (value: string) => {
	let parsedValue: MixedValue;

	const asNumber = Number(value);

	if (!Number.isNaN(asNumber) && value !== '') {
		parsedValue = asNumber;
	} else if (/^true$/i.test(value)) {
		parsedValue = true;
	} else if (/^false$/i.test(value)) {
		parsedValue = false;
	} else {
		parsedValue = value;
	}

	return parsedValue;
};
