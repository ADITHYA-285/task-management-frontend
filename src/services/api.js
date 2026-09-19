const API_URL = "http://localhost:5000";

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const createTask = async (taskData) => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create task");
    }

    return data;
};

export const getTasks = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/api/tasks`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch tasks"
        );
    }

    return data;
};

export const registerUser = async (name, email, password) => {

    const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Registration failed"
        );
    }

    return data;
};  

export const updateTask = async (id, taskData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(taskData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update task");
    }

    return data;
};


export const deleteTask = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete task"
        );
    }

    return data;
};