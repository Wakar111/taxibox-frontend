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

interface BookedSlot {
  time: string;
  vehicleType: string;
}

const MAX_BOOKINGS_PER_SLOT = 3;

const getBookingCount = (date: string, time: string, vehicleType: string): number => {
  try {
    const bookedSlots: BookedSlot[] = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
    const targetDateTime = new Date(`${date}T${time}`);
    
    return bookedSlots.filter(slot => {
      const bookedTime = new Date(slot.time);
      return (
        bookedTime.getFullYear() === targetDateTime.getFullYear() &&
        bookedTime.getMonth() === targetDateTime.getMonth() &&
        bookedTime.getDate() === targetDateTime.getDate() &&
        bookedTime.getHours() === targetDateTime.getHours() &&
        bookedTime.getMinutes() === targetDateTime.getMinutes() &&
        slot.vehicleType === vehicleType
      );
    }).length;
  } catch (error) {
    console.error('Error checking booking count:', error);
    return 0;
  }
};

const addBookedSlot = (date: string, time: string, vehicleType: string) => {
  try {
    const bookedSlots: BookedSlot[] = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
    const dateTime = new Date(`${date}T${time}`);
    bookedSlots.push({
      time: dateTime.toISOString(),
      vehicleType: vehicleType
    });
    localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
  } catch (error) {
    console.error('Error adding booked slot:', error);
  }
};

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

    // Check booking limit for scheduled rides
    if (bookingDetails.isScheduled && bookingDetails.date && bookingDetails.time) {
      const bookingCount = getBookingCount(
        bookingDetails.date,
        bookingDetails.time,
        bookingDetails.vehicleType
      );
      
      if (bookingCount >= MAX_BOOKINGS_PER_SLOT) {
        setSubmitStatus({
          type: 'error',
          message: `Diese Zeit ist für ${bookingDetails.vehicleType} bereits ausgebucht. Bitte wählen Sie eine andere Zeit oder ein anderes Fahrzeug.`
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Handle date/time string - use 'Sofort' for immediate bookings
    const dateTimeString = bookingDetails.isScheduled && bookingDetails.date && bookingDetails.time
        ? `${bookingDetails.date} ${bookingDetails.time}`
        : 'Sofort';
    
    const bookingData = {
      type: bookingDetails.isScheduled ? 'Geplante Fahrt' : 'Sofortige Fahrt',
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
        // Save the booked slot if it's a scheduled ride
        if (bookingDetails.isScheduled && bookingDetails.date && bookingDetails.time) {
          addBookedSlot(bookingDetails.date, bookingDetails.time, bookingDetails.vehicleType);
        }

        setBookingNumber(data.bookingNumber);
        setSubmitStatus({
          type: 'success',
          message: `Buchung erfolgreich bestätigt! Ihre Fahrt-Nummer ist: ${data.bookingNumber}. Überprüfen Sie Ihre E-Mail (Spam-Ordner) für Details.`
        });

        // Auto-hide success message after 10 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
          setBookingNumber('');
          navigate('/');
        }, 10000);
      } else {
        throw new Error(data.error || 'Buchung fehlgeschlagen');
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

          {/* Map */}
          {isLoaded && directions && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Route</h2>
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
                    }
                  ]
                }}
              >
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      strokeColor: "#FFD700",
                      strokeWeight: 4
                    }
                  }}
                />
              </GoogleMap>
            </div>
          )}

          {/* Booking Details */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Buchungsdetails</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 block">Abholung:</label>
                  <p className="text-white">{bookingDetails.startAddress}</p>
                </div>
                <div>
                  <label className="text-gray-400 block">Ziel:</label>
                  <p className="text-white">{bookingDetails.endAddress}</p>
                </div>
                <div>
                  <label className="text-gray-400 block">Entfernung:</label>
                  <p className="text-white">{bookingDetails.distance.toFixed(2)} km</p>
                </div>
                <div>
                  <label className="text-gray-400 block">Fahrtdauer:</label>
                  <p className="text-white">{bookingDetails.duration}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 block">Fahrzeugtyp:</label>
                  <p className="text-white">{bookingDetails.vehicleType}</p>
                </div>
                <div>
                  <label className="text-gray-400 block">Datum/Zeit:</label>
                  <p className="text-white">
                    {bookingDetails.isScheduled
                      ? `${bookingDetails.date} ${bookingDetails.time}`
                      : 'Sofort'}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 block">Telefon:</label>
                  <p className="text-white">{bookingDetails.phone}</p>
                </div>
                <div>
                  <label className="text-gray-400 block">E-Mail:</label>
                  <p className="text-white">{bookingDetails.email}</p>
                </div>
              </div>
            </div>
          </div>


          {/* Price Summary */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Preis Übersicht</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-gray-300">
                <span>Grundpreis:</span>
                <span>{(bookingDetails.vehicleType === 'taxi-gross' ? bookingDetails.price.base - 5 : bookingDetails.price.base).toFixed(2)}€</span>
              </div>
              {bookingDetails.vehicleType === 'taxi-gross' && (
                <div className="flex justify-between items-center text-gray-300">
                  <span>Großraum-Umschlag:</span>
                  <span>5.00€</span>
                </div>
              )}
              <div className="flex justify-between items-center text-gray-300">
                <span>Km Preis:</span>
                <span>{bookingDetails.price.perKm.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between items-center text-white font-semibold text-lg pt-2 border-t border-gray-700">
                <span>Gesamtpreis:</span>
                <span>{bookingDetails.price.total.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600 transition"
            >
              Zurück
            </button>
            {submitStatus.type !== 'success' && (
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
            )}
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

      <Footer />
    </div>
  );
}
