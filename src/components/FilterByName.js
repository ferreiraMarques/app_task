import React, { useState } from "react";

export const FilterByName = (props) => {

    const [taskName, setTaskName] = useState('');

    const TaskValue = e => setTaskName(e.target.value);

    const findTask = () => {
        props.callback(taskName);
        setTaskName('');
    };

    return (
        <div className="my-2">
            <input type="text"
                className="form-control"
                value={taskName}
                onChange={TaskValue}
                placeholder="Search task by name" />

            <div className="d-grid gap-2">
                <button className="btn btn-primary mt-1" onClick={findTask}>Search</button>
            </div>
        </div>
    )
}