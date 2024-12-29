import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    title: "10+ Jahre Erfahrung",
    description: "Seit über einem Jahrzehnt bieten wir zuverlässige und professionelle Taxiservices in Mainz und Umgebung.",
    icon: "🏆"
  },
  {
    title: "Professionelle Fahrer",
    description: "Unsere erfahrenen und lizenzierten Fahrer sind bekannt für ihre Zuverlässigkeit und Professionalität.",
    icon: "👨‍✈️"
  },
  {
    title: "Premium Fahrzeugflotte",
    description: "Unsere Flotte besteht ausschließlich aus hochwertigen Mercedes-Benz Fahrzeugen für maximalen Komfort.",
    icon: "🚖"
  },
  {
    title: "24/7 Verfügbarkeit",
    description: "Rund um die Uhr für Sie da - egal ob Tag oder Nacht, wir sind immer erreichbar.",
    icon: "🕒"
  }
];

const vehicles = [
  {
    type: "Mercedes-Benz E-Klasse",
    description: "Komfortables Taxi für bis zu 4 Personen",
    image: "https://cdn.pixabay.com/photo/2018/07/12/16/05/mercedes-3533812_1280.jpg"
  },
  {
    type: "Mercedes-Benz V-Klasse",
    description: "Großraumtaxi für bis zu 6 Personen",
    image: "https://cdn.pixabay.com/photo/2018/07/12/16/05/mercedes-3533812_1280.jpg"
  },
  {
    type: "Mercedes-Benz Sprinter",
    description: "Minibus für bis zu 8 Personen",
    image: "https://cdn.pixabay.com/photo/2018/07/12/16/05/mercedes-3533812_1280.jpg"
  }
];

export default function AboutUs() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Willkommen bei TaxiBoy</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ihr vertrauenswürdiger Partner für professionelle Taxiservices in Mainz und Umgebung.
            Mit über 10 Jahren Erfahrung stehen wir für Qualität, Zuverlässigkeit und erstklassigen Service.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Warum TaxiBoy?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-zinc-700 p-6 rounded-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Fleet Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere Fahrzeugflotte</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <div key={index} className="bg-zinc-800 rounded-lg overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.type}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{vehicle.type}</h3>
                  <p className="text-gray-300">{vehicle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Unser Team</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Lernen Sie die Menschen kennen, die TaxiBoy zu etwas Besonderem machen. 
            Unser erfahrenes Team steht für Zuverlässigkeit, Professionalität und ausgezeichneten Service.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
            {/* Owner/Manager */}
            <div className="bg-zinc-700 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                  alt="Geschäftsführer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Max Mustermann</h3>
                <p className="text-yellow-500 text-lg mb-3">Geschäftsführer</p>
                <p className="text-gray-300 text-base leading-relaxed">
                  Seit über 10 Jahren leitet Max unser Unternehmen mit Leidenschaft und Engagement. 
                  Seine Vision von erstklassigem Service prägt unsere tägliche Arbeit.
                </p>
              </div>
            </div>

            {/* Senior Driver */}
            <div className="bg-zinc-700 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1615567964485-0ee76b5b3410?auto=format&fit=crop&q=80&w=800"
                  alt="Leitender Fahrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Thomas Schmidt</h3>
                <p className="text-yellow-500 text-lg mb-3">Leitender Fahrer</p>
                <p className="text-gray-300 text-base leading-relaxed">
                  Mit 15 Jahren Erfahrung kennt Thomas jeden Winkel von Mainz. 
                  Er ist bekannt für seine Pünktlichkeit und seinen ausgezeichneten Kundenservice.
                </p>
              </div>
            </div>

            {/* Customer Service */}
            <div className="bg-zinc-700 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                  alt="Kundenbetreuung"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Lisa Wagner</h3>
                <p className="text-yellow-500 text-lg mb-3">Kundenbetreuung</p>
                <p className="text-gray-300 text-base leading-relaxed">
                  Lisa sorgt dafür, dass Ihre Buchungen reibungslos ablaufen und 
                  steht Ihnen bei allen Fragen zur Verfügung.
                </p>
              </div>
            </div>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">10+</div>
              <div className="text-gray-300">Jahre Erfahrung</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">15+</div>
              <div className="text-gray-300">Professionelle Fahrer</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">10k+</div>
              <div className="text-gray-300">Zufriedene Kunden</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">24/7</div>
              <div className="text-gray-300">Verfügbarkeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Bereit für Ihre Fahrt?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Kontaktieren Sie uns jetzt für eine Buchung oder weitere Informationen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/?booking=true"
              className="bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition text-center"
            >
              Jetzt Buchen
            </Link>
            <a 
              href="https://wa.me/4915259606727"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-500 transition text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}