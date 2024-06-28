import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  markComplete: (id: number) => void;
  editTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, markComplete, editTask }) => {
  return (
    <div className={`p-4 mb-4 rounded border ${task.completed ? 'bg-gray-100 line-through text-gray-500' : 'bg-white'}`}>
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={() => markComplete(task.id)} className="p-2 bg-green-500 text-white rounded hover:bg-green-700">
          Mark as {task.completed ? 'Pending' : 'Completed'}
        </button>
        <button onClick={() => editTask(task)} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700">
          Edit
        </button>
        <button onClick={() => deleteTask(task.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
