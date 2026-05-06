import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { AnimatedCounterComponent } from '../../shared/components/animated-counter/animated-counter.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

interface Stat {
  value: number;
  prefix: string;
  suffix: string;
  labelAr: string;
  labelEn: string;
  tooltip?: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, AnimatedCounterComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stats" aria-label="Achievements / الإنجازات">
      <div class="blueprint-grid" aria-hidden="true"></div>
      <div class="radial-overlay" aria-hidden="true"></div>

      <div class="container">
        <ul class="stats-grid" role="list">
          @for (stat of stats; track stat.labelAr; let i = $index) {
            <li class="stat-item" role="listitem" appReveal="up" [revealDelay]="i * 100">
              <div class="stat-number-wrap" [attr.title]="stat.tooltip">
                <span class="stat-prefix">{{ stat.prefix }}</span>
                <app-animated-counter
                  [target]="stat.value"
                  [duration]="2200"
                  class="stat-num">
                </app-animated-counter>
                <span class="stat-suffix">{{ stat.suffix }}</span>
              </div>
              <div class="gold-bar-anim" aria-hidden="true"></div>
              <p class="stat-label">{{ lang.isArabic() ? stat.labelAr : stat.labelEn }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  readonly lang = inject(LanguageService);

  stats: Stat[] = [
    { value: 180, prefix: '+', suffix: '', labelAr: 'وحدة سكنية منجزة', labelEn: 'Residential Units Completed', tooltip: 'Updated 2024' },
    { value: 9,   prefix: '+', suffix: '', labelAr: 'سنوات في السوق', labelEn: 'Years in Market', tooltip: 'Since 2017' },
    { value: 20,  prefix: '+', suffix: '', labelAr: 'مشروع كبير', labelEn: 'Major Projects', tooltip: 'Updated 2024' },
    { value: 100, prefix: '', suffix: '%', labelAr: 'التزام بالمواعيد', labelEn: 'On-Time Delivery', tooltip: 'Our commitment' },
  ];
}
