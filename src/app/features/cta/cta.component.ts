import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta-band" aria-label="Call to Action">
      <div class="blueprint-grid" aria-hidden="true"></div>
      <div class="container cta-inner">
        <div class="cta-text">
          <h2 class="cta-heading">{{ lang.t('جاهزون لبناء صرحك القادم', 'Ready to Build Your Next Landmark') }}</h2>
          <p class="cta-sub">
            {{ lang.t(
              'تواصل معنا اليوم وابدأ رحلتك نحو مشروع يُحقق أحلامك',
              'Contact us today and begin your journey toward a project that achieves your dreams'
            ) }}
          </p>
        </div>
        <a href="#contact" class="btn btn-primary cta-btn" (click)="navTo($event)">
          {{ lang.t('تواصل معنا الآن', 'Contact Us Now') }}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  `,
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  readonly lang = inject(LanguageService);
  private readonly scroll = inject(ScrollService);

  navTo(e: Event): void {
    e.preventDefault();
    this.scroll.scrollTo('contact');
  }
}
