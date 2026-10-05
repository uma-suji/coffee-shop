import React, { useState, useEffect } from 'react';
import { Coffee, Award, Gift, Sparkles, Check } from 'lucide-react';

interface LoyaltyStampsProps {
  onApplyPromoCode: (code: string) => void;
}

const TOTAL_STAMPS = 8;
const STORAGE_KEY = 'atelier_coffee_loyalty_stamps';

export const LoyaltyStamps: React.FC<LoyaltyStampsProps> = ({ onApplyPromoCode }) => {
  const [stamps, setStamps] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? Math.min(TOTAL_STAMPS, Math.max(0, parseInt(saved, 10))) : 4;
    } catch {
      return 4;
    }
  });

  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, stamps.toString());
    } catch {
      // ignore
    }
  }, [stamps]);

  const handleAddStamp = () => {
    setStamps((prev) => (prev < TOTAL_STAMPS ? prev + 1 : prev));
  };

  const handleRedeem = () => {
    onApplyPromoCode('FRESHPOUR');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleReset = () => {
    setStamps(0);
  };

  return (
    <section id="loyalty" className="py-16 bg-[#F5EFEB] border-t border-[#E8DFC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFC8]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
                <Award className="w-4 h-4 text-[#C57D3C]" />
                <span>Atelier Roastery Passport</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1B140E] mt-1">
                Your Artisan Brew Stamp Card
              </h3>
              <p className="text-xs sm:text-sm text-[#705C4D] mt-1">
                Collect 8 stamps to unlock a complimentary reserve single-origin pour-over or drink of your choice.
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="font-mono text-2xl font-bold text-[#1B140E] tabular-nums">
                {stamps} / {TOTAL_STAMPS}
              </span>
              <p className="text-xs text-[#8C7A6D]">Stamps collected</p>
            </div>
          </div>

          {/* 8-Stamp Visual Grid */}
          <div className="py-8 grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {Array.from({ length: TOTAL_STAMPS }).map((_, idx) => {
              const isStamped = idx < stamps;
              const isLastReward = idx === TOTAL_STAMPS - 1;

              return (
                <div
                  key={idx}
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-2 text-center transition-all ${
                    isStamped
                      ? 'border-[#8A5A30] bg-[#F7F1E8] shadow-inner text-[#8A5A30]'
                      : 'border-dashed border-[#C4B7A5] bg-[#F5EFEB] text-[#A89887]'
                  }`}
                >
                  {isStamped ? (
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#8A5A30] text-white flex items-center justify-center shadow-xs">
                        <Coffee className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono mt-1 font-semibold text-[#8A5A30]">
                        #{idx + 1}
                      </span>
                    </div>
                  ) : isLastReward ? (
                    <div className="flex flex-col items-center">
                      <Gift className="w-5 h-5 text-[#C57D3C]" />
                      <span className="text-[9px] font-semibold text-[#C57D3C] mt-1">
                        FREE
                      </span>
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-[#A89887]">{idx + 1}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress & Actions */}
          <div className="pt-6 border-t border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#705C4D]">
              {stamps < TOTAL_STAMPS ? (
                <span>
                  {TOTAL_STAMPS - stamps} more {TOTAL_STAMPS - stamps === 1 ? 'stamp' : 'stamps'} until your free reserve coffee.
                </span>
              ) : (
                <span className="text-[#10B981] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Passport Complete! Reward code ready to redeem.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {stamps < TOTAL_STAMPS ? (
                <button
                  onClick={handleAddStamp}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#1B140E] bg-[#EFE8DD] hover:bg-[#E5DBCB] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Coffee className="w-3.5 h-3.5 text-[#8A5A30]" />
                  <span>Simulate Visit Stamp</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleRedeem}
                    className="flex-1 sm:flex-initial px-5 py-2 text-xs font-bold text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Code FRESHPOUR Applied!</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-3.5 h-3.5" />
                        <span>Apply Reward to Cart</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-3 py-2 text-xs text-[#8C7A6D] hover:text-[#1B140E] cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
