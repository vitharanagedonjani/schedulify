# Schedulify Usage Guide

## TimelineView Component

The TimelineView component is a high-performance React component for displaying and managing events in a timeline format. It supports virtualization for handling large datasets, event overlapping, and interactive features like resizing and clicking.

### Basic Usage

```tsx
import { TimelineView } from 'schedulify';

function App() {
  const events = [
    {
      id: '1',
      start: new Date('2024-03-29T09:00:00'),
      end: new Date('2024-03-29T11:00:00'),
      title: 'Team Meeting',
      resourceId: '1',
      color: '#3b82f6',
    },
    // ... more events
  ];

  const resources = [
    { id: '1', title: 'Room 1', color: '#3b82f6' },
    { id: '2', title: 'Room 2', color: '#10b981' },
    // ... more resources
  ];

  return (
    <TimelineView
      events={events}
      resources={resources}
      onEventClick={(event) => console.log('Event clicked:', event)}
      onEventUpdate={(event) => console.log('Event updated:', event)}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `TimelineEvent[]` | Required | Array of events to display |
| `resources` | `Resource[]` | Required | Array of resources to display |
| `startDate` | `Date` | `startOfDay(new Date())` | The starting date for the timeline |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `hourHeight` | `number` | `60` | Height of each hour in pixels |
| `resourceWidth` | `number` | `200` | Width of each resource column in pixels |
| `onEventClick` | `(event: TimelineEvent) => void` | Optional | Callback when an event is clicked |
| `onEventUpdate` | `(event: TimelineEvent) => void` | Optional | Callback when an event is updated (resized) |

### Event Interface

```tsx
interface TimelineEvent {
  id: string;          // Unique identifier for the event
  start: Date;         // Start time of the event
  end: Date;           // End time of the event
  title: string;       // Display title of the event
  resourceId: string;  // ID of the resource this event belongs to
  color?: string;      // Optional color for the event
}
```

### Resource Interface

```tsx
interface Resource {
  id: string;          // Unique identifier for the resource
  title: string;       // Display title of the resource
  color?: string;      // Optional color for the resource
  metadata?: Record<string, string | number | boolean>; // Optional metadata
}
```

### Features

#### Event Resizing
Events can be resized by dragging the top or bottom handles. The component will call `onEventUpdate` with the updated event data.

```tsx
<TimelineView
  events={events}
  resources={resources}
  onEventUpdate={(updatedEvent) => {
    // Update your events state here
    setEvents(events.map(e => 
      e.id === updatedEvent.id ? updatedEvent : e
    ));
  }}
/>
```

#### Event Clicking
Events can be clicked to trigger the `onEventClick` callback.

```tsx
<TimelineView
  events={events}
  resources={resources}
  onEventClick={(event) => {
    // Handle event click, e.g., show details modal
    showEventDetails(event);
  }}
/>
```

#### Virtualization
The component uses virtualization for both resources and time slots, making it efficient with large datasets.

#### Event Overlapping
Events that overlap in time are automatically positioned side by side within their resource column.

### Styling

The component uses Tailwind CSS for styling and can be customized using the `className` prop:

```tsx
<TimelineView
  events={events}
  resources={resources}
  className="border rounded-lg shadow-lg"
/>
```

### Best Practices

1. **Event IDs**: Ensure each event has a unique ID
2. **Resource IDs**: Ensure each resource has a unique ID
3. **Date Handling**: Use proper Date objects for event start and end times
4. **Performance**: For large datasets, consider implementing pagination or lazy loading
5. **Accessibility**: The component includes keyboard navigation and ARIA attributes

### Example with State Management

```tsx
import { useState } from 'react';
import { TimelineView } from 'schedulify';

function TimelineApp() {
  const [events, setEvents] = useState([]);
  const [resources] = useState([
    { id: '1', title: 'Room 1', color: '#3b82f6' },
    { id: '2', title: 'Room 2', color: '#10b981' },
  ]);

  const handleEventUpdate = (updatedEvent) => {
    setEvents(events.map(e => 
      e.id === updatedEvent.id ? updatedEvent : e
    ));
  };

  const handleEventClick = (event) => {
    // Show event details modal
    showEventDetails(event);
  };

  return (
    <TimelineView
      events={events}
      resources={resources}
      onEventUpdate={handleEventUpdate}
      onEventClick={handleEventClick}
    />
  );
}
```

### Error Handling

The component includes built-in error handling for:
- Invalid event times (end before start)
- Missing resource references
- Invalid date objects

### Browser Support

The component is compatible with all modern browsers that support:
- ES6+
- CSS Grid
- CSS Flexbox
- Intersection Observer API 