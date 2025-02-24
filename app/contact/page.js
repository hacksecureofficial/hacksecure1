'use client'

import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react';  // Import Formspree
import Navbar from './navbar'  // Correct the import path
import Footer from './footer'  // Correct the import path

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'Contact Form Submission', // Default subject or set a custom subject
  });

  // Formspree form handling
  const [state, handleSubmit] = useForm("mlddkqgv"); // Your Formspree form ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* Success Banner */}
      {state.succeeded && (
        <div className="bg-green-500 text-white text-center py-4">
          <p>Thank you for submitting your message!</p>
        </div>
      )}

      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-6">HACK SEC</h1>

        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          {!state.succeeded ? (
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>
              
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  required
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                />
              </div>

              {/* Subject Field */}
              <div className="mb-4">
                <label htmlFor="subject" className="block text-lg font-semibold mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="mb-4">
                <label htmlFor="message" className="block text-lg font-semibold mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows="4"
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  required
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button 
                  type="submit" 
                  className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300"
                  disabled={state.submitting}
                >
                  Send Message
                </button>
              </div>
            </form>
          ) : (
            // After submission, show the "Thank you" message and the button to return
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-300 mb-4">
                Your message has been sent successfully. Thank you!
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300"
              >
                Submit Another Message
              </button>
            </div>
          )}
          
          {/* Contact Email Text */}
          {!state.succeeded && (
            <div className="mt-4 text-center text-lg text-gray-300">
              <p>If you have any issues, contact directly at this email: <a href="mailto:indiedevadi@gmail.com" className="text-blue-400">indiedevadi@gmail.com</a></p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
