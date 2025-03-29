export type TimeCategory = "Morning" | "Afternoon" | "Evening" | "Night";

export interface Event {
	id: string;
	userId: string;
	userName: string;
	startTime: Date;
	endTime: Date;
	category: TimeCategory;
	status?: "pending" | "confirmed" | "cancelled";
}

export interface EventFormProps {
	onEventSaved?: (event: Event) => void;
}

export interface EventItemProps {
	event: Event;
	onDelete?: (id: string) => void;
	onEdit?: (event: Event) => void;
}

export interface TimelineProps {
	events: Event[];
	dateRange: {
		start: Date;
		end: Date;
	};
	onEventClick?: (event: Event) => void;
	onEventUpdate?: (event: Event) => void;
}
