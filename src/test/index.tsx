import React from 'react';
import { createRoot } from 'react-dom/client';
import { TimelineTest } from './timeline-test';
import './globals.css';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<TimelineTest />
	</React.StrictMode>
);
