import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const fetchLeads = async () => {
    try {
        const response = await API.get('leads/', { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error("Error fetching leads:", error);
        throw error;
    }
};

export const createLead = async (leadData) => {
    const response = await API.post('leads/create/', leadData, { headers: getHeaders() });
    return response.data;
};

export const fetchLeadDetail = async (id) => {
    const response = await API.get(`leads/${id}/`, { headers: getHeaders() });
    return response.data;
};

export const updateLead = async (id, leadData) => {
    const response = await API.put(`leads/${id}/update/`, leadData, { headers: getHeaders() });
    return response.data;
};

export const deleteLead = async (id) => {
    await API.delete(`leads/${id}/delete/`, { headers: getHeaders() });
};
