import { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import ExpenseList from './components/ExpenseList';
import Toast from './components/Toast';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      try {
        const parsed = JSON.parse(savedExpenses);
        setExpenses(parsed);
      } catch (error) {
        console.error('Failed to parse saved expenses:', error);
      }
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_URL}/api/extract-receipt`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to extract receipt data');
      }

      // Create new expense object
      const newExpense = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        ...result.data,
        createdAt: new Date().toISOString(),
      };

      // Add to expenses list (newest first)
      setExpenses([newExpense, ...expenses]);
      showToast('✅ Expense added successfully!', 'success');

    } catch (error) {
      console.error('Upload error:', error);
      showToast(`❌ ${error.message}`, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteExpense = (id) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
      showToast('Expense deleted', 'success');
    }
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="app">
      <Header />
      
      <main className="container">
        <UploadZone 
          onFileUpload={handleFileUpload}
          isUploading={isUploading}
        />

        <ExpenseList 
          expenses={expenses}
          totalAmount={totalAmount}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>

      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;


