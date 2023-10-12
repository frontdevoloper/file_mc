<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth.store.js';
import { ref, computed, onMounted, onUpdated, watch, reactive } from 'vue';

const authStore = useAuthStore();
</script>

<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #e3f2fd;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">MC</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link  class="nav-link active" aria-current="page" to="/">Главная</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/userBoard">Представление</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Регистрация</router-link>
            </li>
          </ul>            
        </div>
      </div>     
      <button @click.prevent="authStore.logout()" :class="{active : authStore.isLogout}" type="button" class="logout-btn btn btn-dark">
        Выйти
      </button>
      <button type="button" :class="{ admin : authStore.isAdmin }" class="admin-link btn btn-dark">
        <router-link to="admin">Админская</router-link>
      </button>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
.admin-link,
.logout-btn{
  display: none;
  transition: all .5s ease;
}

.admin-link {
  margin-left: 1rem;
}

.logout-btn.active {
  display: block;
}
.admin-link.admin {
  display: block;
}
</style>
