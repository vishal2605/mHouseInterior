import React from 'react';
import ProjectComponent from '../components/ProjectComponent';
import { useEffect } from 'react';
import { fetchAllProjects } from '../api\'s/service';
import { useState } from 'react';

const Projects = () => {
    const [allProjects, setAllProject] = useState([]);
    useEffect(()=>{
      const fetchProject = async()=>{
        try{
        const projects = await fetchAllProjects();
        setAllProject(projects);
        }
        catch(error){
          console.error(error);
        }
      }
      fetchProject();
    },[])
  return (
    <div>
        <div>
            <div className='font-bold sm:text-4xl text-2xl text-amber-600 text-center'>
            Your Vision, Our Expertise
            </div>
            <div className='text-center sm:text-2xl text-xl mb-3 text-gray-700'>
            Discover our awesome projects - showcasing innovation in every detail.
            </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 p-4">
        {allProjects.map((project) => (
            <ProjectComponent key={project.name} title={project.projectId} url={project.profileImage} />
        ))} 
        </div>
    </div>
  );
};

export default Projects;
