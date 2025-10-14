import React from 'react';

const ContributeSection = () => {
  return (
    <section className="relative w-full bg-gray-50 py-16 px-4 overflow-hidden">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-80"
        style={{
          backgroundImage: "url('/images/contribution.jpg')",
          backgroundSize: '100%',
        }}
      />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto flex justify-end items-center z-10">
        <div className="max-w-2xl bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Contribute
          </h2>
          
          {/* Subtitle */}
          <p className="text-center text-gray-600 mb-8">
            Be a Part of the Grand Hare Krishna Temple at the<br />
            Heritage City of India, Mysore
          </p>

          {/* Donate Button */}
          <div className="text-center">
            <a
              href="/donations"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
            >
              Donate now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributeSection;
