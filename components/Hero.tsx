import React from 'react';
import ParticleCanvas from './ParticleCanvas';
import { ChevronDownIcon } from './Icons';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <ParticleCanvas />
      <div className="z-10 p-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-orbitron text-white uppercase tracking-wider text-glow-cyan">
          Cyber Hub
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-cyan-300 max-w-3xl mx-auto">
          We are the architects of the future, the pioneers of the digital frontier.
        </p>
        <div className="mt-10">
            <a href="#join" className="bg-cyan-500 text-white font-bold py-4 px-8 rounded-full hover:bg-cyan-400 transition-all duration-300 shadow-lg text-lg animate-pulse-glow">
              Join The Revolution
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;