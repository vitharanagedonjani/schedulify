export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface EventFormProps {
  onEventSaved?: (event: Event) => void;
}

export interface EventItemProps {
  event: Event;
  onDelete?: (id: string) => void;
  onEdit?: (event: Event) => void;
} 