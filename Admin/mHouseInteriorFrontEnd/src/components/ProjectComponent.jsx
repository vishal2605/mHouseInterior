import React from 'react';
import { useNavigate } from 'react-router-dom';
const ProjectComponent = ({ title, url,projectId }) => {
    const navigate = useNavigate();

  const handleNavigateToProject = () => {
    console.log("help");
    navigate(`/project/${projectId}`, {
      state: { title, url, projectId },
    });
  };
  return (
    <div className='border rounded' onClick={handleNavigateToProject}>
      <div className="w-full h-64">
        <img src={`http://localhost:3000/${url}`} className="w-full h-full object-cover rounded" alt={title} >
        </img>
      </div>
      <div className="font-medium text-gray-700 text-center p-4 bg-slate-200">
        {title}
      </div>
    </div>
  );
};

export default ProjectComponent;
