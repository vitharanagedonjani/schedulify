import * as React from 'react';
import type { Resource } from '../types';
import { TIMELINE_CONSTANTS } from '../constants';

interface ResourceSectionProps {
	resources: Resource[];
	width: number;
	rowHeights: Map<string, number>;
	headerHeight: number;
}

export function ResourceSection({
	resources,
	width,
	rowHeights,
	headerHeight,
}: ResourceSectionProps) {
	return (
		<div
			className="sticky left-0 z-10 bg-white border-r flex-none"
			style={{ width }}
		>
			{/* Fixed Header */}
			<div
				className="sticky top-0 z-10 border-b bg-gray-50 flex items-center px-4 font-medium"
				style={{ height: headerHeight }}
			>
				Resources
			</div>

			{/* Resource List - Remove overflow-y-auto */}
			<div>
				{resources.map((resource) => (
					<div
						key={resource.id}
						className="px-4 border-b hover:bg-gray-50 flex items-center"
						style={{
							height:
								rowHeights.get(resource.id) ??
								TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT,
							minHeight: TIMELINE_CONSTANTS.DEFAULT_EVENT_HEIGHT,
						}}
					>
						{resource.name}
					</div>
				))}
			</div>
		</div>
	);
}
