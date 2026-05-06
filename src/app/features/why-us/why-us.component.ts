import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';

interface Feature {
  numLabel: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: string;
}

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="why-us" class="why-us section-gap">
      <div class="container">
        <app-section-heading
          [eyebrow]="lang.t('لماذا الصرح؟', 'Why Al Sarh?')"
          [heading]="lang.t('ثقة مبنية على الإنجاز', 'Trust Built on Achievement')"
          [onDark]="true"
          appReveal="up">
        </app-section-heading>

        <div class="features-list">
          @for (feature of features; track feature.numLabel; let i = $index) {
            <div class="feature-row" [class.reversed]="i % 2 !== 0"
              appReveal="up" [revealDelay]="i * 80">
              <!-- Visual -->
              <div class="feature-visual">
                <div class="feature-img" [attr.aria-hidden]="true">
                  <div class="feature-geo" [class]="'geo-' + (i + 1)"></div>
                  <div class="feature-icon-wrap" [innerHTML]="feature.icon"></div>
                  <div class="bracket ftl" aria-hidden="true"></div>
                  <div class="bracket fbr" aria-hidden="true"></div>
                </div>
              </div>

              <!-- Text -->
              <div class="feature-text">
                <span class="feature-bg-num" aria-hidden="true">{{ feature.numLabel }}</span>
                <h3 class="feature-title">{{ lang.isArabic() ? feature.titleAr : feature.titleEn }}</h3>
                <p class="feature-desc">{{ lang.isArabic() ? feature.descAr : feature.descEn }}</p>
                <div class="feature-bar" aria-hidden="true"></div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {
  readonly lang = inject(LanguageService);

  features: Feature[] = [
    {
      numLabel: '01',
      titleAr: 'خبرة مثبتة منذ 2017',
      titleEn: 'Proven Experience Since 2017',
      descAr: 'بدأنا رحلتنا بمشاريع النخبة للهيئة الهندسية للقوات المسلحة في العاصمة الإدارية الجديدة، وتوسعنا لنشمل مشاريع حكومية وصحية وتجارية في محافظات عديدة.',
      descEn: 'We started our journey with elite projects for the Armed Forces Engineering Authority in the New Administrative Capital, expanding to government, healthcare, and commercial projects across multiple governorates.',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    },
    {
      numLabel: '02',
      titleAr: 'جودة بدون مساومة',
      titleEn: 'Uncompromising Quality',
      descAr: 'نُطبّق أعلى معايير الجودة العالمية في كل مشروع. عملنا مع الهيئة الهندسية للقوات المسلحة ووزارة الصحة يُثبت التزامنا بمعايير لا تقبل أي مساومة.',
      descEn: 'We apply the highest international quality standards on every project. Our work with the Armed Forces Engineering Authority and Ministry of Health proves our commitment to standards that accept no compromise.',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`
    },
    {
      numLabel: '03',
      titleAr: 'التزام تام بالمواعيد',
      titleEn: 'Total Deadline Commitment',
      descAr: 'نفخر بسجل حافل من التسليم في الموعد المحدد. ندرك أن المشاريع الحكومية والخاصة لها جداول زمنية صارمة، وهذا بالضبط ما يميزنا.',
      descEn: 'We pride ourselves on a stellar track record of on-time delivery. We understand that government and private projects have strict timelines — and that is exactly what distinguishes us.',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
    },
    {
      numLabel: '04',
      titleAr: 'فريق من المتخصصين',
      titleEn: 'A Team of Specialists',
      descAr: 'يضم فريقنا مهندسين متخصصين وفنيي تشطيبات محترفين وعمالة مدربة تدريباً عالياً. كل عضو في الفريق مُختار بعناية ليُسهم في تحقيق أعلى مستويات الجودة.',
      descEn: 'Our team includes specialized engineers, professional finishing technicians, and highly trained workers. Each team member is carefully selected to contribute to achieving the highest quality levels.',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
  ];
}
