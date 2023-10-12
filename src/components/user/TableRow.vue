<script setup lang="ts">   
    import { ref } from 'vue'; 
    import { useTaskStore } from '../../stores/task.store';
    import FormComponentVue from './FormComponent.vue';

    const props = defineProps(['task', 'index']);  
    
    let isShow = ref(false)
</script>

<template>   
    <tr @mouseover="isShow = !isShow" @mouseout="isShow = !isShow">
        <td>{{ props.index }}</td>       
        <td>{{ props.task.task }}</td>
        <td>{{ props.task.criteria }}</td>
        <td>{{ props.task.date }}</td> 
        <td>
            <button :class="{ show: isShow }" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="config-button edit btn btn-primary">Изменить</button>
            <button :class="{ show: isShow }" type="button" class="config-button btn btn-danger">Удалить</button>
        </td>                  
    </tr>  

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <FormComponentVue :isButton="false"/>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
</div>

</template>

<style scoped>
    .config-button {
        background: #7a7a7a;
        border: none;
        margin-right: 1rem;
    }

    input {
        all: unset;
    }

    .config-button.show {
        background: #da2a2a;
    }

    .edit.show {
        background: #1260b9;
    }

    .btn-delete {
        margin-right: 1rem;
    }

    td {
        text-align: center;
    }
</style>