import axios from 'axios';

const URL = 'http://localhost:3000/admin';

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

// Helper function to get the latest token from localStorage
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { 'Authorization': `Bearer ${token}` };
}

export async function fetchAllProjects() {
    return apiWrapper(() =>
        axios.get(`${URL}/getAllProjects`, {
            headers: getAuthHeaders()
        })
    );
}

export async function fetchProjectById(id) {
    return apiWrapper(() =>
        axios.get(`${URL}/getProjectById`, {
            params: { projectId: id },
            headers: getAuthHeaders()
        })
    );
}

export async function createProject(data) {
    return apiWrapper(() =>
        axios.post(`${URL}/addProject`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders()
            }
        })
    );
}

export async function deleteProject(id) {
    return apiWrapper(() =>
        axios.delete(`${URL}/deleteProject`, {
            params: { projectId: id },
            headers: getAuthHeaders()
        })
    );
}

export async function updateProject(id, data) {
    return apiWrapper(() =>
        axios.put(`${URL}/updateProject`, data, {
            params: { projectId: id },
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders()
            }
        })
    );
}

export async function changePassword(data) {
    return apiWrapper(() =>
        axios.post(`${URL}/changepassword`, data, {
            headers: getAuthHeaders()
        })
    );
}

export async function login(credential) {
    return apiWrapper(() =>
        axios.post(`${URL}/login`, credential)
    );
}
