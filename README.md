# Schedulify

A high-performance React timeline component for resource scheduling.

## Features
- ⚡️ Lightning-fast performance with efficient rendering
- 📅 Resource-based timeline scheduling
- 🎯 Precise event positioning
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
- [x] Create day view
  - [x] Add configurable time slots for day view
  - [x] Implement horizontal scrolling
  - [x] Create basic grid structure
  - [x] Add basic event rendering
  - [x] Add day header formatting options
  - [ ] Add support for week numbers
  - [ ] Add support for working days only view
  - [ ] Add day boundary indicators (today, weekend, etc.)
- [x] Implement hour view
  - [x] Add time format configuration (12/24 hour)
  - [x] Create hour-based grid
  - [x] Add hour header formatting
  - [x] Add AM/PM format support
  - [ ] Add support for working hours highlight
  - [ ] Add current time indicator
  - [ ] Add period indicators
- [x] Event Configuration and Rendering
  - [x] Resource-based event positioning
    - [x] Events contained within resource rows
    - [x] Proper event stacking within rows
    - [x] Multi-day event spanning
  - [x] Event styling
    - [x] Configurable colors and borders
    - [x] Custom event components
    - [x] Hover and active states
  - [ ] Event interactions
    - [ ] Drag and drop
    - [ ] Resizing
    - [ ] Click handling

What we've completed so far:
1. Basic timeline structure with resource rows
2. Horizontally scrollable timeline grid
3. Day and hour view implementations
4. Resource-constrained event positioning
5. Event styling and customization
6. Synchronized scrolling
7. TypeScript type safety

Next steps:
1. Add working hours highlighting
2. Implement current time indicator
3. Add event interactions (drag, resize)
4. Add keyboard navigation
5. Implement resource grouping
6. Add event dependencies

### Phase 3: Current Focus
- [ ] Add drag-and-drop event resizing
- [ ] Implement event creation
- [ ] Add event editing capabilities
- [ ] Implement zoom levels

### Phase 4: Planned Features
- [ ] Add support for recurring events
- [ ] Implement resource grouping
- [ ] Add event dependencies
- [ ] Add export/import functionality

## Contributing
Contributions are welcome! Please read our Contributing Guidelines for details.

## License
MIT
