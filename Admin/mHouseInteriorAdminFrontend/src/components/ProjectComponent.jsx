import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from './DeleteDialog';
import CreateProjectDialog from './CreateProjectDialog';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const ProjectComponent = ({ title, url, projectId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog,setIsDeleteDialog] = useState(false);
  const backendUrl = 'http://localhost:3000';
  const navigate = useNavigate();

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
    setIsEdit(false);
  };

  const toggleDeleteDialog = () =>{
    setIsDeleteDialog(!isDeleteDialog);
  }

  const handleEdit = () => {
    setIsDialogOpen(true);
    setIsEdit(true);
  };

  const handleNavigateToProject = () => {
    navigate(`/project/${projectId}`, {
      state: { title, url, projectId },
    });
  };

  useEffect(() => {
    console.log(`${backendUrl}/${url}`);
  }, [backendUrl, url]);

  return (
    <div className="border rounded overflow-hidden cursor-pointer">
      <div className="relative w-full h-64" onClick={handleNavigateToProject}>
        <img src={`${backendUrl}/${url}`} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="font-medium text-gray-700 text-center p-4 bg-slate-200">
        {title}
      </div>
      <div className="flex gap-2 justify-between px-4 pb-4 bg-slate-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          className="flex w-1/2 items-center justify-center px-4 py-2 bg-white rounded-md "
        >
          <PencilIcon className="h-5 w-5" />
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleteDialog(true); // Replace with actual delete logic
          }}
          className="flex w-1/2 items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md"
        >
          <TrashIcon className="h-5 w-5" />
          Delete
        </button>
      </div>
      {isEdit && (
        <CreateProjectDialog
          isOpen={isDialogOpen}
          toggleDialog={toggleDialog}
          isEdit={true}
          projectId={projectId}
        />
      )}
      <DeleteDialog isDeleteDialog={isDeleteDialog} toggleDeleteDialog={toggleDeleteDialog} projectId={projectId}></DeleteDialog>
    </div>
  );
};

export default ProjectComponent;
