import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService  = inject(Meta);
  private router       = inject(Router);
  private route        = inject(ActivatedRoute);

  private readonly siteName = 'OptiFlow';
  private readonly defaultDesc = 'OptiFlow otimiza rotas, aloca motoristas e gera os KPIs que sua operação logística precisa — tudo em uma plataforma SaaS para PMEs de e-commerce.';
  private readonly defaultKeywords = 'logística, otimização de rotas, gestão de motoristas, KPIs, e-commerce, PME, SaaS, última milha';
  private readonly baseUrl = 'https://optiflow.com.br';

  init(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        this.update({
          description: data['description'],
          keywords: data['keywords'],
          ogImage: data['ogImage'],
        });
      });
  }

  update(seo: SeoData): void {
    if (seo.title) {
      this.titleService.setTitle(`${seo.title} | ${this.siteName}`);
    }

    const desc = seo.description ?? this.defaultDesc;
    this.metaService.updateTag({ name: 'description', content: desc });
    this.metaService.updateTag({ property: 'og:description', content: desc });
    this.metaService.updateTag({ name: 'twitter:description', content: desc });

    if (seo.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: seo.keywords });
    } else {
      this.metaService.updateTag({ name: 'keywords', content: this.defaultKeywords });
    }

    const ogImage = seo.ogImage ?? `${this.baseUrl}/assets/og-image.png`;
    this.metaService.updateTag({ property: 'og:image', content: ogImage });
    this.metaService.updateTag({ name: 'twitter:image', content: ogImage });

    const canonical = seo.canonical ?? `${this.baseUrl}${this.router.url}`;
    this.updateCanonical(canonical);
    this.metaService.updateTag({ property: 'og:url', content: canonical });
  }

  private updateCanonical(url: string): void {
    const head = document.head;
    let link: HTMLLinkElement | null = head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
