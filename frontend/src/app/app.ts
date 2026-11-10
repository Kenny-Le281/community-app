import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="site-header">
      <div class="site-header-inner">
        <a class="brand" routerLink="/">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" />
              <circle cx="12" cy="10" r="2.4" />
            </svg>
          </span>
          Community App
        </a>
      </div>
    </header>
    <router-outlet />
  `,
  styles: `
    .site-header {
      background: var(--surface);
      border-bottom: 1px solid var(--line);
    }
    .site-header-inner {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.4rem 1.5rem;
      max-width: var(--width);
      margin: auto;
      padding: 0.65rem var(--gutter);
    }
    .brand {
      display: inline-flex;
      gap: 0.65rem;
      align-items: center;
      padding: 0;
      font-size: 1rem;
      font-weight: 760;
      letter-spacing: -0.035em;
      color: inherit;
      text-decoration: none;
    }
    .brand-mark {
      display: grid;
      place-items: center;
      width: 2rem;
      height: 2rem;
      border-radius: 0.65rem;
      background: var(--tint);
      color: var(--accent);
    }
    .brand-mark svg {
      width: 1.2rem;
    }
  `,
})
export class App {}
