import * as React from 'react';
import {
	format,
	addHours,
	startOfDay,
	differenceInMinutes,
	addMinutes,
} from 'date-fns';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../components/ui/tooltip';
import {
	DndContext,
	useSensor,
	useSensors,
	PointerSensor,
	type DragEndEvent,
} from '@dnd-kit/core';

export interface TimelineEvent {
	id: string;
	start: Date;
	end: Date;
	title: string;
	resourceId: string;
	color?: string;
}

export interface Resource {
	id: string;
	title: string;
	color?: string;
	metadata?: Record<string, string | number | boolean>;
}

export interface TimelineViewProps {
	events: TimelineEvent[];
	resources: Resource[];
	startDate?: Date;
	className?: string;
	hourHeight?: number;
	resourceWidth?: number;
	onEventClick?: (event: TimelineEvent) => void;
	onEventUpdate?: (event: TimelineEvent) => void;
}

// Sample data for testing
export const sampleResources: Resource[] = [
	{ id: '1', title: 'Resource 1', color: '#3b82f6' },
	{ id: '2', title: 'Resource 2', color: '#10b981' },
	{ id: '3', title: 'Resource 3', color: '#f59e0b' },
];

export const sampleEvents: TimelineEvent[] = [
	{
		id: '1',
		start: addHours(startOfDay(new Date()), 9),
		end: addHours(startOfDay(new Date()), 11),
		title: 'Meeting 1',
		resourceId: '1',
		color: '#3b82f6',
	},
	{
		id: '2',
		start: addHours(startOfDay(new Date()), 10),
		end: addHours(startOfDay(new Date()), 12),
		title: 'Meeting 2',
		resourceId: '1',
		color: '#10b981',
	},
	{
		id: '3',
		start: addHours(startOfDay(new Date()), 14),
		end: addHours(startOfDay(new Date()), 16),
		title: 'Meeting 3',
		resourceId: '2',
		color: '#f59e0b',
	},
];

export function TimelineView({
	events,
	resources,
	startDate = startOfDay(new Date()),
	className = '',
	hourHeight = 60,
	resourceWidth = 200,
	onEventClick,
	onEventUpdate,
}: TimelineViewProps) {
	// Container ref for virtualization
	const parentRef = React.useRef<HTMLDivElement>(null);

	// Resource virtualization
	const resourceVirtualizer = useVirtualizer({
		count: resources.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => resourceWidth,
		horizontal: true,
	});

	// Time slots virtualization (24 hours)
	const timeVirtualizer = useVirtualizer({
		count: 24,
		getScrollElement: () => parentRef.current,
		estimateSize: () => hourHeight,
		horizontal: false,
	});

	// Group events by resource
	const eventsByResource = React.useMemo(() => {
		const grouped = new Map<string, TimelineEvent[]>();
		for (const event of events) {
			const resourceEvents = grouped.get(event.resourceId) || [];
			resourceEvents.push(event);
			grouped.set(event.resourceId, resourceEvents);
		}
		return grouped;
	}, [events]);

	// DnD sensors
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	// Calculate event position and handle overlapping
	const getEventStyle = React.useCallback(
		(event: TimelineEvent) => {
			const resourceIndex = resources.findIndex(
				(r) => r.id === event.resourceId
			);
			if (resourceIndex === -1) return null;

			const startMinutes = differenceInMinutes(event.start, startDate);
			const endMinutes = differenceInMinutes(event.end, startDate);
			const durationMinutes = endMinutes - startMinutes;

			const top = (startMinutes / 60) * hourHeight;
			const height = (durationMinutes / 60) * hourHeight;
			const left = resourceIndex * resourceWidth;

			// Find overlapping events
			const resourceEvents = eventsByResource.get(event.resourceId) || [];
			const overlappingEvents = resourceEvents.filter(
				(e) =>
					e.id !== event.id &&
					((e.start <= event.start && e.end > event.start) ||
						(e.start < event.end && e.end >= event.end) ||
						(e.start >= event.start && e.end <= event.end))
			);

			// Calculate width based on overlapping events
			const totalOverlapping = overlappingEvents.length + 1;
			const width = (resourceWidth - 2) / totalOverlapping;
			const offset = overlappingEvents.findIndex((e) => e.id === event.id);

			return {
				top,
				height,
				left: left + offset * width,
				width: width - 2, // -2 for border gap
			};
		},
		[resources, startDate, hourHeight, resourceWidth, eventsByResource]
	);

	// Handle event resize
	const handleDragEnd = React.useCallback(
		(event: DragEndEvent) => {
			const { active, delta } = event;
			if (!active || !delta) return;

			const eventId = active.id as string;
			const timelineEvent = events.find((e) => e.id === eventId);
			if (!timelineEvent) return;

			const deltaMinutes = Math.round((delta.y / hourHeight) * 60);
			const isResizingTop = active.data.current?.resizeHandle === 'top';
			const isResizingBottom = active.data.current?.resizeHandle === 'bottom';

			if (isResizingTop) {
				const newStart = addMinutes(timelineEvent.start, deltaMinutes);
				if (newStart < timelineEvent.end) {
					onEventUpdate?.({
						...timelineEvent,
						start: newStart,
					});
				}
			} else if (isResizingBottom) {
				const newEnd = addMinutes(timelineEvent.end, deltaMinutes);
				if (newEnd > timelineEvent.start) {
					onEventUpdate?.({
						...timelineEvent,
						end: newEnd,
					});
				}
			}
		},
		[events, hourHeight, onEventUpdate]
	);

	return (
		<TooltipProvider>
			<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
				<div
					ref={parentRef}
					className={`schedulify-timeline relative overflow-auto ${className}`}
					style={{
						height: '100%',
						width: '100%',
						backgroundColor: 'white',
					}}
				>
					{/* Timeline header */}
					<div
						className="sticky top-0 z-10 bg-white border-b"
						style={{
							height: '40px',
							width: resourceVirtualizer.getTotalSize(),
						}}
					>
						{resourceVirtualizer.getVirtualItems().map((virtualItem) => (
							<div
								key={virtualItem.key}
								className="absolute top-0 border-r px-4 py-2 font-medium"
								style={{
									left: virtualItem.start,
									width: virtualItem.size,
								}}
							>
								{resources[virtualItem.index].title}
							</div>
						))}
					</div>

					{/* Time grid */}
					<div
						className="relative"
						style={{
							height: timeVirtualizer.getTotalSize(),
							width: resourceVirtualizer.getTotalSize(),
						}}
					>
						{/* Grid lines */}
						<div className="absolute inset-0">
							{resources.map((resource) => (
								<div
									key={`resource-line-${resource.id}`}
									className="absolute top-0 bottom-0 border-r border-gray-200"
									style={{ left: resources.indexOf(resource) * resourceWidth }}
								/>
							))}
							{Array.from({ length: 24 }, (_, i) => (
								<div
									key={`hour-line-${format(addHours(startDate, i), 'HH:mm')}`}
									className="absolute left-0 right-0 border-b border-gray-200"
									style={{ top: i * hourHeight }}
								/>
							))}
						</div>

						{/* Time labels */}
						<div className="sticky left-0 z-10 bg-white border-r w-16">
							{timeVirtualizer.getVirtualItems().map((virtualItem) => (
								<div
									key={virtualItem.key}
									className="absolute border-b px-2 py-1 text-sm text-gray-600"
									style={{
										top: virtualItem.start,
										height: virtualItem.size,
									}}
								>
									{format(addHours(startDate, virtualItem.index), 'HH:mm')}
								</div>
							))}
						</div>

						{/* Events */}
						{events.map((event) => {
							const style = getEventStyle(event);
							if (!style) return null;

							const resource = resources.find((r) => r.id === event.resourceId);
							const eventDuration = differenceInMinutes(event.end, event.start);

							return (
								<Tooltip key={event.id}>
									<TooltipTrigger asChild>
										<div
											className="absolute text-white rounded px-2 py-1 text-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left border-none"
											style={{
												...style,
												backgroundColor: event.color || '#3b82f6',
											}}
										>
											<button
												type="button"
												className="w-full h-full text-left"
												onClick={() => onEventClick?.(event)}
												onKeyDown={(e) => {
													if (e.key === 'Enter' || e.key === ' ') {
														onEventClick?.(event);
													}
												}}
											>
												{event.title}
											</button>
											<div
												className="absolute left-0 right-0 h-2 cursor-ns-resize bg-black/10 hover:bg-black/20"
												style={{ top: 0 }}
												data-resize-handle="top"
											/>
											<div
												className="absolute left-0 right-0 h-2 cursor-ns-resize bg-black/10 hover:bg-black/20"
												style={{ bottom: 0 }}
												data-resize-handle="bottom"
											/>
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<div className="space-y-1">
											<h4 className="font-medium">{event.title}</h4>
											<div className="space-y-0.5">
												<p>
													<span className="font-medium">Resource:</span>{' '}
													{resource?.title}
												</p>
												<p>
													<span className="font-medium">Start:</span>{' '}
													{format(event.start, 'PPp')}
												</p>
												<p>
													<span className="font-medium">End:</span>{' '}
													{format(event.end, 'PPp')}
												</p>
												<p>
													<span className="font-medium">Duration:</span>{' '}
													{eventDuration} minutes
												</p>
											</div>
										</div>
									</TooltipContent>
								</Tooltip>
							);
						})}
					</div>
				</div>
			</DndContext>
		</TooltipProvider>
	);
}
