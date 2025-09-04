import axios from "axios";

const API_URL = "http://localhost:9999";

const StudentService = {
  getProfile: async () => {
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        withCredentials: true, 
      });
      return res.data;
    } catch (err) {
      console.error("Error in StudentService.getProfile:", err);
      throw err;
    }
  },
};

export default StudentService;
