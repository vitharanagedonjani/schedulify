import * as React from 'react';
import { format } from 'date-fns';
import type { TimelineEvent as ITimelineEvent } from './types';
import { TimelineEvent } from './timeline-event';

interface TimelineCellProps {
	date: Date;
	events: ITimelineEvent[];
	resourceId: string;
}

export function TimelineCell({ date, events, resourceId }: TimelineCellProps) {
	const cellEvents = events.filter(
		(event) =>
			event.resourceId === resourceId &&
			format(event.start, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
	);

	return (
		<div className="relative p-2 border-b border-r min-h-[60px]">
			{cellEvents.map((event) => (
				<TimelineEvent key={event.id} event={event} />
			))}
		</div>
	);
}
