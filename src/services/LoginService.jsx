import axios from "axios";

const API_URL = "http://localhost:9999/";

class LoginService {
  loginUser(credentials) {
    console.log("Sending credentials:", credentials);
    return axios
      .post(`${API_URL}login`, credentials, { withCredentials: true })
      .then(res => {
        console.log("Login response:", res.data);
        return res.data;
      });
  }

  logoutUser() {
    console.log("Logging out...");
    return axios
      .post(`${API_URL}logout`, {}, { withCredentials: true })
      .then(res => {
        console.log("Logout response:", res.data);
        return res.data;
      });
  }

  getAdminDashboard() {
    console.log("Fetching admin dashboard...");
    return axios
      .get(`${API_URL}admin/dashboard`, { withCredentials: true })
      .then(res => {
        console.log("Admin dashboard response:", res.data);
        return res.data;
      });
  }

  getStudentDashboard() {
    console.log("Fetching student dashboard...");
    return axios
      .get(`${API_URL}student/dashboard`, { withCredentials: true })
      .then(res => {
        console.log("Student dashboard response:", res.data);
        return res.data;
      });
  }
}

export default new LoginService();
