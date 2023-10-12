<script setup>
    import { onMounted, ref} from 'vue';
    import userService from '../../services/user.service';
    import FormComponent from '../../components/user/FormComponent.vue';
    import Table from '../../components/user/Table.vue';
    import { useAuthStore } from '../../stores/auth.store';

    const authStore = useAuthStore();


    async function getUser() {
      try {
        const response = await fetch('http://localhost:4000/api/user/', {
        mode: 'cors',
        method: 'POST',       
        headers: {
            'x-access-token': authStore.initialState.user.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: authStore.initialState.user.id,            
        })       
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(`Произошла ошибка - ${result}`)
    }
    
    } catch (error) {
        console.log(error.message);
    }
    }
</script>

<template>   
    <main>
    <section class="edit-area">
      <p class="d-inline-flex gap-1">        
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Добавить запись
        </button>       
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <FormComponent/>
        </div>
      </div>
    
    <div class="upload-file">
      <p class="d-inline-flex gap-1">        
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUploadFile" aria-expanded="false" aria-controls="collapseExample">
          Добавить файл
        </button>
      </p>
      <div class="collapse" id="collapseUploadFile">
        <form action="" class="form">
            <div class="mb-3">
                <label for="formFile" class="form-label">Добавьте файл Excel</label>
                <input class="form-control" type="file" id="formFile">
            </div>
        </form>
      </div> 
    </div>
    </section>   
    <Table></Table>     
  </main>
</template>