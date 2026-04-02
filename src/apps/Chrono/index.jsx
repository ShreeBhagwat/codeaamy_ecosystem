import React, { useState } from 'react';
import ChronoSidebar from './components/ChronoSidebar';
import Timeline from './components/Timeline';

const ChronoApp = ({ onBackToHub }) => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [generateCount, setGenerateCount] = useState(0);

  return (
    <div className="app-container animate-fade-in" style={{ animationDuration: '0.6s' }}>
      <ChronoSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onBackToHub={onBackToHub} 
        onPlanDay={() => setGenerateCount(c => c + 1)}
      />
      
      <main className="main-content">
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          {activeTab === 'schedule' && <Timeline generateTrigger={generateCount} />}
        </div>
      </main>
    </div>
  );
};

export default ChronoApp;
