<script setup lang="ts">
import { ref } from 'vue';
import TableRow from './TableRow.vue';
import { useTaskStore } from '../../stores/task.store';

const taskStore = useTaskStore();

</script>

<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Номер</th>
            <th scope="col">Вид выполненной работы</th>
            <th scope="col">Критерий</th>
            <th scope="col">Дата</th>
            <th scope="col"></th>
        </tr>

        </thead>
        <tbody>
            <table-row v-for="(task, index) in taskStore.tasks" :key="task.id" :task="task" :index="index"/>
        </tbody>        
    </table>
</template>

<style scoped>
    tr {
        text-align: center;
    }
</style>