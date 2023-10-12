import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import authService from '../services/auth.service.js';
import { useRouter } from 'vue-router';
import { useTaskStore } from './task.store.js';


export const useAuthStore = defineStore('auth', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const taskStore = useTaskStore();
    const initialState = ref(user 
        ? { status: { loggedIn: true}, user } 
        : { status: { loggedIn: false }, user: null }
    );
    const router = useRouter();

    let isAdmin = computed(() => {
        if(initialState.value.user) {
           return initialState.value.user.roles[0] === 'ROLE_ADMIN';
        }
    });
      
    let isLogout = computed(() => {
        return initialState.value.status.loggedIn;
    })

    async function login(userData) {
        try {
            const response = await authService.login(userData); 

            return response; 
        } catch (error) {
            return error;
        }
    }

    function logout() {
        authService.logout();
        logoutSuccess();
    }

    async function register(user) {
        try {
            const response = await authService.register(user);           

            return response;
        } catch (error) {         
            console.log(error)
        }
    }

    function saveUser(user) {
        if(user.accessToken) {
            localStorage.setItem('user', JSON.stringify(user));   
            loginSucces(user);
        }  
    }

    function loginSucces(user) {
        initialState.value.status.loggedIn = true;
        initialState.value.user = user;
    }

    function loginFailure() {
        initialState.value.status.loggedIn = false;
        initialState.value.user = null;
    }

    function logoutSuccess() {
        initialState.value.status.loggedIn = false;
        taskStore.tasks = [];
        router.push('/login');
    }

    function registerSuccess() {
        initialState.value.status.loggedIn = false;
    }

    function registerFailure() {
        initialState.value.status.loggedIn = false;
    }

    return { 
        initialState, 
        login, 
        logout, 
        register, 
        loginSucces, 
        loginFailure, 
        logoutSuccess, 
        registerSuccess, 
        registerFailure,
        saveUser,
        isAdmin,
        isLogout
    }
});