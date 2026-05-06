import {
  Component, ChangeDetectionStrategy, signal, inject, HostListener, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ScrollService } from '../../core/services/scroll.service';

interface NavItem {
  labelAr: string;
  labelEn: string;
  section: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header" [class.scrolled]="isScrolled()" [class.menu-open]="menuOpen()" role="banner">
      <div class="container header-inner">

        <!-- Logo -->
        <a href="#" class="logo" (click)="scrollTop($event)" aria-label="شركة الصرح - الصفحة الرئيسية">
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-mark" aria-hidden="true">
            <!-- Simplified Kufic-style Al Sarh mark -->
            <rect x="60" y="10" width="12" height="80" fill="currentColor"/>
            <rect x="75" y="10" width="12" height="80" fill="currentColor"/>
            <rect x="10" y="10" width="45" height="12" fill="currentColor"/>
            <rect x="10" y="28" width="30" height="10" fill="currentColor"/>
            <rect x="10" y="44" width="45" height="12" fill="currentColor"/>
            <rect x="25" y="62" width="30" height="10" fill="currentColor"/>
            <rect x="10" y="78" width="45" height="12" fill="currentColor"/>
            <rect x="22" y="18" width="8" height="5" fill="var(--bg)"/>
            <rect x="10" y="38" width="15" height="6" fill="var(--bg)"/>
            <rect x="10" y="56" width="15" height="6" fill="var(--bg)"/>
          </svg>
          <div class="logo-text">
            <span class="logo-name">{{ lang.t('الصرح', 'Al Sarh') }}</span>
            <span class="logo-sub">{{ lang.t('للمقاولات', 'Contracting') }}</span>
          </div>
        </a>

        <!-- Desktop Nav -->
        <nav class="nav-desktop" [attr.aria-label]="lang.t('القائمة الرئيسية', 'Main Navigation')">
          <ul role="list">
            @for (item of navItems; track item.section) {
              <li>
                <a class="nav-link" href="#{{ item.section }}"
                  (click)="navClick($event, item.section)"
                  [attr.aria-current]="activeSection() === item.section ? 'page' : null">
                  {{ lang.isArabic() ? item.labelAr : item.labelEn }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <button class="lang-toggle" (click)="lang.toggle()" [attr.aria-label]="lang.t('التبديل للإنجليزية', 'Switch to Arabic')">
            {{ lang.isArabic() ? 'EN' : 'ع' }}
          </button>

          <a href="#contact" class="btn btn-primary header-cta hide-mobile"
            (click)="navClick($event, 'contact')">
            {{ lang.t('تواصل معنا', 'Contact Us') }}
          </a>

          <!-- Hamburger -->
          <button class="hamburger hide-desktop-nav" (click)="toggleMenu()"
            [attr.aria-expanded]="menuOpen()"
            [attr.aria-label]="lang.t('فتح القائمة', 'Toggle Menu')">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Drawer -->
      @if (menuOpen()) {
        <div class="mobile-drawer" role="dialog" [attr.aria-label]="lang.t('قائمة التنقل', 'Navigation Menu')">
          <div class="drawer-inner">
            <div class="drawer-logo">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="60" y="10" width="12" height="80" fill="white"/>
                <rect x="75" y="10" width="12" height="80" fill="white"/>
                <rect x="10" y="10" width="45" height="12" fill="white"/>
                <rect x="10" y="28" width="30" height="10" fill="white"/>
                <rect x="10" y="44" width="45" height="12" fill="white"/>
                <rect x="25" y="62" width="30" height="10" fill="white"/>
                <rect x="10" y="78" width="45" height="12" fill="white"/>
              </svg>
              <span>{{ lang.t('الصرح', 'Al Sarh') }}</span>
            </div>

            <nav [attr.aria-label]="lang.t('قائمة الجوال', 'Mobile Navigation')">
              <ul role="list">
                @for (item of navItems; track item.section) {
                  <li>
                    <a class="drawer-link" href="#{{ item.section }}"
                      (click)="navClick($event, item.section)">
                      {{ lang.isArabic() ? item.labelAr : item.labelEn }}
                    </a>
                  </li>
                }
              </ul>
            </nav>

            <div class="drawer-bottom">
              <button class="lang-toggle-drawer" (click)="lang.toggle()">
                {{ lang.isArabic() ? 'English' : 'العربية' }}
              </button>
              <a href="#contact" class="btn btn-primary w-full" (click)="navClick($event, 'contact')">
                {{ lang.t('تواصل معنا', 'Contact Us') }}
              </a>
            </div>
          </div>
        </div>
      }
    </header>

    <!-- Backdrop for mobile menu -->
    @if (menuOpen()) {
      <div class="drawer-backdrop" (click)="closeMenu()" aria-hidden="true"></div>
    }
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  readonly lang = inject(LanguageService);
  private readonly scroll = inject(ScrollService);

  isScrolled = signal(false);
  menuOpen = signal(false);
  activeSection = signal('home');

  navItems: NavItem[] = [
    { labelAr: 'الرئيسية',   labelEn: 'Home',     section: 'home' },
    { labelAr: 'من نحن',     labelEn: 'About',    section: 'about' },
    { labelAr: 'خدماتنا',    labelEn: 'Services', section: 'services' },
    { labelAr: 'مشاريعنا',   labelEn: 'Projects', section: 'projects' },
    { labelAr: 'فريق العمل', labelEn: 'Team',     section: 'team' },
    { labelAr: 'تواصل معنا', labelEn: 'Contact',  section: 'contact' },
  ];

  ngOnInit(): void {
    this.onScroll();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 60);
  }

  scrollTop(e: Event): void {
    e.preventDefault();
    this.scroll.scrollToTop();
  }

  navClick(e: Event, section: string): void {
    e.preventDefault();
    this.closeMenu();
    this.activeSection.set(section);
    this.scroll.scrollTo(section);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
