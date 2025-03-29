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
			style={{
				display: 'grid',
				gridTemplateColumns: `250px repeat(${numberOfDays}, 1fr)`,
				position: 'relative',
			}}
		>
			<div className="sticky left-0 z-30 bg-white">
				{resources.map((resource, index) => (
					<div
						key={resource.id}
						className="p-4 border-b border-r h-[60px] flex items-center"
						style={
							virtualizer
								? {
										transform: `translateY(${
											virtualizer.getVirtualItems()[index].start
										}px)`,
										position: 'absolute',
										width: '250px',
									}
								: undefined
						}
					>
						{resource.name}
					</div>
				))}
			</div>
			<div className="col-span-full col-start-2 z-20">
				<div
					className="grid"
					style={{ gridTemplateColumns: `repeat(${numberOfDays}, 1fr)` }}
				>
					{resources.map((resource, index) => (
						<React.Fragment key={resource.id}>
							{Array.from({ length: numberOfDays }).map((_, dayIndex) => (
								<TimelineCell
									key={`${resource.id}-${dayIndex}`}
									resourceId={resource.id}
									date={
										new Date(
											startDate.getTime() + dayIndex * 24 * 60 * 60 * 1000
										)
									}
									events={events}
									style={
										virtualizer
											? {
													transform: `translateY(${
														virtualizer.getVirtualItems()[index].start
													}px)`,
													position: 'absolute',
													width: `${100 / numberOfDays}%`,
													left: `${(dayIndex * 100) / numberOfDays}%`,
												}
											: undefined
									}
								/>
							))}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
