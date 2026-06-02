import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ScrollService } from '../../core/services/scroll.service';
import { AnimatedCounterComponent } from '../../shared/components/animated-counter/animated-counter.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AnimatedCounterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home" class="hero" aria-label="القسم الرئيسي">
      <!-- Blueprint Grid Overlay -->
      <div class="blueprint-grid" aria-hidden="true"></div>

      <!-- Floating Particles -->
      <div class="particles" aria-hidden="true">
        <span class="particle p-1"></span>
        <span class="particle p-2"></span>
        <span class="particle p-3"></span>
        <span class="particle p-4"></span>
        <span class="particle p-5"></span>
        <span class="particle p-6"></span>
        <span class="particle p-7"></span>
        <span class="particle p-8"></span>
        <span class="particle p-9"></span>
      </div>

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
              <span class="stat-number">
                <app-animated-counter [target]="8" prefix="+" [duration]="1800"></app-animated-counter>
              </span>
              <span class="stat-label">{{ lang.t('سنوات خبرة', 'Years Experience') }}</span>
            </div>
            <div class="stat-divider" aria-hidden="true"></div>
            <div class="stat-item" role="listitem">
              <span class="stat-number">
                <app-animated-counter [target]="20" prefix="+" [duration]="2000"></app-animated-counter>
              </span>
              <span class="stat-label">{{ lang.t('مشروع كبير', 'Major Projects') }}</span>
            </div>
            <div class="stat-divider" aria-hidden="true"></div>
            <div class="stat-item" role="listitem">
              <span class="stat-number">
                <app-animated-counter [target]="100" suffix="%" [duration]="2200"></app-animated-counter>
              </span>
              <span class="stat-label">{{ lang.t('رضا العملاء', 'Client Satisfaction') }}</span>
            </div>
          </div>
        </div>

        <!-- Hero Visual — Photo Mosaic -->
        <div class="hero-visual hero-animate-6">
          <div class="visual-composition float-animation">

            <div class="photo-mosaic" aria-hidden="true">

              <!-- Main slot: CSS slideshow cycling through 3 construction site images -->
              <div class="mosaic-col-main">
                <img class="mosaic-img slide s1"
                     src="assets/hero/cranes.jpg"
                     alt="">
                <img class="mosaic-img slide s2"
                     src="assets/hero/excavator.jpg"
                     alt="">
                <img class="mosaic-img slide s3"
                     src="assets/hero/workers-aerial.jpg"
                     alt="">
              </div>

              <!-- Side slots: static with slow Ken Burns zoom -->
              <div class="mosaic-col-side">
                <img class="mosaic-img side-top"
                     src="assets/hero/workers-plans.jpg"
                     alt="">
                <img class="mosaic-img side-bottom"
                     src="assets/hero/concrete-work.jpg"
                     alt="">
              </div>

              <!-- Dark overlay & vignette -->
              <div class="mosaic-overlay"></div>

              <!-- Corner brackets -->
              <div class="bracket bracket-tl"></div>
              <div class="bracket bracket-br"></div>
            </div>

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
