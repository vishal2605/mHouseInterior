import axios from 'axios';

const URL = 'http://localhost:3000/admin';
const token = localStorage.getItem('token');

async function apiWrapper(apiCall) {
    try {
        const response = await apiCall();
        return { response: response.data, error: null };
    } catch (error) {
        let errorMessage = 'An unexpected error occurred.';
        if (error.response) {
            errorMessage = error.response.data.message || 'Request failed.';
        } else if (error.request) {
            errorMessage = 'No response from server. Please try again later.';
        }
        return { response: null, error: errorMessage };
    }
}
export async function fetchAllProjects() {
  return apiWrapper(() => 
      axios.get(`${URL}/getAllProjects`, {
          headers: { 'Authorization': `Bearer ${token}` }
      })
  );
}

export async function fetchProjectById(id) {
  return apiWrapper(() =>
      axios.get(`${URL}/getProjectById`, {
          params: { projectId: id },
          headers: { 'Authorization': `Bearer ${token}` }
      })
  );
}

export async function createProject(data) {
  return apiWrapper(() =>
      axios.post(`${URL}/addProject`, data, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
          }
      })
  );
}

export async function updateProject(id, data) {
  return apiWrapper(() =>
      axios.put(`${URL}/updateProject`, data, {
          params: { projectId: id },
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
          }
      })
  );
}

export async function changePassword(data) {
  return apiWrapper(() =>
      axios.post(`${URL}/changepassword`, data, {
          headers: { 'Authorization': `Bearer ${token}` }
      })
  );
}

export async function login(credential) {
  return apiWrapper(() =>
      axios.post(`${URL}/login`, credential)
  );
}
