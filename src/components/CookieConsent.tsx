import React, { useState } from 'react';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const handleDecline = () => {
    setShowWhatsApp(true);
  };

  const handleBack = () => {
    setShowWhatsApp(false);
  };

  if (showWhatsApp) {
    return (
      <div className="space-y-4">
        <p className="text-gray-300">
          Sie können uns auch direkt über WhatsApp kontaktieren oder anrufen, um eine Fahrt zu buchen:
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a 
            href="https://wa.me/4915259606727"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-500 transition text-center inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
          <a 
            href="tel:+4915259606727"
            className="bg-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-500 transition text-center inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Anrufen
          </a>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleBack}
            className="bg-zinc-700 px-6 py-2 rounded-lg hover:bg-zinc-600 transition-colors text-sm"
          >
            ← Zurück zu Cookie-Einstellungen
          </button>
        </div>
        <p className="text-sm text-gray-400 text-center">
          Wir sind rund um die Uhr für Sie erreichbar!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-300">
        Um die Buchungsfunktion nutzen zu können, benötigen wir Ihre Zustimmung zur Verwendung von Google Maps.
        Dies ermöglicht uns, Ihnen genaue Standortinformationen und Routenberechnung anzubieten.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onAccept}
          className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Akzeptieren
        </button>
        <button
          onClick={handleDecline}
          className="bg-zinc-700 px-6 py-2 rounded-lg hover:bg-zinc-600 transition-colors"
        >
          Ablehnen
        </button>
      </div>
      <p className="text-sm text-gray-400">
        Durch Klicken auf "Akzeptieren" stimmen Sie der Verwendung von Google Maps zu.
        Ihre Daten werden gemäß unserer Datenschutzrichtlinie verarbeitet.
      </p>
    </div>
  );
}
