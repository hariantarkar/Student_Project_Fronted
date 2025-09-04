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



export const getLatestPrediction = async (sid) => {
  try {
    const res = await axios.get(`${API_URL}/${sid}`, {
      withCredentials: true, // include cookies
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching latest prediction:", err);
    throw err.response?.data || { error: "Server error" };
  }
};