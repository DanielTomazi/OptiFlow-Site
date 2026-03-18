import { Injectable } from '@angular/core';

export type EventCategory = 'engagement' | 'conversion' | 'navigation' | 'form';

export interface AnalyticsEvent {
  event: string;
  category: EventCategory;
  label?: string;
  value?: number;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly measurementId = 'G-XXXXXXXXXX';
  private initialized = false;

  init(): void {
    if (typeof window !== 'undefined' && !this.initialized) {
      this.initialized = true;
      console.log(`[Analytics] Initialized with measurement ID: ${this.measurementId}`);
    }
  }

  trackEvent(data: AnalyticsEvent): void {
    if (typeof window !== 'undefined' && (window as Record<string, unknown>)['gtag']) {
      const gtag = (window as Record<string, unknown>)['gtag'] as Function;
      gtag('event', data.event, {
        event_category: data.category,
        event_label: data.label,
        value: data.value,
      });
    } else {
      console.log('[Analytics] Event (dev mode):', data);
    }
  }

  trackPageView(pageTitle: string, pagePath: string): void {
    this.trackEvent({
      event: 'page_view',
      category: 'navigation',
      label: `${pageTitle} | ${pagePath}`,
    });
  }

  trackCTAClick(ctaName: string, location: string): void {
    this.trackEvent({
      event: 'cta_click',
      category: 'conversion',
      label: `${ctaName} @ ${location}`,
    });
  }

  trackFormSubmit(formName: string): void {
    this.trackEvent({
      event: 'form_submit',
      category: 'conversion',
      label: formName,
    });
  }

  trackDemoRequest(email: string): void {
    const domain = email.split('@')[1] ?? 'unknown';
    this.trackEvent({
      event: 'demo_request',
      category: 'conversion',
      label: `domain:${domain}`,
    });
  }
}
