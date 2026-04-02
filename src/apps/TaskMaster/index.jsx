import React, { useState } from 'react';
import TaskSidebar from './components/TaskSidebar';
import TaskDashboard from './components/TaskDashboard';
import AddTaskModal from './components/AddTaskModal';
import TaskDetailModal from './components/TaskDetailModal';

const TaskMasterApp = ({ onBackToHub }) => {
  const [activeTab, setActiveTab] = useState('board');
  const [selectedTask, setSelectedTask] = useState(null);

  const openTaskDetail = (task) => {
    setSelectedTask(task);
    document.getElementById('task-detail-modal')?.showModal();
  };

  return (
    <div className="app-container animate-fade-in" style={{ animationDuration: '0.6s' }}>
      <TaskSidebar activeTab={activeTab} setActiveTab={setActiveTab} onBackToHub={onBackToHub} />
      
      <main className="main-content">
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          {activeTab === 'board' && <TaskDashboard onOpenDetail={openTaskDetail} />}
        </div>
      </main>

      <AddTaskModal />
      <TaskDetailModal task={selectedTask} />
    </div>
  );
};

export default TaskMasterApp;
