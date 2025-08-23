import axios from "axios";

const API_URL = "http://localhost:9999/contact"; 

export const addContact = async (contactData) => {
  try {
    const response = await axios.post(API_URL, contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Network error" };
  }
};