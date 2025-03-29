import { Timeline } from "../../src";

// Sample data for testing
const SAMPLE_EVENTS = [
	{
		id: "1",
		userId: "1",
		userName: "Omar Donin",
		startTime: new Date("2024-03-15T00:00:00"),
		endTime: new Date("2024-03-15T08:00:00"),
		category: "Night" as const,
	},
	{
		id: "2",
		userId: "2",
		userName: "Jaxson Korsgaard",
		startTime: new Date("2024-03-16T13:00:00"),
		endTime: new Date("2024-03-16T18:00:00"),
		category: "Afternoon" as const,
	},
];

const DATE_RANGE = {
	start: new Date("2024-03-15"),
	end: new Date("2024-03-20"),
};

export function App() {
	return (
		<div className="p-8 h-screen">
			<h1 className="text-3xl font-bold mb-8">Schedulify Playground</h1>
			<div className="h-[calc(100vh-120px)] border rounded-lg shadow-sm">
				<Timeline events={SAMPLE_EVENTS} dateRange={DATE_RANGE} />
			</div>
		</div>
	);
}
