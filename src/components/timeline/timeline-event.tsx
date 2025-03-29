import * as React from 'react';
import { format } from 'date-fns';
import type { TimelineEvent as ITimelineEvent } from './types';
import { getEventPosition } from './utils';

interface TimelineEventProps {
	event: ITimelineEvent;
}

export function TimelineEvent({ event }: TimelineEventProps) {
	return (
		<div
			className="absolute rounded bg-purple-600 text-white p-2 text-sm"
			style={{
				...getEventPosition(event),
				backgroundColor: '#7c3aed',
			}}
		>
			<div className="font-medium whitespace-nowrap">{event.type}</div>
			<div className="text-xs opacity-90 whitespace-nowrap">
				{format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
			</div>
		</div>
	);
}
