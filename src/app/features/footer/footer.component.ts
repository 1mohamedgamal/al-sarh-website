import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer" role="contentinfo">
      <div class="footer-top container">
        <div class="footer-grid">

          <!-- Brand -->
          <div class="footer-brand">
            <a href="#" class="footer-logo" (click)="scrollTop($event)" aria-label="Al Sarh Company">
              <svg width="44" height="44" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                <rect x="60" y="10" width="12" height="80" fill="white" opacity="0.6"/>
                <rect x="75" y="10" width="12" height="80" fill="white" opacity="0.6"/>
                <rect x="10" y="10" width="45" height="12" fill="white" opacity="0.6"/>
                <rect x="10" y="28" width="30" height="10" fill="white" opacity="0.6"/>
                <rect x="10" y="44" width="45" height="12" fill="white" opacity="0.6"/>
                <rect x="25" y="62" width="30" height="10" fill="white" opacity="0.6"/>
                <rect x="10" y="78" width="45" height="12" fill="white" opacity="0.6"/>
              </svg>
              <div>
                <span class="brand-name">{{ lang.t('الصرح', 'Al Sarh') }}</span>
                <span class="brand-sub">{{ lang.t('للمقاولات والتوريدات', 'Contracting & Supplies') }}</span>
              </div>
            </a>
            <p class="brand-tagline">{{ lang.t('نبني الصرح بثقة وإتقان', 'Building Excellence, Crafting Trust') }}</p>
            <div class="social-links" role="list" [attr.aria-label]="lang.t('وسائل التواصل الاجتماعي', 'Social Media')">
              @for (s of socials; track s.name) {
                <a [href]="s.href" class="social-btn" role="listitem" target="_blank" rel="noopener noreferrer"
                  [attr.aria-label]="s.name" [innerHTML]="s.icon"></a>
              }
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-col">
            <h3 class="footer-col-title">{{ lang.t('روابط سريعة', 'Quick Links') }}</h3>
            <ul role="list">
              @for (link of quickLinks; track link.section) {
                <li>
                  <a href="#{{ link.section }}" (click)="navClick($event, link.section)" class="footer-link">
                    {{ lang.isArabic() ? link.labelAr : link.labelEn }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Services -->
          <div class="footer-col">
            <h3 class="footer-col-title">{{ lang.t('خدماتنا', 'Services') }}</h3>
            <ul role="list">
              @for (s of footerServices; track s.ar) {
                <li>
                  <span class="footer-link">{{ lang.isArabic() ? s.ar : s.en }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-col">
            <h3 class="footer-col-title">{{ lang.t('تواصل معنا', 'Contact') }}</h3>
            <div class="footer-contact">
              <a href="tel:+201090067829" class="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12 19.79 19.79 0 0 1 1.21 3.58 2 2 0 0 1 3.22 1.4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
                </svg>
                01090067829
              </a>
              <a href="mailto:CEO@alsarh.org" class="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 8 8-8"/>
                </svg>
                CEO&#64;alsarh.org
              </a>
              <a href="https://www.alsarh.org" target="_blank" rel="noopener noreferrer" class="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                www.alsarh.org
              </a>
            </div>
          </div>

        </div>
      </div>

      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <p class="copyright">
            {{ lang.t('© 2025 شركة الصرح للمقاولات. جميع الحقوق محفوظة.', '© 2025 Al Sarh Contracting Co. All rights reserved.') }}
          </p>
          <p class="crafted">
            <span class="crafted-text">Crafted with precision</span>
          </p>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly lang = inject(LanguageService);
  private readonly scroll = inject(ScrollService);

  socials = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/alsarh',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/alsarh',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/alsarh',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/201090067829?text=' + encodeURIComponent('السلام عليكم، أرغب في الاستفسار عن خدمات شركة الصرح'),
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`
    },
  ];

  quickLinks = [
    { labelAr: 'الرئيسية',   labelEn: 'Home',     section: 'home' },
    { labelAr: 'من نحن',     labelEn: 'About',    section: 'about' },
    { labelAr: 'خدماتنا',    labelEn: 'Services', section: 'services' },
    { labelAr: 'مشاريعنا',   labelEn: 'Projects', section: 'projects' },
    { labelAr: 'تواصل معنا', labelEn: 'Contact',  section: 'contact' },
  ];

  footerServices = [
    { ar: 'أعمال الإنشاءات العامة',           en: 'General Construction' },
    { ar: 'التشطيبات الداخلية والخارجية',      en: 'Interior & Exterior Finishing' },
    { ar: 'أعمال الخرسانة المسلحة',           en: 'Reinforced Concrete Works' },
    { ar: 'التوريدات العامة',                  en: 'General Supplies' },
    { ar: 'إدارة المشاريع',                    en: 'Project Management' },
  ];

  scrollTop(e: Event): void {
    e.preventDefault();
    this.scroll.scrollToTop();
  }

  navClick(e: Event, section: string): void {
    e.preventDefault();
    this.scroll.scrollTo(section);
  }
}
