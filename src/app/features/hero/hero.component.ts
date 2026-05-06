import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home" class="hero" aria-label="القسم الرئيسي">
      <!-- Blueprint Grid Overlay -->
      <div class="blueprint-grid" aria-hidden="true"></div>

      <div class="container hero-inner">
        <!-- Text Content -->
        <div class="hero-content">
          <p class="hero-eyebrow hero-animate-2">
            <span class="eyebrow-dash" aria-hidden="true">—</span>
            {{ lang.t('شركة الصرح | منذ 2017', 'Al Sarh Company | Since 2017') }}
          </p>

          <h1 class="hero-headline hero-animate-3">
            @if (lang.isArabic()) {
              <span class="headline-light">نبني </span><span class="headline-bold">الصرح،</span>
              <br>
              <span class="headline-light">نصنع </span><span class="headline-gold">الثقة</span>
            } @else {
              <span class="headline-light">Building </span><span class="headline-bold">Excellence,</span>
              <br>
              <span class="headline-light">Crafting </span><span class="headline-gold">Trust</span>
            }
          </h1>

          <p class="hero-subheading hero-animate-4">
            {{ lang.t(
              'شركة متخصصة في المقاولات العمومية والتوريدات — نُنفّذ مشاريع الإنشاءات والتشطيبات بأعلى معايير الجودة منذ 2017',
              'Specialized in general contracting & supplies — delivering construction and finishing projects to the highest quality standards since 2017'
            ) }}
          </p>

          <div class="hero-ctas hero-animate-5">
            <a href="#contact" class="btn btn-primary" (click)="navTo($event, 'contact')">
              <span>{{ lang.t('ابدأ مشروعك معنا', 'Start Your Project') }}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#projects" class="btn btn-outline-white" (click)="navTo($event, 'projects')">
              {{ lang.t('اكتشف مشاريعنا', 'Explore Projects') }}
            </a>
          </div>

          <!-- Stats Row -->
          <div class="hero-stats hero-animate-7" role="list">
            <div class="stat-item" role="listitem">
              <span class="stat-number">+8</span>
              <span class="stat-label">{{ lang.t('سنوات خبرة', 'Years Experience') }}</span>
            </div>
            <div class="stat-divider" aria-hidden="true"></div>
            <div class="stat-item" role="listitem">
              <span class="stat-number">+20</span>
              <span class="stat-label">{{ lang.t('مشروع كبير', 'Major Projects') }}</span>
            </div>
            <div class="stat-divider" aria-hidden="true"></div>
            <div class="stat-item" role="listitem">
              <span class="stat-number">100%</span>
              <span class="stat-label">{{ lang.t('رضا العملاء', 'Client Satisfaction') }}</span>
            </div>
          </div>
        </div>

        <!-- Hero Visual -->
        <div class="hero-visual hero-animate-6" aria-hidden="true">
          <div class="visual-composition float-animation">
            <!-- Background logo watermark -->
            <div class="logo-watermark">
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                <rect x="60" y="10" width="12" height="80" fill="white" opacity="0.06"/>
                <rect x="75" y="10" width="12" height="80" fill="white" opacity="0.06"/>
                <rect x="10" y="10" width="45" height="12" fill="white" opacity="0.06"/>
                <rect x="10" y="28" width="30" height="10" fill="white" opacity="0.06"/>
                <rect x="10" y="44" width="45" height="12" fill="white" opacity="0.06"/>
                <rect x="25" y="62" width="30" height="10" fill="white" opacity="0.06"/>
                <rect x="10" y="78" width="45" height="12" fill="white" opacity="0.06"/>
              </svg>
            </div>

            <!-- Geometric Building Composition -->
            <svg class="building-svg" viewBox="0 0 480 520" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Ground -->
              <rect x="0" y="480" width="480" height="8" fill="rgba(255,255,255,0.15)" rx="2"/>
              <!-- Main Tower -->
              <rect x="160" y="120" width="160" height="360" fill="rgba(255,255,255,0.12)" rx="2"/>
              <rect x="168" y="128" width="60" height="50" fill="rgba(245,184,0,0.25)" rx="1"/>
              <rect x="252" y="128" width="60" height="50" fill="rgba(245,184,0,0.25)" rx="1"/>
              <rect x="168" y="196" width="60" height="50" fill="rgba(255,255,255,0.1)" rx="1"/>
              <rect x="252" y="196" width="60" height="50" fill="rgba(255,255,255,0.1)" rx="1"/>
              <rect x="168" y="264" width="60" height="50" fill="rgba(255,255,255,0.1)" rx="1"/>
              <rect x="252" y="264" width="60" height="50" fill="rgba(255,255,255,0.1)" rx="1"/>
              <rect x="168" y="332" width="60" height="50" fill="rgba(255,255,255,0.1)" rx="1"/>
              <rect x="252" y="332" width="60" height="50" fill="rgba(255,255,255,0.1)" rx="1"/>
              <!-- Crown -->
              <rect x="180" y="60" width="120" height="60" fill="rgba(255,255,255,0.18)" rx="2"/>
              <rect x="210" y="20" width="60" height="40" fill="rgba(245,184,0,0.35)" rx="2"/>
              <!-- Left Wing -->
              <rect x="60" y="240" width="100" height="240" fill="rgba(255,255,255,0.08)" rx="2"/>
              <rect x="68" y="248" width="36" height="36" fill="rgba(255,255,255,0.08)" rx="1"/>
              <rect x="116" y="248" width="36" height="36" fill="rgba(255,255,255,0.08)" rx="1"/>
              <rect x="68" y="296" width="36" height="36" fill="rgba(255,255,255,0.08)" rx="1"/>
              <rect x="116" y="296" width="36" height="36" fill="rgba(255,255,255,0.08)" rx="1"/>
              <!-- Right Wing -->
              <rect x="320" y="280" width="100" height="200" fill="rgba(255,255,255,0.08)" rx="2"/>
              <rect x="328" y="288" width="36" height="36" fill="rgba(255,255,255,0.08)" rx="1"/>
              <rect x="376" y="288" width="36" height="36" fill="rgba(255,255,255,0.08)" rx="1"/>
              <rect x="328" y="336" width="36" height="36" fill="rgba(255,255,255,0.08)" rx="1"/>
              <rect x="376" y="336" width="36" height="36" fill="rgba(255,255,255,0.08)" rx="1"/>
              <!-- Grid lines on main tower -->
              <line x1="240" y1="120" x2="240" y2="480" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <line x1="160" y1="196" x2="320" y2="196" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <line x1="160" y1="264" x2="320" y2="264" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <line x1="160" y1="332" x2="320" y2="332" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <line x1="160" y1="400" x2="320" y2="400" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <!-- Gold accent lines -->
              <line x1="160" y1="118" x2="320" y2="118" stroke="#f5b800" stroke-width="2" opacity="0.7"/>
              <line x1="180" y1="58" x2="300" y2="58" stroke="#f5b800" stroke-width="2" opacity="0.7"/>
            </svg>

            <!-- Corner brackets -->
            <div class="bracket bracket-tl" aria-hidden="true"></div>
            <div class="bracket bracket-br" aria-hidden="true"></div>
          </div>

          <!-- Floating badges -->
          <div class="badge badge-top" role="img" aria-label="Founded 2017">
            <span class="badge-year">2017</span>
            <span class="badge-label">{{ lang.t('تأسست', 'Founded') }}</span>
          </div>
          <div class="badge badge-bottom" role="img" aria-label="180+ Residential Units">
            <span class="badge-num">+180</span>
            <span class="badge-label">{{ lang.t('وحدة سكنية', 'Residential Units') }}</span>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator" aria-hidden="true">
        <span class="scroll-num">01</span>
        <span class="scroll-line"></span>
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly lang = inject(LanguageService);
  private readonly scroll = inject(ScrollService);

  navTo(e: Event, section: string): void {
    e.preventDefault();
    this.scroll.scrollTo(section);
  }
}
