import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X } from 'lucide-react';

const AddTransactionModal = () => {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    // Reset and close
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    
    document.getElementById('add-modal').close();
  };

  const closeModal = () => {
    document.getElementById('add-modal').close();
  };

  return (
    <dialog id="add-modal" style={{ 
      margin: 'auto', 
      padding: 0, 
      border: 'none', 
      background: 'transparent',
      '::backdrop': { background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: 'var(--bg-panel-solid)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="heading-md" style={{ margin: 0 }}>Add Transaction</h2>
          <button className="btn-icon" onClick={closeModal}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button 
              type="button"
              className={`btn ${formData.type === 'expense' ? 'btn-danger' : 'btn-secondary'}`} 
              style={{ flex: 1 }}
              onClick={() => setFormData({ ...formData, type: 'expense' })}
            >
              Expense
            </button>
            <button 
              type="button"
              className={`btn ${formData.type === 'income' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ flex: 1, boxShadow: formData.type === 'income' ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none', background: formData.type === 'income' ? 'linear-gradient(135deg, #10b981, #059669)' : '' }}
              onClick={() => setFormData({ ...formData, type: 'income' })}
            >
              Income
            </button>
          </div>

          <div className="form-group">
            <label className="label">Amount</label>
            <input 
              type="number" 
              className="input" 
              placeholder="0.00" 
              step="0.01" 
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label">Category</label>
            <input 
              type="text" 
              className="input" 
              placeholder={formData.type === 'expense' ? 'e.g. Food, Rent, Transport' : 'e.g. Salary, Freelance'}
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label">Date</label>
            <input 
              type="date" 
              className="input" 
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label">Description (Optional)</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Add more details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary w-full" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn w-full" style={{ background: formData.type === 'expense' ? 'linear-gradient(135deg, #f43f5e, #e11d48)' : 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none' }}>
              Save {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        dialog::backdrop {
          background: rgba(11, 15, 25, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </dialog>
  );
};

export default AddTransactionModal;
