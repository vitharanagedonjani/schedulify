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
	return (
		<>
			{resources.map((resource) => {
				const resourceEvents = events.filter(
					(event) => event.resourceId === resource.id
				);
				const rowHeight =
					rowHeights.get(resource.id) ?? TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT;

				return (
					<div
						key={resource.id}
						className="relative w-full"
						style={{
							height: rowHeight,
						}}
					>
						{resourceEvents.map((event) => {
							const startDiff = Math.floor(
								(event.start.getTime() - startDate.getTime()) /
									(1000 * 60 * 60 * 24)
							);
							const durationDays = Math.ceil(
								(event.end.getTime() - event.start.getTime()) /
									(1000 * 60 * 60 * 24)
							);

							return (
								<div
									key={event.id}
									className="absolute"
									style={{
										left: startDiff * cellWidth + 4,
										width: durationDays * cellWidth - 8,
										height: eventHeight - 4,
										top: 2,
										margin: '2px 0',
									}}
								>
									<EventComponent
										event={event}
										isMultiDay={durationDays > 1}
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
