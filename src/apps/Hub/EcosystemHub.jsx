import React from 'react';
import { CreditCard, CheckSquare, Calendar, Cloud, Blocks } from 'lucide-react';

const EcosystemHub = ({ onSelectApp }) => {
  const apps = [
    {
      id: 'expense_tracker',
      name: 'Orbit',
      description: 'Track and manage your expenses with a premium tracker.',
      icon: CreditCard,
      color: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
      shadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
    },
    {
      id: 'tasks',
      name: 'TaskMaster',
      description: 'Streamline your daily focus with intuitive task management.',
      icon: CheckSquare,
      color: 'linear-gradient(135deg, #10b981, #059669)',
      shadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
      comingSoon: true
    },
    {
      id: 'calendar',
      name: 'Chrono',
      description: 'Schedule your day beautifully without any hassle.',
      icon: Calendar,
      color: 'linear-gradient(135deg, #f59e0b, #d97706)',
      shadow: '0 10px 30px rgba(245, 158, 11, 0.4)',
      comingSoon: true
    },
    {
      id: 'cloud',
      name: 'Aero Drive',
      description: 'Store and sync your files seamlessly across devices.',
      icon: Cloud,
      color: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      shadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
      comingSoon: true
    }
  ];

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
      
      {/* Background decorations */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.1)', filter: 'blur(100px)', borderRadius: '50%', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', background: 'rgba(236, 72, 153, 0.1)', filter: 'blur(100px)', borderRadius: '50%', zIndex: -1 }}></div>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', background: 'var(--bg-panel)', padding: '0.5rem 1.5rem', borderRadius: '100px', border: '1px solid var(--border-light)' }}>
          <Blocks size={20} className="text-secondary" />
          <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>CODEAAMY</span>
        </div>
        <h1 className="heading-lg" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Ecosystem <span className="text-gradient">Hub</span></h1>
        <p className="text-secondary" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>Select an application to begin your productive journey.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px' }}>
        {apps.map((app) => (
          <div 
            key={app.id}
            className="glass-card"
            style={{ 
              padding: '2rem', 
              cursor: app.comingSoon ? 'not-allowed' : 'pointer',
              opacity: app.comingSoon ? 0.7 : 1,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onClick={() => !app.comingSoon && onSelectApp(app.id)}
            onMouseOver={(e) => {
              if (!app.comingSoon) {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = app.shadow;
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
            onMouseOut={(e) => {
              if (!app.comingSoon) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }
            }}
          >
            {app.comingSoon && (
              <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Coming Soon
              </span>
            )}
            
            <div style={{
              width: '64px', height: '64px', borderRadius: '16px', background: app.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '1.5rem',
              boxShadow: app.shadow
            }}>
              <app.icon size={32} />
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{app.name}</h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{app.description}</p>
            
            {!app.comingSoon ? (
              <button 
                className="btn btn-secondary" 
                style={{ marginTop: '2rem', width: '100%' }}
              >
                Launch App
              </button>
            ) : (
              <button 
                className="btn" 
                disabled
                style={{ marginTop: '2rem', width: '100%', background: 'transparent', border: '1px dashed var(--text-muted)', color: 'var(--text-muted)' }}
              >
                In Development
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcosystemHub;
