import axios from "axios";
const API_URL = "http://localhost:9999"; 

export const addContact = async (contactData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};
export const getAllContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/viewEnquiry`); 
    return response.data; 
  } catch (error) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};
