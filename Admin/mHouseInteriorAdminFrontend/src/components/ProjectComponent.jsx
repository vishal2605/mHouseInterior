import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from './DeleteDialog';
import CreateProjectDialog from './CreateProjectDialog';

const ProjectComponent = ({ title, url, projectId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const backendUrl = 'http://localhost:3000';
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate(); // React Router's navigation hook

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleEdit = () => {
    setIsDialogOpen(true);
    setIsEdit(true);
  };

  const handleNavigateToProject = () => {
    navigate(`/project/${projectId}`, {
      state: { title, url, projectId }, // Pass props as state
    });
  };

  useEffect(() => {
    // Log the full image URL for debugging
    console.log(`${backendUrl}/${url}`);
  }, [backendUrl, url]);

  return (
    <div
      className="border rounded overflow-hidden cursor-pointer"
      onClick={handleNavigateToProject} // Navigate on div click
    >
      <div className="relative w-full h-64">
        <img src={`${backendUrl}/${url}`} alt={title} className="object-cover w-full h-full" />
        <Menu as="div" className="absolute top-2 right-2">
          <MenuButton
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when menu is clicked
              setIsMenuOpen(!isMenuOpen);
            }}
            className="p-2 rounded-full shadow-md"
          >
            <EllipsisVerticalIcon className="h-5 w-5 text-gray-700" />
          </MenuButton>
          {isMenuOpen && (
            <MenuItems className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm ${
                      active ? 'bg-gray-100' : 'text-gray-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation
                      handleEdit();
                    }}
                  >
                    Edit
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm ${
                      active ? 'bg-gray-100' : 'text-gray-700'
                    }`}
                    onClick={(e) => e.stopPropagation()} // Prevent navigation
                  >
                    Delete
                  </a>
                )}
              </MenuItem>
            </MenuItems>
          )}
        </Menu>
      </div>
      <div className="font-medium text-gray-700 text-center p-4 bg-slate-200">
        {title}
        <div>{projectId}</div>
      </div>
      {isEdit && (
        <CreateProjectDialog
          isOpen={isDialogOpen}
          toggleDialog={toggleDialog}
          isEdit={true}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default ProjectComponent;
