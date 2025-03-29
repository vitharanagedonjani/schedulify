import * as React from 'react';
import { TimelineHeader } from './timeline-header';
import { TimelineGrid } from './timeline-grid';
import type { TimelineViewProps } from './types';

export function TimelineView({
	events,
	resources,
	startDate = new Date(),
	numberOfDays = 7,
	className = '',
}: TimelineViewProps) {
	return (
		<div className={`relative border rounded-lg ${className}`}>
			<div className="overflow-auto">
				<div className="inline-block min-w-full">
					<TimelineHeader numberOfDays={numberOfDays} startDate={startDate} />
					<TimelineGrid
						resources={resources}
						events={events}
						numberOfDays={numberOfDays}
						startDate={startDate}
					/>
				</div>
			</div>
		</div>
	);
}
