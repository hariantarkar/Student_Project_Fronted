import axios from "axios";

const API_URL = "http://localhost:9999/prediction";

export const getAllPredictions = async () => {
  try {
    const res = await axios.get(`${API_URL}/all`, { withCredentials: true });
    return res.data;  
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};

export const getLatestPrediction = async () => {
  const res = await axios.get(`${API_URL}/latest`, { withCredentials: true });
  return res.data;
};

export const getShortlistedPredictions = async () => {
  try {

    const res = await axios.get(`${API_URL}/${sid}`, {
      withCredentials: true, 
    });

    const res = await axios.get(`${API_URL}/shortlisted`, { withCredentials: true });

    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};