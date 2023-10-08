import authHeader from "./auth-header";

const API_URL = 'http://localhost:4000/api/test/';

class userServices {
    getPublicContent() {
        return fetch(`${API_URL}all`);
    }

    getUserBoard() {
        return fetch(`${API_URL}user`, { headers: authHeader() });
    }

    getAdminBoard() {
        return fetch(`${API_URL}admin`, { headers: authHeader() });
    }
}

export default new userServices();