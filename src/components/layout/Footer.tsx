import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { Instagram, Twitter, Youtube } from 'lucide-react'

/**
 * Footer component.
 * Fully internationalized with proper Link usage and RTL support.
 */
export function Footer() {
  const t = useTranslations('Footer')
  const commonT = useTranslations('Common')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  const exploreLinks = [
    { label: commonT('programs'), href: '#programs' },
    { label: commonT('trainers'), href: '#trainers' },
    { label: commonT('pricing'), href: '#pricing' },
    { label: commonT('results'), href: '#results' },
    { label: commonT('faq'), href: '#faq' },
  ]

  const programLinks = [
    t('programs.strength'),
    t('programs.fatLoss'),
    t('programs.hiit'),
    t('programs.mobility'),
  ]

  return (
    <footer className="bg-pf-charcoal text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-20 pb-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-2xl font-bold tracking-wide hover:text-pf-accent transition-colors">
              PULSEFIT
            </Link>
            <p className="text-sm text-[#A6B0BE] mt-4 max-w-[280px] leading-relaxed">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#A6B0BE] hover:text-pf-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-[#A6B0BE] hover:text-pf-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#A6B0BE] hover:text-pf-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-caption text-white mb-4">{t('explore')}</h4>
            <ul className="space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-[#A6B0BE] hover:text-pf-accent transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-caption text-white mb-4">{t('programsTitle')}</h4>
            <ul className="space-y-3">
              {programLinks.map((item) => (
                <li key={item}>
                  <span className="text-sm text-[#A6B0BE]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-caption text-white mb-4">{t('contact')}</h4>
            <ul className="space-y-3 text-sm text-[#A6B0BE]">
              <li>
                <a href="tel:+15552345678" className="hover:text-pf-accent transition-colors">
                  +1 (555) 234-5678
                </a>
              </li>
              <li>
                <a href="mailto:hello@pulsefit.com" className="hover:text-pf-accent transition-colors">
                  hello@pulsefit.com
                </a>
              </li>
              <li>120 Fitness Ave, Downtown</li>
            </ul>
            <p className="text-caption text-[#A6B0BE] mt-4">
              {t('hours.weekdays')}
              <br />
              {t('hours.weekend')}
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-[#263241]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <p className="text-sm text-[#A6B0BE]">{t('newsletter')}</p>
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className={`flex-1 lg:w-[280px] h-11 px-5 bg-transparent border border-[#263241] ${isRtl ? 'rounded-r-full border-l-0' : 'rounded-l-full border-r-0'} text-sm text-white placeholder:text-[#5B6472] focus:outline-none focus:border-pf-accent transition-colors`}
              />
              <button className={`h-11 px-6 bg-pf-accent text-white text-caption ${isRtl ? 'rounded-l-full' : 'rounded-r-full'} hover:bg-pf-accent-hover transition-colors shrink-0`}>
                {t('subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#263241] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-[#5B6472]">
            © {new Date().getFullYear()} PulseFit. {t('rights')}
          </p>
          <div className="flex items-center gap-4 text-caption text-[#5B6472]">
            <span className="hover:text-[#A6B0BE] cursor-pointer transition-colors">{t('privacy')}</span>
            <span className="hover:text-[#A6B0BE] cursor-pointer transition-colors">{t('terms')}</span>
            <span className="hover:text-[#A6B0BE] cursor-pointer transition-colors">{t('cookies')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
