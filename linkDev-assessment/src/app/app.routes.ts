import { Routes } from '@angular/router';
import { MyRequestsComponent } from './features/my-requests/my-requests.component';
import { DraftComponent } from './shared/components/draft/draft.component';
import { EventsListingComponent } from './features/events/components/events-listing/events-listing.component';
import { EventDetailsComponent } from './features/events/components/event-details/event-details.component';
import { WorkspaceComponent } from './features/workspace/workspace.component';
import { EventRegisterComponent } from './features/events/components/event-register/event-register.component';
import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full', data: { breadcrumb: 'Home', title: 'Home' }  },
  { path: 'events', component: EventsListingComponent, data: { breadcrumb: 'Events', title: 'Events' } },
  { path: 'events/:id', component: EventDetailsComponent, data: { breadcrumb: 'Event Details', title: 'Event Details' } }, 
  { path: 'my-requests', component: MyRequestsComponent, data: { breadcrumb: 'Workspace', title: 'Workspace' } },
  { path: 'workspace', component: WorkspaceComponent, data: { breadcrumb: 'My Requests', title: 'My Requests' } },
  { path: 'event-register', component: EventRegisterComponent, data: { breadcrumb: 'Request Details', title: 'Event Register' } },
  { path: 'draft', component: DraftComponent },
  { path: '**', component: PageNotFoundComponent },
];
