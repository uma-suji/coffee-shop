import React from 'react';
import { Coffee, MapPin, Clock, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B140E] text-[#D9CEBF] border-t border-[#291D15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Coffee className="w-5 h-5 text-[#C57D3C]" />
              <span className="text-xl font-serif font-bold">Atelier Roast</span>
            </div>
            <p className="text-xs text-[#A89887] leading-relaxed">
              Specialty micro-batch roastery and slow bar dedicated to transparent sourcing, terroir clarity, and precision extraction.
            </p>
            <p className="text-xs text-[#7A6A5C] pt-2">
              Member of the Specialty Coffee Association (SCA).
            </p>
          </div>

          {/* Location & Hours */}
          <div className="space-y-2 text-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Roastery & Slow Bar
            </h4>
            <div className="flex items-start gap-2 text-[#C4B5A5]">
              <MapPin className="w-4 h-4 text-[#C57D3C] shrink-0 mt-0.5" />
              <span>482 Mill Street, Historic Roasting District</span>
            </div>
            <div className="flex items-start gap-2 text-[#C4B5A5]">
              <Clock className="w-4 h-4 text-[#C57D3C] shrink-0 mt-0.5" />
              <div>
                <p>Monday – Friday: 6:30 AM – 7:00 PM</p>
                <p>Saturday – Sunday: 7:30 AM – 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-[#C4B5A5]">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Curated Drink Menu
                </a>
              </li>
              <li>
                <a href="#tasting-flights" className="hover:text-white transition-colors">
                  Slow Bar Tasting Flights
                </a>
              </li>
              <li>
                <a href="#brew-dial-in" className="hover:text-white transition-colors">
                  Brew Ratio Calculator & Timer
                </a>
              </li>
              <li>
                <a href="#origins" className="hover:text-white transition-colors">
                  Direct Trade Terroirs
                </a>
              </li>
              <li>
                <a href="#loyalty" className="hover:text-white transition-colors">
                  Artisan Loyalty Passport
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Roasting Schedule */}
          <div className="space-y-2 text-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Roast Schedule & Inquiries
            </h4>
            <p className="text-[#A89887]">
              Fresh roasts drop every Tuesday & Friday at 9:00 AM.
            </p>
            <div className="pt-2 space-y-1 text-[#C4B5A5]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C57D3C]" />
                <span>(415) 890-2134</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C57D3C]" />
                <span>hello@atelierroast.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#2D2117] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6A5C]">
          <p>© {new Date().getFullYear()} Atelier Roast Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Direct Trade Verified</span>
            <span>Compostable Takeaway Packaging</span>
            <span>Renewable Energy Roaster</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
