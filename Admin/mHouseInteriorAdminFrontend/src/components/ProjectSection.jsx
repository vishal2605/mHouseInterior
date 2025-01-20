import React, { useState, useEffect } from 'react';
import ProjectComponent from './ProjectComponent';
import { fetchAllProjects } from '../api\'s/Services';

const ProjectSection = () => {
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const {response,error} = await fetchAllProjects();
        setAllProjects(response);
        console.log(allProjects);
        if(error){
          console.error('Error loading projects:', error);
        }
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
            key={project.id}
            title={project.name}
            url={project.profileImage} // Ensure the property matches
            images={project.images}    // Ensure the property matches
            projectId={project.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
