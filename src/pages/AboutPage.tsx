import React from 'react';
import Section from '../components/Section';

const AboutPage: React.FC = () => {
  return (
    <Section id="about" title="Our Manifesto">
      <p className="max-w-3xl mx-auto text-center text-gray-300 md:text-lg leading-relaxed">
        Cyber Hub is not just a club; it's a launchpad. We are the architects of the future, the pioneers of the digital frontier. Here, code is our language, and innovation is our creed. We dismantle the present to build a better tomorrow. Join us, or get left behind.
      </p>
    </Section>
  );
};

export default AboutPage;