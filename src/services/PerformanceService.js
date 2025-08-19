import axios from "axios";
const API_URL = "http://localhost:9999/performance";
export const addPerformance = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/add`,formData,{ withCredentials: true });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};

export const updatePerformance= async(formData)=>{
  try{
    const res= await axios.post(`${API_URL}/update`,formData,{withCredentials: true});
    return res.data;
  } catch(error){
    throw error.response?.data || {message: "Server error"}
  }
};


