import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="modal-backdrop" (click)="onBackdropClick($event)" role="dialog"
      [attr.aria-label]="project.titleAr"
      aria-modal="true">
      <div class="modal-panel" #panel>
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-visual">
            <div class="visual-overlay"></div>
            <div class="project-num">PROJECT N° {{ project.id.toString().padStart(2, '0') }}</div>
            <span class="category-badge">{{ project.category }}</span>
            <button class="close-btn" (click)="close.emit()" [attr.aria-label]="lang.t('إغلاق', 'Close')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <h2 class="modal-title">{{ project.titleAr }}</h2>

          <div class="meta-row">
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{{ project.location }}</span>
            </div>
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{{ project.year }}</span>
            </div>
          </div>

          <p class="modal-desc">{{ project.description }}</p>

          <div class="info-grid">
            <div class="info-block">
              <h4 class="info-label">{{ lang.t('العميل', 'Client') }}</h4>
              <p class="info-value">{{ project.client }}</p>
            </div>
            <div class="info-block">
              <h4 class="info-label">{{ lang.t('نطاق العمل', 'Scope of Work') }}</h4>
              <ul class="scope-list" role="list">
                @for (item of project.scope; track item) {
                  <li>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {{ item }}
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <a href="#contact" class="btn btn-primary" (click)="close.emit()">
            {{ lang.t('ابدأ مشروعاً مماثلاً', 'Start a Similar Project') }}
          </a>
          <button class="btn btn-outline-blue" (click)="close.emit()">
            {{ lang.t('عودة للمشاريع', 'Back to Projects') }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent {
  @Input({ required: true }) project!: Project;
  @Output() close = new EventEmitter<void>();
  readonly lang = inject(LanguageService);

  @HostListener('keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

  onBackdropClick(e: Event): void {
    if ((e.target as Element).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }
}
