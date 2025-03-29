export interface TimelineEvent {
	id: string;
	start: Date;
	end: Date;
	title: string;
	resourceId: string;
	color?: string;
	type?: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
}

export interface Resource {
	id: string;
	name: string;
	color?: string;
}

export interface VirtualizationOptions {
	enabled: boolean;
	rowHeight?: number;
	overscan?: number;
}

export interface TimelineViewProps {
	events: TimelineEvent[];
	resources: Resource[];
	startDate?: Date;
	numberOfDays?: number;
	className?: string;
	virtualization?: VirtualizationOptions;
}
