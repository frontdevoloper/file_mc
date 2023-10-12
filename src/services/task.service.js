import authHeader from "./auth-header.js";

const API_URL = 'http://localhost:4000/api/tasks/';

class TaskService {
    async getTasksAll(userId) {
        return await fetch(API_URL + 'all', {
            headers: authHeader(), 
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(userId)
        });
    }

    taskAdd(task) {
        return fetch(API_URL + 'add', {
            headers: authHeader(),
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(task)
        })
    }

    taskUpdate(task, id) {
        return fetch(API_URL + 'update', {
            headers: authHeader(),
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                task,
                taskId: id
            })
        })
    }
}

export default new TaskService();