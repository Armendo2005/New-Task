import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventCategory, EventResponse, Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventCategoriesUrl = 'https://api.npoint.io/776b281b349100e09837/data';
  private eventsUrl = 'https://api.npoint.io/b2036d5651b65d4f98e8/data';

  constructor(private http: HttpClient) { }

  getEventCategories(): Observable<EventCategory> {
    return this.http.get<EventCategory>(this.eventCategoriesUrl);
  }

  getEvents(page: number, pageSize: number, category?: string, date?: string): Observable<EventResponse> {
    let url = `${this.eventsUrl}?page=${page}&pageSize=${pageSize}`;
    if (category) {
      url += `&category=${category}`;
    }
    if (date) {
      url += `&date=${date}`;
    }
    return this.http.get<EventResponse>(url);
  }
}
