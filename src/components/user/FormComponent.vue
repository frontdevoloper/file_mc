<script setup lang="ts">
import { ref } from 'vue';
import authHeader from '../../services/auth-header';
import { useAuthStore } from '../../stores/auth.store';
import { useTaskStore } from '../../stores/task.store';

const props = defineProps(['isButton']);  

const authStore = useAuthStore();
const taskStore = useTaskStore();

let dateObject = new Date();
let currentDate = `${dateObject.getFullYear()}-0${dateObject.getDay()}-0${dateObject.getMonth()}`;
let completedWorkInput = ref('');
let criteriaInput = ref('');
let date = ref(currentDate);

async function submitHendler() {
    try {
        const response = await fetch('http://localhost:4000/api/tasks/add', {
        mode: 'cors',
        method: 'POST',       
        headers: {
            'x-access-token': authStore.initialState.user.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: authStore.initialState.user.id,
            task: completedWorkInput.value,
            criteria: criteriaInput.value,
            date: date.value
        })       
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(`Произошла ошибка - ${result}`)
    }


    
    } catch (error) {
        console.log(error.message);
    }
    
    taskStore.setNewTask({
            userId: authStore.initialState.user.id,
            task: completedWorkInput.value,
            criteria: criteriaInput.value,
            date: date.value
        });

    clearInput();
}

function clearInput() {
    completedWorkInput.value = '';
    criteriaInput.value = '';  
}

</script>

<template>
      <form @submit.prevent="submitHendler" id="edit-form" class="edit-table__form form">
            <div class="form-floating mb-3">
                <input v-model.lazy="completedWorkInput" class="form-control" list="datalistOptions" id="floatingInput" placeholder="Выполненная работа" name="completed_work"  required>
                <label for="floatingInput" class="form-label">Выполненная работа</label>
                <datalist id="datalistOptions">
                    <option value="Публикация статьи на сайт КО"/>
                    <option value="Размещение протокола ВОШ"/>
                    <option value="Публикация статьи на сайт МЦ"/>
                    <option value="Публикация статьи на сайт МЦ"/>
                    <option value="Работа с АТС"/>
                </datalist>
            </div>
            <div class="mb-3">
                <label for="criteria" class="form-label">Критерий</label>
                <select v-model.lazy="criteriaInput" required id="criteria" class="form-select" aria-label="Default select example" name="criteria">
                    <option selected value="">Выберите критерий</option>
                    <option>Должностные обязанности</option>
                    <option>Не должностные обязанности</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="start">Дата выполнения:</label>
                <input v-model.lazy="date" type="date" id="start" name="trip-start" min="2023-01-01" max="2023-12-31" />
            </div>        
            <button type="submit" class="submit-btn btn btn-primary">Добавить</button>
        </form>
</template>

<style scoped>  
</style>