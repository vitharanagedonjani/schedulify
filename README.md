# Schedulify

A high-performance React scheduler capable of handling 100,000+ events smoothly.

## Features
- ⚡️ Lightning-fast performance with virtualized rendering
- 📅 Intuitive event management
- 🎯 Precise time slot scheduling
- 🔄 Real-time updates
- 🌙 Dark mode support
- 📱 Responsive design

## Quick Start

## Usage
```typescript
import { EventCalendar } from 'schedulify'

function App() {
  return (
    <EventCalendar
      events={events}
      onEventCreate={handleCreate}
      onEventUpdate={handleUpdate}
    />
  )
}
```

## Configuration
Customize your calendar with various options:
```typescript
<EventCalendar
  view="week"
  timezone="UTC"
  workingHours={[9, 17]}
  theme="light"
/>
```

## Performance
- Optimized for large datasets
- Virtual scrolling for efficient rendering
- Minimal re-renders
- Optimistic updates

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development Progress

### Phase 1: Project Setup and Basic Structure
- [x] Initialize project with Bun package manager
- [x] Set up TypeScript configuration
- [x] Configure essential dependencies (React, Tailwind CSS)
- [x] Create basic project structure

### Phase 2: Timeline Component Implementation
- [x] Create basic TimelineView component structure
- [x] Implement virtualization using TanStack Virtual
- [x] Add resource and time slot rendering
- [x] Implement event positioning and layout
- [x] Handle event overlapping
- [x] Add event click interactions
- [x] Implement accessibility features

### Phase 3: Current Focus
- [ ] Add drag-and-drop event resizing
- [ ] Implement event creation
- [ ] Add event editing capabilities
- [ ] Implement zoom levels for different time scales
- [ ] Add keyboard navigation
- [x] Implement event tooltips and details view

### Phase 4: Planned Features
- [ ] Add support for recurring events
- [ ] Implement resource grouping
- [ ] Add event dependencies
- [ ] Implement conflict detection
- [ ] Add export/import functionality
- [ ] Implement undo/redo functionality

## Contributing
Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License
MIT
