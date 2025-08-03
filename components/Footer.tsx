import { Facebook, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('footer.brand')}</h3>
            <p className="text-gray-300 mb-4">{t('footer.company')}</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-gray-300">{t('footer.address')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-gray-300">{t('footer.phone')} (Paulius)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-gray-300">{t('footer.email')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors block">
                {t('nav.home')}
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors block">
                {t('nav.clients')}
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors block">
                {t('nav.drivers')}
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors block">
                {t('nav.contact')}
              </a>
            </div>
          </div>

          {/* Social Media & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <div className="space-y-2">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors block text-sm">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors block text-sm">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 {t('footer.company')} - {t('footer.brand')}. All rights reserved.
          </p>
          {onNavigate && (
            <button 
              onClick={() => onNavigate('admin')}
              className="mt-2 text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Admin Access
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}