import React from 'react';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../constants';

const ProjectsPage: React.FC = () => {
    return (
        <Section id="projects" title="Featured Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={index * 150} />
            ))}
          </div>
        </Section>
    );
};

export default ProjectsPage;