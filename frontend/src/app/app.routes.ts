import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home | Community App',
    loadComponent: () => import('./events/event-list').then((m) => m.EventList),
  },
  { path: 'events', pathMatch: 'full', redirectTo: '' },
];
