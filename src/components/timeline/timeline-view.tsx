import * as React from 'react';
import type { TimelineViewProps } from './types';
import { ResourceSection } from './components/resource-section';
import { TimelineGridSection } from './components/timeline-grid-section';
import { TIMELINE_CONSTANTS, DEFAULT_FORMAT_OPTIONS } from './constants';

export function TimelineView({
	events,
	resources,
	startDate = new Date(),
	numberOfDays = 7,
	viewMode = 'day',
	formatOptions = DEFAULT_FORMAT_OPTIONS,
	timelineConfig = {},
	className = '',
}: TimelineViewProps) {
	const resourceAreaWidth =
		timelineConfig.resourceCellWidth ??
		TIMELINE_CONSTANTS.DEFAULT_RESOURCE_WIDTH;
	const timeCellWidth =
		timelineConfig.timeCellWidth ?? TIMELINE_CONSTANTS.DEFAULT_TIME_CELL_WIDTH;
	const timeFormat =
		timelineConfig.timeFormat ?? TIMELINE_CONSTANTS.DEFAULT_TIME_FORMAT;

	return (
		<div className={`relative border rounded-lg overflow-hidden ${className}`}>
			<div className="flex flex-1">
				<ResourceSection resources={resources} width={resourceAreaWidth} />
				<TimelineGridSection
					resources={resources}
					events={events}
					startDate={startDate}
					numberOfDays={numberOfDays}
					cellWidth={timeCellWidth}
					viewMode={viewMode}
					timeFormat={timeFormat}
				/>
			</div>
		</div>
	);
}
