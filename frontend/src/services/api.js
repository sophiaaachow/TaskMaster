import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:5000/`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        if (res.status === 401) {
            window.location.href = "http://localhost:3000/";
        }
        console.error(error);
        return Promise.reject(error);
    }
);

export function createTask(data) {
    return axiosClient.post("/create_task", JSON.stringify(data));
}

export function getAllTasks() {
    return axiosClient.get("/get_all_tasks");
}

export function getTask(id) {
    return axiosClient.get("/get_task/" + id);
}

export function deleteTask(id) {
    return axiosClient.get("/delete_task/" + id)
}

export function updateStatus(id) {
    return axiosClient.get("/update_status/" + id)
}

export function updateTask(data) {
    return axiosClient.post("/update_task", JSON.stringify(data))
}

export function getTasksByTime(time) {
    return axiosClient.get("/get_tasks_by_time/" + time);
}

export function getTasksByStatus(status) {
    return axiosClient.get("/get_tasks_by_status/" + status);
}