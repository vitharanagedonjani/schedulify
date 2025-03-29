import type { TimelineEvent } from './types';
import { HOURS_IN_DAY, DAY_START_HOUR } from './constants';

export const getEventPosition = (event: TimelineEvent) => {
	const startHour = event.start.getHours() + event.start.getMinutes() / 60;
	const endHour = event.end.getHours() + event.end.getMinutes() / 60;

	const startPercent = ((startHour - DAY_START_HOUR) / HOURS_IN_DAY) * 100;
	const endPercent = ((endHour - DAY_START_HOUR) / HOURS_IN_DAY) * 100;

	return {
		left: `${startPercent}%`,
		width: `${endPercent - startPercent}%`,
		position: 'absolute' as const,
		top: '4px',
		bottom: '4px',
	};
};
