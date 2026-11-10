import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface EventSummary {
  readonly id: string;
  readonly title: string;
  readonly category: string | null;
  readonly description: string | null;
  readonly startsAt: string | null;
  readonly locationName: string | null;
  readonly address: string | null;
}

@Injectable({ providedIn: 'root' })
export class EventsApi {
  private readonly http = inject(HttpClient);

  list() {
    return this.http.get<readonly EventSummary[]>('/api/events');
  }
}
