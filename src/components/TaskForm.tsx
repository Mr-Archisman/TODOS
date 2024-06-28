import React, { useState, useEffect, FormEvent } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskFormProps {
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  taskToEdit: Task | null;
  clearEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, editTask, taskToEdit, clearEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskToEdit) {
      editTask({ ...taskToEdit, title, description });
      clearEdit();
    } else {
      addTask({ id: Date.now(), title, description, completed: false });
    }
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      ></textarea>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
