import React, { useState } from 'react';
import EcosystemHub from './apps/Hub/EcosystemHub';
import ExpenseTrackerApp from './apps/ExpenseTracker/index';
import TaskMasterApp from './apps/TaskMaster/index';
import ChronoApp from './apps/Chrono/index';
import TeamManagerApp from './apps/TeamManager/index';
import { FinanceProvider } from './context/FinanceContext';
import { TaskProvider } from './context/TaskContext';
import { TeamProvider } from './context/TeamContext';

function App() {
  // 'hub' is the default landing page
  const [currentApp, setCurrentApp] = useState('hub');

  const handleSelectApp = (appId) => {
    setCurrentApp(appId);
  };

  const handleBackToHub = () => {
    setCurrentApp('hub');
  };

  return (
    <TeamProvider>
      <FinanceProvider>
        <TaskProvider>
          {currentApp === 'hub' && <EcosystemHub onSelectApp={handleSelectApp} />}
          {currentApp === 'expense_tracker' && <ExpenseTrackerApp onBackToHub={handleBackToHub} />}
          {currentApp === 'tasks' && <TaskMasterApp onBackToHub={handleBackToHub} />}
          {currentApp === 'calendar' && <ChronoApp onBackToHub={handleBackToHub} />}
          {currentApp === 'team' && <TeamManagerApp onBackToHub={handleBackToHub} />}
        </TaskProvider>
      </FinanceProvider>
    </TeamProvider>
  );
}

export default App;
