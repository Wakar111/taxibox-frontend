import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CookieSettings {
  necessary: boolean;
  googleMaps: boolean;
}

interface CookieBannerProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const CookieBanner = ({ isVisible: propIsVisible, onClose }: CookieBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    googleMaps: true
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (propIsVisible !== undefined) {
      setIsVisible(propIsVisible);
    } else if (!cookieConsent) {
      setIsVisible(true);
      if (localStorage.getItem('googleMapsConsent') === null) {
        localStorage.setItem('googleMapsConsent', 'true');
      }
    }
  }, [propIsVisible]);

  const saveCookieSettings = (accepted: boolean) => {
    const finalSettings = {
      necessary: true,
      googleMaps: accepted ? settings.googleMaps : false
    };

    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
    localStorage.setItem('googleMapsConsent', finalSettings.googleMaps ? 'true' : 'false');
    
    window.dispatchEvent(new Event('cookieConsentChange'));
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-4xl m-4 rounded-xl shadow-2xl border border-zinc-800">
        <div className="p-6">
          {!showDetails ? (
            // Simple View
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white text-center md:text-left">
                <h2 className="text-xl font-semibold mb-2">🍪 Cookie-Einstellungen</h2>
                <p className="text-zinc-300">
                  Wir verwenden Cookies, um Ihnen das beste Nutzererlebnis zu bieten.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-6 py-2.5 text-zinc-300 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Einstellungen
                </button>
                <button
                  onClick={() => saveCookieSettings(true)}
                  className="px-6 py-2.5 text-black bg-yellow-500 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          ) : (
            // Detailed View
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Cookie-Einstellungen</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-zinc-300 mb-6">
                Wir verwenden Cookies, um Ihnen das beste Nutzererlebnis zu ermöglichen. 
                Mehr Informationen finden Sie in unseren{' '}
                <Link to="/cookie-policy" className="text-yellow-500 hover:text-yellow-400 underline">
                  Cookie-Richtlinien
                </Link>.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                  <div>
                    <h3 className="font-medium text-white">Notwendige Cookies</h3>
                    <p className="text-sm text-zinc-400">Diese Cookies sind für die Grundfunktionen der Website erforderlich.</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-5 w-5 text-yellow-500 cursor-not-allowed bg-zinc-700 border-zinc-600 rounded"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                  <div>
                    <h3 className="font-medium text-white">Google Maps</h3>
                    <p className="text-sm text-zinc-400">
                      Ermöglicht genaue Adresssuche, Routenberechnung und Preiskalkulationen.
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={settings.googleMaps}
                      onChange={(e) => setSettings(prev => ({ ...prev, googleMaps: e.target.checked }))}
                      className="h-5 w-5 text-yellow-500 bg-zinc-700 border-zinc-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => saveCookieSettings(false)}
                  className="px-6 py-2.5 text-zinc-300 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Ablehnen
                </button>
                <button
                  onClick={() => saveCookieSettings(true)}
                  className="px-6 py-2.5 text-black bg-yellow-500 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                >
                  Auswahl bestätigen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
