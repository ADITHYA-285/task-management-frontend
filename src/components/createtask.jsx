import { useRef, useState } from "react";
import { createTask } from "../services/api";
import "./createtask.css";

const CreateTask = ({ onTaskCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");

    const dateInputRef = useRef(null);

   const openDatePicker = () => {
    if (
        dateInputRef.current &&
        typeof dateInputRef.current.showPicker === "function"
    ) {
        dateInputRef.current.showPicker();
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a task title");
            return;
        }

        try {
            await createTask({
                title,
                description,
                priority,
                dueDate: dueDate || null
            });

            setTitle("");
            setDescription("");
            setPriority("MEDIUM");
            setDueDate("");

            onTaskCreated();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <form
            className="create-task-form"
            onSubmit={handleSubmit}
        >

            {/* Title */}
            <div className="form-group">
                <label htmlFor="task-title">
                    Task Title
                </label>

                <input
                    id="task-title"
                    type="text"
                    placeholder="e.g. Learn Prisma"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />
            </div>


            {/* Description */}
            <div className="form-group">
                <label htmlFor="task-description">
                    Description
                </label>

                <textarea
                    id="task-description"
                    placeholder="Describe what needs to be done..."
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    rows="4"
                />
            </div>


            {/* Priority + Date */}
            <div className="task-form-row">

                {/* Priority */}
                <div className="form-group">
                    <label htmlFor="task-priority">
                        Priority
                    </label>

                    <select
                        id="task-priority"
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >
                        <option value="LOW">
                            Low
                        </option>

                        <option value="MEDIUM">
                            Medium
                        </option>

                        <option value="HIGH">
                            High
                        </option>
                    </select>
                </div>


                {/* Due Date */}
                <div className="form-group">
                    <label htmlFor="task-date">
                        Due Date
                    </label>

                    <input
                        ref={dateInputRef}
                        id="task-date"
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(e.target.value)
                        }
                        onClick={openDatePicker}
                    />
                </div>

            </div>


            {/* Create */}
            <button
                type="submit"
                className="create-task-btn"
            >
                <span>+</span>
                Create Task
            </button>

        </form>
    );
};

export default CreateTask;