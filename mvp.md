# Expense Tracker MVP

## The Core Magic ✨
**User uploads receipt image → AI extracts data → Results appear in seconds**

That's it. Everything else is noise.

## What We're Building

### Absolute Minimum Features

#### 1. Upload Receipt (1 Feature)
- Drag & drop or click to upload
- Support JPG/PNG only
- Show loading spinner during processing
- That's it. No preview, no validation beyond file type.

#### 2. Extract Data (1 API Call)
- Send image to OpenAI Vision API
- Extract exactly 3 fields:
  - **Merchant name**
  - **Total amount** (with currency)
  - **Date**
- Return JSON to frontend
- Display extracted data immediately

#### 3. Display Results (1 View)
- Show extracted data in a simple card/list
- Display all saved expenses below upload area
- Store in localStorage automatically on successful extraction
- Show most recent first

#### 4. Basic Management (2 Actions)
- View list of all expenses
- Delete individual expenses (with confirmation)
- No editing, no filtering, no sorting - keep it simple

---

## Technical Implementation

### Backend (3 Files Maximum)
```
server.js          - Express server + OpenAI integration
.env              - API key storage
package.json      - Dependencies
```

#### Single API Endpoint
**POST /api/extract-receipt**
- Accept multipart form data (single image)
- Forward to OpenAI Vision API with prompt
- Parse response for merchant, amount, date
- Return JSON

**Prompt Strategy:**
```
"Extract the following from this receipt:
1. Merchant name
2. Total amount (number only)
3. Date (YYYY-MM-DD format)
Return as JSON."
```

#### Dependencies
- `express` - Server framework
- `multer` - Handle file uploads
- `openai` - Official OpenAI SDK
- `dotenv` - Environment variables
- `cors` - Enable frontend requests

### Frontend (React - Keep It Simple)

#### Components (4 Maximum)
1. **App.jsx** - Main container, holds expenses state
2. **UploadZone.jsx** - Drag/drop area + file input
3. **ExpenseCard.jsx** - Display single expense
4. **ExpenseList.jsx** - Map through expenses array

#### State Management
- Single `expenses` array in App component
- Load from localStorage on mount
- Save to localStorage whenever array changes
- No complex state management - just `useState` and `useEffect`

#### Styling
- Use plain CSS or a simple CSS framework (like Tailwind via CDN)
- Mobile-responsive (flexbox/grid)
- Minimal but clean design

---

## User Flow (Happy Path Only)

1. User lands on page → sees upload zone + list of existing expenses (if any)
2. User drops receipt image → spinner appears
3. Backend processes (3-8 seconds) → extracted data returns
4. New expense appears at top of list
5. Data automatically saved to localStorage
6. Done. User can upload another or delete expenses.

**Error Path:**
- If extraction fails → show "Could not extract data. Please try another receipt." message
- That's it. No retry logic, no manual entry.

---

## API Contract

### Request
```http
POST /api/extract-receipt
Content-Type: multipart/form-data

file: [image binary]
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "merchant": "Whole Foods Market",
    "amount": 42.50,
    "currency": "USD",
    "date": "2025-10-03"
  }
}
```

### Error Response (400/500)
```json
{
  "success": false,
  "error": "Failed to extract receipt data"
}
```

---

## Data Structure

### Expense Object (Frontend)
```javascript
{
  id: crypto.randomUUID(),  // or Date.now()
  merchant: "Store Name",
  amount: 42.50,
  currency: "USD",
  date: "2025-10-03",
  createdAt: new Date().toISOString()
}
```

### LocalStorage
```javascript
// Key: 'expenses'
// Value: JSON.stringify(expensesArray)
localStorage.setItem('expenses', JSON.stringify(expenses));
```

---

## What We're NOT Building (MVP)

❌ Edit expenses  
❌ Filter/sort expenses  
❌ Categories or tags  
❌ Image preview or storage  
❌ Export functionality  
❌ Analytics or totals  
❌ Date range selection  
❌ Search functionality  
❌ User authentication  
❌ Database (localStorage only)  
❌ Complex validation  
❌ Receipt image cropping/editing  
❌ Batch upload  
❌ Undo/redo  
❌ Expense details page  

**If it's not on the "must have" list above, we're not building it.**

---

## Success Metrics

✅ User can upload a receipt  
✅ Extraction completes in < 10 seconds  
✅ Data appears automatically  
✅ Data persists across page refreshes  
✅ User can delete expenses  
✅ Works on mobile and desktop  
✅ Deploys to Railway successfully  

---

## File Structure

```
expense-tracker/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── UploadZone.jsx
│   │   │   ├── ExpenseCard.jsx
│   │   │   └── ExpenseList.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Development Timeline (Estimated)

**Phase 1: Backend (1-2 hours)**
- Set up Express server
- Implement OpenAI Vision API integration
- Test with sample receipt images
- Deploy to Railway

**Phase 2: Frontend (2-3 hours)**
- Create React app with Vite
- Build upload component
- Build expense list display
- Implement localStorage
- Style with basic CSS

**Phase 3: Integration & Testing (1 hour)**
- Connect frontend to backend
- Test with various receipt types
- Fix edge cases
- Deploy frontend

**Total MVP: 4-6 hours of focused development**

---

## OpenAI API Considerations

### Cost Estimation
- Vision API: ~$0.01-0.03 per image (depending on size)
- 100 receipts = ~$1-3
- Manageable for MVP testing

### Image Requirements
- Max size: 20MB (OpenAI limit)
- Supported: PNG, JPEG, GIF, WebP
- Recommended: Resize large images before sending (optional optimization)

### Rate Limiting
- Start with no rate limiting on MVP
- OpenAI has built-in rate limits (3-5 requests/sec on basic tier)
- Good enough for single-user testing

---

## Deployment Strategy

### Backend (Railway)
1. Push code to GitHub
2. Connect Railway to repo
3. Add environment variable: `OPENAI_API_KEY`
4. Railway auto-deploys on push
5. Get public URL

### Frontend (Railway or Static Host)
**Option A: Railway**
- Deploy as separate service
- Point to backend API URL

**Option B: Serve from Express**
- Build React app (`npm run build`)
- Serve static files from Express
- Single Railway deployment

**Recommendation: Option B for MVP (simpler)**

---

## The MVP Promise

**If you can't build this in one focused day, you're over-engineering it.**

This MVP delivers the magical moment: upload receipt → see extracted data instantly. Everything else is just polish that can come later.

Focus on making **that one flow** work flawlessly, and you have a product.


