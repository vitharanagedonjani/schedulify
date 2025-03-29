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
	Afternoon: '#7c3aed',
	Evening: '#7c3aed',
	Night: '#7c3aed',
};

const resources: Resource[] = Array.from({ length: 1000 }, (_, i) => ({
	id: `r${i + 1}`,
	name: `Resource ${i + 1}`,
}));

const dayEvents: TimelineEvent[] = Array.from({ length: 1000 }, (_, i) => ({
	id: `e${i + 1}`,
	start: addDays(new Date(), i),
	end: addDays(new Date(), i + 1),
	title: `Event ${i + 1}`,
	resourceId: `r${(i % 1000) + 1}`,
	color: SHIFT_COLORS[SHIFT_TYPES[i % SHIFT_TYPES.length]],
}));

// Should be same day
const hourEvents: TimelineEvent[] = Array.from({ length: 1000 }, (_, i) => ({
	id: `e${i + 1}`,
	start: addHours(new Date().setHours(i % 24, 0, 0, 0), 0),
	end: addHours(new Date().setHours(i % 24, 0, 0, 0), 1),
	title: `Event ${i + 1}`,
	resourceId: `r${(i % 1000) + 1}`,
	color: SHIFT_COLORS[SHIFT_TYPES[i % SHIFT_TYPES.length]],
}));

export function TimelineTest() {
	const [activeView, setActiveView] = React.useState<'hour' | 'day'>('hour');

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
					numberOfDays={30}
					viewMode={activeView}
					formatOptions={{
						dateFormat: (date) =>
							activeView === 'hour'
								? format(date, 'MMM dd')
								: format(date, 'dd/MM'),
						timeFormat: (date) => format(date, 'HH:mm'),
					}}
					timelineConfig={{
						timeCellWidth: activeView === 'hour' ? 100 : 200,
						rowHeight: 52,
						// timeFormat: {
						// 	type: '12',
						// 	showAMPM: true,
						// },
					}}
				/>
			</div>
		</div>
	);
}
