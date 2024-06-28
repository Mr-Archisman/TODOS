import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: number) => void;
  markComplete: (id: number) => void;
  editTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, markComplete, editTask }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search) {
      setFilter('all');
    }
  }, [search]);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') {
        return task.completed;
      }
      if (filter === 'pending') {
        return !task.completed;
      }
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="task-list-container">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`p-2 rounded ${filter === 'all' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`p-2 rounded ${filter === 'completed' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`p-2 rounded ${filter === 'pending' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
        >
          Pending
        </button>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            markComplete={markComplete}
            editTask={editTask}
          />
        ))
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default TaskList;
