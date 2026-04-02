import React, { createContext, useState, useEffect, useContext } from 'react';

const TaskContext = createContext();

export const useTaskMaster = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskmaster_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: '1', title: 'Complete project planning', description: 'Finish the initial setup and folder structure for TaskMaster.', assignee: 'ShreeBhagwat', dueDate: new Date().toISOString(), status: 'Completed', priority: 'High' },
      { id: '2', title: 'Design Database Schema', description: 'Draft the data models for the new application.', assignee: 'ShreeBhagwat', dueDate: new Date(Date.now() + 86400000).toISOString(), status: 'In Progress', priority: 'Medium' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('taskmaster_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks(prev => [{
      ...task,
      id: Date.now().toString(),
      dueDate: task.dueDate || new Date().toISOString()
    }, ...prev]);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };
  
  const updateTask = (id, updatedTask) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedTask } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTaskStatus,
      updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};
