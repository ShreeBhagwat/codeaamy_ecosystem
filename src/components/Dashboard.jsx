import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

const StatCard = ({ title, amount, icon: Icon, type, gradient }) => (
  <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', flex: 1, minWidth: '240px' }}>
    <div className="flex items-center justify-between mb-4">
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: gradient, color: 'white'
      }}>
        <Icon size={24} />
      </div>
      {type === 'up' && <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '20px', fontSize: '0.875rem' }}><ArrowUpRight size={16} /></div>}
      {type === 'down' && <div style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 8px', borderRadius: '20px', fontSize: '0.875rem' }}><ArrowDownRight size={16} /></div>}
    </div>
    <p className="text-muted" style={{ marginBottom: '0.25rem', fontWeight: 500 }}>{title}</p>
    <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
  </div>
);

const Dashboard = () => {
  const { balance, totalIncome, totalExpense, chartData, transactions } = useFinance();
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="heading-lg">Overview</h2>
        <p className="text-secondary">Welcome back! Here's your financial summary.</p>
      </header>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <StatCard title="Total Balance" amount={balance} icon={Wallet} gradient="linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover))" />
        <StatCard title="Total Income" amount={totalIncome} icon={ArrowUpRight} type="up" gradient="linear-gradient(135deg, #10b981, #059669)" />
        <StatCard title="Total Expense" amount={totalExpense} icon={ArrowDownRight} type="down" gradient="linear-gradient(135deg, #f43f5e, #e11d48)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="heading-md" style={{ marginBottom: '1.5rem' }}>Recent Transactions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentTransactions.length === 0 ? (
              <p className="text-muted text-center" style={{ padding: '2rem 0' }}>No recent transactions.</p>
            ) : (
              recentTransactions.map(tx => (
                <div key={tx.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
                  <div className="flex items-center gap-4">
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: tx.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: tx.type === 'income' ? 'var(--success)' : 'var(--danger)'
                    }}>
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, margin: 0 }}>{tx.category}</p>
                      <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>{new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 700, margin: 0, color: tx.type === 'income' ? 'var(--success)' : 'var(--text-primary)' }}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 className="heading-md" style={{ marginBottom: '1.5rem' }}>Expenses By Category</h3>
          <div style={{ flex: 1, minHeight: '300px' }}>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: 'var(--bg-panel-solid)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p className="text-muted">No expenses yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
