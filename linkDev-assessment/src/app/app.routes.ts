import { Routes } from '@angular/router';
import { MyRequestsComponent } from './features/my-requests/my-requests.component';
import { DraftComponent } from './shared/components/draft/draft.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  {
    path: 'events',
    loadChildren: () =>
      import('./features/events/events.routes').then(
        (r) => r.events_routes
      ),
  },
  { path: 'my-requests', component: MyRequestsComponent },
  { path: 'draft', component: DraftComponent },

];
