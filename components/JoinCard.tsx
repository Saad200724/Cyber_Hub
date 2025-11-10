import React, { useRef, useEffect, useState } from 'react';

interface JoinCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  cta: string;
  delay?: number;
}

const JoinCard: React.FC<JoinCardProps> = ({ icon: Icon, title, description, link, cta, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`card-bg p-8 rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-2 scroll-animate ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Icon className="h-16 w-16 text-cyan-400 mb-6" />
      <h3 className="text-2xl font-bold font-orbitron text-white mb-3">{title}</h3>
      <p className="text-gray-400 mb-6 flex-grow">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/30 w-full"
      >
        {cta}
      </a>
    </div>
  );
};

export default JoinCard;
