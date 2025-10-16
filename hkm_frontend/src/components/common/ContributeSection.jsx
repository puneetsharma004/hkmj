import React from 'react';

const ContributeSection = () => {
  return (
    <section className="relative w-full bg-[#f0e3d9] py-16 px-4 overflow-hidden">
      {/* Background Image Container with custom class */}
      <div className="contribute-bg absolute inset-0 bg-cover bg-right bg-no-repeat opacity-80" />
      
      {/* Rest of your content */}
      <div className="relative h-screen max-w-7xl mx-auto flex justify-center lg:justify-end items-start md:items-center z-10">
        <div className="max-w-xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Contribute
          </h2>
          
          <p className="text-center text-gray-600 mb-8">
            Join hands in building a magnificent spiritual landmark dedicated to Lord Krishna, 
            <br />
            a beacon of devotion and culture in the heart of Marwar.
          </p>

          <div className="text-center">
            <a
              href="/donations#donation-form"
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
