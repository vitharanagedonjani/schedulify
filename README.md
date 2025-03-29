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
- [x] Create day view
  - [x] Add configurable time slots for day view based on numberOfDays
  - [x] Implement horizontal scrolling
  - [x] Create basic grid structure
  - [x] Add basic event rendering
  - [x] Implement dynamic row heights for stacked events
  - [x] Add day header formatting options (MM/DD, DD/MM, etc.)
  - [ ] Add support for week numbers
  - [ ] Add support for working days only view
  - [ ] Add support for custom day cell rendering
  - [ ] Add day boundary indicators (today, weekend, etc.)
- [x] Implement hour view
  - [x] Add time format configuration (12/24 hour)
  - [x] Create hour-based grid (12/24 columns)
  - [x] Add hour header formatting
  - [x] Implement single day constraint
  - [x] Add AM/PM format support
  - [ ] Add support for working hours highlight
  - [ ] Add current time indicator
  - [ ] Add custom hour cell rendering
  - [ ] Add period indicators (Morning, Afternoon, Evening, Night)
- [x] Event Configuration and Rendering
  - Day View Events
    - [x] Calculate event positions based on date ranges
    - [x] Handle events that span multiple days
    - [x] Implement proper event stacking
      - [x] Dynamic row height adjustment
      - [x] Maintain row height sync between resource and timeline
    - [x] Add basic event card with title and time
    - [x] Handle event overflow (when too many events in a day)
    - [x] Add event truncation with "more" indicator
  - Hour View Events
    - [x] Basic event positioning in hour slots
    - [x] Event stacking in hour view
    - [ ] Multi-hour event rendering
  - Common Features
    - [x] Define event display modes (block, line, custom)
    - [x] Configure event styles (colors, borders, etc.)
    - [ ] Add event templates
    - [ ] Handle recurring events
    - [ ] Add event icons and indicators
    - [ ] Add event status visualization

What we've completed so far:
1. Basic timeline structure with fixed resource column
2. Horizontally scrollable timeline grid
3. Day view with configurable number of days
4. Hour view with:
   - Support for both 12/24 hour formats
   - Configurable time slots
   - Proper time formatting
   - AM/PM support for 12-hour format
5. Consistent cell sizing and alignment
6. Resource list with configurable width
7. Sticky headers for both resource and timeline sections
8. Synchronized scrolling between resource and timeline sections
9. Dynamic row heights based on event stacking
10. Event overflow handling with "more" indicators
11. Customizable event components
12. Proper TypeScript types and interfaces

Next steps:
1. Add working hours highlighting for hour view
2. Implement current time indicator
3. Add period indicators
4. Implement event resizing and dragging
5. Add event creation and editing capabilities
6. Implement zoom levels for different time scales
7. Add keyboard navigation
8. Add support for recurring events
9. Implement resource grouping
10. Add event dependencies and conflict detection

### Phase 3: Current Focus
- [ ] Add drag-and-drop event resizing
- [ ] Implement event creation
- [ ] Add event editing capabilities
- [ ] Implement zoom levels for different time scales
- [x] Implement event tooltips and details view
- [x] Improve test data generation and event positioning

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
