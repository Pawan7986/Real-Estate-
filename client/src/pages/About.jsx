import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="relative bg-white text-gray-800">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center text-center px-6">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/realestate.mp4"
          autoPlay
          loop
          muted
        ></video>
        {/* Softer overlay for better visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Content over video */}
        <div className="relative z-10 max-w-4xl mx-auto text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            About <span className="text-green-400">HOMELAND</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 leading-relaxed">
            Discover who we are and how we help people find their perfect homes in India’s top cities.
          </p>
          <Link
            to="/search"
            className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-green-500 hover:to-blue-600 transition-all duration-300"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6">
          Who We Are
        </h2>

        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          <strong>HOMELAND</strong> is a premium real estate platform that empowers people to buy, sell, and rent properties across India. With a deep understanding of the Indian property market, we bring trust and technology together.
        </p>

        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          Our experienced team ensures a smooth and stress-free experience, whether you're searching for your first home or a luxury estate. We believe in personalized service and clear communication.
        </p>

        <p className="text-lg sm:text-xl text-gray-700">
          From urban apartments to peaceful countryside homes, we’re dedicated to matching every buyer with their ideal space. Join thousands of happy clients who trust HomeLand.
        </p>
      </section>
    </div>
  );
}
