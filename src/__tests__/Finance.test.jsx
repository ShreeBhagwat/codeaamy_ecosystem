import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { FinanceProvider, useFinance } from '../context/FinanceContext';

const DashboardTestHarness = () => {
  const { balance, addTransaction } = useFinance();
  
  return (
    <div>
      <div data-testid="balance-value">{balance}</div>
      <button 
        data-testid="add-income"
        onClick={() => addTransaction({ amount: 500, type: 'income', category: 'Freelance' })}
      >
        Add Income
      </button>
      <button 
        data-testid="add-expense"
        onClick={() => addTransaction({ amount: 150, type: 'expense', category: 'Software' })}
      >
        Add Expense
      </button>
    </div>
  );
};

describe('Finance Tracker Mechanics', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Scenario: Computes total balance accurately from added Income/Expenses', () => {
    render(
      <FinanceProvider>
        <DashboardTestHarness />
      </FinanceProvider>
    );

    // Initial state setup usually tracks default states, 
    // Assuming starting at exactly 0 for a clean test:
    const initialBalance = Number(screen.getByTestId('balance-value').textContent);

    // Act: Fire additions
    screen.getByTestId('add-income').click();
    screen.getByTestId('add-expense').click();

    // Assert: Balance should increase by 500, drop by 150 -> Net 350
    const finalBalance = Number(screen.getByTestId('balance-value').textContent);
    expect(finalBalance).toBe(initialBalance + 350);
  });
});
