import axios from "axios";

class LoginService {
    loginUser(credentials) {
        return axios.post("http://localhost:9999/login",credentials,
            { withCredentials: true }).then(res => res.data);
    }
}

export default new LoginService();
