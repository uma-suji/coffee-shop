import React, { useState, useEffect } from 'react';
import { CoffeeItem, CartItem, CustomDrinkOptions, Order } from './types/coffee';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { BaristaStudioModal } from './components/BaristaStudioModal';
import { BrewCalculator } from './components/BrewCalculator';
import { TastingFlightBooking } from './components/TastingFlightBooking';
import { LoyaltyStamps } from './components/LoyaltyStamps';
import { OriginsSection } from './components/OriginsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

const CART_STORAGE_KEY = 'atelier_coffee_cart';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerBaseItem, setCustomizerBaseItem] = useState<CoffeeItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Quick Add Standard Item
  const handleAddToCart = (item: CoffeeItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (ci) => ci.item.id === item.id && !ci.customization
      );
      if (existing) {
        return prev.map((ci) =>
          ci.cartItemId === existing.cartItemId
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartItemId: `${item.id}-${Date.now()}`,
          item,
          quantity: 1,
          unitPrice: item.price,
        },
      ];
    });

    showToast(`Added ${item.name} to order`);
  };

  // Open Customizer for a specific item
  const handleOpenCustomize = (item: CoffeeItem) => {
    setCustomizerBaseItem(item);
    setIsCustomizerOpen(true);
  };

  // Add customized drink from Barista Studio
  const handleAddCustomizedDrink = (
    item: CoffeeItem,
    customOptions: CustomDrinkOptions,
    finalPrice: number
  ) => {
    const newItem: CartItem = {
      cartItemId: `custom-${item.id}-${Date.now()}`,
      item,
      quantity: 1,
      customization: customOptions,
      unitPrice: finalPrice,
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Crafted ${item.name} added to order`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.cartItemId === cartItemId ? { ...ci, quantity: newQty } : ci))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    // Clear cart
    setCartItems([]);
    setAppliedPromoCode('');

    // Increment loyalty stamps
    try {
      const currentStamps = parseInt(localStorage.getItem('atelier_coffee_loyalty_stamps') || '4', 10);
      const nextStamps = Math.min(8, currentStamps + 1);
      localStorage.setItem('atelier_coffee_loyalty_stamps', nextStamps.toString());
    } catch {
      // ignore
    }
  };

  const cartTotal = cartItems.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#241D18]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B140E] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#3D2E22] flex items-center gap-2 text-xs font-medium animate-fade-in">
          <Check className="w-4 h-4 text-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract Compliant Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomizer={() => {
          setCustomizerBaseItem(null);
          setIsCustomizerOpen(true);
        }}
        activeSection="menu"
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => {
            const menuEl = document.getElementById('menu');
            menuEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCustomizer={() => {
            setCustomizerBaseItem(null);
            setIsCustomizerOpen(true);
          }}
        />

        {/* Curated Roastery Menu */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onCustomizeItem={handleOpenCustomize}
        />

        {/* Origins & Direct Trade Sourcing */}
        <OriginsSection />

        {/* Coffee Dial-In Calculator & Live Stopwatch */}
        <BrewCalculator />

        {/* Table & Tasting Flight Reservation */}
        <TastingFlightBooking />

        {/* Roastery Passport / Stamp Card */}
        <LoyaltyStamps
          onApplyPromoCode={(code) => {
            setAppliedPromoCode(code);
            showToast(`Promo code ${code} applied to your cart!`);
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Barista Studio Customizer Modal */}
      <BaristaStudioModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        baseItem={customizerBaseItem}
        onAddCustomizedDrink={handleAddCustomizedDrink}
      />

      {/* Slide-Over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        appliedPromoCode={appliedPromoCode}
        onApplyPromoCode={(code) => {
          setAppliedPromoCode(code);
          showToast(`Promo code ${code} applied!`);
        }}
        onRemovePromoCode={() => setAppliedPromoCode('')}
      />

      {/* Checkout Modal & Live Order Tracker */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromoCode={appliedPromoCode}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
