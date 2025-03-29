import * as React from 'react';
import type { Resource } from '../types';
import { TIMELINE_CONSTANTS } from '../constants';

interface ResourceSectionProps {
	resources: Resource[];
	width?: number;
}

export function ResourceSection({
	resources,
	width = TIMELINE_CONSTANTS.DEFAULT_RESOURCE_WIDTH,
}: ResourceSectionProps) {
	return (
		<div className="sticky left-0 z-10 bg-white border-r" style={{ width }}>
			{/* Resource Header */}
			<div
				className="border-b flex items-center px-4 font-medium bg-gray-50"
				style={{ height: TIMELINE_CONSTANTS.HEADER_HEIGHT }}
			>
				Resources
			</div>

			{/* Resource List */}
			<div className="resource-list">
				{resources.map((resource) => (
					<div
						key={resource.id}
						className="px-4 border-b hover:bg-gray-50 flex items-center"
						style={{ height: TIMELINE_CONSTANTS.DEFAULT_ROW_HEIGHT }}
					>
						{resource.name}
					</div>
				))}
			</div>
		</div>
	);
}
