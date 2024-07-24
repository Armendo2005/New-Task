export interface EventCategoryResponse {
  totalRecordCount: number;
  eventCategoryList: Category[];
}
export interface ApiResponse {
  pageSize: number;
  eventList: Event[];
  totalRecordCount: number;
}

export interface Event {
  eventId: any;
  title: string;
  start: string;
  end: string;
  image: string;
  categoryTypeCode: number;
  description: string;
  location: string;
  eventTickets: EventTicket[];
}

export interface Category {
  categoryId: string;
  categoryName: string;
}

export interface EventTicket {
  color: string;
  currency: string;
  ticketId: string;
  isSoldOut: boolean;
  ticketType: string;
  remainingTickets: number;
  ticketPriceAmount: number;
}