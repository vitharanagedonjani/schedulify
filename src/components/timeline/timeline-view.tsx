import * as React from 'react';
import { addDays, startOfDay } from 'date-fns';
import type { TimelineViewProps } from './types';
import { RESOURCE_COLUMN_WIDTH } from './constants';
import { TimelineHeader } from './timeline-header';
import { TimelineGrid } from './timeline-grid';

export function TimelineView({
	events,
	resources,
	startDate = startOfDay(new Date()),
	numberOfDays = 7,
	className = '',
}: TimelineViewProps) {
	const dates = React.useMemo(() => {
		return Array.from({ length: numberOfDays }, (_, i) =>
			addDays(startDate, i)
		);
	}, [startDate, numberOfDays]);

	return (
		<div className={`relative overflow-auto border rounded-lg ${className}`}>
			<div
				className="grid"
				style={{
					gridTemplateColumns: `${RESOURCE_COLUMN_WIDTH}px repeat(${numberOfDays}, 1fr)`,
				}}
			>
				<TimelineHeader dates={dates} />
				<TimelineGrid dates={dates} events={events} resources={resources} />
			</div>
		</div>
	);
}
