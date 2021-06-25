import React from "react";

export const TaskRow = (props) => (
    <tr key={props.task.id}>
        <td>{props.task.id}</td>
        <td>{props.task.name}</td>
        <td>{props.task.created_at}</td>
        <td>
            <input
                type="checkbox"
                checked={props.task.completed}
                onChange={() => props.toggleTask(props.task)} />
        </td>
        <td>
            <button className="btn btn-danger" onClick={() => props.deleteTask(props.task.id)}>
                Delete
            </button>
        </td>
    </tr>
);