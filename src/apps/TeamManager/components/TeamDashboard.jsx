import React from 'react';
import { useTeam } from '../../../context/TeamContext';
import { Users, UserMinus, Trash2, Mail, Clock } from 'lucide-react';

const TeamDashboard = () => {
  const { teamMembers, deleteTeamMember } = useTeam();

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="heading-lg">Team Directory</h2>
        <p className="text-secondary">Manage your organization's members, roles, and schedules.</p>
      </header>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem', flex: 1 }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Users size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontWeight: 500, margin: 0 }}>Total Members</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{teamMembers.length}</h3>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="heading-md" style={{ marginBottom: '1.5rem' }}>Active Personnel</h3>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-card)', backdropFilter: 'blur(8px)' }}>
              <tr>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Member</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Contact</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Role</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Schedule</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No team members found. Add individuals to your team.
                  </td>
                </tr>
              ) : (
                teamMembers.map(member => (
                  <tr key={member.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem' }}>
                      <div className="flex items-center gap-3">
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600 }}>{member.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      <div className="flex items-center gap-2"><Mail size={14}/> {member.email}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
                        background: member.role === 'Admin' ? 'rgba(239, 68, 68, 0.1)' : member.role === 'Manager' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        color: member.role === 'Admin' ? 'var(--danger)' : member.role === 'Manager' ? 'var(--warning)' : 'var(--info)'
                      }}>
                        {member.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      <div className="flex items-center gap-2"><Clock size={14}/> {member.working_hours.start} - {member.working_hours.end}</div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button 
                        className="btn-icon" 
                        style={{ margin: '0 auto', color: 'var(--text-muted)' }}
                        onClick={() => deleteTeamMember(member.id)}
                        title="Remove Member"
                      >
                        <UserMinus size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
