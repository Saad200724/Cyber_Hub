import React from 'react';
import Section from '../components/Section';
import { DiscordIcon, GithubIcon } from '../components/Icons';
import JoinCard from '../components/JoinCard';

const joinOptions = [
  {
    icon: DiscordIcon,
    title: 'Join Our Discord',
    description: 'Engage with the community, ask questions, and get real-time updates on events and projects.',
    link: '#', // Placeholder link
    cta: 'Join Server',
  },
  {
    icon: GithubIcon,
    title: 'Contribute on GitHub',
    description: 'Explore our open-source projects, report issues, and contribute code to make an impact.',
    link: '#', // Placeholder link
    cta: 'Explore Projects',
  },
];

const JoinPage: React.FC = () => {
  return (
    <Section id="join" title="Join The Revolution">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {joinOptions.map((option, index) => (
          <JoinCard key={index} {...option} delay={index * 100} />
        ))}
      </div>
      <p className="text-center text-gray-400 mt-16 max-w-2xl mx-auto">
        Be part of something bigger. The future is built by those who show up, plug in, and execute.
      </p>
    </Section>
  );
};

export default JoinPage;