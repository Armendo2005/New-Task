import { Routes } from '@angular/router';
import { MyRequestsComponent } from './features/my-requests/my-requests.component';
import { DraftComponent } from './shared/components/draft/draft.component';

export const routes: Routes = [
  { path: '', redirectTo: '/my-requests', pathMatch: 'full' },
  { path: 'my-requests', component: MyRequestsComponent },
  { path: 'draft', component: DraftComponent },

];
