import { Directive, ElementRef, OnInit, Input, inject } from '@angular/core';

@Directive({
  selector: '[appAos]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit {
  @Input() appAos: string = 'fade-up';
  @Input() aosDelay: number = 0;
  @Input() aosDuration: number = 600;
  @Input() aosThreshold: number = 0.15;

  private el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const element = this.el.nativeElement as HTMLElement;
    element.setAttribute('data-aos', this.appAos);
    if (this.aosDelay > 0) {
      element.style.transitionDelay = `${this.aosDelay}ms`;
    }
    element.style.transitionDuration = `${this.aosDuration}ms`;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('aos-animate');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: this.aosThreshold },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
