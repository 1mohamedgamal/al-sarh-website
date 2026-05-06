import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="clients section-gap-tight">
      <div class="container">
        <p class="clients-eyebrow" appReveal="up">
          {{ lang.t('شركاء النجاح', 'Partners in Success') }}
        </p>
        <div class="marquee-container" aria-label="Our Clients and Partners">
          <div class="marquee-track" aria-hidden="true">
            @for (client of clients.concat(clients); track $index) {
              <div class="client-item">
                <span class="client-abbr">{{ client.abbr }}</span>
                <span class="client-name">{{ lang.isArabic() ? client.nameAr : client.nameEn }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  readonly lang = inject(LanguageService);

  clients = [
    { abbr: 'AFEA', nameAr: 'الهيئة الهندسية للقوات المسلحة', nameEn: 'Armed Forces Engineering Authority' },
    { abbr: 'MOH',  nameAr: 'وزارة الصحة',                    nameEn: 'Ministry of Health' },
    { abbr: 'NUCA', nameAr: 'هيئة المجتمعات العمرانية الجديدة', nameEn: 'New Urban Communities Authority' },
    { abbr: '15M',  nameAr: 'جهاز مدينة 15 مايو',              nameEn: '15th of May City Authority' },
    { abbr: 'EB',   nameAr: 'الشعبة الهندسية',                  nameEn: 'Engineering Division' },
  ];
}
