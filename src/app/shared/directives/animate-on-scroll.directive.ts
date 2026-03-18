import { Directive, ElementRef, OnInit, OnDestroy, Input, inject } from '@angular/core';

@Directive({
  selector: '[appAos]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() appAos: string = 'fade-up';
  @Input() aosDelay: number = 0;
  @Input() aosDuration: number = 600;
  @Input() aosThreshold: number = 0.05;

  private el = inject(ElementRef);
  private observer!: IntersectionObserver;
  private fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    const element = this.el.nativeElement as HTMLElement;
    element.setAttribute('data-aos', this.appAos);
    if (this.aosDelay > 0) {
      element.style.transitionDelay = `${this.aosDelay}ms`;
    }
    element.style.transitionDuration = `${this.aosDuration}ms`;

    const animate = () => {
      element.classList.add('aos-animate');
      if (this.fallbackTimer) clearTimeout(this.fallbackTimer);
      this.observer?.unobserve(element);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
      return;
    }

    this.fallbackTimer = setTimeout(animate, 1200);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animate();
        });
      },
      { threshold: this.aosThreshold, rootMargin: '0px 0px -40px 0px' },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    if (this.fallbackTimer) clearTimeout(this.fallbackTimer);
    this.observer?.disconnect();
  }
}
