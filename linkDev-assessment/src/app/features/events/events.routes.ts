import { Routes } from '@angular/router';
import { EventsListingComponent } from './components/events-listing/events-listing.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';


export const events_routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'events-listing',
        pathMatch: 'full',
      },
      {
        path: 'events-listing',
        component: EventsListingComponent
      },
      {
        path: 'event/:eventId',
        component: EventDetailsComponent
      }
    ]
  }
 

];
