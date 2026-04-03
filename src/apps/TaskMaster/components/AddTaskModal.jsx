import React, { useState } from 'react';
import { useTaskMaster } from '../../../context/TaskContext';
import { useTeam } from '../../../context/TeamContext';
import { X } from 'lucide-react';

const AddTaskModal = () => {
  const { addTask } = useTaskMaster();
  const { teamMembers } = useTeam();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    status: 'Pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.assignee) return;

    addTask(formData);

    setFormData({
      title: '',
      description: '',
      assignee: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      status: 'Pending'
    });
    
    document.getElementById('add-task-modal').close();
  };

  const closeModal = () => {
    document.getElementById('add-task-modal').close();
  };

  return (
    <dialog id="add-task-modal" style={{ 
      margin: 'auto', 
      padding: 0, 
      border: 'none', 
      background: 'transparent',
      '::backdrop': { background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: 'var(--bg-panel-solid)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="heading-md" style={{ margin: 0 }}>Create Task</h2>
          <button type="button" className="btn-icon" onClick={closeModal}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Task Title</label>
            <input 
              type="text" 
              className="input" 
              placeholder="e.g. Design Landing Page" 
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label">Description</label>
            <textarea 
              className="input" 
              placeholder="Add more details..."
              rows="3"
              style={{ resize: 'vertical' }}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="label">Assign To</label>
            <select 
              className="select" 
              required
              value={formData.assignee}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
            >
              <option value="" disabled>Select Team Member</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.name}>{member.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="label">Due Date</label>
              <input 
                type="date" 
                className="input" 
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="label">Priority</label>
              <select 
                className="select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary w-full" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn w-full" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}>
              Create Task
            </button>
          </div>
        </form>
      </div>
      <style>{`
        #add-task-modal::backdrop {
          background: rgba(11, 15, 25, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </dialog>
  );
};

export default AddTaskModal;
