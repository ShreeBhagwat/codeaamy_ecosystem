import React from 'react';
import { useTaskMaster } from '../../../context/TaskContext';
import { User, Calendar, Clock, CheckCircle } from 'lucide-react';

const TaskCard = ({ task, onOpenDetail, onStatusChange }) => {
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => onOpenDetail(task)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>{task.title}</h3>
        <span style={{ 
          padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
          background: task.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : task.priority === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
          color: task.priority === 'High' ? 'var(--danger)' : task.priority === 'Medium' ? 'var(--warning)' : 'var(--info)'
        }}>
          {task.priority || 'Low'}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={16} /> {task.assignee || 'Unassigned'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={16} /> {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          {task.status === 'Completed' ? <CheckCircle size={18} className="text-success" /> : <Clock size={18} className="text-warning" />}
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{task.status}</span>
        </div>
        
        <select 
          className="select" 
          style={{ width: 'auto', padding: '0.5rem', fontSize: '0.875rem' }}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

const TaskDashboard = ({ onOpenDetail }) => {
  const { tasks, updateTaskStatus } = useTaskMaster();

  const pendingTasks = tasks.filter(t => t.status !== 'Completed');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="heading-lg">Task Board</h2>
        <p className="text-secondary">Keep track of your assignments and stay productive.</p>
      </header>

      <div style={{ marginBottom: '3rem' }}>
        <h3 className="heading-md" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Active Tasks</h3>
        {pendingTasks.length === 0 ? (
          <p className="text-muted">No active tasks. Take a break!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {pendingTasks.map(task => (
              <TaskCard key={task.id} task={task} onOpenDetail={onOpenDetail} onStatusChange={updateTaskStatus} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="heading-md" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Completed Tasks</h3>
        {completedTasks.length === 0 ? (
          <p className="text-muted">No completed tasks yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {completedTasks.map(task => (
              <TaskCard key={task.id} task={task} onOpenDetail={onOpenDetail} onStatusChange={updateTaskStatus} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
