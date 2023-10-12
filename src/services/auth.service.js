const API_URL = 'http://localhost:4000/api/auth/';

class AuthService {
    async login(userData) {
        try {
            let response = await fetch(`${API_URL}signin`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',              
                },
                body: JSON.stringify(userData)
            }); 

            return response;

        } catch (error) {
            console.log(error)
        }        
    };

    logout() {
        localStorage.removeItem('user');
    }

    async register(user) {      
            return await fetch(`${API_URL}signup`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    }
}

export default new AuthService();