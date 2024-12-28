import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Car } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";
import { Autocomplete } from '@react-google-maps/api';
import { useGoogleMaps } from '../contexts/GoogleMapsContext';
import { useNavigate } from 'react-router-dom';
import CookieBanner from '../components/CookieBanner';

const MAINZ_CENTER = { lat: 50.0, lng: 8.2711 }; // Mainz center coordinates
const WIESBADEN_CENTER = { lat: 50.0782, lng: 8.2397 }; // Wiesbaden center coordinates
const MAX_RADIUS = 20000; // 20km radius in meters

interface ConsentModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Google Maps Zustimmung</h2>
      <p className="text-gray-600 mb-6">
        Um Ihnen den bestmöglichen Service bieten zu können, benötigen wir Ihre Zustimmung zur Nutzung von Google Maps. 
        Dies ermöglicht uns:
      </p>
      <ul className="list-disc pl-5 mb-6 text-gray-600">
        <li>Genaue Standortbestimmung</li>
        <li>Routenberechnung</li>
        <li>Adresssuche und Autovervollständigung</li>
      </ul>
      <p className="text-gray-600 mb-6">
        Mit der Nutzung von Google Maps stimmen Sie den Nutzungsbedingungen von Google zu.
      </p>
      <div className="flex gap-4 justify-end">
        <button
          onClick={onDecline}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Ablehnen
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Zustimmen
        </button>
      </div>
    </div>
  );
};

export default function BookingForm() {
  const { isLoaded } = useGoogleMaps();
  const navigate = useNavigate();
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [hasConsent, setHasConsent] = useState(() => {
    return localStorage.getItem('googleMapsConsent') === 'true';
  });

  useEffect(() => {
    const handleConsentChange = () => {
      setHasConsent(localStorage.getItem('googleMapsConsent') === 'true');
    };

    window.addEventListener('cookieConsentChange', handleConsentChange);
    return () => {
      window.removeEventListener('cookieConsentChange', handleConsentChange);
    };
  }, []);

  const [isFormValid, setIsFormValid] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: string; message: string } | null>(null);
  const [pickupAutocomplete, setPickupAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [pickupError, setPickupError] = useState('');
  const [bookingNumber, setBookingNumber] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && localStorage.getItem('googleMapsConsent') === null) {
      // setShowConsentModal(true);
    }
  }, [isLoaded]);

  const [isScheduled, setIsScheduled] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    destination: '',
    phone: '',
    email: '',
    vehicleType: 'standard'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'pickupLocation') {
      setPickupError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkFormValidity()) {
      setSubmitStatus({
        type: 'error',
        message: 'Bitte füllen Sie alle Pflichtfelder aus.'
      });
      return;
    }

    try {
      if (hasConsent) {
        const bookingData = {
          ...formData,
          scheduledTime: isScheduled ? selectedDateTime : null,
        };

        const service = new google.maps.DirectionsService();
        
        const result = await new Promise((resolve, reject) => {
          service.route(
            {
              origin: formData.pickupLocation,
              destination: formData.destination,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === 'OK') {
                resolve(response);
              } else {
                reject(status);
              }
            }
          );
        });

        const route = (result as google.maps.DirectionsResult).routes[0];
        const distance = route.legs[0].distance?.value || 0;
        const duration = route.legs[0].duration?.text || '';
        const distanceInKm = distance / 1000;

        let base = 0;
        let perKm = 0;
        switch (formData.vehicleType) {
          case 'taxi':
            base = 3.9;
            perKm = 2.3;
            break;
          case 'taxi-gross':
            base = 5.9;
            perKm = 2.5;
            break;
          case 'mietwagen':
            base = 4.9;
            perKm = 2.4;
            break;
          case 'minivan':
            base = 6.9;
            perKm = 2.6;
            break;
        }

        const totalPrice = base + (perKm * distanceInKm);

        setSubmitStatus({
          type: 'success',
          message: `Fahrtkosten: €${totalPrice.toFixed(2)}\nGeschätzte Fahrzeit: ${duration}`
        });
      } else {
        const bookingNumber = Math.random().toString(36).substring(7).toUpperCase();
        setBookingNumber(bookingNumber);
        setSubmitStatus({
          type: 'success',
          message: 'Ihre Buchung wurde erfolgreich aufgenommen.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      });
    }
  };

  const checkFormValidity = () => {
    const basicValidation = 
      formData.pickupLocation.trim() !== '' &&
      formData.destination.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.vehicleType !== '' &&
      (!isScheduled || (isScheduled && selectedDateTime !== null));

    return basicValidation;
  };

  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [formData, selectedDateTime, isScheduled]);

  const handleSchedulingChange = (scheduled: boolean) => {
    setIsScheduled(scheduled);
    setSelectedDateTime(null);
    setIsFormValid(checkFormValidity());
  };

  const isWithinServiceArea = (location: google.maps.LatLng) => {
    const mainzDistance = google.maps.geometry.spherical.computeDistanceBetween(
      location,
      new google.maps.LatLng(MAINZ_CENTER.lat, MAINZ_CENTER.lng)
    );
    const wiesbadenDistance = google.maps.geometry.spherical.computeDistanceBetween(
      location,
      new google.maps.LatLng(WIESBADEN_CENTER.lat, WIESBADEN_CENTER.lng)
    );
    return mainzDistance <= MAX_RADIUS || wiesbadenDistance <= MAX_RADIUS;
  };

  const isTimeSlotAvailable = (time: Date) => {
    const now = new Date();
    if (time < now) return false;

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    if (time > thirtyDaysFromNow) return false;

    return true;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {showCookieSettings && (
        <CookieBanner 
          isVisible={true} 
          onClose={() => setShowCookieSettings(false)} 
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {submitStatus && (
          <div className={`mb-4 p-4 rounded-md ${
            submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <div className="flex items-center">
              <div className="flex-1">
                {submitStatus.message}
                {submitStatus.type === 'success' && bookingNumber && (
                  <div className="mt-2 p-3 bg-white rounded-md border border-green-200">
                    <p className="font-semibold">Buchungsnummer:</p>
                    <p className="text-lg font-mono">{bookingNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!hasConsent && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">Google Maps ist deaktiviert</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Aktivieren Sie Google Maps für genaue Preisberechnung und Routenplanung.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCookieSettings(true)}
                className="px-6 py-2.5 text-black bg-yellow-500 rounded-lg hover:bg-yellow-400 transition-colors font-medium whitespace-nowrap"
              >
                Google Maps aktivieren
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={() => handleSchedulingChange(false)}
            className={`px-6 py-2 rounded-full transition ${
              !isScheduled
                ? 'bg-yellow-500 text-black font-semibold'
                : 'bg-zinc-700 text-white hover:bg-zinc-600'
            }`}
          >
            Sofort fahren
          </button>
          <button
            type="button"
            onClick={() => handleSchedulingChange(true)}
            className={`px-6 py-2 rounded-full transition ${
              isScheduled
                ? 'bg-yellow-500 text-black font-semibold'
                : 'bg-zinc-700 text-white hover:bg-zinc-600'
            }`}
          >
            Fahrt buchen
          </button>
        </div>

        <div className="space-y-4">
          {hasConsent ? (
            <>
              <div className="relative">
                <Autocomplete
                  onLoad={(autocomplete) => setPickupAutocomplete(autocomplete)}
                  onPlaceChanged={() => {
                    if (pickupAutocomplete) {
                      const place = pickupAutocomplete.getPlace();
                      if (place.geometry?.location) {
                        if (isWithinServiceArea(place.geometry.location)) {
                          setFormData(prev => ({
                            ...prev,
                            pickupLocation: place.formatted_address || '',
                          }));
                          setPickupError('');
                        } else {
                          setPickupError('Bitte wählen Sie eine Adresse im Umkreis von Mainz oder Wiesbaden (20km Radius).');
                          setFormData(prev => ({ ...prev, pickupLocation: '' }));
                        }
                      }
                    }
                  }}
                  options={{
                    componentRestrictions: { country: "de" },
                    types: ['address'],
                    bounds: {
                      north: Math.max(MAINZ_CENTER.lat, WIESBADEN_CENTER.lat) + 0.2,
                      south: Math.min(MAINZ_CENTER.lat, WIESBADEN_CENTER.lat) - 0.2,
                      east: Math.max(MAINZ_CENTER.lng, WIESBADEN_CENTER.lng) + 0.2,
                      west: Math.min(MAINZ_CENTER.lng, WIESBADEN_CENTER.lng) - 0.2,
                    },
                    strictBounds: false
                  }}
                >
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={(e) => {
                      setFormData({ ...formData, pickupLocation: e.target.value });
                      if (e.target.value === '') {
                        setPickupError('');
                      }
                    }}
                    className={`w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none border ${
                      pickupError ? 'border-red-500' : 'border-black'
                    }`}
                    placeholder="Abholadresse eingeben"
                    required
                  />
                </Autocomplete>
                <MapPin className="absolute left-3 top-3 text-gray-400" />
              </div>

              <div className="relative">
                <Autocomplete
                  onLoad={(autocomplete) => setDestinationAutocomplete(autocomplete)}
                  onPlaceChanged={() => {
                    if (destinationAutocomplete) {
                      const place = destinationAutocomplete.getPlace();
                      setFormData(prev => ({
                        ...prev,
                        destination: place.formatted_address || '',
                      }));
                    }
                  }}
                  options={{
                    componentRestrictions: { country: "de" },
                    types: ['address']
                  }}
                >
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className={`w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none border border-black`}
                    placeholder="Zieladresse eingeben"
                    required
                  />
                </Autocomplete>
                <MapPin className="absolute left-3 top-3 text-gray-400" />
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <input
                  type="text"
                  name="pickupLocation"
                  placeholder="Abholadresse"
                  className="w-full p-3 pl-10 border rounded-md bg-zinc-800 text-white"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  required
                />
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="destination"
                  placeholder="Zieladresse"
                  className="w-full p-3 pl-10 border rounded-md bg-zinc-800 text-white"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  required
                />
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Sie haben Google Maps nicht aktiviert. Die Adressvalidierung und Autovervollständigung sind nicht verfügbar.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Telefon *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none border border-black`}
                placeholder="Ihre Telefonnummer"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">E-Mail *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none border border-black`}
                placeholder="Ihre E-Mail-Adresse"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Fahrzeugtyp *</label>
            <div className="relative">
              <Car className="absolute left-3 top-3 text-gray-400" />
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none appearance-none border border-black"
                required
              >
                <option value="standard">Standard</option>
                <option value="taxi">Taxi</option>
                <option value="taxi-gross">Taxi-Großraum</option>
                <option value="mietwagen">Mietwagen</option>
                <option value="minivan">Minivan</option>
              </select>
            </div>
          </div>
          {isScheduled && (
            <div>
              <label className="block mb-2">Termin auswählen*</label>
              <div className="relative w-full">
                <DatePicker
                  selected={selectedDateTime}
                  onChange={(date) => setSelectedDateTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={new Date()}
                  filterTime={isTimeSlotAvailable}
                  className={`w-full bg-zinc-800 rounded-lg py-2 px-4 focus:ring-2 focus:ring-yellow-500 outline-none border border-black`}
                  placeholderText="Termin auswählen"
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`flex-1 bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold transition-colors ${
              !isFormValid
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : 'hover:bg-yellow-400'
            }`}
          >
            {hasConsent ? 'Berechnen' : 'Buchen'}
          </button>
        </div>
      </form>
    </div>
  );
}