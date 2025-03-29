import React from 'react';
import {
	TimelineView,
	type Resource,
	type TimelineEvent,
} from '../components/timeline';
import { addDays, addHours, format } from 'date-fns';

const SHIFT_TYPES = ['Morning', 'Afternoon', 'Evening', 'Night'] as const;
const SHIFT_COLORS = {
	Morning: '#7c3aed', // Purple
	Afternoon: '#2563eb', // Blue
	Evening: '#059669', // Green
	Night: '#dc2626', // Red
};

// Generate 1000 resources
const resources: Resource[] = Array.from({ length: 1000 }, (_, i) => ({
	id: `r${i + 1}`,
	name: `Resource ${i + 1}`,
}));

// Helper function to generate a random date within a range
function getRandomDate(start: Date, end: Date) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

// Generate day-based events (4-5 events per resource within 30 days)
const dayEvents: TimelineEvent[] = resources.flatMap((resource) => {
	// Generate 4-5 events for each resource
	const numberOfEvents = 4 + Math.floor(Math.random() * 2);
	const startDate = new Date();
	const endDate = addDays(startDate, 30);

	return Array.from({ length: numberOfEvents }, (_, i) => {
		const eventStart = getRandomDate(startDate, endDate);
		const durationDays = 1 + Math.floor(Math.random() * 3); // 1-3 days duration

		return {
			id: `e${resource.id}-${i}`,
			resourceId: resource.id,
			start: eventStart,
			end: addDays(eventStart, durationDays),
			title: `Event ${i + 1}`,
			color:
				SHIFT_COLORS[
					SHIFT_TYPES[Math.floor(Math.random() * SHIFT_TYPES.length)]
				],
		};
	});
});

// Generate hour-based events (for the current day)
const hourEvents: TimelineEvent[] = resources.flatMap((resource) => {
	const numberOfEvents = 4 + Math.floor(Math.random() * 2);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return Array.from({ length: numberOfEvents }, (_, i) => {
		const startHour = Math.floor(Math.random() * 20); // Random start hour (0-19)
		const duration = 2 + Math.floor(Math.random() * 3); // 2-4 hours duration

		return {
			id: `h${resource.id}-${i}`,
			resourceId: resource.id,
			start: addHours(today, startHour),
			end: addHours(today, startHour + duration),
			title: `Event ${i + 1}`,
			color:
				SHIFT_COLORS[
					SHIFT_TYPES[Math.floor(Math.random() * SHIFT_TYPES.length)]
				],
		};
	});
});

export function TimelineTest() {
	const [activeView, setActiveView] = React.useState<'hour' | 'day'>('day');

	return (
		<div className="p-4">
			{/* Tabs */}
			<div className="flex space-x-4 mb-4">
				<button
					type="button"
					className={`px-4 py-2 rounded-lg font-medium ${
						activeView === 'hour'
							? 'bg-purple-600 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
					}`}
					onClick={() => setActiveView('hour')}
				>
					Hour View
				</button>
				<button
					type="button"
					className={`px-4 py-2 rounded-lg font-medium ${
						activeView === 'day'
							? 'bg-purple-600 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
					}`}
					onClick={() => setActiveView('day')}
				>
					Day View
				</button>
			</div>

			{/* Timeline View */}
			<div className="h-[calc(100vh-120px)]">
				<TimelineView
					resources={resources}
					events={activeView === 'hour' ? hourEvents : dayEvents}
					startDate={new Date()}
					numberOfDays={activeView === 'hour' ? 1 : 30}
					viewMode={activeView}
					formatOptions={{
						dateFormat: (date) =>
							activeView === 'hour'
								? format(date, 'MMM dd')
								: format(date, 'dd/MM'),
						timeFormat: (date) => format(date, 'HH:mm'),
					}}
					timelineConfig={{
						timeCellWidth: activeView === 'hour' ? 150 : 100, // Smaller width for day view
						baseRowHeight: 52,
						eventHeight: 48,
					}}
				/>
			</div>
		</div>
	);
}
