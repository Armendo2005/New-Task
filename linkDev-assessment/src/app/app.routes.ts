import { Routes } from '@angular/router';
import { MyRequestsComponent } from './features/my-requests/my-requests.component';
import { DraftComponent } from './shared/components/draft/draft.component';
import { EventsListingComponent } from './features/events/components/events-listing/events-listing.component';
import { EventDetailsComponent } from './features/events/components/event-details/event-details.component';
import { WorkspaceComponent } from './features/workspace/workspace.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventsListingComponent },
  { path: 'events/:id', component: EventDetailsComponent }, 
  { path: 'my-requests', component: MyRequestsComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'draft', component: DraftComponent },

];
