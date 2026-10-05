import React from 'react';
import { ShoppingBag, Coffee, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenCustomizer: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenCustomizer,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-2xl font-serif font-semibold tracking-tight text-[#1B140E] hover:text-[#C57D3C] transition-colors flex items-center gap-2.5"
        >
          <Coffee className="w-5 h-5 text-[#C57D3C]" strokeWidth={2} />
          <span>Atelier Roast</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#574436]">
          <a href="#menu" className="hover:text-[#1B140E] transition-colors">
            Curated Menu
          </a>
          <button 
            onClick={onOpenCustomizer} 
            className="hover:text-[#1B140E] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Barista Studio</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C57D3C]" />
          </button>
          <a href="#tasting-flights" className="hover:text-[#1B140E] transition-colors">
            Tasting Flights
          </a>
          <a href="#brew-dial-in" className="hover:text-[#1B140E] transition-colors">
            Brew Calculator
          </a>
          <a href="#loyalty" className="hover:text-[#1B140E] transition-colors">
            Club Passport
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCustomizer}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1B140E] bg-[#EFE8DD] hover:bg-[#E5DBCB] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C57D3C]" />
            <span>Craft Drink</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping cart"
            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#FBF9F5] bg-[#1B140E] hover:bg-[#2D2117] rounded-lg transition-colors cursor-pointer shadow-sm whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-[#E8DCCB]" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="flex items-center gap-1 font-mono text-[11px] bg-[#C57D3C] text-white px-1.5 py-0.2 rounded font-bold">
                {cartCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden lg:inline text-xs font-mono font-normal text-[#E8DCCB] border-l border-[#3D2E22] pl-2 tabular-nums">
                ${cartTotal.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
