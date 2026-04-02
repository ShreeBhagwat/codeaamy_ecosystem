import React from 'react';
import { useTeam } from '../../../context/TeamContext';
import { UserCheck, UserX, Clock, MapPin, CheckCircle, Target } from 'lucide-react';

const formatTime = (isoString) => {
  if (!isoString) return '-';
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const AttendanceDashboard = () => {
  const { teamMembers, attendance, markAttendance } = useTeam();
  const todayStr = new Date().toISOString().split('T')[0];

  const getDayAtnd = (userId) => {
    return attendance.find(a => a.user_id === userId && a.date === todayStr);
  };

  const isLate = (member, checkInIsoString) => {
    if (!checkInIsoString) return false;
    const checkIn = new Date(checkInIsoString);
    
    // Parse member's start time (e.g., "09:00")
    const [hours, minutes] = member.working_hours.start.split(':').map(Number);
    const expectedTime = new Date();
    expectedTime.setHours(hours, minutes, 0, 0);

    // Give a 15-minute grace period
    const gracePeriodMs = 15 * 60 * 1000;
    return checkIn.getTime() - expectedTime.getTime() > gracePeriodMs;
  };

  const presentCount = teamMembers.filter(m => getDayAtnd(m.id)).length;
  const absentCount = teamMembers.length - presentCount;

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="heading-lg">Daily Attendance</h2>
        <p className="text-secondary">Monitor check-ins, assess punctuality, and track availability.</p>
      </header>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem', flex: 1, minWidth: '200px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontWeight: 500, margin: 0 }}>Present Today</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{presentCount}</h3>
          </div>
        </div>
        
        <div className="glass-card flex items-center gap-4" style={{ padding: '1.5rem', flex: 1, minWidth: '200px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f43f5e, #e11d48)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <UserX size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontWeight: 500, margin: 0 }}>Absent Today</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{absentCount}</h3>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 className="heading-md" style={{ margin: 0 }}>Today's Log: <span className="text-muted">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span></h3>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-card)', backdropFilter: 'blur(8px)' }}>
              <tr>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Member</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Schedule</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Check-in</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Check-out</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No team members found.
                  </td>
                </tr>
              ) : (
                teamMembers.map(member => {
                  const todayRec = getDayAtnd(member.id);
                  const late = isLate(member, todayRec?.check_in_time);

                  return (
                    <tr key={member.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{member.name}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        <div className="flex items-center gap-2"><Target size={14}/> {member.working_hours.start}</div>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: todayRec?.check_in_time ? 600 : 400, color: todayRec?.check_in_time ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {formatTime(todayRec?.check_in_time)}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: todayRec?.check_out_time ? 600 : 400, color: todayRec?.check_out_time ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {formatTime(todayRec?.check_out_time)}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {!todayRec ? (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Absent</span>
                        ) : (
                            <span style={{ 
                              padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
                              background: late ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                              color: late ? 'var(--danger)' : 'var(--success)'
                            }}>
                              {late ? 'Late Arrival' : 'On Time'}
                            </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        {!todayRec ? (
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
                            onClick={() => markAttendance(member.id, 'check_in')}
                          >
                            <MapPin size={14} /> Check In
                          </button>
                        ) : !todayRec.check_out_time ? (
                          <button 
                            className="btn btn-danger" 
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', background: 'transparent' }}
                            onClick={() => markAttendance(member.id, 'check_out')}
                          >
                            <CheckCircle size={14} /> Check Out
                          </button>
                        ) : (
                         <span className="text-success" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Completed</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
