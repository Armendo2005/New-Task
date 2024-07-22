import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event, ApiResponse , Category, EventCategoryResponse  } from '../../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [NgIf],
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
      this.eventService.getEvents().subscribe((data: ApiResponse) => {
        // Find the event in the eventList
        this.event = data.eventList.find(event => event.eventId.toString() === eventId);
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
