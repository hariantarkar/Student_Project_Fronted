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

export const getConfirmedStudents = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/students`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.students || [];
};

export const getAllPerformance = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  });
  return res.data.students || [];
};

export const getPerformanceBySid = async (sid) => {
  const res = await axios.get(`${API_URL}/${sid}`);
  return res.data[0]; 
};



