import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event, ApiResponse , Category, EventCategoryResponse  } from '../../models/event.model';
import { NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryNamePipe } from "../../../../shared/pipe/CategoryName/category-name.pipe";

@Component({
  selector: 'app-events-listing',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink, NgxPaginationModule, DatePipe, CategoryNamePipe],
  templateUrl: './events-listing.component.html',
  styleUrl: './events-listing.component.scss'
})
export class EventsListingComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  categories: Category[] = [];
  p: number = 1;
  filters = {
    date: '',
    category: '',
    availableTickets: false
  };

  constructor(private eventService: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEvents();
    this.fetchCategories();
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe((data: ApiResponse) => {
      // Debug the data structure
      console.log('Fetched events:', data);

      // Extract the event list from the response
      this.events = data.eventList;
      // Display all events initially
      this.filteredEvents = [...this.events];
      this.applyFilters(); // Apply initial filters (if any) like filtering out past events
    });
  }

  fetchCategories(): void {
    this.eventService.getCategories().subscribe((data: EventCategoryResponse) => {
      console.log('Fetched categories:', data);
      this.categories = data.eventCategoryList;
    });
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter(event => {
      return (!this.filters.date || new Date(event.start).toISOString().slice(0, 10) === this.filters.date) &&
             //(!this.filters.category || event.categoryTypeCode === this.filters.category) &&
             (!this.filters.availableTickets || event.eventTickets > 0);
    });
    this.filteredEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }

  viewDetails(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }
}