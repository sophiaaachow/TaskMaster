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


export function getTasksByUser(id) {
    return axiosClient.get("/get_tasks_by_user/" + id);
}

export function createTask(data) {
    return axiosClient.post("/create_task", JSON.stringify(data));
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

export function getTasksByTime(data) {
    return axiosClient.post("/get_tasks_by_time", JSON.stringify(data));
}

export function getTasksByStatus(data) {
    return axiosClient.post("/get_tasks_by_status", JSON.stringify(data));
}

export function register(data) {
    return axiosClient.post("/register", JSON.stringify(data));
}

export function checkUsername(data) {
    return axiosClient.post("/check_username", JSON.stringify(data));
}

export function login(data) {
    return axiosClient.post("/login", JSON.stringify(data));
}