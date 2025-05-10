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
            <h2 className="text-2xl font-semibold mb-4">1. Einleitung</h2>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Verantwortliche Stelle</h2>
            <p className="mb-4">Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:</p>
            <p className="mb-4">
              Taxiboy Mainz<br />
              Danish Ahmad<br />
              An der Fahrt 4<br />
              552124 Mainz<br />
              Telefon: 0152 96066727<br />
              E-Mail: <a href="mailto:info@taxiboymainz.de" className="text-blue-600 hover:underline">info@taxiboymainz.de</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Erhebung und Speicherung personenbezogener Daten</h2>
            <h3 className="text-xl font-semibold mb-3">a) Besuch der Webseite</h3>
            <p className="mb-4">Beim Besuch unserer Webseite erhebt unser Server automatisch folgende Informationen:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP-Adresse des anfragenden Endgeräts</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Verwendeter Browser und Betriebssystem</li>
              <li>Besuchte URL</li>
            </ul>
            <p className="mb-4">
              Diese Daten werden ausschließlich zur Sicherstellung eines reibungslosen Betriebs und zur Verbesserung der Webseite verwendet. Eine Zuordnung dieser Daten zu einer bestimmten Person erfolgt nicht.
            </p>

            <h3 className="text-xl font-semibold mb-3">b) Nutzung der Distanzberechnung (Google Maps API)</h3>
            <p className="mb-4">
              Unsere Webseite verwendet die Google Maps API, um die Distanz und Kosten für Ihre Taxifahrt zu berechnen. Dabei können technische Daten wie Ihre IP-Adresse an Google übermittelt werden. Die Nutzung der Google Maps API erfolgt auf Grundlage von Art. 6 Abs. 1 lit f DSGVO (berechtigtes Interesse). Die Datenschutzerklärung von Google finden Sie unter: https://policies.google.com/privacy.
            </p>

            <p className="mb-4">
              Wenn Google Maps API personenbezogene Daten wie IP-Adressen erhebt, ist eine aktive Einwilligung (Opt-In) der Nutzer erforderlich. Wir stellen sicher, dass ein Cookie-Banner mit einer spezifischen Zustimmung für die Nutzung von Google Maps bereitgestellt wird.
            </p>

            <h3 className="text-xl font-semibold mb-3">c) Buchung und Terminreservierung:</h3>
            <p className="mb-4">
              Wenn Sie eine Fahrt buchen oder einen Termin reservieren, erfassen wir folgende personenbezogenen Daten:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Telefonnummer</li>
              <li>E-Mail-Adresse</li>
              <li>Abhol- und Zieladresse</li>
              <li>Datum und Uhrzeit der Fahrt</li>
            </ul>
            <p className="mb-4">
              Diese Daten sind erforderlich, um Ihre Anfrage zu bearbeiten und die Dienstleistung durchzustellen. Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            </p>

            <h3 className="text-xl font-semibold mb-3">d) Kontaktaufnahme</h3>
            <p className="mb-4">
              Sie können uns über E-Mail, Telefon oder WhatsApp kontaktieren. Bei der Kontaktaufnahme werden die von Ihnen übermittelten Daten (z. B. Name, Telefonnummer, E-Mail-Adresse) zur Bearbeitung Ihrer Anfrage gespeichert. Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b oder f DSGVO.
            </p>

            <h3 className="text-xl font-semibold mb-3">e) Speicherung Ihrer Anfragen</h3>
            <p className="mb-4">
              Anfragen, die über unsere Webseite eingehen, werden an unser Gmail-Konto übermittelt. Gmail wird von Google bereitgestellt. Bitte beachten Sie, dass Google die Daten in den USA speichert und verarbeitet.
            </p>

            <h3 className="text-xl font-semibold mb-3">4. Weitergabe</h3>
            <p className="mb-4">
              Ihrer Daten Ihre personenbezogenen Daten werden nur dann an Dritte weitergegeben, wenn dies zur Erfüllung des Vertrages erforderlich ist (z. B. an unsere Fahrer) oder wir gesetzlich dazu verpflichtet sind. Eine Weitergabe zu Werbezwecken erfolgt nicht.
            </p>

            <h3 className="text-xl font-semibold mb-3">5. Ihre Rechte</h3>
            <p className="mb-4">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Auskunftsrecht (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO) Zur Ausübung dieser Rechte können Sie sich jederzeit an uns wenden (siehe Kontakt oben).</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">6. Datensicherheit</h3>
            <p className="mb-4">
              Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten vor unberechtigtem Zugriff, Verlust oder Missbrauch zu schützen. Dazu gehören unter anderem Firewalls, Verschlüsselungstechnologien und regelmäßige Sicherheitsupdates.
            </p>

            <h3 className="text-xl font-semibold mb-3">7. Dauer der Speicherung</h3>
            <p className="mb-4">
              Wir speichern Ihre personenbezogenen Daten nur solange, wie es für die oben genannten Zwecke erforderlich ist oder wir gesetzlich dazu verpflichtet sind. Buchungsdaten werden beispielsweise für die Dauer gesetzlicher Aufbewahrungspflichten gespeichert.
            </p>

            <h3 className="text-xl font-semibold mb-3">8. Drittanbieter</h3>
            <p className="mb-4">
              Unsere Webseite nutzt Dienste von Drittanbietern wie Google Maps. Bitte beachten Sie die jeweiligen Datenschutzerklärungen dieser Anbieter:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Netlify Datenschutzerklärung: <a href="https://www.netlify.com/privacy/" className="text-blue-600 hover:underline">https://www.netlify.com/privacy/</a></li>
              <li>Render Datenschutzerklärung: <a href="https://render.com/privacy" className="text-blue-600 hover:underline">https://render.com/privacy</a></li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">9. Hosting</h3>
            <p className="mb-4">Wir hosten die Inhalte unserer Website bei folgenden Anbietern:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Strato: Datenschutzerklärung unter <a href="https://www.strato.de/datenschutz/" className="text-blue-600 hover:underline">https://www.strato.de/datenschutz/</a></li>
              <li>Netlify: Datenschutzerklärung unter <a href="https://www.netlify.com/privacy" className="text-blue-600 hover:underline">https://www.netlify.com/privacy</a></li>
              <li>Render.com: Datenschutzerklärung unter <a href="https://render.com/privacy" className="text-blue-600 hover:underline">https://render.com/privacy</a></li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Rechtsgrundlage:</h3>
            <p className="mb-4">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO, da ein berechtigtes Interesse an der sicheren Bereitstellung der Website besteht. Sofern eine Einwilligung erteilt wurde, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung kann jederzeit widerrufen werden.
            </p>

            <h3 className="text-xl font-semibold mb-3">10. SSL- bzw. TLS-Verschlüsselung</h3>
            <p className="mb-4">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>

            <h3 className="text-xl font-semibold mb-3">11. Cookies</h3>
            <p className="mb-4">
              Unsere Internetseiten verwenden sogenannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
            </p>
            <p className="mb-4">
              Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
            </p>
            <p className="mb-4">
              Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos). Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen gewünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird.
            </p>
            <p className="mb-4">
              Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und §25 Abs. 1 TTDSG); die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="mb-4">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
            </p>
            <p className="mb-4">
              Welche Cookies und Dienste auf dieser Website eingesetzt werden, können Sie dieser Datenschutzerklärung entnehmen.
            </p>

            <h3 className="text-xl font-semibold mb-3">12. Aktualität und Änderung dieser Datenschutzerklärung</h3>
            <p className="mb-4">
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte Rechtslage oder technische Neuerungen anzupassen.
            </p>
            <p className="mb-4">
              Version: 01.01.2025
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;