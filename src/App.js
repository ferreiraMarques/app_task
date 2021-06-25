import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import { FilterByName } from './components/FilterByName';
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { TaskRow } from './components/TaskRow';
import { VisibilityControl } from './components/VisibilityControl';
import { config } from './config';

function App() {

  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const [showCompleted, setShowCompleted] = useState(true);

  const getList = () => {
    axios.get(`${config.api_url}/tasks`)
      .then(response => setTaskItems(response.data.data)).catch(err => console.error(err));
  }

  const getByName = (taskName) => {
    axios.get(`${config.api_url}/tasks/${taskName}/find`)
      .then(response => {
        const data = response.data.data;
        if (data.length > 0) {
          setTaskItems(data)
        } else {
          alert('Task not found');
          getList()
        }
      }).catch(err => {
        getList();
      });
  }

  const deleteTask = task => {
    if (!taskItems.find(t => t.name === task)) {
      axios.delete(`${config.api_url}/tasks/${task}`)
        .then(() => getList()).catch(err => alert('Task not deleted'));
    }
  }

  const toggleTask = task => {
    axios
      .put(`${config.api_url}/tasks/${task.id}`, { name: task.name, completed: !task.completed })
      .then(() => {
        setTaskItems(taskItems
          .map(t => task.name === t.name ? { ...t, completed: !t.completed } : t));
      }).catch(err => alert('Task not updated'));
  }

  const createNewTask = task => {
    if (!taskItems.find(t => t.name === task)) {
      axios.post(`${config.api_url}/tasks`, { name: task })
        .then(response => getList()).catch(err => alert('Task not created'));
    }
  }

  const taskTableRows = completedValue =>
    taskItems
      .filter(task => task.completed === completedValue)
      .map(task => (
        <TaskRow key={task.name} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
      ));

  return (
    <div className="container-fluid">
      <TaskBanner taskItems={taskItems} />
      <TaskCreator callback={createNewTask} />
      <FilterByName callback={getByName} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Create Date</th>
            <th>completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(true)}
        </tbody>
      </table>

      <div className="mb-3 row">
        <div className="bg-secundary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={showCompleted}
            callback={checked => setShowCompleted(checked)} />
        </div>
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Create Date</th>
                <th>completed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(false)}
            </tbody>
          </table>
        )
      }


    </div>
  );
}

export default App;