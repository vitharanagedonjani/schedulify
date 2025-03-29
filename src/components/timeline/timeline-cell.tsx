import type * as React from 'react';
import { format } from 'date-fns';
import type { TimelineEvent as ITimelineEvent } from './types';
import { TimelineEvent } from './timeline-event';

interface TimelineCellProps {
	date: Date;
	events: ITimelineEvent[];
	resourceId: string;
	style?: React.CSSProperties;
	showAllDayEvents?: boolean;
}

export function TimelineCell({
	date,
	events,
	resourceId,
	style,
	showAllDayEvents = false,
}: TimelineCellProps) {
	const cellEvents = events.filter(
		(event) =>
			event.resourceId === resourceId &&
			format(event.start, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
	);

	return (
		<div className="relative border-b h-[60px]" style={style}>
			{cellEvents.map((event) => (
				<TimelineEvent
					key={event.id}
					event={event}
					showAllDayEvents={showAllDayEvents}
				/>
			))}
		</div>
	);
}
