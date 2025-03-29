import * as React from 'react';
import { format } from 'date-fns';

interface TimelineHeaderProps {
	dates: Date[];
}

export function TimelineHeader({ dates }: TimelineHeaderProps) {
	return (
		<div className="contents">
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
