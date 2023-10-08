<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref, onMounted, computed} from 'vue';
import { useAuthStore } from "../../stores/auth.store";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const loggedIn = computed(() => {
    return authStore.initialState.status.loggedIn;
});

// onMounted(() => {
//     if(loggedIn) {
//         router.push('/userBoard');
//     }
// })

let successful = ref(false);
let loading = ref(false);
let message = ref('');
let username = ref('');
let password = ref('');

async function handleRegister() {
    message.value = '';
    successful = false;
    loading = true;

    let response = await authStore.register({
        username: username.value,
        password: password.value
    });  

    let data = await response.json();

    if (!response.ok) {
        message.value = data.message
        successful = false;
        loading = false;
        return;
    } 
      
    message.value = data.message;
    successful = true;
    loading = false;
   
}


</script>

<template>
    <div class="wrapper col-md-12">
        <h2>Регистрация</h2>
    <div class="card card-container">     
      <Form @submit="handleRegister">
        <div v-if="!successful">
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
              Sign Up
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.card {
    width: 50%;
}
</style>