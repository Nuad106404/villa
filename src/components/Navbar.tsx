import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hotel } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'bg-black/95 backdrop-blur-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <Hotel className="h-8 w-8 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="ml-2 text-2xl font-serif text-white">Luxe Haven</span>
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            {isHomePage ? (
              <>
                <NavLink href="#about">{t('nav.about')}</NavLink>
                <NavLink href="#destinations">{t('nav.destinations')}</NavLink>
                <NavLink href="#properties">{t('nav.properties')}</NavLink>
                <NavLink href="#contact">{t('nav.contact')}</NavLink>
                <LanguageSelector />
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-white hover:text-amber-400 transition-colors duration-300"
                >
                  {t('nav.backToHome')}
                </Link>
                <LanguageSelector />
              </>
            )}
            <button className="bg-amber-400 text-black px-8 py-3 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105">
              {t('nav.bookNow')}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <button
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col space-y-4 p-6">
            {isHomePage ? (
              <>
                <NavLink href="#about">{t('nav.about')}</NavLink>
                <NavLink href="#destinations">{t('nav.destinations')}</NavLink>
                <NavLink href="#properties">{t('nav.properties')}</NavLink>
                <NavLink href="#contact">{t('nav.contact')}</NavLink>
              </>
            ) : (
              <Link
                to="/"
                className="text-white hover:text-amber-400 transition-colors duration-300"
              >
                {t('nav.backToHome')}
              </Link>
            )}
            <button className="bg-amber-400 text-black px-6 py-3 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 w-full">
              {t('nav.bookNow')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-white hover:text-amber-400 transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-amber-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
  >
    {children}
  </a>
);