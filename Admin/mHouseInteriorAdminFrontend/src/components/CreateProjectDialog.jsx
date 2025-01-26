import { useState, useEffect } from "react";
import { createProject, fetchProjectById, updateProject } from "../api's/Services";
import { Toaster, toast } from 'react-hot-toast';

const CreateProjectDialog = ({ isOpen, toggleDialog, isEdit, projectId }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const [profileFile, setProfileFile] = useState(null);
  const [imageFilePaths, setImageFilePaths ] = useState([]);
  const backendUrl = 'http://localhost:3000';

  useEffect(() => {
    if (isEdit) {
      const loadProjectData = async () => {
        try {
          const {response,error} = await fetchProjectById(projectId);
          setProfileImage(`${backendUrl}/${response.profileImage}`);
          setName(response.name);
          setAddress(response.address);
          setImages(response.images.map(img => `${backendUrl}/${img}`));
          setImageFilePaths(response.images.map(img => `${img}`));
          if(error){
            toast.error('Error fetching project:', error);
          }
        } catch (error) {
          toast.error('Error fetching project:', error);
        }
      };

      loadProjectData();
    }

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEdit,projectId]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileFile(file);
      console.log('file',file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
  
    // Convert files to URLs for rendering
    const fileUrls = files.map(file => URL.createObjectURL(file));
  
    // Update state with the new file URLs
    setImages(prevImages => [...prevImages, ...fileUrls]);
    setImageFilePaths(prevImageFiles => [...prevImageFiles, ...files]);
  
    console.log(fileUrls);
  };
  const closeDialog = () => {
    setProfileImage(null);
    setName('');
    setAddress('');
    setImages([]);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
    // window.location.reload();
    toggleDialog();
  };

  const handleRemoveImage = (index) => {
    // Use functional updates to ensure the previous state is correctly referenced
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      console.log('Updated images:', updatedImages); // Log the correct updated state
      return updatedImages;
    });
  
    setImageFilePaths((prevImageFilePaths) => {
      const updatedImageFilePaths = prevImageFilePaths.filter((_, i) => i !== index);
      console.log('Updated imageFilePaths:', updatedImageFilePaths); // Log the correct updated state
      return updatedImageFilePaths;
    });
  };
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address) {
      toast.error('Name and address are required!');
      return;
    }
    // Initialize the FormData object
    const formData = new FormData();
  
    // Append basic form fields
    formData.append('name', name);
    formData.append('address', address);
  
    // Initialize arrays to keep track of images
    const imageFiles = []; // For new images (Files)
    const existingImageUrls = []; // For existing image URLs
  
    // Handle profileImage if it exists
    if (profileFile) {
      formData.append('profileImage', profileFile);
    }
  
    // Loop through images to categorize them as either new files or existing URLs
    imageFilePaths.forEach((image) => {
      if (image instanceof File) {
        console.log(image);
        imageFiles.push(image); // Add new image file to the array
      } else {
        existingImageUrls.push(image); // Add existing image URL to the array
      }
    });
  
    // Append new image files to FormData
    imageFiles.forEach((file, index) => {
      formData.append('images', file, `image_${index}`);
    });
  
    // Append existing image URLs as JSON to FormData
    formData.append('existingImages', JSON.stringify(existingImageUrls));
  
    // Log FormData content for debugging
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      const data = {};
      for (let [key, value] of formData.entries()) {
        if (key === 'existingImages') {
          data[key] = JSON.parse(value);
        } else if (key === 'images') {
          // Collect all files under 'images'
          if (!data[key]) {
            data[key] = [];
          }
          data[key].push(value);
        } else {
          data[key] = value;
        }
      }

      const {response,error} = isEdit 
        ? await updateProject(projectId, data) 
        : await createProject(data);
  
      if (response) {
        toast.success('Project saved successfully!');
        closeDialog();
      }
    } catch (error) {
      toast.error('Failed to save project!');
    }
  };
  
  
  return (
    <div className={`fixed inset-0 z-50 flex justify-end transition-transform duration-300 ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="relative sm:w-1/2 w-full h-full bg-white shadow-lg p-6 overflow-auto transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-700">
            {isEdit ? 'Edit Project' : 'Create Project'}
          </div>
          <div onClick={closeDialog} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-1" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#454545" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"/>
            </svg>
          </div>
        </div>
        <div className="max-w-md mx-auto mt-10">
          <form onSubmit={handleSubmit} enctype="multipart/form-data"  className="space-y-4">
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
              <div className="relative">
                <div className="flex justify-center items-center w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="block text-sm font-medium text-gray-700 mb-2">Upload</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="4"
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />
              <div className="mt-4 flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  {/* Cross icon for removal */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-amber-600 text-white rounded-full p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>

                  {/* Image */}
                  <img
                    src={
                      image
                    }
                    alt={`Upload ${images.length}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-amber-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-amber-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectDialog;
