import { EventCalendar } from '../../src'
import '../../src/styles/index.css'

export function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Schedulify Playground</h1>
      <EventCalendar />
    </div>
  )
} 