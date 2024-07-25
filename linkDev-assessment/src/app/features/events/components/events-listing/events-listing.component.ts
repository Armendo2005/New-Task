import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import {
  Event,
  EventResponse,
  Category,
  EventCategoryResponse,
  EventTicket,
} from '../../models/event.model';
import { NgFor, DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryNamePipe } from '../../../../shared/pipe/CategoryName/category-name.pipe';
import { DateOnlyPipe } from '../../../../shared/pipe/date-only.pipe';
import { parseISO, isValid } from 'date-fns';

@Component({
  selector: 'app-events-listing',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    RouterLink,
    NgxPaginationModule,
    DatePipe,
    CategoryNamePipe,
    DateOnlyPipe,
  ],
  templateUrl: './events-listing.component.html',
  styleUrl: './events-listing.component.scss',
  providers: [DatePipe],
})
export class EventsListingComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  categories: Category[] = [];
  p: number = 1;
  filters = {
    date: '',
    category: '',
    availableTickets: false,
  };

  constructor(private eventService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.fetchCategories();
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe((data: EventResponse) => {
      console.log('Fetched events:', data);
      this.events = data.eventList;
      this.filteredEvents = [...this.events];
      this.applyFilters();
    });
  }

  fetchCategories(): void {
    this.eventService
      .getCategories()
      .subscribe((data: EventCategoryResponse) => {
        console.log('Fetched categories:', data);
        this.categories = data.eventCategoryList || [];
      });
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter((event) => {
      const eventStart = new Date(event.start);
      const filterDate = this.filters.date ? new Date(this.filters.date) : null;
      return (
        (!filterDate || eventStart >= filterDate) &&
        (!this.filters.date ||
          new Date(event.start).toISOString().slice(0, 10) ===
            this.filters.date) &&
        (this.filters.category === '' ||
          this.categories.find((c) => c.categoryName === this.filters.category)
            ?.categoryId === event.categoryTypeCode.toString()) &&
        (!this.filters.availableTickets ||
          (event.eventTickets &&
            event.eventTickets.some(
              (ticket) => !ticket.isSoldOut && ticket.remainingTickets > 0
            )))
      );
    });
    this.filteredEvents.sort((a, b) => {
      const dateA = new Date(a.start).getTime();
      const dateB = new Date(b.start).getTime();
      console.log(`Comparing ${a.title} (${dateA}) with ${b.title} (${dateB})`);
      return dateA - dateB;
    });

    console.log('Sorted filtered events:', this.filteredEvents);
  }

  viewDetails(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }
}
