import React from 'react';
import { useTaskMaster } from '../../../context/TaskContext';
import { X, User, Calendar, Tag, Trash2 } from 'lucide-react';

const TaskDetailModal = ({ task }) => {
  const { deleteTask, updateTaskStatus } = useTaskMaster();

  if (!task) return null;

  const closeModal = () => {
    document.getElementById('task-detail-modal').close();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    closeModal();
  };

  return (
    <dialog id="task-detail-modal" style={{ 
      margin: 'auto', 
      padding: 0, 
      border: 'none', 
      background: 'transparent'
    }}>
      <div className="glass-card" style={{ width: '100%', minWidth: '450px', maxWidth: '600px', padding: '2rem', background: 'var(--bg-panel-solid)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 className="heading-md" style={{ margin: 0, marginBottom: '0.5rem' }}>{task.title}</h2>
            <span style={{ 
              padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
              background: task.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : task.priority === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
              color: task.priority === 'High' ? 'var(--danger)' : task.priority === 'Medium' ? 'var(--warning)' : 'var(--info)'
            }}>
              {task.priority || 'Low'} Priority
            </span>
          </div>
          <button type="button" className="btn-icon" onClick={closeModal}><X size={20} /></button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          <p className="text-secondary" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>
            {task.description || 'No description provided.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><User size={18} className="text-secondary" /></div>
            <div>
              <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', margin: 0, fontWeight: 600 }}>Assignee</p>
              <p style={{ margin: 0, fontWeight: 500 }}>{task.assignee}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><Calendar size={18} className="text-secondary" /></div>
            <div>
              <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', margin: 0, fontWeight: 600 }}>Due Date</p>
              <p style={{ margin: 0, fontWeight: 500 }}>{new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Status:</label>
            <select 
              className="select" 
              style={{ width: '150px', padding: '0.5rem', fontSize: '0.875rem' }}
              value={task.status}
              onChange={(e) => updateTaskStatus(task.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <button className="btn btn-danger" style={{ display: 'flex', gap: '0.5rem' }} onClick={handleDelete}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
      <style>{`
        #task-detail-modal::backdrop {
          background: rgba(11, 15, 25, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </dialog>
  );
};

export default TaskDetailModal;
