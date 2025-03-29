import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import type { TimelineProps, Event } from "../types";

export function Timeline({ events, dateRange }: TimelineProps) {
	const parentRef = useRef<HTMLDivElement>(null);

	// Group events by user
	const userEvents = events.reduce<
		Record<string, { userName: string; events: Event[] }>
	>((acc, event) => {
		if (!acc[event.userId]) {
			acc[event.userId] = {
				userName: event.userName,
				events: [],
			};
		}
		const userEvent = acc[event.userId];
		if (userEvent) {
			userEvent.events.push(event);
		}
		return acc;
	}, {});

	const userIds = Object.keys(userEvents);
	const rowVirtualizer = useVirtualizer({
		count: userIds.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 60, // height of each row
		overscan: 5,
	});

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex border-b">
				<div className="w-48 flex-shrink-0 p-4 font-medium">Name</div>
				<div className="flex-1 flex">{/* Date headers */}</div>
			</div>

			{/* Virtualized rows */}
			<div ref={parentRef} className="flex-1 overflow-auto">
				<div
					style={{
						height: `${rowVirtualizer.getTotalSize()}px`,
						width: "100%",
						position: "relative",
					}}
				>
					{rowVirtualizer.getVirtualItems().map((virtualRow) => {
						const userId = userIds[virtualRow.index];
						const userData = userId ? userEvents[userId] : null;
						if (!userData) return null;

						return (
							<div
								key={virtualRow.index}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: `${virtualRow.size}px`,
									transform: `translateY(${virtualRow.start}px)`,
								}}
								className="flex border-b"
							>
								<div className="w-48 flex-shrink-0 p-4">
									{userData.userName}
								</div>
								<div className="flex-1 relative">
									{/* Events will be positioned here */}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
