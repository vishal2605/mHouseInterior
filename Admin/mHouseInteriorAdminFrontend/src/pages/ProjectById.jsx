import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProjectById } from '../api\'s/Services';
import Navbar from '../components/Navbar';
import Fade from 'react-reveal/Fade';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css'; // Import lightbox styles
import { LogoutDialog } from '../components/LogoutDialog';
import { ChangePasswordDialog } from '../components/ChangePasswordDialog';

const ProjectById = () => {
  const { state } = useLocation();
  const { title, url, projectId } = state || {};
  
  const [project, setProject] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const {response,error} = await fetchProjectById(projectId);
        setProject(response);
        if(error){
        console.error('Error fetching project details:', error);
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const backendUrl = 'http://localhost:3000';

  return (
    <div>
      <Navbar />
      <LogoutDialog></LogoutDialog>
      <ChangePasswordDialog></ChangePasswordDialog>
      <Fade>
        <div className="relative w-full sm:h-screen px-4 sm:px-0">
          <img
            src={`${backendUrl}/${project.profileImage}`}
            className="w-full h-full object-cover"
            alt="Descriptive Alt Text"
          />
          <div className="absolute inset-0 bg-white bg-opacity-20 place-content-center">
            <div className="text-5xl font-bold text-center text-amber-400">
              {project.name}
            </div>
            <div className="text-xl text-center">
              {project.address}
            </div>
          </div>
        </div>
      </Fade>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 p-4">
        {project.images.map((image, index) => (
          <img
            key={index}
            src={`${backendUrl}/${image}`}
            alt={`Project Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-md cursor-pointer"
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      {isOpen && (
        <Lightbox
          images={project.images.map((img) => ({ url: `${backendUrl}/${img}` }))}
          startIndex={photoIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectById;
