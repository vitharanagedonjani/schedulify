import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TimelineHeader } from './timeline-header';
import { TimelineGrid } from './timeline-grid';
import type { TimelineViewProps } from './types';

export function TimelineView({
	events,
	resources,
	startDate = new Date(),
	numberOfDays = 7,
	className = '',
	virtualization = {
		enabled: false,
		rowHeight: 60,
		overscan: 5,
	},
}: TimelineViewProps) {
	const scrollContainerRef = React.useRef<HTMLDivElement>(null);

	const rowVirtualizer = virtualization.enabled
		? useVirtualizer({
				count: resources.length,
				getScrollElement: () => scrollContainerRef.current,
				estimateSize: () => virtualization.rowHeight ?? 60,
				overscan: virtualization.overscan ?? 5,
			})
		: null;

	const virtualResources = rowVirtualizer
		? rowVirtualizer.getVirtualItems().map((row) => resources[row.index])
		: resources;

	const containerStyle = rowVirtualizer
		? {
				height: `${rowVirtualizer.getTotalSize()}px`,
				position: 'relative' as const,
			}
		: {};

	return (
		<div className={`relative border rounded-lg ${className}`}>
			<TimelineHeader numberOfDays={numberOfDays} startDate={startDate} />
			<div
				ref={scrollContainerRef}
				className="overflow-auto max-h-[calc(100vh-100px)]"
			>
				<div className="inline-block min-w-full">
					<div style={containerStyle} className="relative">
						<TimelineGrid
							resources={virtualResources}
							events={events}
							numberOfDays={numberOfDays}
							startDate={startDate}
							virtualizer={rowVirtualizer}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
