import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 mt-10">Datenschutzerklärung</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Verantwortlicher</h2>
            <p className="mb-4">
              TaxiBoy<br />
              [Straße und Hausnummer]<br />
              [PLZ und Ort]<br />
              E-Mail: datenschutz@taxiboy.de<br />
              Telefon: [Telefonnummer]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p className="mb-4">
              Bei der Nutzung unseres Taxi-Buchungsservices erheben und verarbeiten wir folgende personenbezogene Daten:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name und Kontaktdaten (E-Mail, Telefonnummer)</li>
              <li>Abhol- und Zieladresse</li>
              <li>Buchungszeitpunkt und gewählte Fahrzeugkategorie</li>
              <li>Zahlungsinformationen (wenn zutreffend)</li>
              <li>Standortdaten (bei Nutzung der Abholung)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Zweck der Datenverarbeitung</h2>
            <p className="mb-4">Ihre Daten werden verarbeitet für:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Die Durchführung der Taxifahrt und Buchungsabwicklung</li>
              <li>Kommunikation bezüglich Ihrer Buchung</li>
              <li>Qualitätssicherung und Verbesserung unseres Services</li>
              <li>Erfüllung gesetzlicher Aufbewahrungspflichten</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Rechtsgrundlagen</h2>
            <p className="mb-4">
              Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
              <li>Art. 6 Abs. 1 lit. c DSGVO (Rechtliche Verpflichtung)</li>
              <li>Art. 6 Abs. 1 lit. f DSGVO (Berechtigte Interessen)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Speicherdauer</h2>
            <p className="mb-4">
              Ihre Daten werden nur solange gespeichert, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben. Buchungsdaten werden in der Regel für 10 Jahre aufbewahrt.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies und Tracking</h2>
            <p className="mb-4">
              Unsere Website verwendet Cookies für:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Technisch notwendige Funktionen (z.B. Buchungsprozess)</li>
              <li>Speicherung Ihrer Cookie-Präferenzen</li>
              <li>Zeitslot-Verwaltung bei Buchungen</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Ihre Rechte</h2>
            <p className="mb-4">Sie haben folgende Rechte:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Auskunft über gespeicherte Daten</li>
              <li>Berichtigung unrichtiger Daten</li>
              <li>Löschung von Daten</li>
              <li>Einschränkung der Verarbeitung</li>
              <li>Datenübertragbarkeit</li>
              <li>Widerspruch gegen die Verarbeitung</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Datensicherheit</h2>
            <p className="mb-4">
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen Manipulation, Verlust oder unberechtigten Zugriff zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend angepasst.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Kontakt</h2>
            <p className="mb-4">
              Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten können Sie sich jederzeit an uns wenden:
            </p>
            <p>
              E-Mail: datenschutz@taxiboy.de<br />
              Telefon: [Telefonnummer]
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
