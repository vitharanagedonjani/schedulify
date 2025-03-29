import { format, setHours, setMinutes } from 'date-fns';
import type { TimeFormat } from './types';
import { HOURS, TIME_FORMATS } from './constants';

export function generateHourSlots(date: Date, timeFormat: TimeFormat) {
	const hours = timeFormat.type === '24' ? HOURS.FORMAT_24 : HOURS.FORMAT_12;
	const formatString =
		timeFormat.type === '24' ? TIME_FORMATS.HOUR_24 : TIME_FORMATS.HOUR_12;

	return hours.map((hour) => {
		const slotDate = setMinutes(setHours(new Date(date), hour), 0);
		return {
			hour,
			date: slotDate,
			label: format(slotDate, formatString),
		};
	});
}

export function areDatesOverlapping(
	start1: Date,
	end1: Date,
	start2: Date,
	end2: Date
): boolean {
	return start1 < end2 && start2 < end1;
}
