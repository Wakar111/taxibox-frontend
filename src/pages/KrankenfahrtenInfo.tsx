import { useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function KrankenfahrtenInfo() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phoneNumber = "+4915259606727";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hallo, ich interessiere mich für Ihre Krankenfahrten-Services.");
    window.open(`https://wa.me/${phoneNumber.replace(/\s+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center px-4">
        <div className="absolute inset-0">
          <img 
            src="/Taxi-Boy-8.jpeg"
            alt="Krankenfahrten Service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Krankenfahrten
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300">
            Professioneller und sicherer Transport zu medizinischen Terminen
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-zinc-700/30">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400">Professioneller Patiententransport</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Wir bieten speziell ausgestattete Fahrzeuge und geschultes Personal für:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 text-xl">✓</span>
                    <p className="text-gray-300">Arztbesuche und Therapietermine</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 text-xl">✓</span>
                    <p className="text-gray-300">Krankenhausfahrten</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 text-xl">✓</span>
                    <p className="text-gray-300">Rehabilitationseinrichtungen</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 text-xl">✓</span>
                    <p className="text-gray-300">Barrierefreier Transport</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">✓ Barrierefreier Zugang</h3>
                  <p className="text-gray-300">Unsere Fahrzeuge sind speziell ausgestattet für einen komfortablen und sicheren Ein- und Ausstieg. Mit modernster Ausstattung gewährleisten wir maximale Mobilität für alle Patienten.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">✓ Geschultes Personal</h3>
                  <p className="text-gray-300">Unsere Fahrer sind speziell für den Transport von Patienten ausgebildet und bieten professionelle Unterstützung. Sie verfügen über umfassende Erfahrung im Umgang mit Menschen mit eingeschränkter Mobilität.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">✓ Flexible Terminplanung</h3>
                  <p className="text-gray-300">Wir passen uns Ihren Terminen an und garantieren pünktliche Abholung und Transport. Unser Service steht Ihnen für regelmäßige Termine ebenso zur Verfügung wie für einmalige Fahrten.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">✓ Krankenversicherung</h3>
                  <p className="text-gray-300">Wir arbeiten mit allen Krankenversicherungen zusammen und übernehmen die Abrechnung für Sie. Bei Fragen zur Kostenübernahme beraten wir Sie gerne.</p>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="mt-10 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>
              <button
                onClick={handleCall}
                className="w-full sm:w-1/2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Anrufen
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
