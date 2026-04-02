import React, { useState } from 'react';
import TeamSidebar from './components/TeamSidebar';
import TeamDashboard from './components/TeamDashboard';
import AttendanceDashboard from './components/AttendanceDashboard';
import AddUserModal from './components/AddUserModal';

const TeamManagerApp = ({ onBackToHub }) => {
  const [activeTab, setActiveTab] = useState('team');

  return (
    <div className="app-container animate-fade-in" style={{ animationDuration: '0.6s' }}>
      <TeamSidebar activeTab={activeTab} setActiveTab={setActiveTab} onBackToHub={onBackToHub} />
      
      <main className="main-content">
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          {activeTab === 'team' && <TeamDashboard />}
          {activeTab === 'attendance' && <AttendanceDashboard />}
        </div>
      </main>

      <AddUserModal />
    </div>
  );
};

export default TeamManagerApp;
