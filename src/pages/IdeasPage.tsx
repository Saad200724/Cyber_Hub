import React from 'react';
import Section from '../components/Section';
import GeminiIdeaGenerator from '../components/GeminiIdeaGenerator';

const IdeasPage: React.FC = () => {
    return (
        <Section id="ideas" title="Project Idea Forge">
           <GeminiIdeaGenerator />
        </Section>
    );
};

export default IdeasPage;