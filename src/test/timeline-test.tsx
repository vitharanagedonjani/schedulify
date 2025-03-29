import {
	TimelineView,
	type TimelineEvent,
	type Resource,
} from '../components/timeline';
import { addDays, setHours, setMinutes, startOfDay } from 'date-fns';

const sampleResources: Resource[] = [
	{ id: '1', name: 'Omar Donin' },
	{ id: '2', name: 'Jaxson Korsgaard' },
	{ id: '3', name: 'Emerson Septimus' },
	{ id: '4', name: 'Kadin Bator' },
	{ id: '5', name: 'Makenna Lubin' },
];

const generateSampleEvents = (): TimelineEvent[] => {
	const startDate = startOfDay(new Date('2024-03-29')); // Use fixed date for testing

	return [
		{
			id: '1',
			start: setHours(startDate, 0), // Night shift starting at midnight
			end: setHours(startDate, 5),
			title: 'Night Shift',
			resourceId: '1', // Omar Donin
			type: 'Night',
		},
		{
			id: '2',
			start: setHours(startDate, 13), // Afternoon shift
			end: setHours(startDate, 18),
			title: 'Afternoon Shift',
			resourceId: '2', // Jaxson Korsgaard
			type: 'Afternoon',
		},
	];
};

export function TimelineTest() {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Schedule View</h1>
			<div className="border rounded-lg shadow-sm">
				<TimelineView
					resources={sampleResources}
					events={generateSampleEvents()}
					startDate={new Date('2024-03-29')}
					numberOfDays={7}
				/>
			</div>
		</div>
	);
}
