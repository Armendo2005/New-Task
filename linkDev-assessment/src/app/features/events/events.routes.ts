import { Routes } from '@angular/router';
import { EventsListingComponent } from './components/events-listing/events-listing.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';


export const events_routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full',
      },
      {
        path: 'events',
        component: EventsListingComponent
      },
      {
        path: 'event/:name',
        component: EventDetailsComponent
      }
    ]
  }
 

];
