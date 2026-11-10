import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EventList } from './event-list';

describe('EventList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventList],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('shows event titles returned by the API', () => {
    const fixture = TestBed.createComponent(EventList);
    fixture.detectChanges();

    TestBed.inject(HttpTestingController)
      .expectOne('/api/events')
      .flush([
        {
          id: 'example-event',
          title: 'Community board games',
          category: null,
          description: null,
          startsAt: null,
          locationName: null,
          address: null,
        },
      ]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('article h3')?.textContent).toBe(
      'Community board games',
    );
  });

  it('lets visitors retry after a failed request', () => {
    const fixture = TestBed.createComponent(EventList);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('/api/events').flush(null, { status: 503, statusText: 'Unavailable' });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    fixture.nativeElement.querySelector('button').click();
    http.expectOne('/api/events').flush([]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No events have been added yet.');
  });

  it('shows six events at first and reveals the rest on demand', () => {
    const fixture = TestBed.createComponent(EventList);
    fixture.detectChanges();
    TestBed.inject(HttpTestingController)
      .expectOne('/api/events')
      .flush(Array.from({ length: 8 }, (_, i) => ({ id: String(i), title: `Event ${i + 1}` })));
    fixture.detectChanges();

    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelectorAll('article')).toHaveLength(6);
    page.querySelector<HTMLButtonElement>('.more button')?.click();
    fixture.detectChanges();
    expect(page.querySelectorAll('article')).toHaveLength(8);
    expect(page.querySelector('.more')).toBeNull();
  });

  it('combines category with today and this weekend in the visitor’s local time', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    try {
      vi.setSystemTime(new Date(2026, 10, 13, 12)); // Friday
      const fixture = TestBed.createComponent(EventList);
      fixture.detectChanges();
      TestBed.inject(HttpTestingController)
        .expectOne('/api/events')
        .flush([
          {
            id: '1',
            title: 'Friday jazz',
            category: 'music',
            startsAt: new Date(2026, 10, 13, 19).toISOString(),
          },
          {
            id: '2',
            title: 'Saturday concert',
            category: 'music',
            startsAt: new Date(2026, 10, 14, 19).toISOString(),
          },
          {
            id: '3',
            title: 'Sunday hike',
            category: 'outdoors',
            startsAt: new Date(2026, 10, 15, 10).toISOString(),
          },
          {
            id: '4',
            title: 'Monday concert',
            category: 'music',
            startsAt: new Date(2026, 10, 16, 0).toISOString(),
          },
        ]);
      fixture.detectChanges();

      const page: HTMLElement = fixture.nativeElement;
      const category = page.querySelector('select')!;
      category.value = 'music';
      category.dispatchEvent(new Event('change'));
      const dateButtons = [...page.querySelectorAll<HTMLButtonElement>('.date-filters button')];
      const titles = () =>
        [...page.querySelectorAll('article h3')].map((heading) => heading.textContent);

      dateButtons.find((button) => button.textContent?.trim() === 'Today')!.click();
      fixture.detectChanges();
      expect(titles()).toEqual(['Friday jazz']);

      dateButtons.find((button) => button.textContent?.trim() === 'This weekend')!.click();
      fixture.detectChanges();
      expect(titles()).toEqual(['Saturday concert']);
    } finally {
      vi.useRealTimers();
    }
  });
});
