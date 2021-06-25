import React from "react";

export const TaskBanner = (props) => (
    <h4 className="bg-primary text-white text-center p-4">
        Task App ({props.taskItems.filter(t => !t.completed).length} task to do)
    </h4>
)