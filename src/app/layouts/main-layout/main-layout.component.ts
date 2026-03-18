import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main id="main-content" tabindex="-1" style="padding-top: 72px;">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main { flex: 1; }
  `],
})
export class MainLayoutComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.init();
  }
}
