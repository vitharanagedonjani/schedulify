import React from 'react';
import {
	TimelineView,
	type Resource,
	type TimelineEvent,
} from '../components/timeline';
import { addDays, setHours, startOfDay } from 'date-fns';

const SHIFT_TYPES = ['Morning', 'Afternoon', 'Evening', 'Night'] as const;
const SHIFT_COLORS = {
	Morning: '#3b82f6', // Blue
	Afternoon: '#10b981', // Green
	Evening: '#f59e0b', // Orange
	Night: '#7c3aed', // Purple
};

function generateTestData(resourceCount = 1000, eventsPerResource = 10) {
	// Generate resources
	const resources: Resource[] = Array.from(
		{ length: resourceCount },
		(_, i) => ({
			id: `r${i + 1}`,
			name: `Resource ${i + 1}`,
		})
	);

	// Generate events
	const events: TimelineEvent[] = [];
	const startDate = startOfDay(new Date());

	for (const resource of resources) {
		// Generate random events for each resource
		for (let i = 0; i < eventsPerResource; i++) {
			const dayOffset = Math.floor(Math.random() * 7); // Random day within a week
			const shiftType =
				SHIFT_TYPES[Math.floor(Math.random() * SHIFT_TYPES.length)];

			// Set shift times based on type
			let startHour: number;
			let duration: number;

			switch (shiftType) {
				case 'Morning':
					startHour = 8;
					duration = 5;
					break;
				case 'Afternoon':
					startHour = 13;
					duration = 5;
					break;
				case 'Evening':
					startHour = 18;
					duration = 6;
					break;
				case 'Night':
					startHour = 0;
					duration = 5;
					break;
			}

			const eventDate = addDays(startDate, dayOffset);
			const eventStart = setHours(eventDate, startHour);
			const eventEnd = setHours(eventDate, startHour + duration);

			events.push({
				id: `${resource.id}-event-${i}`,
				resourceId: resource.id,
				title: `${shiftType} Shift`,
				start: eventStart,
				end: eventEnd,
				type: shiftType,
				color: SHIFT_COLORS[shiftType],
			});
		}
	}

	return { resources, events };
}

export function TimelineTest() {
	const { resources, events } = React.useMemo(
		() => generateTestData(1000, 10),
		[]
	);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Schedule View</h1>
			<div className="h-[calc(100vh-100px)]">
				<TimelineView
					resources={resources}
					events={events}
					startDate={new Date()}
					numberOfDays={30}
					virtualization={{
						enabled: true,
						rowHeight: 60,
						overscan: 5,
					}}
					showAllDayEvents={true}
				/>
			</div>
		</div>
	);
}
