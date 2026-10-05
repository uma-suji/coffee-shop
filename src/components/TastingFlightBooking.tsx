import React, { useState } from 'react';
import { TableBooking } from '../types/coffee';
import { Calendar, Users, Clock, CheckCircle2, Sparkles, X } from 'lucide-react';

const FLIGHT_PACKAGES = [
  {
    id: 'terroir-flight',
    title: 'Single-Origin Terroir Flight',
    duration: '35 mins',
    pricePerPerson: 18,
    description: 'Compare three rare lots: Ethiopia Yirgacheffe, Colombia Pink Bourbon, and Kenya Nyeri side-by-side in custom sensory glassware.',
  },
  {
    id: 'extraction-spectrum',
    title: 'Espresso Extraction Spectrum',
    duration: '30 mins',
    pricePerPerson: 15,
    description: 'Taste the anatomy of a coffee shot: Ristretto, Normale, and Long Extraction of our seasonal Gesha reserve bean.',
  },
  {
    id: 'cupping-masterclass',
    title: 'Barista Sensory Cupping Session',
    duration: '50 mins',
    pricePerPerson: 32,
    description: 'Official SCA score-sheet cupping with our Head Roaster. Learn to detect fragrance, aroma, acidity, and mouthfeel nuances.',
  },
];

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '1:30 PM', '3:00 PM', '4:30 PM'];

export const TastingFlightBooking: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState(FLIGHT_PACKAGES[0].id);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  const activePkg = FLIGHT_PACKAGES.find((p) => p.id === selectedPackage) || FLIGHT_PACKAGES[0];
  const totalPrice = activePkg.pricePerPerson * guests;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const booking: TableBooking = {
      id: 'book-' + Date.now(),
      bookingCode: `AR-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email: email || 'guest@atelierroast.com',
      phone,
      date,
      timeSlot,
      guests,
      experience: selectedPackage as any,
      specialRequests: specialRequests.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(booking);
  };

  return (
    <section id="tasting-flights" className="py-16 sm:py-20 bg-[#FBF9F5] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
            The Slow Bar Counter Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B140E] mt-1">
            Reserve a Coffee Tasting Flight
          </h2>
          <p className="text-sm text-[#705C4D] mt-2">
            Sit at our polished white oak slow bar counter and let our baristas guide you through curated origins, extraction differences, and cupping notes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Select Flight Package */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8A5A30] mb-2">
              Select Flight Experience
            </h3>
            {FLIGHT_PACKAGES.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#1B140E] bg-[#F5EFEB] shadow-xs'
                      : 'border-[#E8DFC8] bg-[#FAF7F2] hover:border-[#C4B7A5]'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-base font-serif font-bold text-[#1B140E]">
                      {pkg.title}
                    </h4>
                    <span className="font-mono text-base font-semibold text-[#8A5A30] tabular-nums">
                      ${pkg.pricePerPerson} <span className="text-xs font-sans text-[#8C7A6D]">/ guest</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8A5A30] mt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {pkg.duration}
                    </span>
                    <span aria-hidden="true" className="text-[#C4B7A5]">·</span>
                    <span>Slow Bar Counter Seating</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#665243] mt-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
              );
            })}

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] flex items-center gap-3 text-xs text-[#705C4D]">
              <Sparkles className="w-4 h-4 text-[#C57D3C] shrink-0" />
              <span>Complimentary artisan palate cleanser (sparkling water & toasted brioche crisps) included with every flight.</span>
            </div>
          </div>

          {/* Right Column: Reservation Details Form */}
          <div className="lg:col-span-6 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DFC8]">
            <h3 className="text-lg font-serif font-bold text-[#1B140E] mb-4">
              Slow Bar Seating Details
            </h3>

            <form onSubmit={handleBook} className="space-y-4">
              
              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F5EFEB] border border-[#DDD0BC] rounded-lg text-[#1B140E] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Guests</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F5EFEB] border border-[#DDD0BC] rounded-lg text-[#1B140E] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'} (Counter Seats)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Available Counter Times</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer text-center ${
                        timeSlot === slot
                          ? 'border-[#1B140E] bg-[#1B140E] text-white'
                          : 'border-[#DDD0BC] bg-[#F5EFEB] text-[#5C4A3C] hover:border-[#8A5A30]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3 py-2 text-xs bg-[#F5EFEB] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. (415) 890-2134"
                    className="w-full px-3 py-2 text-xs bg-[#F5EFEB] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-1.5">
                  Email (for booking confirmation)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full px-3 py-2 text-xs bg-[#F5EFEB] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-1.5">
                  Special Notes or Palate Preferences (Optional)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Celebrating an anniversary, low caffeine tolerance..."
                  className="w-full px-3 py-2 text-xs bg-[#F5EFEB] border border-[#DDD0BC] rounded-lg text-[#1B140E] placeholder-[#8C7A6D] focus:outline-none focus:ring-1 focus:ring-[#C57D3C]"
                />
              </div>

              {/* Price & Submit */}
              <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#8C7A6D]">Experience Total ({guests} guests):</p>
                  <p className="font-mono text-xl font-bold text-[#1B140E] tabular-nums">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1B140E] hover:bg-[#2D2117] rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Reserve Flight
                </button>
              </div>

            </form>
          </div>

        </div>

        {/* Confirmation Modal */}
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FAF7F2] max-w-md w-full rounded-2xl border border-[#E8DFC8] shadow-2xl p-6 sm:p-8 relative">
              <button
                onClick={() => setConfirmedBooking(null)}
                className="absolute top-4 right-4 p-1 text-[#8C7A6D] hover:text-[#1B140E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto mb-3" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
                  Booking Confirmed
                </span>
                <h3 className="text-xl font-serif font-bold text-[#1B140E] mt-1">
                  We look forward to hosting you, {confirmedBooking.name}!
                </h3>
                <p className="text-xs text-[#705C4D] mt-1">
                  Your seat at the Slow Bar Counter is reserved.
                </p>
              </div>

              <div className="my-6 p-4 rounded-xl bg-[#F5EFEB] border border-[#E8DFC8] space-y-2 text-xs text-[#574436]">
                <div className="flex justify-between border-b border-[#E8DFC8] pb-2">
                  <span className="text-[#8C7A6D]">Confirmation Code:</span>
                  <span className="font-mono font-bold text-[#1B140E] text-sm">
                    {confirmedBooking.bookingCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A6D]">Experience:</span>
                  <span className="font-semibold text-[#1B140E]">{activePkg.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A6D]">Date & Time:</span>
                  <span className="font-semibold text-[#1B140E]">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A6D]">Party Size:</span>
                  <span className="font-semibold text-[#1B140E]">
                    {confirmedBooking.guests} {confirmedBooking.guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A6D]">Location:</span>
                  <span className="font-semibold text-[#1B140E]">
                    Atelier Slow Bar (482 Mill Street)
                  </span>
                </div>
              </div>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#1B140E] hover:bg-[#2D2117] rounded-xl transition-all cursor-pointer"
              >
                Close & Return to Menu
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
