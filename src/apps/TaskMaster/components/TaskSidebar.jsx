import React from 'react';
import { Home, CheckSquare, Settings, PlusCircle } from 'lucide-react';

const TaskSidebar = ({ activeTab, setActiveTab, onBackToHub }) => {
  const menuItems = [
    { id: 'board', label: 'Task Board', icon: Home },
    { id: 'my-tasks', label: 'My Tasks', icon: CheckSquare },
  ];

  return (
    <aside className="glass" style={{ width: '280px', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-light)', padding: '2rem' }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)'
          }}>
            <CheckSquare size={24} />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, backgroundImage: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>TaskMaster</h1>
        </div>
        <button 
          className="btn-icon" 
          onClick={onBackToHub} 
          title="Back to Codeaamy Ecosystem"
        >
          <Settings size={20} />
        </button>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>Main Menu</p>
        
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)', background: activeTab === item.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s', width: '100%', textAlign: 'left',
              fontFamily: 'inherit', fontSize: '1rem', fontWeight: 500
            }}
            onMouseOver={(e) => { if (activeTab !== item.id) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; } }}
            onMouseOut={(e) => { if (activeTab !== item.id) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; } }}
          >
            <item.icon size={20} style={{ color: activeTab === item.id ? '#10b981' : 'inherit' }} />
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
        <button className="btn w-full justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }} onClick={() => document.getElementById('add-task-modal')?.showModal()}>
          <PlusCircle size={20} />
          New Task
        </button>
      </div>
    </aside>
  );
};

export default TaskSidebar;
