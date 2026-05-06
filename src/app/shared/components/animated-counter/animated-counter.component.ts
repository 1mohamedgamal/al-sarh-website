import {
  Component, Input, OnInit, OnDestroy, ElementRef, ChangeDetectionStrategy,
  signal, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="counter-value" [attr.aria-label]="target + suffix">
      {{ prefix }}{{ displayValue() }}{{ suffix }}
    </span>
  `,
  styles: [`
    .counter-value {
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum';
    }
  `]
})
export class AnimatedCounterComponent implements OnInit, OnDestroy {
  @Input() target = 0;
  @Input() duration = 2000;
  @Input() prefix = '';
  @Input() suffix = '';

  displayValue = signal(0);

  private readonly el = inject(ElementRef);
  private observer!: IntersectionObserver;
  private animationId = 0;
  private started = false;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !this.started) {
          this.started = true;
          this.animate();
          this.observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    const start = performance.now();
    const from = 0;
    const to = this.target;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      this.displayValue.set(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        this.animationId = requestAnimationFrame(tick);
      }
    };
    this.animationId = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.animationId);
  }
}
