import { useActionState } from 'react';
import type { EventFormProps, Event } from '../types';

async function saveEvent(event: Event): Promise<void> {
  await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  });
}

export function EventForm({ onEventSaved }: EventFormProps) {
  const [error, submitAction, isPending] = useActionState(
    async (state: string | null, formData: FormData) => {
      try {
        const event: Event = {
          id: crypto.randomUUID() || String(Date.now()),
          title: String(formData.get('title')),
          start: new Date(String(formData.get('start'))),
          end: new Date(String(formData.get('end'))),
          description: String(formData.get('description')),
        };

        await saveEvent(event);
        onEventSaved?.(event);
        return null;
      } catch (e) {
        return e instanceof Error ? e.message : 'An error occurred';
      }
    },
    null
  );

  return (
    <form action={submitAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Event Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full rounded-md border p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="start" className="block text-sm font-medium">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            required
            className="w-full rounded-md border p-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="end" className="block text-sm font-medium">
            End Time
          </label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            required
            className="w-full rounded-md border p-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full rounded-md border p-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isPending ? 'Saving...' : 'Save Event'}
      </button>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </form>
  );
} 