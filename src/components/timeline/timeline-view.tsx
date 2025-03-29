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

	// Initialize rowHeights with default values
	const rowHeights = React.useMemo(() => {
		const heights = new Map<string, number>();
		for (const resource of resources) {
			heights.set(resource.id, TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT);
		}
		return heights;
	}, [resources]);

	const scrollContainerRef = React.useRef<HTMLDivElement>(null);

	return (
		<div className={`relative border rounded-lg overflow-hidden ${className}`}>
			<div ref={scrollContainerRef} className="flex flex-1 overflow-y-auto">
				<ResourceSection
					resources={resources}
					width={resourceAreaWidth}
					rowHeights={rowHeights}
					headerHeight={TIMELINE_CONSTANTS.HEADER_HEIGHT}
				/>
				<TimelineGridSection
					resources={resources}
					events={events}
					startDate={startDate}
					numberOfDays={numberOfDays}
					cellWidth={timeCellWidth}
					viewMode={viewMode}
					timeFormat={timeFormat}
					timelineConfig={timelineConfig}
					rowHeights={rowHeights}
					scrollContainer={scrollContainerRef}
				/>
			</div>
		</div>
	);
}

// Helper function
function areDatesOverlapping(
	start1: Date,
	end1: Date,
	start2: Date,
	end2: Date
) {
	return start1 < end2 && start2 < end1;
}
