import React, { useRef, useEffect, useState } from 'react';
import type { TeamMember } from '../types';

interface TeamMemberCardProps {
  member: TeamMember;
  delay?: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, delay = 0 }) => {
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
      className={`text-center group scroll-animate ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-cyan-400 transition-all duration-300 shadow-lg">
        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover transition-all duration-300" />
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
           <h3 className="text-xl font-bold text-white">{member.name}</h3>
           <p className="text-cyan-400">{member.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;