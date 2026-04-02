import React from 'react';
import { Users, Clock, Settings, PlusCircle } from 'lucide-react';

const TeamSidebar = ({ activeTab, setActiveTab, onBackToHub }) => {
  const menuItems = [
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Clock },
  ];

  return (
    <aside className="glass" style={{ width: '280px', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-light)', padding: '2rem' }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 20px rgba(139, 92, 246, 0.15)'
          }}>
            <Users size={24} />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>Team Hub</h1>
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
        <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>Management</p>
        
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)', background: activeTab === item.id ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s', width: '100%', textAlign: 'left',
              fontFamily: 'inherit', fontSize: '1rem', fontWeight: 500
            }}
            onMouseOver={(e) => { if (activeTab !== item.id) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; } }}
            onMouseOut={(e) => { if (activeTab !== item.id) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; } }}
          >
            <item.icon size={20} style={{ color: activeTab === item.id ? '#8b5cf6' : 'inherit' }} />
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
        <button className="btn w-full justify-center" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)' }} onClick={() => document.getElementById('add-user-modal')?.showModal()}>
          <PlusCircle size={20} />
          New Member
        </button>
      </div>
    </aside>
  );
};

export default TeamSidebar;
