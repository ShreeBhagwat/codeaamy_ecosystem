import React from 'react';
import { Calendar, Settings, Compass, Play } from 'lucide-react';

const ChronoSidebar = ({ activeTab, setActiveTab, onBackToHub, onPlanDay }) => {
  const menuItems = [
    { id: 'schedule', label: 'My Day Plan', icon: Calendar },
    { id: 'explore', label: 'Explore', icon: Compass },
  ];

  return (
    <aside className="glass" style={{ width: '280px', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-light)', padding: '2rem' }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 20px rgba(245, 158, 11, 0.15)'
          }}>
            <Calendar size={24} />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>Chrono</h1>
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
              borderRadius: 'var(--radius-md)', background: activeTab === item.id ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s', width: '100%', textAlign: 'left',
              fontFamily: 'inherit', fontSize: '1rem', fontWeight: 500
            }}
            onMouseOver={(e) => { if (activeTab !== item.id) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; } }}
            onMouseOut={(e) => { if (activeTab !== item.id) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; } }}
          >
            <item.icon size={20} style={{ color: activeTab === item.id ? '#f59e0b' : 'inherit' }} />
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
        <button 
          id="btn-generate-plan"
          className="btn w-full justify-center" 
          onClick={onPlanDay}
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)' }}
        >
          <Play size={18} />
          Plan My Day
        </button>
      </div>
    </aside>
  );
};

export default ChronoSidebar;
