<script setup>
import { computed, ref, onMounted, onBeforeMount} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore} from '../../stores/auth.store';
import { useRouter } from 'vue-router';

let authStore = useAuthStore();
const router = useRouter();

let username = ref('');
let password = ref('');
let successful = ref(false);
let loading = ref(false);
let message = ref('');

const loggedIn = computed(() => {
    return authStore.initialState.status.loggedIn;
});

// if(loggedIn !==false) {
//     console.log(authStore.initialState.status.loggedIn)
//     router.push('/userBoard')
// }

async function handleLogin() {
    message.value = '';
    successful = false;
    loading = true;

    try {
        const response = await authStore.login({
            username: username.value,
            password: password.value
        });  
        
        let data = await response.json(); 

        if(!response.ok) {
            message.value = data.message;
            successful = true;
            loading = false;
            return;
        }

        authStore.saveUser(data);
        router.push('/userBoard');
       
    } catch (error) {
        console.log(error)
    }

    


}
</script>

<template>
    <div class="wrapper col-md-12">
    <h2>Авторизация</h2>
    <div class="card card-container">      
      <Form @submit="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <Field v-model="username" name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field v-model="password" name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<style>
    .wrapper {
        width: 100%;
        height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .card {
        width: 600px;
    }
</style>