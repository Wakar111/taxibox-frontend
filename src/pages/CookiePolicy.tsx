import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 mt-10">Cookie-Richtlinien</h1>
          <p className="mb-4">Stand: 01.01.2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Verwendung von Cookies</h2>
            <p className="mb-4">
              Unsere Website verwendet Cookies, um bestimmte Funktionen bereitzustellen und das Nutzererlebnis zu verbessern. 
              Im Folgenden erläutern wir, welche Arten von Cookies verwendet werden, zu welchem Zweck sie dienen und wie Sie 
              Ihre Cookie-Einstellungen anpassen können.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Was sind Cookies?</h2>
            <p className="mb-4">
              Cookies sind kleine Textdateien, die von Websites auf Ihrem Endgerät gespeichert werden. Sie enthalten 
              Informationen, die eine Website dazu verwenden kann, um Funktionen bereitzustellen oder Ihr Nutzerverhalten 
              zu analysieren.
            </p>
            <p className="mb-4">Cookies werden in folgende Kategorien unterteilt:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Notwendige Cookies: Diese Cookies sind erforderlich, um die grundlegenden Funktionen unserer Website sicherzustellen.</li>
              <li>Funktionale Cookies: Diese Cookies ermöglichen zusätzliche Funktionen wie die Speicherung Ihrer Präferenzen.</li>
              <li>Analytische Cookies: Diese Cookies werden verwendet, um anonymisierte Daten über das Nutzungsverhalten der Besucher zu sammeln.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Welche Cookies verwenden wir?</h2>
            <p className="mb-4">Auf unserer Website werden folgende Cookies verwendet:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Session-Cookies: Diese Cookies werden nur für die Dauer Ihres Besuchs gespeichert und nach dem Schließen des Browsers gelöscht.</li>
              <li>Drittanbieter-Cookies: Einige Dienste wie die Google Maps API setzen Cookies, um deren Funktionen bereitzustellen.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Einwilligung und Einstellungen</h2>
            <p className="mb-4">
              Beim ersten Besuch unserer Website fragen wir Sie über ein Cookie-Banner nach Ihrer Einwilligung. 
              Sie können auswählen, welche Cookies Sie akzeptieren möchten.
            </p>
            <p className="mb-4">
              Ihre Einstellungen können Sie jederzeit ändern, indem Sie den Link „Cookie-Einstellungen" im Footer 
              unserer Website verwenden.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Verwaltung von Cookies im Browser</h2>
            <p className="mb-4">
              Sie können Ihren Browser so einstellen, dass Cookies nur im Einzelfall erlaubt werden, generell ausgeschlossen 
              oder automatisch gelöscht werden. Beachten Sie, dass die Funktionalität unserer Website eingeschränkt sein kann, 
              wenn Sie Cookies deaktivieren.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Google Maps API und Cookies</h2>
            <p className="mb-4">
              Unsere Website nutzt Google Maps, um die Distanzberechnung für Taxifahrten bereitzustellen. Google Maps 
              verwendet möglicherweise Cookies und verarbeitet personenbezogene Daten wie Ihre IP-Adresse. Weitere 
              Informationen finden Sie in der Datenschutzerklärung von Google.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
