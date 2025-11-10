import React, { useRef, useEffect, useState } from 'react';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
  delay?: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, delay = 0 }) => {
  const Icon = event.icon;
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
      className={`card-bg p-6 rounded-lg transition-all duration-300 hover:-translate-y-2 scroll-animate ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 border-2 border-cyan-400 mb-4">
        <Icon className="h-8 w-8 text-cyan-400" />
      </div>
      <h3 className="text-xl font-bold font-orbitron text-white mb-2">{event.title}</h3>
      <p className="text-cyan-300 mb-3 font-semibold">{event.date}</p>
      <p className="text-gray-400">{event.description}</p>
    </div>
  );
};

export default EventCard;