import type * as React from 'react';
import type { Resource, TimelineEvent, EventComponentProps } from '../types';
import { TIMELINE_CONSTANTS } from '../constants';
import { DefaultEvent } from './default-event';

interface EventLayerProps {
	events: TimelineEvent[];
	resources: Resource[];
	startDate: Date;
	cellWidth: number;
	eventHeight: number;
	maxEventsPerCell?: number;
	EventComponent?: React.ComponentType<EventComponentProps>;
	onEventClick?: (event: TimelineEvent) => void;
	rowHeights: Map<string, number>;
}

export function EventLayer({
	events,
	resources,
	startDate,
	cellWidth,
	eventHeight = TIMELINE_CONSTANTS.DEFAULT_EVENT_HEIGHT,
	EventComponent = DefaultEvent,
	onEventClick,
	rowHeights = new Map(),
}: EventLayerProps) {
	// Helper function to calculate exact position and width
	const calculateEventStyle = (event: TimelineEvent, eventIndex: number) => {
		const startDiff =
			(event.start.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

		const durationDays =
			Math.ceil(
				(event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60 * 24)
			) + 1;

		const width = durationDays * cellWidth - 4;
		const left = startDiff * cellWidth + 2;
		const top = eventIndex * (eventHeight + 2); // Stack events vertically

		return {
			left: Math.round(left),
			width: Math.max(Math.round(width), cellWidth / 4),
			top,
		};
	};

	return (
		<>
			{resources.map((resource) => {
				// Filter events for the current resource
				const resourceEvents = events.filter((event) => {
					console.log(
						`Event ID: ${event.id}, Resource ID: ${event.resourceId}, Current Resource: ${resource.id}`
					);
					return event.resourceId === resource.id;
				});

				const rowHeight = Math.max(
					rowHeights.get(resource.id) ?? TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT,
					resourceEvents.length * (eventHeight + 2) // Adjust row height
				);

				return (
					<div
						key={resource.id}
						className="relative w-full"
						style={{
							height: rowHeight,
						}}
					>
						{resourceEvents.map((event, index) => {
							const { left, width, top } = calculateEventStyle(event, index);
							const isMultiDay =
								event.end.getTime() - event.start.getTime() >
								24 * 60 * 60 * 1000;

							return (
								<div
									key={event.id}
									className="absolute"
									style={{
										left: left,
										width: width,
										height: eventHeight - 4,
										top: top,
										margin: '2px',
									}}
								>
									<EventComponent
										event={event}
										isMultiDay={isMultiDay}
										style={{
											height: '100%',
											backgroundColor: event.color || '#7c3aed',
											borderRadius: '4px',
										}}
										onClick={onEventClick}
									/>
								</div>
							);
						})}
					</div>
				);
			})}
		</>
	);
}
