import * as React from 'react';
import { format } from 'date-fns';
import type { TimelineEvent as ITimelineEvent } from './types';
import { getEventPosition } from './utils';

export function TimelineEvent({
	event,
	showAllDayEvents,
}: {
	event: ITimelineEvent;
	showAllDayEvents: boolean;
}) {
	const style = React.useMemo(() => {
		if (showAllDayEvents) {
			return {
				position: 'absolute' as const,
				left: 0,
				right: 0,
				top: '4px',
				bottom: '4px',
			};
		}

		const startTime = event.start.getHours() + event.start.getMinutes() / 60;
		const endTime = event.end.getHours() + event.end.getMinutes() / 60;
		const width =
			endTime > startTime ? endTime - startTime : 24 - startTime + endTime;

		return {
			position: 'absolute' as const,
			left: `${(startTime / 24) * 100}%`,
			width: `${(width / 24) * 100}%`,
			top: '4px',
			bottom: '4px',
		};
	}, [event, showAllDayEvents]);

	return (
		<div
			className="absolute rounded-md text-white text-xs p-1 overflow-hidden"
			style={{
				...style,
				backgroundColor: event.color || '#7c3aed',
			}}
		>
			<div className="font-medium truncate">{event.type}</div>
			<div className="opacity-90 truncate">
				{showAllDayEvents
					? 'All Day'
					: `${format(event.start, 'HH:mm')} - ${format(event.end, 'HH:mm')}`}
			</div>
		</div>
	);
}
