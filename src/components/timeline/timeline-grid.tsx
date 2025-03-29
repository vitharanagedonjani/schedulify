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
		<div className="relative">
			{/* Background grid lines */}
			<div
				className="absolute inset-0 grid border-r border-gray-200"
				style={{
					gridTemplateColumns: `250px repeat(${numberOfDays}, minmax(0, 1fr))`,
					pointerEvents: 'none',
				}}
			>
				{Array.from({ length: numberOfDays + 1 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={i} className="border-r border-gray-200" />
				))}
			</div>

			{/* Main content grid */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `250px repeat(${numberOfDays}, minmax(0, 1fr))`,
					position: 'relative',
				}}
			>
				{/* Resource names column */}
				<div className="sticky left-0 z-30 bg-white">
					{resources.map((resource, index) => (
						<div
							key={resource.id}
							className="h-[60px] flex items-center border-b p-4"
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

				{/* Events grid */}
				<div className="col-span-full col-start-2">
					{resources.map((resource, index) => (
						<div
							key={resource.id}
							className="relative"
							style={
								virtualizer
									? {
											transform: `translateY(${
												virtualizer.getVirtualItems()[index].start
											}px)`,
											height: '60px',
										}
									: { height: '60px' }
							}
						>
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
