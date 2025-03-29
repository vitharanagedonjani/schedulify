import * as React from 'react';
import { format } from 'date-fns';
import type { TimelineEvent as ITimelineEvent } from './types';
import { getEventPosition } from './utils';

interface TimelineEventProps {
	event: ITimelineEvent;
}

export function TimelineEvent({ event }: TimelineEventProps) {
	const style = getEventPosition(event);

	return (
		<div
			className="absolute rounded-md text-white text-xs p-1 m-1 overflow-hidden"
			style={{
				...style,
				backgroundColor: event.color || '#7c3aed',
				minHeight: '24px',
				maxHeight: 'calc(100% - 8px)',
				fontSize: '11px',
				lineHeight: '1.2',
			}}
		>
			<div className="font-medium truncate">{event.type}</div>
			<div className="opacity-90 truncate">
				{format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
			</div>
		</div>
	);
}
