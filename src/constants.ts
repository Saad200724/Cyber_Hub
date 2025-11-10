// Fix: Removed UserGroupIcon and AcademicCapIcon from import as they are not exported from Icons.tsx and are unused.
import { CodeBracketIcon, CpuChipIcon, ShieldCheckIcon, RocketLaunchIcon } from './components/Icons';
import type { Event, TeamMember, Project } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#/' },
  { name: 'About', href: '#/about' },
  { name: 'Events', href: '#/events' },
  { name: 'Ideas', href: '#/ideas' },
  { name: 'Executive', href: '#/executive' },
  { name: 'Projects', href: '#/projects' },
];

export const EVENTS: Event[] = [
  {
    id: 1,
    title: 'Hackathon Delta V',
    date: 'Oct 28-30, 2024',
    description: 'A 48-hour coding marathon to build groundbreaking solutions. Prizes, food, and glory await.',
    icon: CodeBracketIcon,
  },
  {
    id: 2,
    title: 'AI & ML Workshop',
    date: 'Nov 12, 2024',
    description: 'Dive into the world of neural networks and deep learning with industry experts.',
    icon: CpuChipIcon,
  },
  {
    id: 3,
    title: 'Cybersecurity Summit',
    date: 'Dec 05, 2024',
    description: 'Learn ethical hacking and defense strategies from the pros in our annual security conference.',
    icon: ShieldCheckIcon,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Alex "Glitch" Chen',
    role: 'President & Lead Dev',
    imageUrl: 'https://picsum.photos/seed/alex/400/400',
  },
  {
    id: 2,
    name: 'Jasmine "Hex" Kaur',
    role: 'VP & AI Specialist',
    imageUrl: 'https://picsum.photos/seed/jasmine/400/400',
  },
  {
    id: 3,
    name: 'Leo "Root" Martinez',
    role: 'Cybersecurity Chief',
    imageUrl: 'https://picsum.photos/seed/leo/400/400',
  },
  {
    id: 4,
    name: 'Sam "Kernel" Rodriguez',
    role: 'Hardware & Robotics Lead',
    imageUrl: 'https://picsum.photos/seed/sam/400/400',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Project Chimera',
    description: 'A decentralized social media platform focused on user privacy and data ownership, built on blockchain technology.',
    imageUrl: 'https://picsum.photos/seed/chimera/800/600',
    tags: ['Blockchain', 'Web3', 'Privacy'],
  },
  {
    id: 2,
    title: 'Aura-Sense AI',
    description: 'An AI-powered system for analyzing public sentiment from online data sources in real-time to predict market trends.',
    imageUrl: 'https://picsum.photos/seed/aura/800/600',
    tags: ['AI/ML', 'Data Science', 'FinTech'],
  },
];

export const IDEA_TOPICS = [
    { name: 'Web Dev', icon: CodeBracketIcon, prompt: 'Generate a fun, small web development project idea for an IT club student. Keep it under 30 words.' },
    { name: 'AI/ML', icon: CpuChipIcon, prompt: 'Generate a fun, small AI/ML project idea for an IT club student. Keep it under 30 words.' },
    { name: 'Cybersecurity', icon: ShieldCheckIcon, prompt: 'Generate a fun, small cybersecurity project idea for an IT club student. Keep it under 30 words.' },
    { name: 'Game Dev', icon: RocketLaunchIcon, prompt: 'Generate a fun, small game development project idea for an IT club student. Keep it under 30 words.' }
];