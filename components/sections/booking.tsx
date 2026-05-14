'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SCROLL_SECTIONS } from '@/lib/constants';

const WHATSAPP_BASE_URL = 'https://wa.me/918091416959';

const mapOptions = [
  { id: 'single', title: 'Single', pricePerPerson: 1700 },
  { id: 'double', title: 'Double', pricePerPerson: 1500 },
  { id: 'triple', title: 'Triple', pricePerPerson: 1300 },
  { id: 'quad', title: 'Quad', pricePerPerson: 1000 },
] as const;

const roomOptions = [
  { id: 'without-bathroom', title: 'Room without Bathroom', price: 1000 },
  { id: 'with-bathroom', title: 'Room with Bathroom', price: 2500 },
  { id: 'double-bed-with-bathroom', title: 'Room with Double Bed + Bathroom', price: 3500 },
] as const;

type PricingMode = 'map' | 'room-only';

type ValidationErrors = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  selection?: string;
};

function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  const date = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function calculateNights(checkIn: string, checkOut: string): number {
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);
  if (!start || !end) return 0;
  const diff = end.getTime() - start.getTime();
  if (diff <= 0) return 0;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateString: string): string {
  const date = parseDate(dateString);
  if (!date) return '--';
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

function validateBooking(checkIn: string, checkOut: string, guests: number, selectedOptionId: string | null): ValidationErrors {
  const errors: ValidationErrors = {};
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);

  if (!checkIn) errors.checkIn = 'Select your check-in date.';
  if (!checkOut) errors.checkOut = 'Select your check-out date.';
  if (checkIn && checkOut && (!start || !end || end <= start)) errors.checkOut = 'Check-out must be after check-in.';
  if (guests < 1) errors.guests = 'Select at least 1 guest.';
  if (guests > 18) errors.guests = 'Maximum guests allowed is 18.';
  if (!selectedOptionId) errors.selection = 'Please select an option.';

  return errors;
}

function buildWhatsAppMessage(
  checkIn: string,
  checkOut: string,
  nights: number,
  guests: number,
  pricingMode: PricingMode,
  selectedTitle: string,
  payableAmount: number,
): string {
  const modeLabel = pricingMode === 'map' ? 'MAP' : 'Rooms Only';

  return `Hi Yankit Homestay,

I would like to confirm my booking details:

Check-in: ${formatDate(checkIn)}
Check-out: ${formatDate(checkOut)}
Nights: ${nights}
Guests: ${guests}
Plan Type: ${modeLabel}
Selected Option: ${selectedTitle}
Payable Amount: ${formatCurrency(payableAmount)}

I will pay this amount via UPI and share the payment screenshot.
Please confirm availability.

Thank you.`;
}

export function BookingSection() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [pricingMode, setPricingMode] = useState<PricingMode>('map');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [qrSource, setQrSource] = useState('/images/upi-qr.jpg');
  const [showQrPlaceholder, setShowQrPlaceholder] = useState(false);

  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);
  const currentOptions = pricingMode === 'map' ? mapOptions : roomOptions;
  const selectedOption = currentOptions.find((option) => option.id === selectedOptionId) ?? null;

  const payableAmount = useMemo(() => {
    if (!selectedOption) return 0;
    if (pricingMode === 'map') {
      const option = selectedOption as (typeof mapOptions)[number];
      return option.pricePerPerson * guests;
    }
    const option = selectedOption as (typeof roomOptions)[number];
    return option.price;
  }, [selectedOption, pricingMode, guests]);

  const bookingValid = useMemo(
    () => Object.keys(validateBooking(checkIn, checkOut, guests, selectedOptionId)).length === 0,
    [checkIn, checkOut, guests, selectedOptionId],
  );

  const adjustGuests = (delta: number) => {
    setGuests((prev) => Math.min(18, Math.max(1, prev + delta)));
    setErrors((prev) => ({ ...prev, guests: undefined }));
  };

  const handleWhatsAppClick = () => {
    const validation = validateBooking(checkIn, checkOut, guests, selectedOptionId);
    setErrors(validation);

    if (Object.keys(validation).length > 0 || !selectedOption || payableAmount <= 0) return;

    const message = buildWhatsAppMessage(checkIn, checkOut, nights, guests, pricingMode, selectedOption.title, payableAmount);
    const whatsappURL = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id={SCROLL_SECTIONS.BOOKING.id} className="relative overflow-hidden bg-[#f4efe6] px-5 py-[72px] md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1240px]">
        <ScrollReveal className="mb-10 md:mb-14">
          <p className="caption text-center uppercase tracking-[0.18em] text-[rgba(47,41,36,0.7)]">Plan Your Stay</p>
          <h2 className="heading-lg mt-4 text-center text-[#2f2924]">Plan Your Stay</h2>
          <p className="body-lg mx-auto mt-5 max-w-3xl text-center text-[rgba(47,41,36,0.74)]">
            Choose your dates and pricing type. We&apos;ll confirm availability personally on WhatsApp before your stay is reserved.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.75fr)]">
          <div className="space-y-6 md:space-y-7">
            <ScrollReveal>
              <div className="rounded-[28px] border border-[rgba(47,41,36,0.12)] bg-[rgba(255,255,255,0.42)] p-6 md:p-8">
                <h3 className="font-serif text-[30px] leading-tight text-[#2f2924] md:text-[34px]">Select your dates</h3>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="check-in-date" className="mb-2 block text-sm font-medium text-[#2f2924]">
                      Check-in
                    </label>
                    <input
                      id="check-in-date"
                      type="date"
                      value={checkIn}
                      onChange={(event) => {
                        setCheckIn(event.target.value);
                        setErrors((prev) => ({ ...prev, checkIn: undefined, checkOut: undefined }));
                      }}
                      className="h-[54px] w-full rounded-2xl border border-[rgba(47,41,36,0.2)] bg-[#fefbf6] px-4 text-[#2f2924] focus:outline-none focus:ring-2 focus:ring-[#a95235]"
                    />
                    {errors.checkIn ? <p className="mt-2 text-sm text-[#a95235]">{errors.checkIn}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="check-out-date" className="mb-2 block text-sm font-medium text-[#2f2924]">
                      Check-out
                    </label>
                    <input
                      id="check-out-date"
                      type="date"
                      value={checkOut}
                      onChange={(event) => {
                        setCheckOut(event.target.value);
                        setErrors((prev) => ({ ...prev, checkOut: undefined }));
                      }}
                      className="h-[54px] w-full rounded-2xl border border-[rgba(47,41,36,0.2)] bg-[#fefbf6] px-4 text-[#2f2924] focus:outline-none focus:ring-2 focus:ring-[#a95235]"
                    />
                    {errors.checkOut ? <p className="mt-2 text-sm text-[#a95235]">{errors.checkOut}</p> : null}
                  </div>
                </div>
                <p className="mt-4 text-sm text-[rgba(47,41,36,0.74)]">
                  {nights > 0 ? `${nights} night${nights > 1 ? 's' : ''} selected` : 'Select both dates to calculate nights.'}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="rounded-[28px] border border-[rgba(47,41,36,0.12)] bg-[rgba(255,255,255,0.42)] p-6 md:p-8">
                <h3 className="font-serif text-[30px] leading-tight text-[#2f2924] md:text-[34px]">Select guests</h3>
                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => adjustGuests(-1)}
                    aria-label="Decrease guests"
                    className="h-12 w-12 rounded-full border border-[rgba(47,41,36,0.25)] bg-[#fff8ef] text-xl text-[#2f2924] transition hover:bg-[#f3e7d6] focus:outline-none focus:ring-2 focus:ring-[#a95235]"
                  >
                    -
                  </button>
                  <div className="min-w-[110px] rounded-full border border-[rgba(47,41,36,0.18)] bg-[#fff8ef] px-5 py-3 text-center font-medium text-[#2f2924]">
                    {guests} Guest{guests > 1 ? 's' : ''}
                  </div>
                  <button
                    type="button"
                    onClick={() => adjustGuests(1)}
                    aria-label="Increase guests"
                    className="h-12 w-12 rounded-full border border-[rgba(47,41,36,0.25)] bg-[#fff8ef] text-xl text-[#2f2924] transition hover:bg-[#f3e7d6] focus:outline-none focus:ring-2 focus:ring-[#a95235]"
                  >
                    +
                  </button>
                </div>
                {errors.guests ? <p className="mt-3 text-sm text-[#a95235]">{errors.guests}</p> : null}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="rounded-[28px] border border-[rgba(47,41,36,0.12)] bg-[rgba(255,255,255,0.42)] p-6 md:p-8">
                <h3 className="font-serif text-[30px] leading-tight text-[#2f2924] md:text-[34px]">Select pricing type</h3>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPricingMode('map');
                      setSelectedOptionId(null);
                      setErrors((prev) => ({ ...prev, selection: undefined }));
                    }}
                    className={`rounded-full px-5 py-2 text-sm font-medium ${
                      pricingMode === 'map'
                        ? 'bg-[#a95235] text-[#fff8ef]'
                        : 'border border-[rgba(47,41,36,0.22)] text-[rgba(47,41,36,0.82)]'
                    }`}
                  >
                    MAP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPricingMode('room-only');
                      setSelectedOptionId(null);
                      setErrors((prev) => ({ ...prev, selection: undefined }));
                    }}
                    className={`rounded-full px-5 py-2 text-sm font-medium ${
                      pricingMode === 'room-only'
                        ? 'bg-[#a95235] text-[#fff8ef]'
                        : 'border border-[rgba(47,41,36,0.22)] text-[rgba(47,41,36,0.82)]'
                    }`}
                  >
                    Rooms Only
                  </button>
                </div>

                <div className="mt-5 grid gap-3">
                  {pricingMode === 'map'
                    ? mapOptions.map((option) => {
                        const selected = selectedOptionId === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setSelectedOptionId(option.id);
                              setErrors((prev) => ({ ...prev, selection: undefined }));
                            }}
                            className={`rounded-2xl border p-4 text-left ${
                              selected ? 'border-[#a95235] bg-[rgba(169,82,53,0.1)]' : 'border-[rgba(47,41,36,0.15)] bg-[#fff9f1]'
                            }`}
                          >
                            <p className="font-medium text-[#2f2924]">{option.title}</p>
                            <p className="mt-1 text-sm text-[rgba(47,41,36,0.74)]">{formatCurrency(option.pricePerPerson)} per person</p>
                          </button>
                        );
                      })
                    : roomOptions.map((option) => {
                        const selected = selectedOptionId === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setSelectedOptionId(option.id);
                              setErrors((prev) => ({ ...prev, selection: undefined }));
                            }}
                            className={`rounded-2xl border p-4 text-left ${
                              selected ? 'border-[#a95235] bg-[rgba(169,82,53,0.1)]' : 'border-[rgba(47,41,36,0.15)] bg-[#fff9f1]'
                            }`}
                          >
                            <p className="font-medium text-[#2f2924]">{option.title}</p>
                            <p className="mt-1 text-sm text-[rgba(47,41,36,0.74)]">{formatCurrency(option.price)} per room</p>
                          </button>
                        );
                      })}
                </div>
                {errors.selection ? <p className="mt-3 text-sm text-[#a95235]">{errors.selection}</p> : null}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <aside className="md:sticky md:top-24">
              <div className="rounded-[28px] border border-[rgba(47,41,36,0.12)] bg-[rgba(255,255,255,0.52)] p-6 md:p-7">
                <h3 className="font-serif text-3xl text-[#2f2924]">Your Stay</h3>
                <div className="mt-4 space-y-3 text-[15px] text-[#2f2924]">
                  <p>
                    <span className="font-medium">Check-in:</span> {checkIn ? formatDate(checkIn) : '--'}
                  </p>
                  <p>
                    <span className="font-medium">Check-out:</span> {checkOut ? formatDate(checkOut) : '--'}
                  </p>
                  <p>
                    <span className="font-medium">Nights:</span> {nights > 0 ? nights : '--'}
                  </p>
                  <p>
                    <span className="font-medium">Guests:</span> {guests}
                  </p>
                  <p>
                    <span className="font-medium">Plan Type:</span> {pricingMode === 'map' ? 'MAP' : 'Rooms Only'}
                  </p>
                  <p>
                    <span className="font-medium">Selected:</span> {selectedOption ? selectedOption.title : '--'}
                  </p>
                  <p className="text-lg font-semibold text-[#a95235]">
                    <span className="font-medium text-[#2f2924]">Amount to Pay:</span> {payableAmount > 0 ? formatCurrency(payableAmount) : '--'}
                  </p>
                </div>

                <div className="mt-7 rounded-[22px] border border-[rgba(47,41,36,0.12)] bg-[#fff8ef] p-4">
                  <p className="text-sm font-medium text-[#2f2924]">
                    Pay the shown amount via UPI, then confirm with screenshot on WhatsApp.
                  </p>
                  <div className="mt-3 overflow-hidden rounded-2xl border border-[rgba(47,41,36,0.12)] bg-[#f5ece0]">
                    {!showQrPlaceholder ? (
                      <Image
                        src={qrSource}
                        alt="UPI QR code for Yankit Homestay advance payment"
                        width={520}
                        height={520}
                        className="h-auto w-full object-cover"
                        onError={() => {
                          if (qrSource === '/images/upi-qr.jpg') {
                            setQrSource('/images/upi-qr.webp');
                          } else {
                            setShowQrPlaceholder(true);
                          }
                        }}
                      />
                    ) : (
                      <div className="flex min-h-[220px] w-full items-center justify-center px-4 text-center text-sm text-[rgba(47,41,36,0.72)]">
                        UPI QR image goes here
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="mt-6 h-[54px] w-full rounded-full bg-[#a95235] px-5 text-[15px] font-medium text-[#fff8ef] transition hover:bg-[#8f452d] focus:outline-none focus:ring-2 focus:ring-[#a95235]"
                >
                  Pay & Confirm on WhatsApp
                </button>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </div>

      {bookingValid && payableAmount > 0 ? (
        <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="h-[54px] w-full rounded-full bg-[#a95235] px-5 text-[15px] font-medium text-[#fff8ef] shadow-[0_14px_34px_rgba(47,41,36,0.24)]"
          >
            Pay {formatCurrency(payableAmount)} & Confirm
          </button>
        </div>
      ) : null}
    </section>
  );
}
