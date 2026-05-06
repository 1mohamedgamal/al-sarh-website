import {
  Directive, ElementRef, Input, OnInit, OnDestroy, inject
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input() appReveal: 'up' | 'left' | 'right' | 'scale' = 'up';
  @Input() revealDelay = 0;
  @Input() revealThreshold = 0.15;
  @Input() revealBlur = false;

  private readonly el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const el: HTMLElement = this.el.nativeElement;
    el.style.opacity = '0';
    el.style.transitionDelay = `${this.revealDelay}ms`;

    switch (this.appReveal) {
      case 'up':    el.style.transform = 'translateY(30px)'; break;
      case 'left':  el.style.transform = 'translateX(40px)'; break;
      case 'right': el.style.transform = 'translateX(-40px)'; break;
      case 'scale': el.style.transform = 'scale(0.95)'; break;
    }
    const base = `opacity 600ms cubic-bezier(0.4,0,0.2,1) ${this.revealDelay}ms, transform 600ms cubic-bezier(0.4,0,0.2,1) ${this.revealDelay}ms`;
    if (this.revealBlur) {
      el.style.filter = 'blur(8px)';
      el.style.transition = base + `, filter 600ms cubic-bezier(0.4,0,0.2,1) ${this.revealDelay}ms`;
    } else {
      el.style.transition = base;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            if (this.revealBlur) el.style.filter = 'blur(0)';
            this.observer.unobserve(el);
          }
        });
      },
      { threshold: this.revealThreshold }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
