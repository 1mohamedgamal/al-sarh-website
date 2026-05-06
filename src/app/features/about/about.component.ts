import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';

interface Pillar {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="about section-gap">
      <div class="blueprint-grid-about" aria-hidden="true"></div>
      <div class="section-marker-wrap" aria-hidden="true">
        <span class="marker-line"></span>
        <span class="marker-num">02</span>
      </div>

      <div class="container">
        <div class="about-grid">

          <!-- Visual collage -->
          <div class="about-visual" appReveal="right" [revealDelay]="0">
            <div class="img-card img-card-1">
              <div class="img-placeholder">
                <div class="img-geo-1" aria-hidden="true"></div>
                <span class="img-label">{{ lang.t('العاصمة الإدارية', 'New Capital') }}</span>
              </div>
              <div class="bracket-tl"></div>
            </div>
            <div class="img-card img-card-2">
              <div class="img-placeholder img-placeholder-2">
                <div class="img-geo-2" aria-hidden="true"></div>
                <span class="img-label">{{ lang.t('مشاريع حياة كريمة', 'Hayah Karima') }}</span>
              </div>
              <div class="bracket-br"></div>
            </div>
            <div class="img-card img-card-3">
              <div class="img-placeholder img-placeholder-3">
                <div class="img-geo-3" aria-hidden="true"></div>
                <span class="img-label">{{ lang.t('15 مايو', '15 May City') }}</span>
              </div>
            </div>
            <!-- Year badge -->
            <div class="year-badge" aria-hidden="true">
              <span class="year-num">2017</span>
              <span class="year-label">{{ lang.t('تأسست', 'Est.') }}</span>
            </div>
          </div>

          <!-- Text -->
          <div class="about-text">
            <app-section-heading
              [eyebrow]="lang.t('من نحن', 'About Us')"
              [heading]="lang.t('نبني المستقبل على أسس راسخة', 'Building the Future on Solid Foundations')"
              appReveal="up" [revealDelay]="100">
            </app-section-heading>

            <p class="about-para" appReveal="up" [revealDelay]="200">
              {{ lang.t(
                'شركة الصرح للمقاولات العمومية والتوريدات شركة مصرية متخصصة تأسست عام 2017 برؤية واضحة: تقديم خدمات مقاولات متكاملة بأعلى معايير الجودة. بدأنا بمشاريع النخبة للهيئة الهندسية للقوات المسلحة في العاصمة الإدارية الجديدة، وتوسعنا لنشمل مشاريع حكومية وصحية وتجارية في محافظات متعددة.',
                'Al Sarh General Contracting & Supplies is an Egyptian specialized company founded in 2017 with a clear vision: to deliver comprehensive contracting services to the highest quality standards. We began with elite projects for the Armed Forces Engineering Authority in the New Administrative Capital, expanding to government, healthcare, and commercial projects across multiple governorates.'
              ) }}
            </p>

            <p class="about-para" appReveal="up" [revealDelay]="300">
              {{ lang.t(
                'بفريق من المهندسين والمتخصصين المدربين، نُنفّذ مشاريعنا بدقة متناهية والتزام صارم بالمواعيد. أعمالنا تمتد من الهيكل الخرساني والتشطيبات إلى التوريدات والأعمال الكهروميكانيكية.',
                'With a team of trained engineers and specialists, we execute projects with exceptional precision and strict adherence to deadlines. Our work spans from structural concrete and finishing works to supplies and electromechanical works.'
              ) }}
            </p>

            <!-- Pillar Cards -->
            <div class="pillars" role="list">
              @for (pillar of pillars; track pillar.titleAr; let i = $index) {
                <article class="pillar-card" role="listitem" appReveal="up" [revealDelay]="400 + i * 100">
                  <div class="pillar-icon" aria-hidden="true" [innerHTML]="pillar.icon"></div>
                  <div class="pillar-body">
                    <h3 class="pillar-title">{{ lang.isArabic() ? pillar.titleAr : pillar.titleEn }}</h3>
                    <p class="pillar-desc">{{ lang.isArabic() ? pillar.descAr : pillar.descEn }}</p>
                  </div>
                </article>
              }
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly lang = inject(LanguageService);

  pillars: Pillar[] = [
    {
      titleAr: 'رؤيتنا',
      titleEn: 'Our Vision',
      descAr: 'أن نكون الشركة الأولى في مجال المقاولات والتوريدات في مصر من حيث الجودة والالتزام',
      descEn: 'To be Egypt\'s premier contracting company, leading in quality and commitment',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>`
    },
    {
      titleAr: 'رسالتنا',
      titleEn: 'Our Mission',
      descAr: 'تقديم حلول إنشائية متكاملة بأعلى المعايير العالمية مع ضمان رضا العميل الكامل',
      descEn: 'Delivering integrated construction solutions to the highest international standards with full client satisfaction',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    },
    {
      titleAr: 'قيمنا',
      titleEn: 'Our Values',
      descAr: 'القوة، الهيكلية، الأثر الدائم — ثلاث قيم تُشكّل هويتنا وتقود كل قرار نتخذه',
      descEn: 'Strength, Structure, Lasting Impact — three values that shape our identity and guide every decision',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    }
  ];
}
