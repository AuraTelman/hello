import ExpenseCard from './ExpenseCard';
import './ExpenseList.css';

function ExpenseList({ expenses, totalAmount, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="expense-list-empty">
        <div className="empty-icon">📭</div>
        <h2 className="empty-title">No expenses yet</h2>
        <p className="empty-text">Upload your first receipt to get started!</p>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <div className="expense-list-header">
        <div className="expense-list-title">
          Your Expenses <span className="expense-count">({expenses.length})</span>
        </div>
        <div className="expense-total">
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>

      <div className="expense-list">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onDelete={onDeleteExpense}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;


