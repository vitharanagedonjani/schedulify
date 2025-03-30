import * as React from 'react';
import { format } from 'date-fns';
import type {
	Resource,
	TimelineEvent,
	TimeFormat,
	EventComponentProps,
} from '../types';
import { TIMELINE_CONSTANTS, TIME_FORMATS } from '../constants';
import { generateHourSlots } from '../utils';
import { EventLayer } from './event-layer';

interface TimelineGridSectionProps {
	resources: Resource[];
	events: TimelineEvent[];
	startDate: Date;
	numberOfDays: number;
	cellWidth?: number;
	viewMode: 'day' | 'hour';
	timeFormat?: TimeFormat;
	timelineConfig?: {
		maxEventsPerCell?: number;
		eventComponent?: React.ComponentType<EventComponentProps>;
		eventHeight?: number;
	};
	onEventClick?: (event: TimelineEvent) => void;
	rowHeights: Map<string, number>;
	scrollContainer: React.RefObject<HTMLDivElement | null>;
}

export function TimelineGridSection({
	resources,
	events,
	startDate,
	numberOfDays,
	cellWidth = TIMELINE_CONSTANTS.DEFAULT_TIME_CELL_WIDTH,
	viewMode,
	timeFormat = TIMELINE_CONSTANTS.DEFAULT_TIME_FORMAT,
	timelineConfig,
	onEventClick,
	rowHeights,
}: TimelineGridSectionProps) {
	const hourSlots = React.useMemo(
		() => (viewMode === 'hour' ? generateHourSlots(startDate, timeFormat) : []),
		[startDate, timeFormat, viewMode]
	);

	const gridWidth =
		viewMode === 'hour'
			? cellWidth * (timeFormat.type === '24' ? 24 : 12)
			: cellWidth * numberOfDays;

	return (
		<div className="flex-1">
			{/* Fixed Header */}
			<div
				className="sticky top-0 z-20 bg-gray-50 border-b"
				style={{ width: gridWidth, height: TIMELINE_CONSTANTS.HEADER_HEIGHT }}
			>
				<div className="flex h-full">
					{viewMode === 'hour'
						? // Hour view headers
							hourSlots.map((slot) => (
								<div
									key={`header-hour-${slot.hour}`}
									className="border-r flex items-center justify-center font-medium"
									style={{
										width: cellWidth,
										minWidth: cellWidth,
										maxWidth: cellWidth,
									}}
								>
									{slot.label}
								</div>
							))
						: // Day view headers (existing code)
							Array.from({ length: numberOfDays }).map((_, index) => {
								const date = new Date(startDate);
								date.setDate(date.getDate() + index);

								return (
									<div
										key={`header-day-${date.toISOString()}`}
										className="border-r flex items-center justify-center font-medium"
										style={{
											width: cellWidth,
											minWidth: cellWidth,
											maxWidth: cellWidth,
										}}
									>
										{format(date, TIME_FORMATS.DATE)}
									</div>
								);
							})}
				</div>
			</div>

			{/* Scrollable Content Container */}
			<div style={{ position: 'relative', width: gridWidth }}>
				{/* Grid Lines */}
				{resources.map((resource) => (
					<div
						key={resource.id}
						className="flex border-b"
						style={{
							height:
								rowHeights.get(resource.id) ??
								TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT,
							minHeight: TIMELINE_CONSTANTS.DEFAULT_EVENT_HEIGHT,
						}}
					>
						{viewMode === 'hour'
							? hourSlots.map((slot) => (
									<div
										key={`cell-${resource.id}-hour-${slot.hour}`}
										className="border-r border-gray-200"
										style={{
											width: cellWidth,
											minWidth: cellWidth,
											maxWidth: cellWidth,
											height: '100%',
										}}
									/>
								))
							: Array.from({ length: numberOfDays }).map((_, index) => (
									<div
										key={`cell-${resource.id}-day-${index}`}
										className="border-r border-gray-200"
										style={{
											width: cellWidth,
											minWidth: cellWidth,
											maxWidth: cellWidth,
											height: '100%',
										}}
									/>
								))}
					</div>
				))}

				{/* Events Layer */}
				<div className="absolute top-0 left-0 w-full h-full">
					<EventLayer
						events={events}
						resources={resources}
						startDate={startDate}
						cellWidth={cellWidth}
						eventHeight={
							timelineConfig?.eventHeight ??
							TIMELINE_CONSTANTS.DEFAULT_EVENT_HEIGHT
						}
						maxEventsPerCell={timelineConfig?.maxEventsPerCell}
						EventComponent={timelineConfig?.eventComponent}
						onEventClick={onEventClick}
						rowHeights={rowHeights}
					/>
				</div>
			</div>
		</div>
	);
}
