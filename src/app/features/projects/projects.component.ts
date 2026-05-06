import {
  Component, ChangeDetectionStrategy, inject, signal, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { Project, PROJECT_CATEGORIES, ProjectCategory } from '../../core/models/project.model';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, SectionHeadingComponent, ProjectModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="projects section-gap">
      <div class="section-marker-wrap" aria-hidden="true">
        <span class="marker-line"></span>
        <span class="marker-num">05</span>
      </div>
      <div class="container">
        <!-- Header row -->
        <div class="projects-header" appReveal="up">
          <app-section-heading
            [eyebrow]="lang.t('مشاريعنا', 'Our Projects')"
            [heading]="lang.t('صرح من الإنجازات', 'A Legacy of Achievement')">
          </app-section-heading>

          <!-- Filter Pills -->
          <div class="filter-pills" role="tablist" [attr.aria-label]="lang.t('تصفية المشاريع', 'Filter Projects')">
            @for (cat of categories; track cat.key) {
              <button
                class="pill"
                role="tab"
                [class.active]="activeCategory() === cat.key"
                [attr.aria-selected]="activeCategory() === cat.key"
                (click)="setCategory(cat.key)">
                {{ lang.isArabic() ? cat.labelAr : cat.labelEn }}
              </button>
            }
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid" role="list" aria-live="polite">
          @for (project of filteredProjects(); track project.id; let i = $index) {
            <article
              class="project-card"
              role="listitem"
              [class]="'col-span-' + getColSpan(i)"
              (click)="openModal(project)"
              (keydown.enter)="openModal(project)"
              tabindex="0"
              [attr.aria-label]="project.titleAr"
              appReveal="up" [revealDelay]="i * 60">

              <!-- Visual -->
              <div class="card-visual">
                <div class="card-gradient" [class]="'gradient-' + ((project.id % 4) + 1)">
                  <div class="grid-overlay" aria-hidden="true"></div>
                  <span class="project-label" aria-hidden="true">PROJECT N° {{ project.id.toString().padStart(2, '0') }}</span>
                  <div class="cat-icon" aria-hidden="true" [innerHTML]="getCatIcon(project.category)"></div>
                </div>

                <!-- Hover overlay -->
                <div class="card-hover-overlay" aria-hidden="true">
                  <span class="view-label">
                    {{ lang.t('عرض التفاصيل', 'View Details') }}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>

                <!-- Corner brackets animate on hover -->
                <div class="bracket btl" aria-hidden="true"></div>
                <div class="bracket bbr" aria-hidden="true"></div>
              </div>

              <!-- Card Info -->
              <div class="card-info">
                <span class="card-category">{{ project.category }}</span>
                <h3 class="card-title">{{ project.titleAr }}</h3>
                <div class="card-meta">
                  <span class="meta-loc">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {{ project.location }}
                  </span>
                  <span class="meta-year">{{ project.year }}</span>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Modal -->
    @if (selectedProject()) {
      <app-project-modal
        [project]="selectedProject()!"
        (close)="closeModal()">
      </app-project-modal>
    }
  `,
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly lang = inject(LanguageService);

  categories = PROJECT_CATEGORIES;
  activeCategory = signal<string>('all');
  selectedProject = signal<Project | null>(null);

  allProjects: Project[] = [
    {
      id: 1, titleAr: '18 فيلا سكنية - مشروع R2', titleEn: '18 Residential Villas - R2 Project',
      location: 'العاصمة الإدارية الجديدة', year: '2017', category: 'سكني',
      client: 'الهيئة الهندسية للقوات المسلحة',
      description: 'تنفيذ الهيكل الخرساني وأعمال التشطيبات الكاملة لـ 18 فيلا سكنية فاخرة بأعلى مستوى من الجودة والدقة',
      scope: ['هيكل خرساني', 'تشطيبات داخلية', 'تشطيبات خارجية', 'توريدات'], icon: '🏡'
    },
    {
      id: 2, titleAr: '9 فيلات سكنية - مشروع R6', titleEn: '9 Residential Villas - R6 Project',
      location: 'العاصمة الإدارية الجديدة', year: '2018', category: 'سكني',
      client: 'الهيئة الهندسية للقوات المسلحة',
      description: 'تنفيذ متكامل لـ 9 فيلات سكنية بأعلى معايير الجودة',
      scope: ['هيكل خرساني', 'تشطيبات'], icon: '🏘️'
    },
    {
      id: 3, titleAr: '22 فيلا سكنية - مشروع R2', titleEn: '22 Residential Villas - R2 Project',
      location: 'العاصمة الإدارية الجديدة', year: '2019', category: 'سكني',
      client: 'الهيئة الهندسية للقوات المسلحة',
      description: 'أعمال تشطيبات احترافية لـ 22 فيلا سكنية',
      scope: ['تشطيبات داخلية وخارجية'], icon: '🏠'
    },
    {
      id: 4, titleAr: 'عمارتين سكنيتين - 12 دور', titleEn: '2 Residential Towers - 12 Floors',
      location: 'شارع فيصل، منطقة المساحة', year: '2020', category: 'سكني',
      client: 'القطاع الخاص',
      description: 'إنشاء برجين سكنيين بأعمال حفر وخوازيق وهيكل خرساني وتشطيبات',
      scope: ['حفر وخوازيق', 'هيكل خرساني', 'تشطيبات كاملة'], icon: '🏢'
    },
    {
      id: 5, titleAr: 'فيلتين فاخرتين', titleEn: '2 Luxury Villas',
      location: 'المنطقة السياحية الأولى - 6 أكتوبر', year: '2021', category: 'سكني',
      client: 'القطاع الخاص',
      description: 'فيلتين فاخرتين (بدروم + أرضي + 3 أدوار) بتنفيذ متكامل',
      scope: ['حفر وخوازيق', 'هيكل خرساني', 'تشطيبات'], icon: '🏰'
    },
    {
      id: 6, titleAr: '5 عمارات - 120 وحدة سكنية', titleEn: '5 Buildings - 120 Residential Units',
      location: 'منطقة النرجس - مدينة 15 مايو', year: '2021-2023', category: 'حكومي',
      client: 'هيئة المجتمعات العمرانية الجديدة',
      description: 'مشروع الإسكان الاجتماعي - 120 وحدة سكنية في 5 عمارات',
      scope: ['هيكل خرساني', 'تشطيبات', 'إسكان اجتماعي'], icon: '🏗️'
    },
    {
      id: 7, titleAr: 'مستشفى حياة كريمة', titleEn: 'Hayah Karima Hospital',
      location: 'مدينة أشمون - محافظة المنوفية', year: '2022-2024', category: 'صحي',
      client: 'وزارة الصحة - مبادرة حياة كريمة',
      description: 'وحدة صحية متكاملة - هيكل خرساني، تشطيبات، حريق، داتا، ميكانيكا',
      scope: ['إنشاءات', 'أعمال كهروميكانيكية', 'حريق وداتا'], icon: '🏥'
    },
    {
      id: 8, titleAr: 'سوق تجاري - شمال التونسي', titleEn: 'Commercial Market - North Tounsi',
      location: 'مدينة 15 مايو', year: '2025', category: 'تجاري',
      client: 'هيئة المجتمعات العمرانية الجديدة',
      description: 'إنشاء سوق تجاري متكامل بأعمال الهيكل الخرساني والتشطيبات',
      scope: ['هيكل خرساني', 'تشطيبات تجارية'], icon: '🏪'
    },
  ];

  filteredProjects = computed(() => {
    const cat = this.activeCategory();
    return cat === 'all' ? this.allProjects : this.allProjects.filter(p => p.category === cat as ProjectCategory);
  });

  // Asymmetric column spans for the 12-col grid
  private colSpans = [7, 5, 4, 4, 4, 6, 6, 12];

  getColSpan(index: number): number {
    return this.colSpans[index % this.colSpans.length] || 4;
  }

  setCategory(key: string): void {
    this.activeCategory.set(key);
  }

  openModal(project: Project): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }

  getCatIcon(category: ProjectCategory): string {
    const icons: Record<string, string> = {
      'سكني':  `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 12L12 3l9 9"/><rect x="4" y="12" width="16" height="9"/><rect x="9" y="15" width="6" height="6"/></svg>`,
      'تجاري': `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="2" y="7" width="20" height="14"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
      'حكومي': `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 22V12"/><path d="M9 22V12"/><path d="M15 22V12"/><path d="M21 22V12"/><path d="M2 12l10-9 10 9"/></svg>`,
      'صحي':   `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/><path d="M12 8v8M8 12h8"/></svg>`,
    };
    return icons[category] || icons['سكني'];
  }
}
