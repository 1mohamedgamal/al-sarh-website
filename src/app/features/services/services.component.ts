import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ServiceItem } from '../../core/models/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="services" class="services section-gap">
      <div class="section-marker-wrap" aria-hidden="true">
        <span class="marker-line"></span>
        <span class="marker-num">03</span>
      </div>
      <div class="container">
        <div class="services-header">
          <div class="services-heading-col">
            <app-section-heading
              [eyebrow]="lang.t('خدماتنا', 'Our Services')"
              [heading]="lang.t('خدمات متكاملة، جودة لا تُساوَم', 'Integrated Services, Uncompromised Quality')"
              appReveal="up">
            </app-section-heading>
          </div>
          <p class="services-subtitle" appReveal="up" [revealDelay]="150">
            {{ lang.t(
              'نقدم طيفاً واسعاً من الخدمات الإنشائية المتكاملة — من وضع الأساسات حتى اللمسات الأخيرة',
              'We offer a comprehensive spectrum of construction services — from laying foundations to the final finishing touches'
            ) }}
          </p>
        </div>

        <div class="services-grid" role="list">
          @for (service of services; track service.id; let i = $index) {
            <article class="service-card" role="listitem" appReveal="up" [revealDelay]="i * 80">
              <div class="card-photo" aria-hidden="true">
                <img [src]="service.image" [alt]="service.titleAr" loading="lazy">
                <div class="card-photo-overlay"></div>
              </div>
              <div class="card-top">
                <div class="service-icon" aria-hidden="true" [innerHTML]="service.icon"></div>
                <span class="service-num" aria-hidden="true">{{ service.number }}</span>
              </div>
              <h3 class="service-title">{{ lang.isArabic() ? service.titleAr : service.titleEn }}</h3>
              <p class="service-desc">{{ lang.isArabic() ? service.descriptionAr : service.descriptionEn }}</p>
              <div class="card-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <div class="gold-slide" aria-hidden="true"></div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  readonly lang = inject(LanguageService);

  services: ServiceItem[] = [
    {
      id: 1, number: '01',
      titleAr: 'أعمال الإنشاءات العامة',
      titleEn: 'General Construction Works',
      descriptionAr: 'تنفيذ مشاريع الإنشاءات الكاملة بمختلف أنواعها من المباني السكنية والتجارية والحكومية',
      descriptionEn: 'Executing complete construction projects of all types including residential, commercial, and governmental buildings',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="12" width="18" height="9"/><path d="M3 12L12 3l9 9"/><rect x="9" y="16" width="6" height="5"/></svg>`,
      image: 'assets/projects/may/1.jpeg'
    },
    {
      id: 2, number: '02',
      titleAr: 'التشطيبات الداخلية والخارجية',
      titleEn: 'Interior & Exterior Finishing',
      descriptionAr: 'تشطيبات فاخرة بأعلى معايير الجودة تشمل الدهانات والأرضيات والواجهات',
      descriptionEn: 'Premium finishing works to the highest quality standards, including painting, flooring, and facades',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3L14.5 4z"/><circle cx="12" cy="13" r="3"/></svg>`,
      image: 'assets/projects/capital/5.jpeg'
    },
    {
      id: 3, number: '03',
      titleAr: 'أعمال الخرسانة المسلحة',
      titleEn: 'Reinforced Concrete Works',
      descriptionAr: 'تنفيذ الهياكل الخرسانية المسلحة بدقة هندسية عالية وفق أحدث المعايير الإنشائية',
      descriptionEn: 'Executing reinforced concrete structures with high engineering precision according to the latest construction standards',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20M4 20V10M8 20V10M12 20V4M16 20V10M20 20V10"/></svg>`,
      image: 'assets/projects/faisal/1.jpeg'
    },
    {
      id: 4, number: '04',
      titleAr: 'التوريدات العامة',
      titleEn: 'General Supplies',
      descriptionAr: 'توريد جميع مستلزمات البناء والتشطيب بأعلى جودة وأسعار تنافسية',
      descriptionEn: 'Supplying all construction and finishing materials with the highest quality at competitive prices',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
      image: 'assets/projects/market/1.jpeg'
    },
    {
      id: 5, number: '05',
      titleAr: 'إدارة المشاريع',
      titleEn: 'Project Management',
      descriptionAr: 'إدارة احترافية لكل مراحل المشروع من التخطيط والتصميم إلى التسليم النهائي',
      descriptionEn: 'Professional management of all project phases from planning and design to final delivery',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
      image: 'assets/projects/capital/8.jpeg'
    },
    {
      id: 6, number: '06',
      titleAr: 'ترميم وتعديل المباني',
      titleEn: 'Renovation & Modification',
      descriptionAr: 'ترميم وتحديث المباني القائمة وإجراء التعديلات اللازمة مع الحفاظ على سلامة الهيكل',
      descriptionEn: 'Restoring and modernizing existing buildings with necessary modifications while maintaining structural integrity',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      image: 'assets/projects/hospital/4.jpeg'
    },
  ];
}
