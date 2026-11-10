import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  isDevMode,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { discoverySections } from './discovery-preview';
import { EventsApi, EventSummary } from './events-api';

type EventListState =
  | { status: 'loading' }
  | { status: 'ready'; events: readonly EventSummary[] }
  | { status: 'error' };

type DateFilter = 'all' | 'today' | 'weekend';
const pageSize = 6;

function dateWindow(filter: Exclude<DateFilter, 'all'>, now: Date): [Date, Date] {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  if (filter === 'weekend') {
    const day = start.getDay();
    start.setDate(start.getDate() + (day === 0 ? -1 : 6 - day));
  }
  const end = new Date(start);
  end.setDate(end.getDate() + (filter === 'weekend' ? 2 : 1));
  return [start, end];
}

@Component({
  selector: 'app-event-list',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventList implements OnInit {
  private readonly api = inject(EventsApi);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly discoverySections = discoverySections;
  protected readonly showDiscoveryExamples = isDevMode();
  protected readonly state = signal<EventListState>({ status: 'loading' });
  protected readonly dateOptions = [
    { value: 'all', label: 'Any date' },
    { value: 'today', label: 'Today' },
    { value: 'weekend', label: 'This weekend' },
  ] as const;
  protected readonly dateFilter = signal<DateFilter>('all');
  protected readonly categoryFilter = signal('');
  private readonly visibleCount = signal(pageSize);
  private readonly events = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.events : [];
  });
  protected readonly categories = computed(() =>
    [...new Set(this.events().flatMap((event) => (event.category ? [event.category] : [])))].sort(
      (a, b) => a.localeCompare(b),
    ),
  );
  protected readonly matchingEvents = computed(() => {
    const filter = this.dateFilter();
    const category = this.categoryFilter();
    const window = filter === 'all' ? null : dateWindow(filter, new Date());
    return this.events().filter((event) => {
      if (category && event.category !== category) return false;
      if (!window) return true;
      if (!event.startsAt) return false;
      const start = Date.parse(event.startsAt);
      return start >= window[0].getTime() && start < window[1].getTime();
    });
  });
  protected readonly visibleEvents = computed(() =>
    this.matchingEvents().slice(0, this.visibleCount()),
  );

  protected selectDate(value: DateFilter): void {
    this.dateFilter.set(value);
    this.visibleCount.set(pageSize);
  }

  protected selectCategory(value: string): void {
    this.categoryFilter.set(value);
    this.visibleCount.set(pageSize);
  }

  protected showMore(): void {
    this.visibleCount.update((count) => count + pageSize);
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  protected loadEvents(): void {
    this.state.set({ status: 'loading' });
    this.api
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (events) => this.state.set({ status: 'ready', events }),
        error: () => this.state.set({ status: 'error' }),
      });
  }
}
