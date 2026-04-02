import React, { useState } from 'react';
import { useTeam } from '../../../context/TeamContext';
import { X } from 'lucide-react';

const AddUserModal = () => {
  const { addTeamMember } = useTeam();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Employee',
    startHour: '09:00',
    endHour: '17:00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    addTeamMember({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      working_hours: { start: formData.startHour, end: formData.endHour }
    });

    setFormData({
      name: '',
      email: '',
      role: 'Employee',
      startHour: '09:00',
      endHour: '17:00'
    });
    
    document.getElementById('add-user-modal').close();
  };

  const closeModal = () => {
    document.getElementById('add-user-modal').close();
  };

  return (
    <dialog id="add-user-modal" style={{ 
      margin: 'auto', 
      padding: 0, 
      border: 'none', 
      background: 'transparent'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: 'var(--bg-panel-solid)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="heading-md" style={{ margin: 0 }}>Add Team Member</h2>
          <button type="button" className="btn-icon" onClick={closeModal}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Full Name</label>
            <input 
              type="text" 
              className="input" 
              placeholder="e.g. Jane Doe" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label">Email Address</label>
            <input 
              type="email" 
              className="input" 
              placeholder="jane.doe@codeaamy.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label">Role</label>
            <select 
              className="select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="label">Working Hours Start</label>
              <input 
                type="time" 
                className="input" 
                required
                value={formData.startHour}
                onChange={(e) => setFormData({ ...formData, startHour: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="label">Working Hours End</label>
              <input 
                type="time" 
                className="input" 
                required
                value={formData.endHour}
                onChange={(e) => setFormData({ ...formData, endHour: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary w-full" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn w-full" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)' }}>
              Add Member
            </button>
          </div>
        </form>
      </div>
      <style>{`
        #add-user-modal::backdrop {
          background: rgba(11, 15, 25, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </dialog>
  );
};

export default AddUserModal;
