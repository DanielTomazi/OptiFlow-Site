import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<Theme>('light');

  init(): void {
    const saved = localStorage.getItem('optiflow-theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = saved ?? (prefersDark ? 'dark' : 'light');

    this.theme.set(initial);
    this.applyTheme(initial);

    effect(() => {
      const t = this.theme();
      this.applyTheme(t);
      localStorage.setItem('optiflow-theme', t);
    });
  }

  toggle(): void {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
