import React, { useState } from "react";

export const TaskCreator = (props) => {

    const [newTask, setNewTask] = useState('');

    const updateTaskValue = e => setNewTask(e.target.value);

    const createNewTask = () => {
        props.callback(newTask);
        setNewTask('');
    };

    return (
        <div className="my-2">
            <input type="text"
                className="form-control"
                value={newTask}
                onChange={updateTaskValue}
                placeholder="Create new task" />

            <div className="d-grid gap-2">
                <button className="btn btn-primary mt-1" onClick={createNewTask}> Add</button>
            </div>
        </div>
    )
}