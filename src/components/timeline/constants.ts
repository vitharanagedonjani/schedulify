import { format } from 'date-fns';

export const TIMELINE_CONSTANTS = {
	DEFAULT_RESOURCE_WIDTH: 200,
	DEFAULT_TIME_CELL_WIDTH: 100,
	DEFAULT_ROW_HEIGHT: 48,
	DEFAULT_EVENT_HEIGHT: 48,
	HEADER_HEIGHT: 48,
	DEFAULT_TIME_FORMAT: {
		type: '24' as const,
		showAMPM: false,
	},
} as const;

export const DEFAULT_FORMAT_OPTIONS = {
	dateFormat: (date: Date) => date.toLocaleDateString(),
	timeFormat: (date: Date) => date.toLocaleTimeString(),
} as const;

export const COLORS = {
	morning: '#7c3aed', // Purple
	afternoon: '#7c3aed',
	evening: '#7c3aed',
	night: '#7c3aed',
	headerHighlight: '#f1f5f9', // Light blue/gray
} as const;

export const HOURS_IN_DAY = 24;
export const DAY_START_HOUR = 0;

export const TIME_FORMATS = {
	HOUR_24: 'HH:mm',
	HOUR_12: 'hh:mm a',
	DATE: 'MMM dd',
	DAY: 'EEE', // Mon, Tue, etc.
	DAY_ONLY: 'dd', // For day-based view
} as const;

export const HOURS = {
	FORMAT_24: Array.from({ length: 24 }, (_, i) => i),
	FORMAT_12: Array.from({ length: 12 }, (_, i) => i + 1),
};
