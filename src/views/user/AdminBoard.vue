<script setup>
    import { onMounted, ref} from 'vue';
    import userService from '../../services/user.service';

    let content = ref('');

    onMounted(() => {
        getUserContent();
    });

    async function getUserContent() {
        try {
            const response = await userService.getAdminBoard();       

            let data = await response.text();

            content.value = data;           
        } catch (error) {
            console.log(error)
        }
    }</script>

<template>
    <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<style scoped></style>