import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="team" class="team section-gap">
      <div class="section-marker-wrap" aria-hidden="true">
        <span class="marker-line"></span>
        <span class="marker-num">06</span>
      </div>
      <div class="container">
        <div class="team-intro" appReveal="up">
          <app-section-heading
            [eyebrow]="lang.t('فريق العمل', 'Our Team')"
            [heading]="lang.t('طاقم بشري على مستوى الطموح', 'A Team Matching Our Ambition')"
            align="center">
          </app-section-heading>
          <p class="intro-para">
            {{ lang.t(
              'يُشكّل فريق الصرح العمود الفقري لكل إنجازاتنا. مهندسون مُعتمَدون، فنيو تشطيبات محترفون، وعمالة مُدرَّبة تعمل بتناغم لتحقيق رؤية واحدة: الكمال في كل مشروع.',
              'The Al Sarh team forms the backbone of all our achievements. Certified engineers, professional finishing technicians, and trained workers working in harmony to achieve one vision: perfection in every project.'
            ) }}
          </p>
        </div>

        <div class="team-grid" role="list">
          @for (card of teamCards; track card.titleAr; let i = $index) {
            <article class="team-card" role="listitem" appReveal="up" [revealDelay]="i * 100">
              <div class="team-icon" aria-hidden="true" [innerHTML]="card.icon"></div>
              <h3 class="team-title">{{ lang.isArabic() ? card.titleAr : card.titleEn }}</h3>
              <p class="team-desc">{{ lang.isArabic() ? card.descAr : card.descEn }}</p>
              <div class="team-slide" aria-hidden="true"></div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  readonly lang = inject(LanguageService);

  teamCards = [
    {
      titleAr: 'مهندسون متخصصون',
      titleEn: 'Specialized Engineers',
      descAr: 'فريق هندسي مُعتمَد يمتلك خبرة واسعة في تصميم وتنفيذ المشاريع الإنشائية الكبرى بكفاءة ودقة متناهية',
      descEn: 'A certified engineering team with extensive experience in designing and executing major construction projects with efficiency and precision',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
    },
    {
      titleAr: 'فريق تشطيبات محترف',
      titleEn: 'Professional Finishing Team',
      descAr: 'خبراء التشطيبات الداخلية والخارجية يضمنون أعلى مستويات الجودة الجمالية والفنية في كل مشروع',
      descEn: 'Interior and exterior finishing experts ensuring the highest levels of aesthetic and technical quality in every project',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3L14.5 4z"/></svg>`
    },
    {
      titleAr: 'عمالة مدربة',
      titleEn: 'Trained Workforce',
      descAr: 'عمالة مدربة على أحدث أساليب البناء والتشطيب، تعمل وفق بروتوكولات سلامة صارمة لضمان جودة العمل',
      descEn: 'Workers trained in the latest construction and finishing techniques, operating under strict safety protocols to ensure work quality',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
  ];
}
