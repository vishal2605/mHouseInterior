import React, { useState, useEffect } from 'react';
import ProjectComponent from './ProjectComponent';
import { fetchAllProjects } from '../api\'s/Services';

const ProjectSection = () => {
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const projects = await fetchAllProjects();
        setAllProjects(projects);
        console.log(allProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }

    loadProjects();
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 p-4">
        {allProjects.map((project) => (
          <ProjectComponent
            key={project.projectId}
            title={project.name}
            url={project.profileImage} // Ensure the property matches
            images={project.images}    // Ensure the property matches
            projectId={project.projectId}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
