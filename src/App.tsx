import React, { useState, useEffect } from 'react';
import './index.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const markComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
  };

  const clearEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="max-w-screen mx-auto p-4  bg-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>
      <div className="flex flex-col md:flex-row gap-4 h-screen md:h-[calc(100vh-4rem)] ">
        <div className="md:w-1/2 bg-white p-4 rounded  h-auto md:h-full overflow-y-auto md:overflow-hidden !bg-gray-200">
          <h2 className="text-2xl font-bold mb-4">Add/Edit Task</h2>
          <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} clearEdit={clearEdit} />
        </div>
        <div className="md:w-1/2 bg-white p-4 rounded shadow-md flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          <TaskList tasks={tasks} deleteTask={deleteTask} markComplete={markComplete} editTask={handleEdit} />
        </div>
      </div>
    </div>
  );
};

export default App;
