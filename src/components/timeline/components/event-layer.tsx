import * as React from 'react';
import type { Resource, TimelineEvent, EventComponentProps } from '../types';
import { TIMELINE_CONSTANTS } from '../constants';
import { DefaultEvent } from './default-event';

interface EventLayerProps {
	events: TimelineEvent[];
	resources: Resource[];
	startDate: Date;
	numberOfDays: number;
	cellWidth: number;
	maxEventsPerCell?: number;
	EventComponent?: React.ComponentType<EventComponentProps>;
	onEventClick?: (event: TimelineEvent) => void;
}

interface PositionedEvent extends TimelineEvent {
	resourceIndex: number;
	dayIndex: number;
	durationDays: number;
	stackIndex: number;
}

export function EventLayer({
	events,
	resources,
	startDate,
	numberOfDays,
	cellWidth,
	maxEventsPerCell = 3,
	EventComponent = DefaultEvent,
	onEventClick,
}: EventLayerProps) {
	// Step 1: Calculate event positions and group by resource and day
	const eventsByResource = React.useMemo(() => {
		const eventMap = new Map<string, Map<number, PositionedEvent[]>>();

		for (const event of events) {
			const resourceIndex = resources.findIndex(
				(r) => r.id === event.resourceId
			);
			if (resourceIndex === -1) continue;

			const eventStart = new Date(event.start);
			const startDiff = Math.floor(
				(eventStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
			);

			const eventEnd = new Date(event.end);
			const durationDays = Math.ceil(
				(eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60 * 24)
			);

			// Skip events outside visible range
			if (startDiff >= numberOfDays || startDiff + durationDays <= 0) return;

			const positionedEvent: PositionedEvent = {
				...event,
				resourceIndex,
				dayIndex: Math.max(0, startDiff),
				durationDays,
				stackIndex: 0, // Will be set in next step
			};

			// Create or get the resource map
			if (!eventMap.has(event.resourceId)) {
				eventMap.set(event.resourceId, new Map());
			}
			const resourceEvents = eventMap.get(event.resourceId) as Map<
				number,
				PositionedEvent[]
			>;

			// Create or get the day events array
			if (!resourceEvents.has(startDiff)) {
				resourceEvents.set(startDiff, []);
			}
			const dayEvents = resourceEvents.get(startDiff) as PositionedEvent[];
			dayEvents.push(positionedEvent);
		}

		// Sort events and assign stack indices
		for (const resourceEvents of eventMap.values()) {
			for (const dayEvents of resourceEvents.values()) {
				dayEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
				for (let i = 0; i < dayEvents.length; i++) {
					dayEvents[i].stackIndex = i;
				}
			}
		}

		return eventMap;
	}, [events, resources, startDate, numberOfDays]);

	return (
		<>
			{eventsByResource &&
				Array.from(eventsByResource.entries()).map(
					([resourceId, resourceEvents]) => {
						const resourceIndex = resources.findIndex(
							(r) => r.id === resourceId
						);

						return (
							<div
								key={resourceId}
								className="absolute w-full"
								style={{
									top: resourceIndex * TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT,
									height: TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT,
								}}
							>
								{Array.from(resourceEvents.entries()).map(
									([dayIndex, dayEvents]) => {
										const visibleEvents = dayEvents.slice(0, maxEventsPerCell);
										const hasMore = dayEvents.length > maxEventsPerCell;
										const eventHeight =
											(TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT - 8) /
											maxEventsPerCell;

										return (
											<React.Fragment key={`${resourceId}-${dayIndex}`}>
												{visibleEvents.map((event) => (
													<div
														key={event.id}
														className="absolute pointer-events-auto"
														style={{
															left: event.dayIndex * cellWidth + 4,
															top: 4 + event.stackIndex * eventHeight,
															width: Math.min(
																event.durationDays * cellWidth - 8,
																(numberOfDays - event.dayIndex) * cellWidth - 8
															),
															height: eventHeight - 2,
														}}
													>
														<EventComponent
															event={event}
															isMultiDay={event.durationDays > 1}
															style={{
																height: '100%',
																backgroundColor: event.color || '#7c3aed',
																borderRadius: '4px',
															}}
															onClick={onEventClick}
														/>
													</div>
												))}
												{hasMore && (
													<div
														className="absolute pointer-events-auto px-2 py-1 text-xs text-gray-500"
														style={{
															left: dayIndex * cellWidth + 4,
															bottom: 4,
														}}
													>
														+{dayEvents.length - maxEventsPerCell} more
													</div>
												)}
											</React.Fragment>
										);
									}
								)}
							</div>
						);
					}
				)}
		</>
	);
}
