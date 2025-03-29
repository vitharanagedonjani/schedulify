import * as React from 'react';
import { format } from 'date-fns';
import type { Resource, TimelineEvent, TimeFormat } from '../types';
import { TIMELINE_CONSTANTS, TIME_FORMATS } from '../constants';
import { generateHourSlots } from '../utils';

interface TimelineGridSectionProps {
	resources: Resource[];
	events: TimelineEvent[];
	startDate: Date;
	numberOfDays: number;
	cellWidth?: number;
	viewMode: 'day' | 'hour';
	timeFormat?: TimeFormat;
}

export function TimelineGridSection({
	resources,
	events,
	startDate,
	numberOfDays,
	cellWidth = TIMELINE_CONSTANTS.DEFAULT_TIME_CELL_WIDTH,
	viewMode,
	timeFormat = TIMELINE_CONSTANTS.DEFAULT_TIME_FORMAT,
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
		<div className="flex-1 overflow-auto">
			{/* Timeline Header */}
			<div
				className="sticky top-0 z-10 bg-gray-50 border-b"
				style={{ height: TIMELINE_CONSTANTS.HEADER_HEIGHT, width: gridWidth }}
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

			{/* Timeline Grid */}
			<div className="relative" style={{ width: gridWidth }}>
				{resources.map((resource) => (
					<div key={resource.id} className="flex border-b">
						{viewMode === 'hour'
							? // Hour view grid
								hourSlots.map((slot) => (
									<div
										key={`cell-${resource.id}-hour-${slot.hour}`}
										className="border-r"
										style={{
											width: cellWidth,
											minWidth: cellWidth,
											maxWidth: cellWidth,
											height: TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT,
										}}
									/>
								))
							: // Day view grid (existing code)
								Array.from({ length: numberOfDays }).map((_, index) => (
									<div
										key={`cell-${resource.id}-day-${index}`}
										className="border-r"
										style={{
											width: cellWidth,
											minWidth: cellWidth,
											maxWidth: cellWidth,
											height: TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT,
										}}
									/>
								))}
					</div>
				))}
			</div>
		</div>
	);
}
