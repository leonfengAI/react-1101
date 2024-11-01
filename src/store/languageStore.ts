import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import enTranslations from '../language/en.json';
import zhTranslations from '../language/zh.json';
import jaTranslations from '../language/ja.json';

type Translations = {
  [key: string]: string;
};

const translations: { [key: string]: Translations } = {
  en: enTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
};

interface LanguageState {
  currentLanguage: string;
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      t: (key: string) => {
        const { currentLanguage } = get();
        return translations[currentLanguage]?.[key] || translations.en[key] || key;
      },
      setLanguage: (lang: string) => set({ currentLanguage: lang }),
    }),
    {
      name: 'language-store',
    }
  )
);