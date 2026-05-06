import {
  Component, ChangeDetectionStrategy, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealOnScrollDirective, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="contact section-gap">
      <div class="blueprint-grid" aria-hidden="true"></div>
      <div class="container contact-grid">

        <!-- Info Side -->
        <div class="contact-info" appReveal="right" [revealDelay]="0">
          <app-section-heading
            [eyebrow]="lang.t('تواصل معنا', 'Get In Touch')"
            [heading]="lang.t('نحن هنا للإجابة عن استفساراتك', 'We Are Here for Your Inquiries')">
          </app-section-heading>

          <div class="info-cards" role="list">
            @for (card of infoCards; track card.iconPath) {
              <div class="info-card" role="listitem">
                <div class="info-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path [attr.d]="card.iconPath"/>
                  </svg>
                </div>
                <div>
                  <p class="info-label">{{ lang.isArabic() ? card.labelAr : card.labelEn }}</p>
                  @if (card.link) {
                    <a class="info-value link" [href]="card.link">{{ lang.isArabic() ? card.valueAr : card.valueEn }}</a>
                  } @else {
                    <p class="info-value">{{ lang.isArabic() ? card.valueAr : card.valueEn }}</p>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Address Cards -->
          <div class="address-cards">
            <div class="address-card">
              <h4>{{ lang.t('مكتب القاهرة', 'Cairo Office') }}</h4>
              <p>{{ lang.t('برج (A) الدور الثاني - المجاورة (3) كمباوند وسط البلد - مدينة 15 مايو - القاهرة', 'Tower A, 2nd Floor, Block 3, Downtown Compound, 15th of May City, Cairo') }}</p>
            </div>
            <div class="address-card">
              <h4>{{ lang.t('مكتب بني سويف', 'Beni Suef Office') }}</h4>
              <p>{{ lang.t('شارع 10 الإبراهيمية - الواسطى - بني سويف', '10 Al Ibrahimiya Street, Al Wasta, Beni Suef') }}</p>
            </div>
          </div>
        </div>

        <!-- Form Side -->
        <div class="contact-form-wrap" appReveal="left" [revealDelay]="100">
          @if (!formSubmitted()) {
            <form class="contact-form" [formGroup]="form" (ngSubmit)="onSubmit()" novalidate
              aria-label="Contact Form / نموذج التواصل">

              <!-- Progress bar (shown during submit) -->
              @if (isSubmitting()) {
                <div class="progress-bar" role="progressbar" aria-label="Submitting"></div>
              }

              <!-- Name -->
              <div class="field" [class.invalid]="isInvalid('name')">
                <label class="field-label" for="name">{{ lang.t('الاسم الكامل', 'Full Name') }} *</label>
                <input id="name" type="text" formControlName="name" class="field-input"
                  [placeholder]="lang.t('أدخل اسمك الكامل', 'Enter your full name')"
                  [attr.aria-invalid]="isInvalid('name')"
                  aria-describedby="name-error">
                @if (isInvalid('name')) {
                  <span class="field-error" id="name-error" role="alert" aria-live="polite">
                    {{ lang.t('الاسم مطلوب', 'Name is required') }}
                  </span>
                }
              </div>

              <!-- Phone -->
              <div class="field" [class.invalid]="isInvalid('phone')">
                <label class="field-label" for="phone">{{ lang.t('رقم الهاتف', 'Phone Number') }} *</label>
                <input id="phone" type="tel" formControlName="phone" class="field-input"
                  [placeholder]="lang.t('01xxxxxxxxx', '+20 1xx xxx xxxx')"
                  [attr.aria-invalid]="isInvalid('phone')"
                  aria-describedby="phone-error">
                @if (isInvalid('phone')) {
                  <span class="field-error" id="phone-error" role="alert" aria-live="polite">
                    {{ lang.t('رقم الهاتف مطلوب', 'Phone number is required') }}
                  </span>
                }
              </div>

              <!-- Email -->
              <div class="field" [class.invalid]="isInvalid('email')">
                <label class="field-label" for="email">{{ lang.t('البريد الإلكتروني', 'Email Address') }}</label>
                <input id="email" type="email" formControlName="email" class="field-input"
                  [placeholder]="lang.t('example@domain.com', 'example@domain.com')"
                  [attr.aria-invalid]="isInvalid('email')"
                  aria-describedby="email-error">
                @if (isInvalid('email')) {
                  <span class="field-error" id="email-error" role="alert" aria-live="polite">
                    {{ lang.t('البريد الإلكتروني غير صحيح', 'Invalid email address') }}
                  </span>
                }
              </div>

              <!-- Project Type -->
              <div class="field">
                <label class="field-label" for="projectType">{{ lang.t('نوع المشروع', 'Project Type') }}</label>
                <select id="projectType" formControlName="projectType" class="field-input field-select">
                  <option value="">{{ lang.t('اختر نوع المشروع', 'Select project type') }}</option>
                  <option value="سكني">{{ lang.t('سكني', 'Residential') }}</option>
                  <option value="تجاري">{{ lang.t('تجاري', 'Commercial') }}</option>
                  <option value="حكومي">{{ lang.t('حكومي', 'Government') }}</option>
                  <option value="صحي">{{ lang.t('صحي', 'Healthcare') }}</option>
                  <option value="تشطيبات">{{ lang.t('تشطيبات فقط', 'Finishing Only') }}</option>
                  <option value="توريدات">{{ lang.t('توريدات', 'Supplies') }}</option>
                  <option value="أخرى">{{ lang.t('أخرى', 'Other') }}</option>
                </select>
              </div>

              <!-- Message -->
              <div class="field" [class.invalid]="isInvalid('message')">
                <label class="field-label" for="message">{{ lang.t('رسالتك', 'Your Message') }} *</label>
                <textarea id="message" formControlName="message" class="field-input field-textarea" rows="4"
                  [placeholder]="lang.t('اكتب رسالتك هنا...', 'Write your message here...')"
                  [attr.aria-invalid]="isInvalid('message')"
                  aria-describedby="message-error"></textarea>
                @if (isInvalid('message')) {
                  <span class="field-error" id="message-error" role="alert" aria-live="polite">
                    {{ lang.t('الرسالة مطلوبة', 'Message is required') }}
                  </span>
                }
              </div>

              <button type="submit" class="btn btn-blue submit-btn" [disabled]="isSubmitting()">
                @if (isSubmitting()) {
                  <span>{{ lang.t('جارٍ الإرسال...', 'Sending...') }}</span>
                } @else {
                  <span>{{ lang.t('إرسال الرسالة', 'Send Message') }}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
                  </svg>
                }
              </button>
            </form>
          } @else {
            <!-- Success State -->
            <div class="success-state" role="status" aria-live="polite">
              <div class="success-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3>{{ lang.t('تم إرسال رسالتك بنجاح!', 'Message Sent Successfully!') }}</h3>
              <p>{{ lang.t('شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.', 'Thank you for contacting us. Our team will get back to you as soon as possible.') }}</p>
              <button class="btn btn-outline-blue" (click)="resetForm()">
                {{ lang.t('إرسال رسالة أخرى', 'Send Another Message') }}
              </button>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  readonly lang = inject(LanguageService);
  private readonly fb = inject(FormBuilder);

  isSubmitting = signal(false);
  formSubmitted = signal(false);

  form = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2)]],
    phone:       ['', [Validators.required, Validators.pattern(/^[0-9+\s\-()]{8,}$/)]],
    email:       ['', [Validators.email]],
    projectType: [''],
    message:     ['', [Validators.required, Validators.minLength(10)]],
  });

  infoCards = [
    {
      labelAr: 'الهاتف',
      labelEn: 'Phone',
      valueAr: '01090067829 / 01028880792',
      valueEn: '01090067829 / 01028880792',
      link: 'tel:+201090067829',
      iconPath: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12 19.79 19.79 0 0 1 1.21 3.58 2 2 0 0 1 3.22 1.4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z'
    },
    {
      labelAr: 'البريد الإلكتروني',
      labelEn: 'Email',
      valueAr: 'CEO@alsarh.org',
      valueEn: 'CEO@alsarh.org',
      link: 'mailto:CEO@alsarh.org',
      iconPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 8 8-8'
    },
    {
      labelAr: 'ساعات العمل',
      labelEn: 'Working Hours',
      valueAr: 'الأحد - الخميس: 9 ص - 5 م',
      valueEn: 'Sun - Thu: 9 AM - 5 PM',
      link: null,
      iconPath: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 5v5l4 2'
    },
  ];

  isInvalid(field: string): boolean {
    const ctrl: AbstractControl | null = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting.set(true);

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.formSubmitted.set(true);
    }, 1800);
  }

  resetForm(): void {
    this.form.reset();
    this.formSubmitted.set(false);
  }
}
