import * as React from 'react';
import type { TimelineEvent, TimelineViewProps } from './types';
import { ResourceSection } from './components/resource-section';
import { TimelineGridSection } from './components/timeline-grid-section';
import { TIMELINE_CONSTANTS, DEFAULT_FORMAT_OPTIONS } from './constants';
import { areDatesOverlapping } from './utils';

export function TimelineView({
	events,
	resources,
	startDate = new Date(),
	numberOfDays = 7,
	viewMode = 'day',
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
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

	const eventsByResource = new Map<string, TimelineEvent[]>();
	for (const event of events) {
		if (!eventsByResource.has(event.resourceId)) {
			eventsByResource.set(event.resourceId, []);
		}
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		eventsByResource.get(event.resourceId)!.push(event);
	}

	// Initialize rowHeights with default values
	const rowHeights = React.useMemo(() => {
		const heights = new Map<string, number>();

		// Calculate heights based on overlapping events
		for (const resource of resources) {
			const resourceEvents = events.filter(
				(event) => event.resourceId === resource.id
			);
			const baseHeight =
				timelineConfig.baseRowHeight ?? TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT;

			if (resourceEvents.length === 0) {
				heights.set(resource.id, baseHeight);
				continue;
			}

			// Sort events by start time
			resourceEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

			// Find maximum overlapping events at any point
			let maxOverlap = 1;
			for (let i = 0; i < resourceEvents.length; i++) {
				let currentOverlap = 1;
				const currentEvent = resourceEvents[i];

				for (let j = 0; j < resourceEvents.length; j++) {
					if (i !== j) {
						const otherEvent = resourceEvents[j];
						if (
							areDatesOverlapping(
								currentEvent.start,
								currentEvent.end,
								otherEvent.start,
								otherEvent.end
							)
						) {
							currentOverlap++;
						}
					}
				}
				maxOverlap = Math.max(maxOverlap, currentOverlap);
			}

			// Calculate row height based on overlapping events
			const eventHeight = TIMELINE_CONSTANTS.DEFAULT_EVENT_HEIGHT;
			const padding = 2; // 2px padding between events
			const totalHeight =
				maxOverlap === 1
					? eventHeight + padding * 2 // Single event + top/bottom padding
					: eventHeight * maxOverlap + padding * (maxOverlap + 1); // Multiple events + padding

			heights.set(resource.id, Math.max(baseHeight, totalHeight));
		}

		return heights;
	}, [resources, events, timelineConfig.baseRowHeight]);

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
