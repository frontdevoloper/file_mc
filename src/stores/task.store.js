import { ref, computed, watch, onBeforeUpdate, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { useAuthStore } from './auth.store.js';
import taskService from '../services/task.service.js';


export const useTaskStore = defineStore('task', () => {
    const authStore = useAuthStore();

    const tasks = ref([]);

    onBeforeUpdate(() => {
        if(authStore.initialState.status.loggedIn) {
            console.log('Eys')
            setTask();
        }
    })

    onMounted(() => {
        if(authStore.initialState.status.loggedIn) {
            console.log('Eys')
            setTask();
        }
    })

    async function setTask() {        
        try {
            console.log(authStore.initialState.user.id)
            const response = await taskService.getTasksAll({
                userId: authStore.initialState.user.id
            });

            if (!response.ok) {
                throw new Error('Произошла ошибка при запросе!');
            }

            const result = await response.json();           

            for (let i = 0; i < result.length; i++) {
                const task = result[i];
                tasks.value.push(task)
            }
        } catch (error) {
            console.log(error)
        }   
    }

    async function updateTask(task, id) {
        try {
            const response = await taskService.taskUpdate(task, id);

            if(!response) {
                throw new Error('Ошибка');
            }

            const result = await response.json();
        } catch (error) {
            console.log(console.error());
        }
    }

    function setNewTask(task) {
        tasks.value.push(task);
    }

    return {
        tasks, 
        setTask,
        setNewTask
    };

});