import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTask from "../components/createtask";
import EditTask from "../components/edittask";
import { deleteTask } from "../services/api";
import "./dashboard.css";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [userName, setUserName] = useState("");
    const [editingTask, setEditingTask] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };




    useEffect(() => {
        const name = localStorage.getItem("name");

        setUserName(name || "User");

        getTasks();
    }, []);

    const getTasks = async () => {
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

        console.log("Tasks:", data);

        setTasks(data.tasks || []);
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);

            getTasks();

        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };

    // Statistics
    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "PENDING"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "IN_PROGRESS"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "COMPLETED"
    ).length;

    return (
        <div className="dashboard">

            {/* Header */}
            <header className="dashboard-header">

                <div className="logo">
                    TaskFlow
                </div>

                <div className="header-right">

                    <span className="user-name">
                        👤 {userName}
                    </span>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* Main */}
            <main className="dashboard-container">

                {/* Welcome */}
                <section className="welcome-section">

                    <h1>Task Dashboard</h1>

                    <p>
                        Manage your tasks and stay productive.
                    </p>

                </section>


                {/* Statistics */}
                <section className="stats-container">

                    <div className="stat-card">
                        <span className="stat-title">
                            Total Tasks
                        </span>

                        <span className="stat-number">
                            {totalTasks}
                        </span>
                    </div>


                    <div className="stat-card">
                        <span className="stat-title">
                            Pending
                        </span>

                        <span className="stat-number">
                            {pendingTasks}
                        </span>
                    </div>


                    <div className="stat-card">
                        <span className="stat-title">
                            In Progress
                        </span>

                        <span className="stat-number">
                            {inProgressTasks}
                        </span>
                    </div>


                    <div className="stat-card">
                        <span className="stat-title">
                            Completed
                        </span>

                        <span className="stat-number">
                            {completedTasks}
                        </span>
                    </div>

                </section>


                {/* Create Task */}
                <section className="create-section">

                    <div className="create-header">
                        <h2>Create New Task</h2>

                        <p>
                            Add a new task to your workspace
                        </p>
                    </div>

                    <CreateTask
                        onTaskCreated={getTasks}
                    />

                </section>


                {/* Edit Task */}
                {editingTask && (
                    <section className="edit-container">

                        <EditTask
                            task={editingTask}

                            onTaskUpdated={() => {
                                getTasks();
                                setEditingTask(null);
                            }}

                            onCancel={() => {
                                setEditingTask(null);
                            }}
                        />

                    </section>
                )}


                {/* Tasks */}
                <section className="tasks-section">

                    <div className="tasks-header">

                        <div>
                            <h2>My Tasks</h2>

                            <p>
                                Keep track of your work
                            </p>
                        </div>

                    </div>


                    {tasks.length === 0 ? (

                        <div className="empty-state">
                            <div className="empty-icon">
                                ✓
                            </div>

                            <h3>No tasks yet</h3>

                            <p>
                                Create your first task to get started.
                            </p>
                        </div>

                    ) : (

                        <div className="task-grid">

                            {tasks.map((task) => (

                                <div
                                    className="task-card"
                                    key={task.id}
                                >

                                    <div className="task-card-top">

                                        <h3>
                                            {task.title}
                                        </h3>

                                        <span
                                            className={`priority-badge ${task.priority?.toLowerCase()}`}
                                        >
                                            {task.priority}
                                        </span>

                                    </div>


                                    <p className="task-description">
                                        {task.description ||
                                            "No description provided."}
                                    </p>


                                    <div className="task-info">

                                        <span
                                            className={`status-badge ${task.status?.toLowerCase()}`}
                                        >
                                            {task.status}
                                        </span>

                                        <span className="due-date">
                                            {task.dueDate
                                                ? new Date(
                                                    task.dueDate
                                                ).toLocaleDateString()
                                                : "No due date"}
                                        </span>

                                    </div>


                                    <div className="task-actions">

                                        {task.status !== "COMPLETED" && (
                                            <>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => setEditingTask(task)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => {
                                                        const confirmDelete = window.confirm(
                                                            "Are you sure that you want to delete this task?"
                                                        );

                                                        if (confirmDelete) {
                                                            handleDelete(task.id);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
};

export default Dashboard;