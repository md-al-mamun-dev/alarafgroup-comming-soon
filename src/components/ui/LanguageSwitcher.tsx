'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/src/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'bn' ? 'en' : 'bn';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="text-sm font-medium tracking-wide text-brand-ivory/80 hover:text-brand-gold transition-colors flex items-center gap-2"
      aria-label="Toggle language"
    >
      <span className={locale === 'bn' ? 'text-brand-gold font-bold' : ''}>বাংলা</span>
      <span className="text-brand-ivory/40">|</span>
      <span className={locale === 'en' ? 'text-brand-gold font-bold' : ''}>EN</span>
    </button>
  );
}
