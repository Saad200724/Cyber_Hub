import React from 'react';
import Section from '../components/Section';
import TeamMemberCard from '../components/TeamMemberCard';
import { TEAM_MEMBERS } from '../constants';

const ExecutivePage: React.FC = () => {
    return (
        <Section id="executive" title="Meet The Executive">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} delay={index * 100} />
            ))}
          </div>
        </Section>
    );
};

export default ExecutivePage;