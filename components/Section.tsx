import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-orbitron text-white">
            {title}
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-cyan-400 to-magenta-500 mx-auto rounded-full"></div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default Section;