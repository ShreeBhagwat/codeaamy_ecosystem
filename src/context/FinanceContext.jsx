import React, { createContext, useState, useEffect, useContext } from 'react';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: '1', type: 'income', amount: 5000, category: 'Salary', date: new Date().toISOString(), description: 'Monthly Salary' },
      { id: '2', type: 'expense', amount: 1500, category: 'Housing', date: new Date().toISOString(), description: 'Rent' },
      { id: '3', type: 'expense', amount: 450, category: 'Food', date: new Date(Date.now() - 86400000).toISOString(), description: 'Groceries' },
      { id: '4', type: 'expense', amount: 120, category: 'Transport', date: new Date(Date.now() - 172800000).toISOString(), description: 'Gas' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [{
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString()
    }, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const chartData = Object.keys(expensesByCategory).map(key => ({
    name: key,
    value: expensesByCategory[key]
  }));

  return (
    <FinanceContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      totalIncome,
      totalExpense,
      balance,
      chartData
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
