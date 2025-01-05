import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProjectById } from '../api\'s/Services';
import Navbar from '../components/Navbar';
import Fade from 'react-reveal/Fade';

const ProjectById = () => {
  const { state } = useLocation(); // Access passed state
  const { title, url, projectId } = state || {};
  
  const [project, setProject] = useState(null); // State to store the project details

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetchProjectById(projectId);
        setProject(response); // Set the project data
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    if (projectId) {
      fetchProject(); // Fetch project data if projectId is available
    }
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>; // Display a loading state while data is being fetched
  }

  const backendUrl = 'http://localhost:3000'; // Backend URL for images

  return (
    <div>
      <Navbar/>
      <Fade>
                    <div className="relative w-full sm:h-screen px-4 sm:px-0">
                        <img
                            src={`${backendUrl}/${project.profileImage}`}
                            className="w-full h-full object-cover"
                            alt="Descriptive Alt Text"
                        />
                        <div className="absolute inset-0 hover:bg-white hover:bg-opacity-50 flex items-center justify-center md:text-6xl text-5xl font-bold text-white">
                            {project.name}
                        </div>
                        <div>
                          {project.address}
                        </div>
                    </div>
            </Fade>
      <div className="grid grid-cols-3 gap-4">
        {project.images.map((image, index) => (
          <img
            key={index}
            src={`${backendUrl}/${image}`}
            alt={`Project Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectById;
