import React, { createContext, useState, useEffect, useContext } from 'react';

const TeamContext = createContext();

export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('ecosystem_team');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      { id: '1', name: 'Shree Bhagwat', email: 'admin@codeaamy.com', role: 'Admin', working_hours: { start: '09:00', end: '17:00' } },
      { id: '2', name: 'John Doe', email: 'john@codeaamy.com', role: 'Employee', working_hours: { start: '09:00', end: '17:00' } }
    ];
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('ecosystem_attendance');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('ecosystem_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('ecosystem_attendance', JSON.stringify(attendance));
  }, [attendance]);

  const addTeamMember = (member) => {
    setTeamMembers(prev => [{
      ...member,
      id: Date.now().toString(),
    }, ...prev]);
  };

  const updateTeamMember = (id, updated) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const deleteTeamMember = (id) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };
  
  const markAttendance = (userId, type) => {
    const dateStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toISOString();
    
    setAttendance(prev => {
      const existing = prev.find(a => a.user_id === userId && a.date === dateStr);
      
      if (type === 'check_in') {
        if (existing) return prev; // Already checked in
        return [{ id: Date.now().toString(), user_id: userId, date: dateStr, check_in_time: timeStr, check_out_time: null, status: 'Present' }, ...prev];
      } else {
        if (!existing) return prev; // Cannot check out without checking in
        return prev.map(a => a.id === existing.id ? { ...a, check_out_time: timeStr } : a);
      }
    });
  };

  return (
    <TeamContext.Provider value={{
      teamMembers,
      attendance,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      markAttendance
    }}>
      {children}
    </TeamContext.Provider>
  );
};
