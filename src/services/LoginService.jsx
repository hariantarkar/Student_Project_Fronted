import axios from "axios";

class LoginService {
  loginUser(credentials) {
  console.log("Sending credentials:", credentials);
  return axios.post("http://localhost:9999/login", credentials, { withCredentials: true })
    .then(res => {
      console.log("Raw response:", res.data);
      return res.data;
    });
}
}

export default new LoginService();

