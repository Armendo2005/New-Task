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
  categoryTypeCode: string;
  description: string;
  location: string;
  eventTickets:number;
}

export interface Category {
  categoryId: string;
  categoryName: string;
}