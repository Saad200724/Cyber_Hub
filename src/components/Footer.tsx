import React from 'react';
import { GithubIcon, TwitterIcon, LinkedinIcon, DiscordIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-magenta-500 transition-colors duration-300">
            <TwitterIcon className="w-8 h-8" />
          </a>
          <a href="#" className="text-gray-400 hover:text-magenta-500 transition-colors duration-300">
            <GithubIcon className="w-8 h-8" />
          </a>
          <a href="#" className="text-gray-400 hover:text-magenta-500 transition-colors duration-300">
            <LinkedinIcon className="w-8 h-8" />
          </a>
          <a href="#" className="text-gray-400 hover:text-magenta-500 transition-colors duration-300">
            <DiscordIcon className="w-8 h-8" />
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Cyber Hub. All Rights Reserved. Reality is our canvas.</p>
      </div>
    </footer>
  );
};

export default Footer;