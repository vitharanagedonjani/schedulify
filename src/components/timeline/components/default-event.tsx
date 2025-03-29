import * as React from 'react';
import type { EventComponentProps } from '../types';

export function DefaultEvent({ event, style, onClick }: EventComponentProps) {
	return (
		<button
			type="button"
			className="rounded-md shadow-sm cursor-pointer hover:opacity-90"
			style={{
				...style,
				backgroundColor: event.color || '#7c3aed',
			}}
			onClick={() => onClick?.(event)}
		>
			<div className="px-2 py-1 text-sm text-white font-medium truncate">
				{event.title}
			</div>
		</button>
	);
}
