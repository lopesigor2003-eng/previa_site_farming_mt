/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { DroneCatalog } from './components/DroneCatalog';
import { RoiCalculator } from './components/RoiCalculator';
import { NdviViewer } from './components/NdviViewer';
import { ServicesSection } from './components/ServicesSection';
import { LocationSection } from './components/LocationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { QuoteModal } from './components/QuoteModal';
import { Footer } from './components/Footer';
import { COMPANY_INFO } from './data/drones';
import { MessageSquare, PhoneCall } from 'lucide-react';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedDroneForQuote, setSelectedDroneForQuote] = useState('DJI Agras T50');

  const handleOpenQuote = (droneName?: string) => {
    if (droneName) {
      setSelectedDroneForQuote(droneName);
    }
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-emerald-500 selection:text-neutral-950">
      {/* Top Fixed Header */}
      <Navbar onRequestQuote={() => handleOpenQuote()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. 3D WebGL Hero Section with Interactive Agricultural Drone */}
        <Hero3D
          onRequestQuote={() => handleOpenQuote('DJI Agras T50')}
        />

        {/* 2. Drones Catalog with Technical Specs & 3D Links */}
        <DroneCatalog
          onRequestQuoteWithDrone={(droneName) => handleOpenQuote(droneName)}
        />

        {/* 3. Agronomic ROI & Hectare Economy Calculator */}
        <RoiCalculator
          onRequestQuote={() => handleOpenQuote('DJI Agras T50')}
        />

        {/* 4. Precision Agronomy NDVI & Spectral Layer Visualizer */}
        <NdviViewer />

        {/* 5. Services: Workshop in Sorriso, Genuine Parts, Pilot Training */}
        <ServicesSection
          onRequestQuote={() => handleOpenQuote()}
        />

        {/* 6. Testimonials from Mato Grosso Producers */}
        <TestimonialsSection />

        {/* 7. Google Maps Integration & Official Business Location */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer onRequestQuote={() => handleOpenQuote()} />

      {/* Interactive Quotation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuote}
        defaultDrone={selectedDroneForQuote}
      />

      {/* Sticky Quick Contact WhatsApp Button for Fast Agro Inquiries */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <a
          id="floating-whatsapp-btn"
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 px-4 py-3 rounded-2xl font-extrabold text-xs shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
          title="Falar no WhatsApp com a Farming Solutions MT"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neutral-950"></span>
          </span>
          <MessageSquare className="w-4 h-4 text-neutral-950 fill-neutral-950" />
          <span className="hidden sm:inline">WhatsApp Sorriso-MT</span>
        </a>
      </div>
    </div>
  );
}
