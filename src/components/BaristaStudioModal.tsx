import React, { useState } from 'react';
import { CoffeeItem, CustomDrinkOptions } from '../types/coffee';
import { BEAN_OPTIONS, MILK_OPTIONS, SYRUP_OPTIONS } from '../data/coffeeMenu';
import { X, Flame, Snowflake, Check, Sparkles } from 'lucide-react';

interface BaristaStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseItem?: CoffeeItem | null;
  onAddCustomizedDrink: (item: CoffeeItem, options: CustomDrinkOptions, finalPrice: number) => void;
}

export const BaristaStudioModal: React.FC<BaristaStudioModalProps> = ({
  isOpen,
  onClose,
  baseItem,
  onAddCustomizedDrink,
}) => {
  // Base item fallback
  const itemToUse = baseItem || {
    id: 'custom-artisan-craft',
    name: 'Custom Barista Craft Drink',
    category: 'espresso' as const,
    price: 5.50,
    description: 'Custom handcrafted specialty drink configured by you.',
    tastingNotes: ['Artisanal Custom Roast'],
    supportsCustomization: true,
  };

  const [size, setSize] = useState<'cortado' | 'standard' | 'large'>('standard');
  const [selectedBeanId, setSelectedBeanId] = useState('ethiopia');
  const [shots, setShots] = useState(2);
  const [selectedMilkId, setSelectedMilkId] = useState('oat');
  const [temperature, setTemperature] = useState<'hot' | 'iced'>('hot');
  const [selectedSyrupId, setSelectedSyrupId] = useState('none');
  const [sweetnessLevel, setSweetnessLevel] = useState('Standard Sweet');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen) return null;

  const currentBean = BEAN_OPTIONS.find((b) => b.id === selectedBeanId) || BEAN_OPTIONS[0];
  const currentMilk = MILK_OPTIONS.find((m) => m.id === selectedMilkId) || MILK_OPTIONS[0];
  const currentSyrup = SYRUP_OPTIONS.find((s) => s.id === selectedSyrupId) || SYRUP_OPTIONS[0];

  // Pricing math
  const sizeSurcharge = size === 'cortado' ? -0.50 : size === 'large' ? 1.00 : 0;
  const shotSurcharge = Math.max(0, shots - 2) * 1.25;
  const beanSurcharge = currentBean.surcharge;
  const milkSurcharge = currentMilk.surcharge;
  const syrupSurcharge = currentSyrup.surcharge;

  const calculatedPrice = Math.max(
    3.50,
    itemToUse.price + sizeSurcharge + shotSurcharge + beanSurcharge + milkSurcharge + syrupSurcharge
  );

  const handleAddToCart = () => {
    const customOptions: CustomDrinkOptions = {
      size,
      bean: currentBean.name,
      shots,
      milk: currentMilk.name,
      temperature,
      sweetness: selectedSyrupId === 'none' ? 'Unsweetened' : sweetnessLevel,
      syrup: currentSyrup.name,
      specialInstructions: specialInstructions.trim() || undefined,
    };

    onAddCustomizedDrink(itemToUse, customOptions, calculatedPrice);
    onClose();
  };

  // Color simulation for the interactive cup preview
  const getMilkLayerColor = () => {
    if (selectedMilkId === 'none') return 'transparent';
    if (selectedMilkId === 'oat') return '#EADDCB';
    if (selectedMilkId === 'almond') return '#F1E8DC';
    if (selectedMilkId === 'macadamia') return '#E8D8C3';
    return '#F9F5EC'; // Whole milk
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#FBF9F5] rounded-2xl border border-[#E8DFC8] shadow-2xl overflow-hidden flex flex-col my-8 max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E8DFC8] bg-[#F5EFEB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C57D3C]" />
            <h2 className="text-lg font-serif font-bold text-[#1B140E]">
              Barista Studio · {itemToUse.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B5748] hover:text-[#1B140E] hover:bg-[#EAE0D2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Interactive Visual Cup Simulator & Specs */}
          <div className="lg:col-span-5 flex flex-col items-center justify-between bg-[#F5EFEB] p-6 rounded-xl border border-[#E8DFC8]">
            <div className="w-full text-center mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
                Live Cup Architecture
              </span>
              <p className="text-xs text-[#7A6655] mt-0.5">
                {size === 'cortado' ? '8oz Gibraltar Glass' : size === 'standard' ? '12oz Ceramic Tumbler' : '16oz Big Barista Cup'}
              </p>
            </div>

            {/* Simulated Interactive Drink Cup Container */}
            <div className="relative w-44 h-60 my-4 flex items-end justify-center">
              {/* Cup Shell */}
              <div 
                className={`relative w-full transition-all duration-300 rounded-b-3xl border-4 border-[#291D15] overflow-hidden flex flex-col justify-end shadow-inner bg-[#2A1D16] ${
                  size === 'cortado' ? 'h-40' : size === 'standard' ? 'h-52' : 'h-60'
                }`}
              >
                {/* Microfoam / Latte Art Top Cap */}
                {selectedMilkId !== 'none' && (
                  <div 
                    className="w-full h-8 flex items-center justify-center border-b border-[#D5C2AC]/50 z-20"
                    style={{ backgroundColor: getMilkLayerColor() }}
                  >
                    {/* Swan / Rosette Latte Art SVG */}
                    <svg className="w-6 h-6 text-[#9A6233]/70" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C9 5 7 8 7 12c0 2.8 2.2 5 5 5s5-2.2 5-5c0-4-2-7-5-10zm0 18c-3.9 0-7-3.1-7-7 0-3 2-6 7-11 5 5 7 8 7 11 0 3.9-3.1 7-7 7z" />
                    </svg>
                  </div>
                )}

                {/* Milk Steamed Body Layer */}
                {selectedMilkId !== 'none' && (
                  <div 
                    className="w-full flex-1 transition-all duration-500 z-10 flex items-center justify-center opacity-95"
                    style={{ backgroundColor: getMilkLayerColor() }}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#735233]">
                      {currentMilk.name.split(' ')[0]}
                    </span>
                  </div>
                )}

                {/* Espresso Shot Base Layer */}
                <div 
                  className="w-full bg-[#1A0E08] transition-all duration-500 flex items-center justify-center border-t border-[#3D2517]"
                  style={{ height: `${Math.min(100, shots * 24)}px` }}
                >
                  <span className="text-[10px] font-mono text-[#D4986A] tracking-wider">
                    {shots}× Espresso {shots > 1 ? 'Shots' : 'Shot'}
                  </span>
                </div>

                {/* Iced floating ice cube representations if iced */}
                {temperature === 'iced' && (
                  <div className="absolute inset-0 pointer-events-none flex flex-wrap gap-2 p-3 items-center justify-center z-15">
                    <div className="w-7 h-7 rounded bg-white/40 backdrop-blur-xs border border-white/60 shadow-xs rotate-6 animate-pulse" />
                    <div className="w-6 h-6 rounded bg-white/35 backdrop-blur-xs border border-white/60 shadow-xs -rotate-12" />
                    <div className="w-7 h-7 rounded bg-white/40 backdrop-blur-xs border border-white/60 shadow-xs rotate-45" />
                  </div>
                )}
              </div>

              {/* Cup handle for standard ceramic */}
              {size === 'standard' && (
                <div className="absolute -right-5 bottom-12 w-6 h-20 border-4 border-l-0 border-[#291D15] rounded-r-2xl" />
              )}
            </div>

            {/* Real-time sensory summary card */}
            <div className="w-full bg-[#FAF7F2] p-3.5 rounded-lg border border-[#E8DFC8] space-y-1.5 text-xs text-[#5C4A3C]">
              <div className="flex justify-between">
                <span className="text-[#8C7A6D]">Extracted Temp:</span>
                <span className="font-semibold text-[#1B140E]">
                  {temperature === 'hot' ? '68°C Steamed Velvet' : '4°C Over Cold Rock'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7A6D]">Terroir:</span>
                <span className="font-semibold text-[#1B140E]">{currentBean.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7A6D]">Caffeine & Intensity:</span>
                <span className="font-semibold text-[#1B140E]">
                  {selectedBeanId === 'decaf' ? 'Decaf (<2mg)' : `${shots * 65}mg Est.`}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Size Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-2">
                1. Cup Size
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'cortado', label: '8oz Cortado', sub: '-$0.50' },
                  { id: 'standard', label: '12oz Standard', sub: 'Standard' },
                  { id: 'large', label: '16oz Large', sub: '+$1.00' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id as any)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      size === s.id
                        ? 'border-[#1B140E] bg-[#1B140E] text-[#FBF9F5]'
                        : 'border-[#DDD0BC] bg-[#FAF7F2] text-[#1B140E] hover:border-[#8A5A30]'
                    }`}
                  >
                    <p className="text-xs font-bold">{s.label}</p>
                    <p className={`text-[11px] mt-0.5 ${size === s.id ? 'text-[#D9CEBF]' : 'text-[#8C7A6D]'}`}>
                      {s.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Temperature Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-2">
                2. Temperature Profile
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTemperature('hot')}
                  className={`p-3 rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    temperature === 'hot'
                      ? 'border-[#C57D3C] bg-[#F6EDE2] text-[#8A5A30] font-semibold'
                      : 'border-[#DDD0BC] bg-[#FAF7F2] text-[#614F40]'
                  }`}
                >
                  <Flame className="w-4 h-4 text-[#C57D3C]" />
                  <span className="text-xs">Steamed Hot (68°C)</span>
                </button>
                <button
                  onClick={() => setTemperature('iced')}
                  className={`p-3 rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    temperature === 'iced'
                      ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8] font-semibold'
                      : 'border-[#DDD0BC] bg-[#FAF7F2] text-[#614F40]'
                  }`}
                >
                  <Snowflake className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-xs">Iced (Craft Ice Block)</span>
                </button>
              </div>
            </div>

            {/* 3. Espresso Shots */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
                  3. Espresso Concentration
                </label>
                <span className="text-xs text-[#8C7A6D]">
                  {shots === 2 ? 'Recommended double' : shots > 2 ? `+${(shots - 2) * 1.25}$` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => setShots(count)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      shots === count
                        ? 'border-[#1B140E] bg-[#1B140E] text-white'
                        : 'border-[#DDD0BC] bg-[#FAF7F2] text-[#1B140E] hover:border-[#8A5A30]'
                    }`}
                  >
                    {count} {count === 1 ? 'Shot' : 'Shots'}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Single-Origin Bean Variety */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-2">
                4. Single-Origin Roastery Bean
              </label>
              <div className="space-y-2">
                {BEAN_OPTIONS.map((bean) => (
                  <div
                    key={bean.id}
                    onClick={() => setSelectedBeanId(bean.id)}
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      selectedBeanId === bean.id
                        ? 'border-[#8A5A30] bg-[#F7F1E8]'
                        : 'border-[#DDD0BC] bg-[#FAF7F2] hover:border-[#C4B7A5]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#1B140E]">{bean.name}</p>
                      <p className="text-[11px] text-[#705C4D]">{bean.desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {bean.surcharge > 0 && (
                        <span className="font-mono text-xs font-semibold text-[#8A5A30] tabular-nums">
                          +${bean.surcharge.toFixed(2)}
                        </span>
                      )}
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedBeanId === bean.id
                            ? 'border-[#8A5A30] bg-[#8A5A30] text-white'
                            : 'border-[#C4B7A5]'
                        }`}
                      >
                        {selectedBeanId === bean.id && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Milk & Alternative Dairy */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-2">
                5. Milk & Plant Microfoam
              </label>
              <div className="space-y-2">
                {MILK_OPTIONS.map((milk) => (
                  <div
                    key={milk.id}
                    onClick={() => setSelectedMilkId(milk.id)}
                    className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      selectedMilkId === milk.id
                        ? 'border-[#8A5A30] bg-[#F7F1E8]'
                        : 'border-[#DDD0BC] bg-[#FAF7F2] hover:border-[#C4B7A5]'
                    }`}
                  >
                    <span className="text-xs font-medium text-[#1B140E]">{milk.name}</span>
                    <div className="flex items-center gap-2">
                      {milk.surcharge > 0 && (
                        <span className="font-mono text-xs font-semibold text-[#8A5A30] tabular-nums">
                          +${milk.surcharge.toFixed(2)}
                        </span>
                      )}
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedMilkId === milk.id
                            ? 'border-[#8A5A30] bg-[#8A5A30] text-white'
                            : 'border-[#C4B7A5]'
                        }`}
                      >
                        {selectedMilkId === milk.id && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Artisanal Syrups */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-2">
                6. Small-Batch Flavors & Syrups
              </label>
              <select
                value={selectedSyrupId}
                onChange={(e) => setSelectedSyrupId(e.target.value)}
                className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-[#1B140E] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
              >
                {SYRUP_OPTIONS.map((syrup) => (
                  <option key={syrup.id} value={syrup.id}>
                    {syrup.name} {syrup.surcharge > 0 ? `(+$${syrup.surcharge.toFixed(2)})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Barista Instructions */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-1.5">
                Special Barista Requests
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra hot 72°C, half-sweet, or dry foam..."
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
              />
            </div>

          </div>

        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 sm:p-6 bg-[#F5EFEB] border-t border-[#E8DFC8] flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#705C4D]">Custom Brew Total:</span>
            <div className="font-mono text-2xl font-bold text-[#1B140E] tabular-nums">
              ${calculatedPrice.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-[#574436] hover:text-[#1B140E] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1B140E] hover:bg-[#2D2117] rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C57D3C]" />
              <span>Add Custom Brew to Order</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
