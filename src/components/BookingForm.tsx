import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Car } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";
import { Autocomplete } from '@react-google-maps/api';
import { useGoogleMaps } from '../contexts/GoogleMapsContext';
import { useNavigate } from 'react-router-dom';

const MAINZ_CENTER = { lat: 50.0, lng: 8.2711 }; // Mainz center coordinates
const WIESBADEN_CENTER = { lat: 50.0782, lng: 8.2397 }; // Wiesbaden center coordinates
const MAX_RADIUS = 20000; // 20km radius in meters

export default function BookingForm() {
  const { isLoaded } = useGoogleMaps();
  const navigate = useNavigate();

  // Function to check if a location is within radius of either Mainz or Wiesbaden
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

  const [isScheduled, setIsScheduled] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    destination: '',
    phone: '',
    email: '',
    vehicleType: 'taxi'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const [bookingNumber, setBookingNumber] = useState<string>('');
  const [pickupError, setPickupError] = useState('');

  const [pickupAutocomplete, setPickupAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  interface BookedSlot {
    time: string;
    vehicleType: string;
  }

  const MAX_BOOKINGS_PER_SLOT = 3;

  const vehicleTypes = [
    { value: 'taxi', label: 'Taxi (max 4 persons)' },
    { value: 'mietwagen', label: 'Mietwagen (max 4 Persons)' },
    { value: 'minivan', label: 'Minivan (max 8 Persons)' }
  ];

  const getBookingCount = (time: Date, vehicleType: string): number => {
    try {
      const bookedSlots: BookedSlot[] = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
      return bookedSlots.filter(slot => {
        const bookedTime = new Date(slot.time);
        return (
          bookedTime.getFullYear() === time.getFullYear() &&
          bookedTime.getMonth() === time.getMonth() &&
          bookedTime.getDate() === time.getDate() &&
          bookedTime.getHours() === time.getHours() &&
          bookedTime.getMinutes() === time.getMinutes() &&
          slot.vehicleType === vehicleType
        );
      }).length;
    } catch (error) {
      console.error('Error checking booking count:', error);
      return 0;
    }
  };

  const isTimeSlotBooked = (time: Date) => {
    try {
      const count = getBookingCount(time, formData.vehicleType);
      return count >= MAX_BOOKINGS_PER_SLOT;
    } catch (error) {
      console.error('Error checking booked slots:', error);
      return false;
    }
  };

  const addBookedSlot = (time: Date) => {
    try {
      const bookedSlots: BookedSlot[] = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
      bookedSlots.push({
        time: time.toISOString(),
        vehicleType: formData.vehicleType
      });
      localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
    } catch (error) {
      console.error('Error saving booked slot:', error);
    }
  };

  const timeClassName = (time: Date) => {
    const count = getBookingCount(time, formData.vehicleType);
    if (count >= MAX_BOOKINGS_PER_SLOT) {
      return 'fully-booked-time-slot';
    }
    if (count > 0) {
      return 'partially-booked-time-slot';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateForm();
  };

  const handleSchedulingChange = (scheduled: boolean) => {
    setIsScheduled(scheduled);
    // Always clear the date when switching modes
    setSelectedDateTime(null);
    // Force button to disabled state when switching to scheduled mode
    if (scheduled) {
      setIsFormValid(false);
    } else {
      // When switching to immediate mode, validate other fields
      validateForm();
    }
  };

  const validateForm = () => {
    // Check if all required fields are filled
    const isValid = 
      formData.pickupLocation.trim() !== '' &&
      formData.destination.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.email.trim() !== '' &&
      // For scheduled rides, require date/time selection
      (!isScheduled || (isScheduled && selectedDateTime !== null));

    setIsFormValid(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [
    formData.pickupLocation,
    formData.destination,
    formData.phone,
    formData.email,
    selectedDateTime,
    isScheduled
  ]);

  useEffect(() => {
    if (selectedDateTime) {
      validateForm();
    }
  }, [formData.vehicleType]);

  useEffect(() => {
    // Remove the API key fetching code
  }, []);

  const isTimeSlotAvailable = (time: Date) => {
    const now = new Date();
    if (time < now) return false;

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    if (time > thirtyDaysFromNow) return false;

    // Check if the time slot is already booked
    return !isTimeSlotBooked(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    // Check if the selected time slot is still available
    if (isScheduled && selectedDateTime) {
      const bookingCount = getBookingCount(selectedDateTime, formData.vehicleType);
      if (bookingCount >= MAX_BOOKINGS_PER_SLOT) {
        setSubmitStatus({
          type: 'error',
          message: `This time slot is fully booked for ${formData.vehicleType}. Please select another time or vehicle type.`
        });
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const bookingDetails = {
      type: isScheduled ? 'Scheduled Ride' : 'Immediate Ride',
      pickupLocation: formData.pickupLocation,
      destination: formData.destination,
      dateTime: isScheduled && selectedDateTime ? selectedDateTime.toISOString() : 'As soon as possible',
      phone: formData.phone,
      email: formData.email,
      vehicleType: formData.vehicleType
    };

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    try {
      const response = await fetch(`${apiUrl}/api/book-ride`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Save the booked slot if it's a scheduled ride
        if (isScheduled && selectedDateTime) {
          addBookedSlot(selectedDateTime);
        }

        setBookingNumber(data.bookingNumber);
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Booking confirmed! Check your email (spam folder) for details.'
        });

        // Auto-hide success message after 10 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
          setBookingNumber('');
        }, 10000);

        setFormData({
          pickupLocation: '',
          destination: '',
          phone: '',
          email: '',
          vehicleType: 'taxi'
        });
        setSelectedDateTime(null);
      } else {
        throw new Error(data.error || 'Failed to submit booking');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit booking. Please try again.'
      });
      console.error('Booking submission error:', error);
    }

    setIsSubmitting(false);
  };

  const handleCalculate = async () => {
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Bitte füllen Sie alle Pflichtfelder aus.'
      });
      return;
    }

    const service = new google.maps.DirectionsService();
    
    try {
      const result = await new Promise((resolve, reject) => {
        service.route(
          {
            origin: formData.pickupLocation,
            destination: formData.destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === 'OK' && result) {
              resolve(result);
            } else {
              reject(new Error('Route konnte nicht berechnet werden'));
            }
          }
        );
      }) as google.maps.DirectionsResult;

      const route = result.routes[0];
      if (!route || !route.legs[0]) {
        throw new Error('Keine gültige Route gefunden');
      }

      const distance = route.legs[0].distance?.value || 0; // in meters
      const duration = route.legs[0].duration?.text || '';
      const distanceInKm = distance / 1000;

      // Calculate price
      const baseFare = 3.50;
      const pricePerKm = 2.20;
      const totalPrice = baseFare + (distanceInKm * pricePerKm);

      // Format date and time if scheduled
      const bookingDate = isScheduled && selectedDateTime 
        ? selectedDateTime.toISOString().split('T')[0] // This will give YYYY-MM-DD
        : null;

      const bookingTime = isScheduled && selectedDateTime
        ? selectedDateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        : null;

      // Log the values before navigation
      console.log('Scheduled:', isScheduled);
      console.log('Selected DateTime:', selectedDateTime);
      console.log('Formatted Date:', bookingDate);
      console.log('Formatted Time:', bookingTime);

      navigate('/booking-overview', {
        state: {
          bookingDetails: {
            startAddress: formData.pickupLocation,
            endAddress: formData.destination,
            isScheduled: isScheduled,
            date: bookingDate,
            time: bookingTime,
            passengers: 1,
            distance: distanceInKm,
            duration: duration,
            phone: formData.phone,
            email: formData.email,
            vehicleType: formData.vehicleType,
            price: {
              base: baseFare,
              perKm: pricePerKm * distanceInKm,
              total: totalPrice
            }
          }
        }
      });

    } catch (error) {
      console.error('Error calculating route:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Fehler bei der Routenberechnung'
      });
    }
  };

  const onPickupLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setPickupAutocomplete(autocomplete);
  };

  const onDestinationLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setDestinationAutocomplete(autocomplete);
  };

  const onPickupPlaceChanged = () => {
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
  };

  const onDestinationPlaceChanged = () => {
    if (destinationAutocomplete) {
      const place = destinationAutocomplete.getPlace();
      setFormData(prev => ({
        ...prev,
        destination: place.formatted_address || '',
      }));
    }
  };

  return (
    <div>
      {isLoaded ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {submitStatus.type && (
            <div className={`mb-4 p-4 rounded-md ${
              submitStatus.type === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className={`text-sm ${
                submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {submitStatus.message}
                {submitStatus.type === 'success' && bookingNumber && (
                  <div className="mt-2 p-3 bg-white rounded-md border border-green-200">
                    <p className="font-semibold">Booking Number:</p>
                    <p className="text-lg font-mono">{bookingNumber}</p>
                    <p className="text-xs mt-1 text-gray-600">
                      Please save this number for your reference
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg space-y-6">
            {/* Booking Type Selection */}
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Abholort *</label>
                <div className="relative">
                  <Autocomplete
                    onLoad={onPickupLoad}
                    onPlaceChanged={onPickupPlaceChanged}
                    options={{
                      componentRestrictions: { country: 'de' },
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
                {pickupError && (
                  <p className="mt-2 text-sm text-red-500">
                    {pickupError}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2">Zielort *</label>
                <div className="relative">
                  <Autocomplete
                    onLoad={onDestinationLoad}
                    onPlaceChanged={onDestinationPlaceChanged}
                    options={{
                      componentRestrictions: { country: 'de' },
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
              </div>
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none appearance-none border border-black"
                    required
                  >
                    {vehicleTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
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
                      timeClassName={timeClassName}
                      className={`w-full bg-zinc-800 rounded-lg py-2 px-4 focus:ring-2 focus:ring-yellow-500 outline-none border border-black`}
                      placeholderText="Termin auswählen"
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Hinweis: Maximal {MAX_BOOKINGS_PER_SLOT} Buchungen pro Zeitfenster für jeden Fahrzeugtyp zulässig.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className={`flex-1 bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isSubmitting || !isFormValid 
                    ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                    : 'hover:bg-yellow-400'
                }`}
              >
                {isSubmitting ? 'Booking...' : 'Buchen'}
              </button>
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!isFormValid}
                className={`flex-1 bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold transition-colors ${
                  !isFormValid 
                    ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                    : 'hover:bg-yellow-400'
                }`}
              >
                Berechnen
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}