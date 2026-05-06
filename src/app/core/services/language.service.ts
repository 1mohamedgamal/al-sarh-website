import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Language = 'ar' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  private _language = signal<Language>((localStorage.getItem('lang') as Language) || 'ar');

  readonly language = this._language.asReadonly();
  readonly isArabic = computed(() => this._language() === 'ar');
  readonly isEnglish = computed(() => this._language() === 'en');
  readonly dir = computed(() => this._language() === 'ar' ? 'rtl' : 'ltr');

  constructor() {
    effect(() => {
      const lang = this._language();
      const html = this.document.documentElement;
      html.lang = lang;
      html.dir = lang === 'ar' ? 'rtl' : 'ltr';

      const body = this.document.body;
      body.classList.toggle('lang-en', lang === 'en');
      body.classList.toggle('lang-ar', lang === 'ar');

      localStorage.setItem('lang', lang);
    });
  }

  toggle(): void {
    this._language.update(l => l === 'ar' ? 'en' : 'ar');
  }

  setLanguage(lang: Language): void {
    this._language.set(lang);
  }

  t(ar: string, en: string): string {
    return this._language() === 'ar' ? ar : en;
  }
}
