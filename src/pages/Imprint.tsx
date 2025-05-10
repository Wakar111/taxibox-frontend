import React, { useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Imprint() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      <Navbar showNavLinks={false} />
      
      <div className="flex-grow container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-12">Impressum</h1>
        
        <div className="space-y-12">
          {/* Angaben gemäß § 5 TMG */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Angaben gemäß § 5 TMG</h2>
            <div className="bg-zinc-800 p-8 rounded-xl">
              <p className="mb-2">TaxiBoy</p>
              <p className="mb-2">An der Fahrt 4</p>
              <p className="mb-2">552124 Mainz </p>
              <p className="mb-2">Deutschland</p>
            </div>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Kontakt</h2>
            <div className="bg-zinc-800 p-8 rounded-xl">
              <p className="mb-2">Telefon: +49 (0) 152 9606727</p>
              <p className="mb-2">E-Mail: info@taxiboymainz.de</p>
            </div>
          </section>

          {/* Umsatzsteuer-ID */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Umsatzsteuer-ID</h2>
            <div className="bg-zinc-800 p-8 rounded-xl">
              <p className="mb-2">Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</p>
              <p>[Umsatzsteuer-ID]</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}