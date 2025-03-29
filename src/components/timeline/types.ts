import type { TIMELINE_CONSTANTS, DEFAULT_FORMAT_OPTIONS } from './constants';

export interface Resource {
	id: string;
	name: string;
}

export interface TimelineEvent {
	id: string;
	resourceId: string;
	title: string;
	start: Date;
	end: Date;
	color?: string;
}

export interface TimeFormat {
	type: '12' | '24';
	showAMPM?: boolean; // Only applicable for 12-hour format
}

export interface TimelineConfig {
	resourceCellWidth?: number;
	timeCellWidth?: number;
	rowHeight?: number;
	timeFormat?: TimeFormat;
	maxEventsPerCell?: number;
	eventComponent?: React.ComponentType<EventComponentProps>;
}

export interface EventComponentProps {
	event: TimelineEvent;
	isMultiDay: boolean;
	style: React.CSSProperties;
	onClick?: (event: TimelineEvent) => void;
}

export interface FormatOptions {
	dateFormat?: (date: Date) => string;
	timeFormat?: (date: Date) => string;
}

export interface TimelineViewProps {
	resources: Resource[];
	events: TimelineEvent[];
	startDate?: Date;
	numberOfDays?: number;
	viewMode: 'day' | 'hour';
	formatOptions?: FormatOptions;
	timelineConfig?: TimelineConfig;
	className?: string;
	onEventClick?: (event: TimelineEvent) => void;
}

export type ViewMode = 'hour' | 'day';
export type DateFormatFn = (date: Date) => string;

export interface TimelineConfig extends Partial<typeof TIMELINE_CONSTANTS> {}
