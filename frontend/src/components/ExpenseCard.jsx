import './ExpenseCard.css';

const CATEGORY_ICONS = {
  'Groceries': '🛒',
  'Restaurant': '🍽️',
  'Gas': '⛽',
  'Shopping': '🛍️',
  'Transportation': '🚗',
  'Healthcare': '🏥',
  'Entertainment': '🎬',
  'Utilities': '💡',
  'Other': '🏪',
};

function ExpenseCard({ expense, onDelete }) {
  const { id, merchant, amount, currency, date, category } = expense;
  const icon = CATEGORY_ICONS[category] || CATEGORY_ICONS['Other'];

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="expense-card">
      <div className="expense-card-content">
        <div className="expense-card-header">
          <div className="expense-merchant">
            <span className="expense-icon">{icon}</span>
            <span className="merchant-name">{merchant}</span>
          </div>
          <button
            className="delete-button"
            onClick={() => onDelete(id)}
            aria-label={`Delete expense from ${merchant}`}
            title="Delete expense"
          >
            🗑️
          </button>
        </div>
        
        <div className="expense-details">
          <div className="expense-amount">
            ${amount.toFixed(2)} {currency}
          </div>
          <div className="expense-date">{formatDate(date)}</div>
          {category && category !== 'Other' && (
            <div className="expense-category">{category}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;


