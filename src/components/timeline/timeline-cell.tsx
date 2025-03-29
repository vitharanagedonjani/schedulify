import * as React from 'react';
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

	// Sort events so all-day events appear at the top
	const sortedEvents = React.useMemo(() => {
		return cellEvents.sort((a, b) => {
			if (a.isAllDay && !b.isAllDay) return -1;
			if (!a.isAllDay && b.isAllDay) return 1;
			return 0;
		});
	}, [cellEvents]);

	return (
		<div className="relative border-b h-[60px]" style={style}>
			{sortedEvents.map((event) => (
				<TimelineEvent
					key={event.id}
					event={{
						...event,
						isAllDay: showAllDayEvents || event.isAllDay,
					}}
				/>
			))}
		</div>
	);
}
