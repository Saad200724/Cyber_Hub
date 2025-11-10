import React from 'react';
import Hero from '../components/Hero';
import Terminal from '../components/Terminal';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <div className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Terminal />
        </div>
      </div>
    </>
  );
};

export default HomePage;