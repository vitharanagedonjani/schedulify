import * as React from 'react';
import { format } from 'date-fns';
import type { TimelineEvent as ITimelineEvent } from './types';
import { getEventPosition } from './utils';

interface TimelineEventProps {
	event: ITimelineEvent;
}

export function TimelineEvent({ event }: TimelineEventProps) {
	const startTime = event.start.getHours() + event.start.getMinutes() / 60;
	const endTime = event.end.getHours() + event.end.getMinutes() / 60;

	// Handle events that cross midnight
	const width =
		endTime > startTime ? endTime - startTime : 24 - startTime + endTime;

	return (
		<div
			className="absolute rounded-md text-white text-xs p-1 overflow-hidden"
			style={{
				left: `${(startTime / 24) * 100}%`,
				width: `${(width / 24) * 100}%`,
				top: '4px',
				bottom: '4px',
				backgroundColor: event.color || '#7c3aed',
			}}
		>
			<div className="font-medium truncate">{event.type}</div>
			<div className="opacity-90 truncate">
				{format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
			</div>
		</div>
	);
}
