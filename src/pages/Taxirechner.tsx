import React, { useLayoutEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Autocomplete } from '@react-google-maps/api';
import { useGoogleMaps } from '../contexts/GoogleMapsContext';

const standardTaxiRates = [
  { type: 'Grundpreis', price: '3.50€' },
  { type: 'Pro Kilometer', price: '2.20€' },
  { type: 'Wartezeit pro Stunde', price: '30.00€' },
];

export default function Taxirechner() {
  const navigate = useNavigate();
  const { isLoaded } = useGoogleMaps();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pickupAutocomplete, setPickupAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const onPickupLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setPickupAutocomplete(autocomplete);
  }, []);

  const onDestinationLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setDestinationAutocomplete(autocomplete);
  }, []);

  const onPickupPlaceChanged = useCallback(() => {
    if (pickupAutocomplete) {
      const place = pickupAutocomplete.getPlace();
      if (place.formatted_address) {
        setPickup(place.formatted_address);
      }
    }
  }, [pickupAutocomplete]);

  const onDestinationPlaceChanged = useCallback(() => {
    if (destinationAutocomplete) {
      const place = destinationAutocomplete.getPlace();
      if (place.formatted_address) {
        setDestination(place.formatted_address);
      }
    }
  }, [destinationAutocomplete]);

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickup(e.target.value);
    if (e.target.value === '') {
      setDistance(null);
      setDuration(null);
      setPrice(null);
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
    if (e.target.value === '') {
      setDistance(null);
      setDuration(null);
      setPrice(null);
    }
  };

  const calculateRoute = () => {
    if (!pickupAutocomplete || !destinationAutocomplete) {
      setError('Bitte geben Sie Start- und Zieladresse ein');
      return;
    }

    const pickupPlace = pickupAutocomplete.getPlace();
    const destinationPlace = destinationAutocomplete.getPlace();

    if (!pickupPlace?.geometry?.location || !destinationPlace?.geometry?.location) {
      setError('Bitte wählen Sie gültige Adressen aus den Vorschlägen');
      return;
    }

    // Store the selected addresses
    setSelectedPickup(pickupPlace.formatted_address || pickup);
    setSelectedDestination(destinationPlace.formatted_address || destination);
    
    // Clear input fields
    setPickup('');
    setDestination('');

    const service = new window.google.maps.DistanceMatrixService();
    
    service.getDistanceMatrix({
      origins: [{ lat: pickupPlace.geometry.location.lat(), lng: pickupPlace.geometry.location.lng() }],
      destinations: [{ lat: destinationPlace.geometry.location.lat(), lng: destinationPlace.geometry.location.lng() }],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {
      if (status === 'OK' && response) {
        const route = response.rows[0].elements[0];
        if (route.status === 'OK') {
          const distanceInKm = route.distance.value / 1000;
          setDistance(distanceInKm);
          setDuration(route.duration.text);
          
          // Calculate price: base fare + (price per km * distance)
          const baseFare = 3.50;
          const pricePerKm = 2.20;
          const totalPrice = baseFare + (pricePerKm * distanceInKm);
          setPrice(Math.round(totalPrice * 100) / 100);
          
          setError(null);
        } else {
          setError('Route konnte nicht berechnet werden');
        }
      } else {
        setError('Fehler bei der Routenberechnung');
      }
    });
  };

  const handleBookNow = () => {
    navigate('/', { state: { scrollToBooking: true } });
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <Navbar showNavLinks={false} />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Taxirechner</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Berechnen Sie den Fahrpreis für Ihre Taxifahrt. Alle Preise inklusive Gepäckservice.
            </p>
          </div>

          {/* Standard Taxi Rates */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Standard Taxitarife</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {standardTaxiRates.map((rate) => (
                <div key={rate.type} className="bg-zinc-800 p-6 rounded-lg">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-lg mb-2">{rate.type}</span>
                    <span className="text-2xl font-bold text-yellow-500">{rate.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distance Calculator */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Streckenberechnung</h2>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="space-y-4">
                {!isLoaded ? (
                  <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                    <div className="text-center">
                      <p className="text-lg">Google Maps wird geladen...</p>
                      <p className="text-sm text-gray-400">Dies kann einen Moment dauern</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label htmlFor="pickup" className="block text-sm font-medium mb-1">
                        Startadresse
                      </label>
                      <Autocomplete
                        onLoad={onPickupLoad}
                        onPlaceChanged={onPickupPlaceChanged}
                        restrictions={{ country: "de" }}
                      >
                        <input
                          id="pickup"
                          type="text"
                          className="w-full p-3 rounded bg-zinc-700 text-white"
                          placeholder="Startadresse eingeben"
                          value={pickup}
                          onChange={handlePickupChange}
                        />
                      </Autocomplete>
                    </div>
                    <div>
                      <label htmlFor="destination" className="block text-sm font-medium mb-1">
                        Zieladresse
                      </label>
                      <Autocomplete
                        onLoad={onDestinationLoad}
                        onPlaceChanged={onDestinationPlaceChanged}
                        restrictions={{ country: "de" }}
                      >
                        <input
                          id="destination"
                          type="text"
                          className="w-full p-3 rounded bg-zinc-700 text-white"
                          placeholder="Zieladresse eingeben"
                          value={destination}
                          onChange={handleDestinationChange}
                        />
                      </Autocomplete>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        onClick={calculateRoute}
                        className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                      >
                        Berechnen
                      </button>
                    </div>
                  </>
                )}

                {error && (
                  <div className="text-red-500 text-sm mt-2 text-center">
                    {error}
                  </div>
                )}

                {distance !== null && price !== null && (
                  <div className="mt-6 space-y-2">
                    {selectedPickup && (
                      <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                        <span>Startadresse:</span>
                        <span className="font-semibold text-right">{selectedPickup}</span>
                      </div>
                    )}
                    {selectedDestination && (
                      <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                        <span>Zieladresse:</span>
                        <span className="font-semibold text-right">{selectedDestination}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                      <span>Entfernung:</span>
                      <span className="font-semibold">{distance.toFixed(1)} km</span>
                    </div>
                    {duration && (
                      <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                        <span>Fahrtzeit:</span>
                        <span className="font-semibold">{duration}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                      <span>Grundpreis:</span>
                      <span className="font-semibold">3.50€</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                      <span>Kilometerpreis:</span>
                      <span className="font-semibold">{(distance * 2.20).toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between items-center py-4 text-xl font-bold text-yellow-500">
                      <span>Gesamtpreis:</span>
                      <span>{price.toFixed(2)}€</span>
                    </div>
                    <div className="mt-4 text-sm text-gray-400 italic">
                      <p>Hinweis: Preis und Fahrtzeit sind Schätzungen und können sich aufgrund von Verkehr, Wetter und anderen Faktoren ändern.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleBookNow}
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Jetzt Buchen
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
