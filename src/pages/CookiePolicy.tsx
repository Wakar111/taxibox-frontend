import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 mt-10">Cookie-Richtlinien</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Was sind Cookies?</h2>
            <p className="mb-4">
              Cookies sind kleine Textdateien, die auf Ihrem Computer oder mobilen Gerät gespeichert werden, 
              wenn Sie unsere Website besuchen. Sie ermöglichen es uns, Ihre Präferenzen zu speichern und 
              Ihr Nutzererlebnis zu verbessern.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welche Cookies verwenden wir?</h2>
            
            <h3 className="text-xl font-medium mb-2">Notwendige Cookies</h3>
            <p className="mb-4">
              Diese Cookies sind für die Grundfunktionen unserer Website erforderlich. Sie ermöglichen 
              beispielsweise die Navigation zwischen Seiten und den Zugriff auf gesicherte Bereiche der Website.
            </p>

            <h3 className="text-xl font-medium mb-2">Analyse-Cookies</h3>
            <p className="mb-4">
              Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. 
              Sie liefern uns Informationen über besuchte Seiten, Verweildauer und eventuell auftretende Fehlermeldungen.
            </p>

            <h3 className="text-xl font-medium mb-2">Marketing-Cookies</h3>
            <p className="mb-4">
              Diese Cookies werden verwendet, um Werbung relevanter für Sie und Ihre Interessen zu gestalten.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ihre Einwilligung</h2>
            <p className="mb-4">
              Sie können selbst entscheiden, ob Sie Cookies akzeptieren oder ablehnen möchten. 
              Die meisten Webbrowser akzeptieren Cookies automatisch, Sie können jedoch Ihre 
              Browsereinstellungen ändern, um Cookies abzulehnen, wenn Sie dies bevorzugen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
            <p>
              Wenn Sie Fragen zu unseren Cookie-Richtlinien haben, kontaktieren Sie uns bitte unter:{' '}
              <a href="mailto:datenschutz@taxibox.de" className="text-blue-600 hover:underline">
                datenschutz@taxibox.de
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
