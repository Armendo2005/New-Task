import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event, EventCategory } from '../../models/event.model';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-events-listing',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink, NgxPaginationModule],
  templateUrl: './events-listing.component.html',
  styleUrl: './events-listing.component.scss'
})
export class EventsListingComponent  implements OnInit {
  events: Event[] = [];
  eventCategories: EventCategory[] =[];  
  selectedCategory: string = '';
  selectedDate: string = '';
  page: number = 1;
  eventsPerPage: number = 6;
  currentPage: any;
  totalEvents!: number;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getEvents( this.page, this.eventsPerPage, this.selectedCategory, this.selectedDate)
      .subscribe(
        (data) => {
          this.events = data.eventList;
          this.totalEvents = data.totalRecordCount;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
  }

   onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.page = 1;
    this.getEvents();
  }

  onDateChange(date: string) {
    this.selectedDate = date;
    this.page = 1;
    this.getEvents();
  }

  onPageChange(page: number) {
    this.page = page;
    this.getEvents();
  }

  getTotalPages() {
    return Math.ceil(this.totalEvents / this.page);
  }

}
