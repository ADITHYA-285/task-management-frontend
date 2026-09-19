import { useState } from "react";
import { updateTask } from "../services/api";
import "./edittask.css";

const EditTask = ({ task, onTaskUpdated, onCancel }) => {
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "");
    const [status, setStatus] = useState(task.status || "PENDING");
    const [priority, setPriority] = useState(task.priority || "MEDIUM");
    const [dueDate, setDueDate] = useState(
        task.dueDate ? task.dueDate.substring(0, 10) : ""
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateTask(task.id, {
                title,
                description,
                status,
                priority,
                dueDate: dueDate || null
            });

            alert("Task updated successfully!");

            onTaskUpdated();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="edit-overlay">
            <div className="edit-card">

                <div className="edit-header">
                    <div>
                        <h2>Edit Task</h2>
                        <p>Update your task details</p>
                    </div>

                    <button
                        className="close-btn"
                        onClick={onCancel}
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Task Title</label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Enter task description"
                            rows="4"
                        />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Status</label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                <option value="PENDING">
                                    Pending
                                </option>

                                <option value="IN_PROGRESS">
                                    In Progress
                                </option>

                                <option value="COMPLETED">
                                    Completed
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Priority</label>

                            <select
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-due-date">
                            Due Date
                        </label>

                        <input
                            id="edit-due-date"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            onClick={(e) => {
                                if (e.target.showPicker) {
                                    e.target.showPicker();
                                }
                            }}
                        />
                    </div>

                    <div className="edit-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditTask;