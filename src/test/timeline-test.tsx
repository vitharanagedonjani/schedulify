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

// Generate a smaller set of resources for testing
const resources: Resource[] = Array.from({ length: 15 }, (_, i) => ({
	id: `r${i + 1}`,
	name: `Resource ${i + 1}`,
}));

const dayEvents: TimelineEvent[] = [
	// First row events
	{
		id: 'event1',
		resourceId: 'r1',
		start: new Date('2024-03-29T00:00:00'),
		end: new Date('2024-03-30T00:00:00'),
		title: '03/29',
		color: SHIFT_COLORS.Evening,
	},
	{
		id: 'event2',
		resourceId: 'r1',
		start: new Date('2024-04-02T00:00:00'),
		end: new Date('2024-04-05T00:00:00'),
		title: '04/02 - 04/05',
		color: SHIFT_COLORS.Afternoon,
	},
	{
		id: 'event3',
		resourceId: 'r1',
		start: new Date('2024-04-03T00:00:00'),
		end: new Date('2024-04-04T00:00:00'),
		title: '04/03 - 04/04',
		color: SHIFT_COLORS.Morning,
	},

	// Second row events
	{
		id: 'event4',
		resourceId: 'r2',
		start: new Date('2024-03-30T00:00:00'),
		end: new Date('2024-04-01T00:00:00'),
		title: '03/30 - 04/01',
		color: SHIFT_COLORS.Morning,
	},
	{
		id: 'event5',
		resourceId: 'r2',
		start: new Date('2024-04-08T12:00:00'),
		end: new Date('2024-04-08T16:00:00'),
		title: '04/08 (12:00) - 04/08 (16:00)',
		color: SHIFT_COLORS.Morning,
	},
];

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
					startDate={new Date('2024-03-29T00:00:00')} // Exact start date
					numberOfDays={15} // Show exactly 15 days
					viewMode={activeView}
					formatOptions={{
						dateFormat: (date) => format(date, 'MMM dd'),
						timeFormat: (date) => format(date, 'HH:mm'),
					}}
					timelineConfig={{
						timeCellWidth: 100,
						baseRowHeight: 52,
						eventHeight: 48,
					}}
				/>
			</div>
		</div>
	);
}
