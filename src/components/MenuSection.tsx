import React, { useState, useMemo } from 'react';
import { CoffeeItem, CategoryId } from '../types/coffee';
import { COFFEE_MENU } from '../data/coffeeMenu';
import { Search, Plus, Sparkles, SlidersHorizontal, Check } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: CoffeeItem) => void;
  onCustomizeItem: (item: CoffeeItem) => void;
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Offerings' },
  { id: 'espresso', label: 'Espresso & Classics' },
  { id: 'pourover', label: 'Slow Bar Pour-Over' },
  { id: 'cold', label: 'Cold Brew & Nitro' },
  { id: 'pastries', label: 'Artisan Pastries' },
  { id: 'beans', label: 'Whole Bean Bags' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onCustomizeItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return COFFEE_MENU.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Roast filter
      if (selectedRoast !== 'all' && item.roastLevel !== selectedRoast) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesNotes = item.tastingNotes.some((n) => n.toLowerCase().includes(q));
        const matchesOrigin = item.origin?.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesNotes || matchesOrigin;
      }
      return true;
    });
  }, [activeCategory, selectedRoast, searchQuery]);

  const handleQuickAdd = (item: CoffeeItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1400);
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8DFC8]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
              Crafted To Order · Daily Roast
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B140E] mt-1">
              Curated Roastery Menu
            </h2>
            <p className="text-sm text-[#705C4D] mt-2 max-w-xl">
              From dial-in single estate pour-overs to layered espresso classics, explore drinks prepared with artisan care and fresh weekly roasted beans.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A6D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search origin, notes (e.g. Jasmine)..."
              className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm bg-[#F3ECE4] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C] focus:bg-[#FAF6F0] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6D] hover:text-[#1B140E]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE8DD] rounded-xl overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1B140E] text-[#FBF9F5] shadow-xs'
                      : 'text-[#614F40] hover:text-[#1B140E] hover:bg-[#E7DFC0]/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Roast Selector Filter */}
          <div className="flex items-center gap-2 text-xs text-[#705C4D]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Roast profile:</span>
            <select
              value={selectedRoast}
              onChange={(e) => setSelectedRoast(e.target.value)}
              className="bg-[#EFE8DD] border border-[#DDD0BC] text-xs font-medium text-[#1B140E] rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#C57D3C] cursor-pointer"
            >
              <option value="all">All Roasts</option>
              <option value="Light">Light Roast (Floral / Acidic)</option>
              <option value="Medium-Light">Medium-Light (Balanced / Berry)</option>
              <option value="Medium">Medium (Caramel / Nutty)</option>
              <option value="Medium-Dark">Medium-Dark (Dark Cacao)</option>
            </select>
          </div>
        </div>

        {/* Products Grid: 3 columns on desktop with generous whitespace */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-[#F5EFEB] rounded-2xl border border-[#E8DFC8]">
            <p className="text-sm font-medium text-[#574436]">No items found matching your filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedRoast('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-[#C57D3C] hover:underline cursor-pointer"
            >
              Reset filters and view all offerings
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] p-5 flex flex-col justify-between hover:border-[#D5C6AC] hover:shadow-md transition-all group"
                >
                  <div>
                    {/* Item Visual slot */}
                    {item.image ? (
                      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-[#EFE8DD] border border-[#E8DFC8]">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                        />
                      </div>
                    ) : (
                      /* Styled CSS/SVG fallback container */
                      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-[#EFE8DD] border border-[#E8DFC8] flex items-center justify-center text-[#9E8B7A]">
                        <span className="font-serif text-lg tracking-wide">{item.name}</span>
                      </div>
                    )}

                    {/* Zero-Pill Clean Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#8A5A30] font-medium tracking-wide uppercase">
                      <span>{item.category}</span>
                      {item.roastLevel && (
                        <>
                          <span aria-hidden="true" className="text-[#C4B7A5]">·</span>
                          <span>{item.roastLevel}</span>
                        </>
                      )}
                      {item.origin && (
                        <>
                          <span aria-hidden="true" className="text-[#C4B7A5]">·</span>
                          <span className="truncate max-w-[120px]">{item.origin}</span>
                        </>
                      )}
                    </div>

                    {/* Title & Price */}
                    <div className="flex items-baseline justify-between gap-2 mt-1.5">
                      <h3 className="text-lg font-serif font-bold text-[#1B140E] group-hover:text-[#8A5A30] transition-colors leading-tight">
                        {item.name}
                      </h3>
                      <span className="font-mono text-base font-semibold text-[#1B140E] tabular-nums whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Tasting notes: unboxed text with typographic separators */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#6B5748]">
                        <span className="text-[#A38D7D] font-medium">Notes:</span>
                        {item.tastingNotes.map((note, idx) => (
                          <React.Fragment key={idx}>
                            <span>{note}</span>
                            {idx < item.tastingNotes.length - 1 && (
                              <span aria-hidden="true" className="text-[#C4B7A5]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="mt-2.5 text-xs sm:text-sm text-[#665243] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 mt-4 border-t border-[#EFE8DD] flex items-center justify-between gap-2">
                    {item.supportsCustomization ? (
                      <button
                        onClick={() => onCustomizeItem(item)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#734A25] bg-[#EFE8DD] hover:bg-[#E5DBCB] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-[#C57D3C]" />
                        <span>Customize Craft</span>
                      </button>
                    ) : (
                      <span className="text-xs text-[#8A796A]">
                        {item.calories ? `${item.calories} kcal` : 'Whole Bean Bag'}
                      </span>
                    )}

                    <button
                      onClick={() => handleQuickAdd(item)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        isAdded
                          ? 'bg-[#10B981] text-white'
                          : 'bg-[#1B140E] text-[#FBF9F5] hover:bg-[#2F2218]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
