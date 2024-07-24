import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import {
  Event,
  ApiResponse,
  Category,
  EventCategoryResponse,
  EventTicket,
} from '../../models/event.model';
import { NgFor, DatePipe } from '@angular/common';
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
    FormsModule,
    RouterLink,
    NgxPaginationModule,
    DatePipe,
    CategoryNamePipe,
    DateOnlyPipe,
  ],
  templateUrl: './events-listing.component.html',
  styleUrl: './events-listing.component.scss',
  providers: [DatePipe] 
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

  constructor(private eventService: EventsService, private router: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.fetchCategories();
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe((data: ApiResponse) => {
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

  parseCustomDate(dateString: string): Date | null {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [time, modifier] = timePart.split(' ');
    const [hours, minutes] = time.split(':');
    let hours24 = parseInt(hours, 10);

    if (modifier === 'PM' && hours24 < 12) {
      hours24 += 12;
    }
    if (modifier === 'AM' && hours24 === 12) {
      hours24 = 0;
    }

    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), hours24, parseInt(minutes, 10));
    return isNaN(date.getTime()) ? null : date;
  }

  applyFilters(): void {
    this.filteredEvents = this.events
      .filter((event) => {
        console.log(`Raw start date for event ${event.title}: ${event.start}`);
        const eventStartDate = this.parseCustomDate(event.start);
        const filterDate = this.filters.date ? this.parseCustomDate(this.filters.date) : null;

        if (!eventStartDate) {
          console.error(`Invalid start date for event ${event.title}: ${event.start}`);
          return false;
        }

        return (
          (this.filters.category === '' ||
            this.categories.find((c) => c.categoryName === this.filters.category)?.categoryId === event.categoryTypeCode.toString()) &&
          (!this.filters.availableTickets ||
            (event.eventTickets && event.eventTickets.some((ticket) => !ticket.isSoldOut && ticket.remainingTickets > 0))) &&
          (!filterDate || (eventStartDate >= filterDate))
        );
      })
      .sort((a, b) => {
        const dateA = this.parseCustomDate(a.start)?.getTime() || 0;
        const dateB = this.parseCustomDate(b.start)?.getTime() || 0;
        console.log(`Comparing ${a.title} (${dateA}) with ${b.title} (${dateB})`);
        return dateA - dateB;
      });

    console.log('Sorted filtered events:', this.filteredEvents);
  }

  viewDetails(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }
}
