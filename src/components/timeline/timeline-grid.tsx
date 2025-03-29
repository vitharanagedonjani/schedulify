import * as React from 'react';
import { TimelineCell } from './timeline-cell';
import type { Resource, TimelineEvent } from './types';
import type { Virtualizer } from '@tanstack/react-virtual';

interface TimelineGridProps {
	resources: Resource[];
	events: TimelineEvent[];
	numberOfDays: number;
	startDate: Date;
	virtualizer: Virtualizer<HTMLDivElement, Element> | null;
}

export function TimelineGrid({
	resources,
	events,
	numberOfDays,
	startDate,
	virtualizer,
}: TimelineGridProps) {
	return (
		<div
			className="grid"
			style={{
				gridTemplateColumns: `250px repeat(${numberOfDays}, 1fr)`,
			}}
		>
			{resources.map((resource, index) => (
				<React.Fragment key={resource.id}>
					<div
						className="p-4 border-b border-r"
						style={
							virtualizer
								? {
										transform: `translateY(${
											virtualizer.getVirtualItems()[index].start
										}px)`,
										position: 'absolute',
										top: 0,
										left: 0,
										width: '250px',
									}
								: undefined
						}
					>
						{resource.name}
					</div>
					{Array.from({ length: numberOfDays }).map((_, dayIndex) => (
						<TimelineCell
							key={`${resource.id}-${dayIndex}`}
							resourceId={resource.id}
							date={
								new Date(startDate.getTime() + dayIndex * 24 * 60 * 60 * 1000)
							}
							events={events}
							style={
								virtualizer
									? {
											transform: `translateY(${
												virtualizer.getVirtualItems()[index].start
											}px)`,
											position: 'absolute',
											left: `calc(250px + ${dayIndex * 100}% / ${numberOfDays})`,
											width: `${100 / numberOfDays}%`,
										}
									: undefined
							}
						/>
					))}
				</React.Fragment>
			))}
		</div>
	);
}
