import React from 'react';
import { ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hero_artisan_coffee_1791172128519.jpg';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenCustomizer }) => {
  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Roastery Open Today until 7:00 PM</span>
              <span aria-hidden="true" className="text-[#C4B7A5]">·</span>
              <span>Slow Bar Active</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1B140E] tracking-tight leading-[1.12] text-balance">
              Exceptional single-origin coffee, masterfully roasted.
            </h1>

            <p className="text-base sm:text-lg text-[#5C4A3C] leading-relaxed max-w-xl">
              We source micro-lot beans directly from high-elevation family estates in Huila, Yirgacheffe, and Boquete, roasted weekly on our 15kg cast-iron drum roaster for unmatched sweetness and floral clarity.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-sm font-semibold text-[#FBF9F5] bg-[#1B140E] hover:bg-[#2D2117] rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Order From Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomizer}
                className="px-6 py-3.5 text-sm font-semibold text-[#1B140E] bg-[#EFE8DD] hover:bg-[#E5DBCB] border border-[#DDD0BC] rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C57D3C]" />
                <span>Barista Studio Builder</span>
              </button>
            </div>

            {/* Adjacency Proof: Concrete verifiable coffee craft facts */}
            <div className="pt-8 border-t border-[#E8DFC8] grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1B140E] tabular-nums">94.5</p>
                <p className="text-xs text-[#7A6655] mt-0.5">Avg. SCA Cup Score</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1B140E] tabular-nums">1,850m+</p>
                <p className="text-xs text-[#7A6655] mt-0.5">High Elevation Lots</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1B140E] tabular-nums">15 min</p>
                <p className="text-xs text-[#7A6655] mt-0.5">Counter Pickup</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor with Tactile Framing */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E8DFC8] bg-[#EFE8DD] aspect-[16/10] group">
              <img
                src={heroImg}
                alt="Atelier Roast specialty coffee bar and slow bar counter with espresso machine"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E8DCCB]" />
                  <span>Downtown Roastery & Slow Bar · 482 Mill Street</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#E8DCCB]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>7:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
