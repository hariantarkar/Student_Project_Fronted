import axios from "axios";

class UserService {
    registerUser(userData) {
        return axios.post("http://localhost:9999/register", userData);
    }
}

export default new UserService();
