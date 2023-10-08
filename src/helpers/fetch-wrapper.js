export const fetchWrapper = {
    get: request('POST'),
    post: request('POST'),
    update: request('UPDATE'),
    delete: request('DELETE')
}

async function request(method) {
    return async (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };

        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            request.body = body;
        }

        return await fetch(url, requestOptions);
    }
};

function authHeader(url) {  
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { 'x-access-token': `${user.accessToken}` };
    } else {
        return {};
    }
}