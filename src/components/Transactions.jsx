import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Trash2, Search, Filter } from 'lucide-react';

const Transactions = () => {
  const { transactions, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (tx.description && tx.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="heading-lg">Transactions</h2>
        <p className="text-secondary">View and manage your transaction history.</p>
      </header>

      <div className="glass-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input" 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          <div style={{ position: 'relative', width: '200px' }}>
            <Filter size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select 
              className="select" 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              style={{ paddingLeft: '2.5rem', appearance: 'none' }}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-card)', backdropFilter: 'blur(8px)' }}>
              <tr>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Date</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Category</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Description</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Type</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(tx => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem' }}>{new Date(tx.date).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{tx.category}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{tx.description || '-'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
                        background: tx.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: tx.type === 'income' ? 'var(--success)' : 'var(--danger)'
                      }}>
                        {tx.type}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: tx.type === 'income' ? 'var(--success)' : 'var(--text-primary)' }}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button 
                        className="btn-icon" 
                        style={{ margin: '0 auto', color: 'var(--text-muted)' }}
                        onClick={() => deleteTransaction(tx.id)}
                        title="Delete Transaction"
                      >
                        <Trash2 size={16} />
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

export default Transactions;
