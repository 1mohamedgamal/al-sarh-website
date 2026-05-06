import {
  Component, Input, ChangeDetectionStrategy, inject, ElementRef, OnInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-heading" [class.center]="align === 'center'" [class.on-dark]="onDark">
      <p class="sh-eyebrow">
        <span class="sh-eyebrow-line"></span>
        <span class="sh-eyebrow-text">{{ eyebrow }}</span>
      </p>
      <h2 class="sh-heading">{{ heading }}</h2>
      @if (subheading) {
        <p class="sh-subheading">{{ subheading }}</p>
      }
    </div>
  `,
  styleUrl: './section-heading.component.scss'
})
export class SectionHeadingComponent implements OnInit, OnDestroy {
  @Input() eyebrow = '';
  @Input() heading = '';
  @Input() subheading = '';
  @Input() align: 'start' | 'center' = 'start';
  @Input() onDark = false;

  readonly lang = inject(LanguageService);
  private readonly el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          (this.el.nativeElement as HTMLElement).classList.add('visible');
          this.observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
