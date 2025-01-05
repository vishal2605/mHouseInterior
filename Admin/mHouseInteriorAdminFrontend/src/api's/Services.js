import axios from 'axios';

const URL = 'http://localhost:3000/admin';

export async function fetchAllProjects() {
  try {
    const response = await axios.get(`${URL}/getAllProjects`);
    return response.data; // You might want to return the data directly
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; // It's good practice to throw the error so the caller can handle it
  }
}

export async function fetchProjectById(id) {
  try {
    console.log(id);
    const response = await axios.get(`${URL}/getProjectById`, {
      params: { projectId: id }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('An error occurred while fetching the project');
  }
}
export async function createProject(data) {
    try {
      const response = await axios.post(`${URL}/addProject`, data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error creating project:', error);
      throw error; // Re-throw the error for the calling function to handle
    }
  }

export async function updateProject(id, data) {
  try {
      console.log(data);

    const response = await axios.put(
      `${URL}/updateProject`, 
      data, 
      {
        params: { projectId: id },
        headers: {
          'Content-Type': 'multipart/form-data', // Explicitly setting the Content-Type
        }
        
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function login(credential) {
  return await axios.post(`${URL}/login`,credential).then(res=>res.data);
}
