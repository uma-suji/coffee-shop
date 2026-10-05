import React, { useState } from 'react';
import { CartItem } from '../types/coffee';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromoCode: string;
  onApplyPromoCode: (code: string) => void;
  onRemovePromoCode: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromoCode,
  onApplyPromoCode,
  onRemovePromoCode,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Discount logic
  let discountAmount = 0;
  if (appliedPromoCode === 'ATELIER10') {
    discountAmount = subtotal * 0.10;
  } else if (appliedPromoCode === 'FRESHPOUR') {
    discountAmount = Math.min(subtotal, 7.50);
  }

  const tax = (subtotal - discountAmount) * 0.0825; // 8.25% sales tax
  const estimatedTotal = Math.max(0, subtotal - discountAmount + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'ATELIER10' || clean === 'FRESHPOUR' || clean === 'ROAST10') {
      onApplyPromoCode(clean === 'ROAST10' ? 'ATELIER10' : clean);
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try ATELIER10 or FRESHPOUR');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-[#FBF9F5] h-full shadow-2xl flex flex-col border-l border-[#E8DFC8]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC8] bg-[#F5EFEB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-serif font-bold text-[#1B140E]">
              Your Roastery Order
            </h2>
            <span className="font-mono text-xs text-[#8A5A30] font-semibold">
              ({items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B5748] hover:text-[#1B140E] hover:bg-[#EAE0D2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EFE8DD] flex items-center justify-center text-[#9E8B7A]">
                <Sparkles className="w-8 h-8 text-[#C57D3C]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#1B140E]">
                Your bag is currently empty
              </h3>
              <p className="text-xs text-[#7A6655] max-w-xs">
                Explore our curated single-origin roasts, pour-overs, or build a custom drink in the Barista Studio.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 text-xs font-semibold text-white bg-[#1B140E] rounded-lg hover:bg-[#2D2117] cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((cartItem) => (
              <div
                key={cartItem.cartItemId}
                className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2.5 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#1B140E] leading-tight">
                      {cartItem.item.name}
                    </h4>
                    
                    {/* Customization Details */}
                    {cartItem.customization && (
                      <div className="mt-1 text-[11px] text-[#7A6655] space-y-0.5 font-mono">
                        <p>
                          {cartItem.customization.size.toUpperCase()} · {cartItem.customization.temperature.toUpperCase()}
                        </p>
                        <p>
                          {cartItem.customization.shots}× Espresso · {cartItem.customization.milk}
                        </p>
                        <p className="text-[#8A5A30]">
                          Bean: {cartItem.customization.bean}
                        </p>
                        {cartItem.customization.syrup !== 'No Syrup (Unsweetened)' && (
                          <p>Syrup: {cartItem.customization.syrup}</p>
                        )}
                        {cartItem.customization.specialInstructions && (
                          <p className="italic text-[#8C7A6D]">
                            "{cartItem.customization.specialInstructions}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="font-mono text-sm font-bold text-[#1B140E] tabular-nums whitespace-nowrap">
                    ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Quantity Stepper & Remove */}
                <div className="flex items-center justify-between pt-2 border-t border-[#EFE8DD]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                      className="w-6 h-6 rounded bg-[#EFE8DD] hover:bg-[#E5DBCB] flex items-center justify-center text-[#574436] cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs font-semibold text-[#1B140E] min-w-5 text-center tabular-nums">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                      className="w-6 h-6 rounded bg-[#EFE8DD] hover:bg-[#E5DBCB] flex items-center justify-center text-[#574436] cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(cartItem.cartItemId)}
                    className="text-[11px] text-[#A89887] hover:text-[#B91C1C] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 bg-[#F5EFEB] border-t border-[#E8DFC8] space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedPromoCode ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF7F2] border border-[#10B981]/40 text-xs">
                  <div className="flex items-center gap-1.5 text-[#047857] font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Promo Applied: {appliedPromoCode}</span>
                  </div>
                  <button
                    onClick={onRemovePromoCode}
                    className="text-xs text-[#8C7A6D] hover:text-[#B91C1C] cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="Promo code (e.g. ATELIER10)"
                    className="flex-1 px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-[#1B140E] uppercase placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold bg-[#EFE8DD] text-[#1B140E] rounded-lg hover:bg-[#E5DBCB] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-[#B91C1C] mt-1">{promoError}</p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#6B5748]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-[#1B140E] tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#047857]">
                  <span>Discount ({appliedPromoCode})</span>
                  <span className="font-mono font-semibold tabular-nums">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8.25%)</span>
                <span className="font-mono font-medium text-[#1B140E] tabular-nums">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="pt-2 border-t border-[#DDD0BC] flex justify-between text-base">
                <span className="font-serif font-bold text-[#1B140E]">Estimated Total</span>
                <span className="font-mono font-bold text-[#1B140E] tabular-nums">
                  ${estimatedTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3 text-xs sm:text-sm font-semibold text-white bg-[#1B140E] hover:bg-[#2D2117] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
