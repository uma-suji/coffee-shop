import React, { useState, useEffect } from 'react';
import { CartItem, Order, OrderStatus } from '../types/coffee';
import { X, CheckCircle2, Clock, MapPin, Coffee, CreditCard, Sparkles, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromoCode: string;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromoCode,
  onOrderSuccess,
}) => {
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'cash'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active placed order state
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  let discountAmount = 0;
  if (appliedPromoCode === 'ATELIER10') {
    discountAmount = subtotal * 0.10;
  } else if (appliedPromoCode === 'FRESHPOUR') {
    discountAmount = Math.min(subtotal, 7.50);
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.0825;
  const deliveryFee = fulfillment === 'delivery' ? 4.50 : 0;

  const tipAmount = customTip !== ''
    ? Math.max(0, parseFloat(customTip) || 0)
    : (taxableAmount * tipPercent) / 100;

  const total = Math.max(0, taxableAmount + tax + deliveryFee + tipAmount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    if (fulfillment === 'delivery' && !address) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `AR-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: 'order-' + Date.now(),
        orderNumber,
        items,
        subtotal,
        discount: discountAmount,
        tip: tipAmount,
        tax,
        total,
        fulfillment,
        customerName: name,
        customerPhone: phone,
        customerEmail: email || undefined,
        deliveryAddress: fulfillment === 'delivery' ? address : undefined,
        pickupTime: '15-20 mins',
        status: 'received',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notes: notes || undefined,
      };

      setIsSubmitting(false);
      setActiveOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl border border-[#E8DFC8] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#F5EFEB] border-b border-[#E8DFC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#C57D3C]" />
            <h2 className="text-lg font-serif font-bold text-[#1B140E]">
              {activeOrder ? 'Live Order Status' : 'Roastery Pickup & Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B5748] hover:text-[#1B140E] hover:bg-[#EAE0D2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {activeOrder ? (
          <LiveOrderTracker order={activeOrder} onClose={onClose} />
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            
            {/* Fulfillment Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-2">
                Fulfillment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillment('pickup')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    fulfillment === 'pickup'
                      ? 'border-[#1B140E] bg-[#1B140E] text-white shadow-xs'
                      : 'border-[#DDD0BC] bg-[#FAF7F2] text-[#1B140E] hover:border-[#8A5A30]'
                  }`}
                >
                  <p className="text-xs font-bold flex items-center gap-1.5">
                    <Coffee className="w-4 h-4" />
                    <span>Counter Pickup</span>
                  </p>
                  <p className={`text-[11px] mt-1 ${fulfillment === 'pickup' ? 'text-[#D9CEBF]' : 'text-[#8C7A6D]'}`}>
                    Ready in 15 mins · Free
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillment('delivery')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    fulfillment === 'delivery'
                      ? 'border-[#1B140E] bg-[#1B140E] text-white shadow-xs'
                      : 'border-[#DDD0BC] bg-[#FAF7F2] text-[#1B140E] hover:border-[#8A5A30]'
                  }`}
                >
                  <p className="text-xs font-bold flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>Local Courier Delivery</span>
                  </p>
                  <p className={`text-[11px] mt-1 ${fulfillment === 'delivery' ? 'text-[#D9CEBF]' : 'text-[#8C7A6D]'}`}>
                    Within 5 miles · $4.50
                  </p>
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
                Customer Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#7A6655] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Liam Scott"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#7A6655] mb-1">
                    Mobile Phone (for pickup SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 234-5678"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                  />
                </div>
              </div>

              {fulfillment === 'delivery' && (
                <div>
                  <label className="block text-[11px] text-[#7A6655] mb-1">
                    Delivery Street Address & Unit *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="742 Evergreen Terrace, Apt 3B"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] text-[#7A6655] mb-1">
                  Barista Note (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Leave beans whole or grind for V60; package pasty separately"
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                />
              </div>
            </div>

            {/* Barista Tip Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
                  Barista Team Tip
                </label>
                <span className="font-mono text-xs text-[#8A5A30] font-semibold tabular-nums">
                  ${tipAmount.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[15, 18, 20].map((pct) => (
                  <button
                    type="button"
                    key={pct}
                    onClick={() => {
                      setTipPercent(pct);
                      setCustomTip('');
                    }}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      tipPercent === pct && customTip === ''
                        ? 'border-[#1B140E] bg-[#1B140E] text-white'
                        : 'border-[#DDD0BC] bg-[#FAF7F2] text-[#5C4A3C] hover:border-[#8A5A30]'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setTipPercent(0);
                    setCustomTip('0');
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    customTip === '0'
                      ? 'border-[#1B140E] bg-[#1B140E] text-white'
                      : 'border-[#DDD0BC] bg-[#FAF7F2] text-[#5C4A3C] hover:border-[#8A5A30]'
                  }`}
                >
                  No Tip
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-2">
                Payment Option
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'apple-pay', label: 'Apple / Pay', icon: Sparkles },
                  { id: 'cash', label: 'Pay at Counter', icon: Coffee },
                ].map((pm) => (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'border-[#8A5A30] bg-[#F7F1E8] text-[#8A5A30] font-bold'
                        : 'border-[#DDD0BC] bg-[#FAF7F2] text-[#5C4A3C]'
                    }`}
                  >
                    <pm.icon className="w-3.5 h-3.5" />
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Final Order Price Breakdown */}
            <div className="p-4 bg-[#F5EFEB] rounded-xl border border-[#E8DFC8] space-y-2 text-xs text-[#6B5748]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#047857]">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {fulfillment === 'delivery' && (
                <div className="flex justify-between">
                  <span>Courier Delivery Fee</span>
                  <span className="font-mono tabular-nums">${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Barista Tip</span>
                <span className="font-mono tabular-nums">${tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#DDD0BC] flex justify-between text-base font-bold text-[#1B140E]">
                <span>Total to Charge</span>
                <span className="font-mono text-xl tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#1B140E] hover:bg-[#2D2117] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting to Roastery Queue...</span>
                </>
              ) : (
                <>
                  <span>Place Order (${total.toFixed(2)})</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

interface LiveOrderTrackerProps {
  order: Order;
  onClose: () => void;
}

const ORDER_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: 'received', label: 'Order Received', desc: 'Sent to the Slow Bar queue' },
  { status: 'grinding', label: 'Precision Grinding', desc: 'Dosing micro-lot single origin beans' },
  { status: 'brewing', label: 'Extraction & Craft', desc: 'Pulling espresso & texturing microfoam' },
  { status: 'ready', label: 'Ready for Pickup', desc: 'Waiting at the Slow Bar pickup counter' },
];

const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({ order, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Simulate progress through the barista stages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < ORDER_STEPS.length - 1 ? prev + 1 : prev));
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Confirmation Banner */}
      <div className="text-center">
        <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto mb-2" />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
          Order Confirmed
        </span>
        <h3 className="text-2xl font-serif font-bold text-[#1B140E] mt-0.5">
          Order {order.orderNumber}
        </h3>
        <p className="text-xs text-[#705C4D] mt-1">
          Thank you, {order.customerName}! We're preparing your craft coffee now.
        </p>
      </div>

      {/* Live Stage Progress */}
      <div className="bg-[#F5EFEB] p-5 rounded-2xl border border-[#E8DFC8]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Live Kitchen Status</span>
          </span>
          <span className="font-mono text-xs font-bold text-[#1B140E]">
            Est. Ready in {Math.max(2, 12 - currentStepIndex * 3)} mins
          </span>
        </div>

        <div className="space-y-4">
          {ORDER_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={step.status} className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 transition-all ${
                    isCompleted
                      ? 'bg-[#10B981] text-white'
                      : isCurrent
                      ? 'bg-[#1B140E] text-white animate-pulse'
                      : 'bg-[#E5DBCB] text-[#8C7A6D]'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-xs font-bold ${
                      isCurrent ? 'text-[#1B140E]' : isCompleted ? 'text-[#10B981]' : 'text-[#8C7A6D]'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[11px] text-[#7A6655]">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Receipt Itemized Summary */}
      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2 text-xs">
        <h4 className="font-serif font-bold text-[#1B140E] border-b border-[#E8DFC8] pb-1.5">
          Receipt Breakdown
        </h4>
        {order.items.map((i) => (
          <div key={i.cartItemId} className="flex justify-between text-[#6B5748]">
            <span>
              {i.quantity}× {i.item.name}
            </span>
            <span className="font-mono tabular-nums">${(i.unitPrice * i.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="pt-2 border-t border-[#E8DFC8] flex justify-between font-bold text-[#1B140E]">
          <span>Total Paid</span>
          <span className="font-mono tabular-nums">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full py-3 text-xs font-semibold text-white bg-[#1B140E] hover:bg-[#2D2117] rounded-xl transition-all cursor-pointer"
      >
        Done & Keep Browsing
      </button>
    </div>
  );
};
