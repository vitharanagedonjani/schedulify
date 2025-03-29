import { TimelineCell } from './timeline-cell';
import type { Resource, TimelineEvent } from './types';
import React from 'react';

interface TimelineGridProps {
	resources: Resource[];
	events: TimelineEvent[];
	numberOfDays: number;
	startDate: Date;
}

export function TimelineGrid({
	resources,
	events,
	numberOfDays,
	startDate,
}: TimelineGridProps) {
	return (
		<div className="relative">
			{/* Background grid lines */}
			<div
				className="absolute inset-0 grid border-r border-gray-200"
				style={{
					gridTemplateColumns: `250px repeat(${numberOfDays}, minmax(200px, 1fr))`,
					pointerEvents: 'none',
				}}
			>
				{Array.from({ length: numberOfDays + 1 }).map((_, i) => (
					<div key={i} className="border-r border-gray-200" />
				))}
			</div>

			{/* Main content grid */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `250px repeat(${numberOfDays}, minmax(200px, 1fr))`,
					position: 'relative',
				}}
			>
				{/* Resource names column */}
				<div className="sticky left-0 z-30 bg-white">
					{resources.map((resource) => (
						<div
							key={resource.id}
							className="h-[60px] flex items-center border-b p-4"
						>
							{resource.name}
						</div>
					))}
				</div>

				{/* Events grid */}
				<div className="col-span-full col-start-2">
					{resources.map((resource) => (
						<div key={resource.id} className="relative h-[60px]">
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
									style={{
										position: 'absolute',
										left: `${(dayIndex * 100) / numberOfDays}%`,
										width: `${100 / numberOfDays}%`,
										height: '100%',
									}}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
