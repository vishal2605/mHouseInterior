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
  export async function sendEmail(obj) {
    try {
        const response = await axios.post(`${URL}/send-email`,obj)
        return response;
    } catch (error) {
        console.error('Error while sending email:',error);
    }
  }