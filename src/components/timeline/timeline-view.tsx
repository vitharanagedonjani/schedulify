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
		const eventsPerDay = new Map<string, Map<number, number>>();

		// Count events per resource per day
		for (const event of events) {
			const eventStart = new Date(event.start);
			const dayIndex = Math.floor(
				(eventStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
			);

			// Initialize day counter for resource
			if (!eventsPerDay.has(event.resourceId)) {
				eventsPerDay.set(event.resourceId, new Map());
			}
			const resourceDays = eventsPerDay.get(event.resourceId)!;

			// Count events per day
			const currentCount = resourceDays.get(dayIndex) || 0;
			resourceDays.set(dayIndex, currentCount + 1);
		}

		// Calculate heights based on maximum events per day
		for (const resource of resources) {
			const resourceDays = eventsPerDay.get(resource.id);
			const maxEventsPerCell = timelineConfig.maxEventsPerCell ?? 3;
			const baseHeight =
				timelineConfig.baseRowHeight ?? TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT;
			const eventHeight =
				timelineConfig.eventHeight ?? TIMELINE_CONSTANTS.DEFAULT_EVENT_HEIGHT;

			if (!resourceDays || resourceDays.size === 0) {
				// No events - use base height
				heights.set(resource.id, baseHeight);
				continue;
			}

			// Find the maximum number of events in any day
			const maxEventsInDay = Math.max(...Array.from(resourceDays.values()));

			if (maxEventsInDay <= maxEventsPerCell) {
				// No stacking needed - use base height
				heights.set(resource.id, baseHeight);
				continue;
			}

			// Calculate height for stacked events
			const rowsNeeded = Math.ceil(maxEventsInDay / maxEventsPerCell);
			const totalHeight = rowsNeeded * (eventHeight + 8); // 8px padding

			heights.set(resource.id, Math.max(baseHeight, totalHeight));
		}

		return heights;
	}, [
		resources,
		events,
		startDate,
		timelineConfig.maxEventsPerCell,
		timelineConfig.baseRowHeight,
		timelineConfig.eventHeight,
	]);

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
