export interface Project {
  id: number;
  titleAr: string;
  titleEn: string;
  location: string;
  year: string;
  category: ProjectCategory;
  client: string;
  description: string;
  scope: string[];
  icon: string;
}

export type ProjectCategory = 'سكني' | 'تجاري' | 'حكومي' | 'صحي';

export const PROJECT_CATEGORIES: { key: string; labelAr: string; labelEn: string }[] = [
  { key: 'all',   labelAr: 'الكل',    labelEn: 'All' },
  { key: 'سكني',  labelAr: 'سكني',   labelEn: 'Residential' },
  { key: 'تجاري', labelAr: 'تجاري',  labelEn: 'Commercial' },
  { key: 'حكومي', labelAr: 'حكومي',  labelEn: 'Government' },
  { key: 'صحي',   labelAr: 'صحي',    labelEn: 'Healthcare' },
];
