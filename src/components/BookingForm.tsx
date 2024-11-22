import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Car } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";

export default function BookingForm() {
  const [isScheduled, setIsScheduled] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    destination: '',
    phone: '',
    email: '',
    vehicleType: 'taxi'
  });
  const [errors, setErrors] = useState({
    pickupLocation: '',
    destination: '',
    phone: '',
    email: '',
    dateTime: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const vehicleTypes = [
    { value: 'taxi', label: 'Taxi (max 4 persons)' },
    { value: 'mietwagen', label: 'Mietwagen (max 4 Persons)' },
    { value: 'minivan', label: 'Minivan (max 8 Persons)' }
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      pickupLocation: !formData.pickupLocation ? 'Pickup location is required' : '',
      destination: !formData.destination ? 'Destination is required' : '',
      phone: !formData.phone ? 'Phone number is required' : '',
      email: !formData.email 
        ? 'Email is required' 
        : !validateEmail(formData.email) 
        ? 'Please enter a valid email'
        : '',
      dateTime: isScheduled && !selectedDateTime ? 'Date and time is required' : ''
    };

    setErrors(newErrors);

    // Form is valid if there are no error messages and all required fields are filled
    const isValid = Object.values(newErrors).every(error => !error) && 
      formData.pickupLocation !== '' && 
      formData.destination !== '' && 
      formData.phone !== '' && 
      formData.email !== '' && 
      (!isScheduled || selectedDateTime !== null);

    setIsFormValid(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData, selectedDateTime, isScheduled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short'
    }).format(date);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const bookingDetails = {
      type: isScheduled ? 'Scheduled Ride' : 'Immediate Ride',
      pickupLocation: formData.pickupLocation,
      destination: formData.destination,
      dateTime: isScheduled ? formatDateTime(selectedDateTime) : 'As soon as possible',
      phone: formData.phone,
      email: formData.email,
      vehicleType: formData.vehicleType
    };

    try {
      const response = await fetch('http://localhost:3001/api/book-ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message
        });

        // Reset form
        setFormData({
          pickupLocation: '',
          destination: '',
          phone: '',
          email: '',
          vehicleType: 'taxi'
        });
        setSelectedDateTime(null);
      } else {
        throw new Error(data.message);
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

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-green-800/20 text-green-400'
              : 'bg-red-800/20 text-red-400'
          }`}
        >
          {submitStatus.message}
        </div>
      )}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <button
          type="button"
          onClick={() => setIsScheduled(false)}
          className={`px-6 py-2 rounded-full transition ${
            !isScheduled
              ? 'bg-yellow-500 text-black font-semibold'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
        >
          Ride Now
        </button>
        <button
          type="button"
          onClick={() => setIsScheduled(true)}
          className={`px-6 py-2 rounded-full transition ${
            isScheduled
              ? 'bg-yellow-500 text-black font-semibold'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
        >
          Schedule Ride
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2">Pickup Location *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              className={`w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none ${
                showErrors && errors.pickupLocation ? 'border-2 border-red-500' : ''
              }`}
              placeholder="Enter pickup address"
              required
            />
            {showErrors && errors.pickupLocation && (
              <span className="text-red-500 text-sm mt-1">{errors.pickupLocation}</span>
            )}
          </div>
        </div>
        <div>
          <label className="block mb-2">Destination *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              className={`w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none ${
                showErrors && errors.destination ? 'border-2 border-red-500' : ''
              }`}
              placeholder="Enter destination"
              required
            />
            {showErrors && errors.destination && (
              <span className="text-red-500 text-sm mt-1">{errors.destination}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2">Phone *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none ${
                showErrors && errors.phone ? 'border-2 border-red-500' : ''
              }`}
              placeholder="Your phone number"
              required
            />
            {showErrors && errors.phone && (
              <span className="text-red-500 text-sm mt-1">{errors.phone}</span>
            )}
          </div>
        </div>
        <div>
          <label className="block mb-2">Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none ${
                showErrors && errors.email ? 'border-2 border-red-500' : ''
              }`}
              placeholder="Your email"
              required
            />
            {showErrors && errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2">Vehicle Type *</label>
          <div className="relative">
            <Car className="absolute left-3 top-3 text-gray-400" />
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              className="w-full bg-zinc-800 rounded-lg py-2 px-10 focus:ring-2 focus:ring-yellow-500 outline-none appearance-none"
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
            <label className="block mb-2">Select Date and Time *</label>
            <div className="relative w-full">
              <DatePicker
                selected={selectedDateTime}
                onChange={(date) => setSelectedDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className={`w-full bg-zinc-800 rounded-lg py-2 px-4 focus:ring-2 focus:ring-yellow-500 outline-none ${
                  showErrors && errors.dateTime ? 'border-2 border-red-500' : ''
                }`}
                placeholderText="Select date and time"
                required
              />
              {showErrors && errors.dateTime && (
                <span className="text-red-500 text-sm mt-1">{errors.dateTime}</span>
              )}
            </div>
          </div>
        )}
      </div>

      <button 
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          isFormValid && !isSubmitting
            ? 'bg-yellow-500 text-black hover:bg-yellow-400'
            : 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? 'Booking...' : 'Book Now'}
      </button>
    </form>
  );
}