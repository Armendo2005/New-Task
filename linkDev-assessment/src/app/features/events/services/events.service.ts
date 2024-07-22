import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Event, Category, EventCategoryResponse  } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  private eventsUrl = 'https://api.npoint.io/b2036d5651b65d4f98e8/data';
  private categoriesUrl = 'https://api.npoint.io/776b281b349100e09837/data';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.eventsUrl);
  }

  getCategories(): Observable<EventCategoryResponse> {
    return this.http.get<EventCategoryResponse>(this.categoriesUrl);
  }
}
