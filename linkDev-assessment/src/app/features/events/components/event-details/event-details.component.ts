import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event, EventResponse , Category, EventCategoryResponse, EventTicket  } from '../../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { CategoryNamePipe } from "../../../../shared/pipe/CategoryName/category-name.pipe";

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle , CategoryNamePipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {
  event: Event | undefined;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    
    // Ensure eventId is a number or convert it to number
    if (eventId) {
      this.eventService.getEvents().subscribe((data: EventResponse) => {
        // Find the event in the eventList
        this.event = data.eventList.find(event => event.eventId.toString() === eventId);
        if (!this.event) {
          console.error(`Event with ID ${eventId} not found.`);
        }
      }, error => {
        console.error('Error fetching events:', error);
      });
    }
  }

  register(): void {
    if (this.event && new Date(this.event.end) >= new Date()) {
      this.router.navigate(['/register', this.event.eventId]);
    } else {
      alert('Cannot register for past events.');
    }
  }
}
