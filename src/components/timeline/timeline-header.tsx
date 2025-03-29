import * as React from 'react';
import { format, addDays } from 'date-fns';

interface TimelineHeaderProps {
	numberOfDays: number;
	startDate: Date;
}

export function TimelineHeader({
	numberOfDays,
	startDate,
}: TimelineHeaderProps) {
	const dates = React.useMemo(
		() => Array.from({ length: numberOfDays }, (_, i) => addDays(startDate, i)),
		[startDate, numberOfDays]
	);

	return (
		<div
			className="grid sticky top-0 z-10"
			style={{
				gridTemplateColumns: `250px repeat(${numberOfDays}, 1fr)`,
			}}
		>
			<div className="bg-gray-50 p-4 border-b border-r font-medium">Name</div>
			{dates.map((date) => (
				<div
					key={format(date, 'yyyy-MM-dd')}
					className="bg-gray-50 p-4 border-b border-r font-medium text-center"
				>
					{format(date, 'dd/MM')}
				</div>
			))}
		</div>
	);
}
