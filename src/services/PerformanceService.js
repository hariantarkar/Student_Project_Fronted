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
  try {
    const res = await axios.get(`${API_URL}/students`, {
      withCredentials: true  
    });
    return res.data.students || [];
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};


export const getAllPerformance = async () => {
  try{
  const res = await axios.get(`${API_URL}/all`, {
  withCredentials: true});
  return res.data.students || [];
  }catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};

// export const getPerformanceBySid = async (sid) => {
//   const res = await axios.get(`${API_URL}/${sid}`,{
//   withCredentials: true});
//   return res.data[0]; 
// };

export const getPerformanceBySid = async (sid) => {
  const res = await axios.get(`${API_URL}/${sid}`, {
    withCredentials: true,
  });
  return res.data;  
};


export const getStudentPerformance = async () => {
  try {
    const res = await axios.get(`${API_URL}/each`, {
      withCredentials: true,
    });
    return res.data?.data || [];
  } catch (err) {
    console.error("Error fetching performance service:", err);
    throw err.response?.data || { message: "Server error while fetching performance" };
  }
};




