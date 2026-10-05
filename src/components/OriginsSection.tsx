import React, { useState } from 'react';
import beansImg from '../assets/images/roastery_origin_beans_1791172176251.jpg';
import { Compass, Sparkles, Sprout, ShieldCheck } from 'lucide-react';

interface Terroir {
  id: string;
  name: string;
  region: string;
  elevation: string;
  varietal: string;
  process: string;
  notes: string[];
  story: string;
}

const TERROIRS: Terroir[] = [
  {
    id: 'ethiopia-yirg',
    name: 'Gedeo High Forest',
    region: 'Yirgacheffe, Southern Ethiopia',
    elevation: '2,050m - 2,200m',
    varietal: 'Indigenous Kurume & Dega Heirloom',
    process: 'Washed, 36h soak on African raised beds',
    notes: ['Jasmine Florals', 'Meyer Lemon Marmalade', 'Bergamot Tea'],
    story: 'Sourced from 35 smallholder farming families around the misty slopes of Gedeo. Shaded by endemic acacia trees, producing dense, high-sugar cherries.',
  },
  {
    id: 'colombia-huila',
    name: 'Finca La Esperanza Pink Bourbon',
    region: 'San Adolfo, Huila, Colombia',
    elevation: '1,850m',
    varietal: 'Pink Bourbon (Rare natural hybrid)',
    process: '72-Hour Anaerobic Cherry Maceration',
    notes: ['Wild Strawberry', 'Pink Guava', 'Champagne Fizz'],
    story: 'Cultivated by fourth-generation grower Jairo Arcila. The rare Pink Bourbon cherries are hand-selected at 24° Brix before sealed stainless steel fermentation.',
  },
  {
    id: 'panama-boquete',
    name: 'Volcán Barú Estate Gesha',
    region: 'Boquete Valley, Chiriquí, Panama',
    elevation: '1,920m',
    varietal: 'Green-Tip Gesha',
    process: 'Slow-Dry Natural in dark conditioning room',
    notes: ['White Peach', 'Orange Blossom', 'Lemongrass Honey'],
    story: 'Grown on rich volcanic loam nourished by the gentle mountain mist known as bajareque. Renowned worldwide for its tea-like lightness and intense floral aromatics.',
  },
];

export const OriginsSection: React.FC = () => {
  const [activeTerroirId, setActiveTerroirId] = useState(TERROIRS[0].id);

  const activeTerroir = TERROIRS.find((t) => t.id === activeTerroirId) || TERROIRS[0];

  return (
    <section id="origins" className="py-16 sm:py-20 bg-[#FBF9F5] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8DFC8]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
              Direct Trade Ethos
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B140E] mt-1">
              Terroirs & Farm Partnerships
            </h2>
            <p className="text-sm text-[#705C4D] mt-2 max-w-xl">
              We pay an average of 140% above fair-trade floor price directly to our estate partners, fostering regenerative soil practices and pristine bean quality.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#705C4D]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C57D3C]" />
              <span>100% Traceable Lots</span>
            </div>
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#10B981]" />
              <span>Shade Grown</span>
            </div>
          </div>
        </div>

        {/* Content Showcase */}
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Origin Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Terroir Selection Tabs */}
            <div className="flex items-center gap-2 p-1 bg-[#EFE8DD] rounded-xl overflow-x-auto">
              {TERROIRS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTerroirId(t.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTerroirId === t.id
                      ? 'bg-[#1B140E] text-white shadow-xs'
                      : 'text-[#614F40] hover:text-[#1B140E]'
                  }`}
                >
                  {t.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active Terroir Detail Card */}
            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8A5A30] font-medium">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{activeTerroir.region}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1B140E] mt-1">
                  {activeTerroir.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-[#E8DFC8] text-xs">
                <div>
                  <span className="text-[#8C7A6D]">Elevation</span>
                  <p className="font-semibold text-[#1B140E] font-mono">{activeTerroir.elevation}</p>
                </div>
                <div>
                  <span className="text-[#8C7A6D]">Varietal</span>
                  <p className="font-semibold text-[#1B140E] truncate">{activeTerroir.varietal}</p>
                </div>
                <div>
                  <span className="text-[#8C7A6D]">Fermentation</span>
                  <p className="font-semibold text-[#1B140E] truncate">{activeTerroir.process.split(',')[0]}</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <span className="text-xs text-[#8C7A6D]">Cupping Tasting Profile:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {activeTerroir.notes.map((n, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium text-[#734A25] bg-[#EFE8DD] rounded-md"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#665243] leading-relaxed">
                {activeTerroir.story}
              </p>
            </div>

          </div>

          {/* Right: Tactile Visual of Roasting & Beans */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E8DFC8] bg-[#EFE8DD] aspect-[4/3] group">
              <img
                src={beansImg}
                alt="Freshly roasted specialty coffee beans and brass scoop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#D9CEBF]">
                  Roast Lab Standard
                </span>
                <h4 className="text-base font-serif font-bold text-white mt-0.5">
                  15kg Cast-Iron Drum Profiling
                </h4>
                <p className="text-xs text-[#D9CEBF] mt-1">
                  Every roast curvature is logged via infrared probe thermocouples to pinpoint bean development time within ±2 seconds.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
