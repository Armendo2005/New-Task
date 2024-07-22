import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginationInstance, NgxPaginationModule } from 'ngx-pagination';
import { CategoryNamePipe } from "../../pipe/CategoryName/category-name.pipe";
import { RouterLink } from '@angular/router';
import { NgFor, DatePipe  } from '@angular/common';

@Component({
  selector: 'app-draft',
  standalone: true,
  imports: [CategoryNamePipe, RouterLink, NgFor, DatePipe, NgxPaginationModule],
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent {
  events!: any[];
  p: number = 1;
  config: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private http: HttpClient) {
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get('https://api.npoint.io/b2036d5651b65d4f98e8/data')
      .subscribe((response: any) => {
        this.events = response.eventList;
        this.config.totalItems = this.events.length;
      });
  }
  
}