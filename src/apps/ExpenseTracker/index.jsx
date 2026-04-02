import React, { useState } from 'react';
import { FinanceProvider } from '../../context/FinanceContext';
import Sidebar from '../../components/Sidebar';
import Dashboard from '../../components/Dashboard';
import Transactions from '../../components/Transactions';
import AddTransactionModal from '../../components/AddTransactionModal';

const ExpenseTrackerApp = ({ onBackToHub }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <FinanceProvider>
      <div className="app-container animate-fade-in" style={{ animationDuration: '0.6s' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onBackToHub={onBackToHub} />
        
        <main className="main-content">
          <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'transactions' && <Transactions />}
            {activeTab === 'analytics' && (
              <div className="text-center" style={{ padding: '4rem 2rem' }}>
                <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Analytics Hub</h2>
                <p className="text-secondary">Advanced analytics are coming soon. Keep tracking your expenses!</p>
              </div>
            )}
          </div>
        </main>

        <AddTransactionModal />
      </div>
    </FinanceProvider>
  );
};

export default ExpenseTrackerApp;
