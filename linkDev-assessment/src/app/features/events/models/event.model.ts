export interface EventCategory {
  categoryId: string;
  categoryName: string;
}

export interface Event {
  eventId: string;
  title: string;
  start: string;
  end: string;
  image: string;
  categoryName: string;
  description: string;
  location: string;
}

export interface EventResponse {
  totalRecordCount: number;
  eventList: Event[];
}