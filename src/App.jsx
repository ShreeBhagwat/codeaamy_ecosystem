import React, { useState } from 'react';
import EcosystemHub from './apps/Hub/EcosystemHub';
import ExpenseTrackerApp from './apps/ExpenseTracker/index';

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
    <>
      {currentApp === 'hub' && <EcosystemHub onSelectApp={handleSelectApp} />}
      {currentApp === 'expense_tracker' && <ExpenseTrackerApp onBackToHub={handleBackToHub} />}
    </>
  );
}

export default App;
