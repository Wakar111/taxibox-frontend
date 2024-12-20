import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useGoogleMaps } from '../contexts/GoogleMapsContext';

interface BookingDetails {
  startAddress: string;
  endAddress: string;
  distance: number;
  duration: string;
  isScheduled: boolean;
  date: string | null;
  time: string | null;
  passengers: number;
  phone: string;
  email: string;
  vehicleType: string;
  price: {
    base: number;
    perKm: number;
    total: number;
  };
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.75rem'
};

const center = {
  lat: 50.0782,
  lng: 8.2397
};

export default function BookingOverview() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails as BookingDetails;
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const { isLoaded } = useGoogleMaps();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [bookingNumber, setBookingNumber] = useState('');

  // Debug log to check received data
  useEffect(() => {
    console.log('Received booking details:', bookingDetails);
  }, [bookingDetails]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!bookingDetails || !isLoaded) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: bookingDetails.startAddress,
        destination: bookingDetails.endAddress,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        }
      }
    );
  }, [bookingDetails, isLoaded]);

  const handleBookingConfirmation = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // Handle date/time string - use 'Sofort' for immediate bookings
    const dateTimeString = bookingDetails.isScheduled && bookingDetails.date && bookingDetails.time
        ? `${bookingDetails.date} ${bookingDetails.time}`
        : 'Sofort';
    
    const bookingData = {
      type: bookingDetails.isScheduled ? 'Scheduled Ride' : 'Immediate Ride',
      pickupLocation: bookingDetails.startAddress,
      destination: bookingDetails.endAddress,
      dateTime: dateTimeString,
      phone: bookingDetails.phone,
      email: bookingDetails.email,
      vehicleType: bookingDetails.vehicleType,
      passengers: bookingDetails.passengers,
      price: bookingDetails.price.total,
      distance: bookingDetails.distance,
      duration: bookingDetails.duration
    };

    console.log('Sending booking data:', bookingData);
    
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    try {
      const response = await fetch(`${apiUrl}/api/book-ride`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setBookingNumber(data.bookingNumber);
        setSubmitStatus({
          type: 'success',
          message: `Buchung erfolgreich bestätigt! Ihre Fahrt-Nummer ist: ${data.bookingNumber}. Eine Bestätigungs-E-Mail wurde an ${bookingDetails.email} gesendet.`
        });

        // Show success message for 5 seconds before navigating
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
          setBookingNumber('');
          navigate('/', { 
            state: { 
              bookingSuccess: true,
              bookingNumber: data.bookingNumber 
            } 
          });
        }, 5000);
      } else {
        throw new Error(data.error || 'Buchung konnte nicht durchgeführt werden');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.'
      });
      console.error('Booking submission error:', error);
    }

    setIsSubmitting(false);
  };

  if (!bookingDetails) {
    navigate('/');
    return null;
  }

  if (!isLoaded) {
    return <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <Navbar showNavLinks={false} />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Buchungsübersicht</h1>
            <p className="text-gray-300">
              Überprüfen Sie Ihre Buchungsdetails
            </p>
          </div>

          {/* Google Map */}
          <div className="max-w-4xl mx-auto mb-8">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
              options={{
                styles: [
                  {
                    elementType: "geometry",
                    stylers: [{ color: "#242f3e" }]
                  },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#242f3e" }]
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#746855" }]
                  },
                  {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }]
                  },
                  {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }]
                  },
                  {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#263c3f" }]
                  },
                  {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#6b9a76" }]
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#38414e" }]
                  },
                  {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#212a37" }]
                  },
                  {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9ca5b3" }]
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{ color: "#746855" }]
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#1f2835" }]
                  },
                  {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#f3d19c" }]
                  },
                  {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#2f3948" }]
                  },
                  {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }]
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#17263c" }]
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#515c6d" }]
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#17263c" }]
                  }
                ]
              }}
            >
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      strokeColor: '#F59E0B',
                      strokeWeight: 4
                    }
                  }}
                />
              )}
            </GoogleMap>
          </div>

          <div className="max-w-4xl mx-auto bg-zinc-800/50 backdrop-blur-sm p-8 rounded-xl">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Fahrtdetails */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Fahrtdetails</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400">Startadresse:</label>
                    <p>{bookingDetails.startAddress}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Zieladresse:</label>
                    <p>{bookingDetails.endAddress}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Abfahrt:</label>
                    <p>{bookingDetails.isScheduled 
                      ? `${bookingDetails.date} ${bookingDetails.time}`
                      : 'Sofort'}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400">Fahrzeugtyp:</label>
                    <p>{bookingDetails.vehicleType}</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Preisdetails */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Preisdetails</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400">Entfernung:</label>
                    <p className="text-right">{bookingDetails.distance.toFixed(1)} km</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Fahrtzeit:</label>
                    <p className="text-right">{bookingDetails.duration}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Grundpreis:</label>
                    <p className="text-right">{bookingDetails.price.base.toFixed(2)}€</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Kilometerpreis:</label>
                    <p className="text-right">{bookingDetails.price.perKm.toFixed(2)}€</p>
                  </div>
                  <div className="pt-4 border-t border-zinc-700">
                    <label className="text-yellow-500 font-bold">Gesamtpreis:</label>
                    <p className="text-right text-yellow-500 font-bold">{bookingDetails.price.total.toFixed(2)}€</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-4 italic">
                  Hinweis: Preis und Fahrtzeit sind Schätzungen und können sich aufgrund von Verkehr, Wetter und anderen Faktoren ändern.
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600 transition"
              >
                Zurück
              </button>
              <button
                onClick={handleBookingConfirmation}
                disabled={isSubmitting}
                className={`px-8 py-2 rounded transition ${
                  isSubmitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-yellow-500 text-black hover:bg-yellow-400'
                }`}
              >
                {isSubmitting ? 'Wird gebucht...' : 'Buchung bestätigen'}
              </button>
            </div>

            {submitStatus.type && (
              <div 
                className={`mt-8 p-6 rounded-lg text-center ${
                  submitStatus.type === 'success'
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}
              >
                <p className="text-lg font-medium">{submitStatus.message}</p>
                {submitStatus.type === 'success' && (
                  <p className="mt-4 text-sm text-gray-400">
                    Sie werden in Kürze zur Startseite weitergeleitet...
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
