import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private apiMyRequests = 'https://api.npoint.io/880c768e684edc1d2614/data';
  private apiRequestStatus =
    'https://api.npoint.io/0d1ae6c75a16d8886e30/data/requeststatus';

  constructor(private http: HttpClient) {}

  getRequests(): Observable<any> {
    return this.http.get(this.apiMyRequests);
  }

  getRequestStatuses(): Observable<any> {
    return this.http.get(this.apiRequestStatus);
  }
}
