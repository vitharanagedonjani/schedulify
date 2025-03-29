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
```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build
```

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

## License
MIT
