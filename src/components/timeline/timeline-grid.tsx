import * as React from 'react';
import type { Resource, TimelineEvent as ITimelineEvent } from './types';
import { TimelineCell } from './timeline-cell';

interface TimelineGridProps {
	dates: Date[];
	events: ITimelineEvent[];
	resources: Resource[];
}

export function TimelineGrid({ dates, events, resources }: TimelineGridProps) {
	return (
		<>
			{resources.map((resource) => (
				<React.Fragment key={resource.id}>
					<div className="p-4 border-b border-r">{resource.name}</div>
					{dates.map((date) => (
						<TimelineCell
							key={date.toISOString()}
							date={date}
							events={events}
							resourceId={resource.id}
						/>
					))}
				</React.Fragment>
			))}
		</>
	);
}
