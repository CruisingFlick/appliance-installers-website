import React, { useState } from "react";

interface OnboardingData {
  customerType: 'residential' | 'commercial' | '';
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  urgency: string;
  additionalInfo: string;
}

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    customerType: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    urgency: '',
    additionalInfo: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // This will integrate with the CRM API
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form. Please try again.');
    }
  };

  const updateFormData = (field: keyof OnboardingData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Aboard!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing us. We'll contact you within 24 hours to schedule your installation.
          </p>
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              <strong>Reference:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Onboarding</h1>
            <p className="text-gray-600">
              Let's get started with your appliance installation
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {step} of 4</span>
              <span className="text-sm text-gray-600">{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Type</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => updateFormData('customerType', 'residential')}
                    className={`w-full p-6 border-2 rounded-lg text-left transition-colors ${
                      formData.customerType === 'residential' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Residential Customer</h3>
                    <p className="text-gray-600">Home appliance installation services</p>
                  </button>
                  
                  <button
                    onClick={() => updateFormData('customerType', 'commercial')}
                    className={`w-full p-6 border-2 rounded-lg text-left transition-colors ${
                      formData.customerType === 'commercial' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Commercial Customer</h3>
                    <p className="text-gray-600">Business and commercial installations</p>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Installation Address *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => updateFormData('address', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => updateFormData('serviceType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="oven">Oven Installation</option>
                      <option value="cooktop">Cooktop Installation</option>
                      <option value="dishwasher">Dishwasher Installation</option>
                      <option value="washing-machine">Washing Machine Installation</option>
                      <option value="dryer">Dryer Installation</option>
                      <option value="air-conditioning">Air Conditioning Installation</option>
                      <option value="hot-water">Hot Water System Installation</option>
                      <option value="multiple">Multiple Appliances</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency *</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => updateFormData('urgency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select urgency</option>
                      <option value="flexible">Flexible (within 2 weeks)</option>
                      <option value="standard">Standard (within 1 week)</option>
                      <option value="urgent">Urgent (within 3 days)</option>
                      <option value="emergency">Emergency (same day)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any specific requirements, existing electrical setup, accessibility needs, etc."
                  />
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Summary:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>Customer Type: {formData.customerType}</li>
                    <li>Name: {formData.name}</li>
                    <li>Email: {formData.email}</li>
                    <li>Service: {formData.serviceType}</li>
                    <li>Urgency: {formData.urgency}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.customerType) ||
                  (step === 2 && (!formData.name || !formData.email || !formData.phone || !formData.address)) ||
                  (step === 3 && (!formData.serviceType || !formData.urgency))
                }
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
              >
                {step === 4 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}