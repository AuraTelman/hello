# 💰 Expense Tracker

An AI-powered expense tracker that automatically extracts data from receipt images using OpenAI's Vision API. Built with Node.js, Express, and React.

## Features

- 📸 **Drag & Drop Upload** - Easy receipt image upload
- 🤖 **AI-Powered Extraction** - Automatic data extraction using OpenAI Vision API
- 💾 **LocalStorage Persistence** - No database required, data stored in browser
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast & Simple** - Clean MVP focused on core functionality

## Tech Stack

**Backend:**
- Node.js
- Express
- OpenAI API (Vision)
- Multer (file uploads)

**Frontend:**
- React
- Vite
- Modern CSS

## Prerequisites

- Node.js 18+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Expense_Tracker
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

The server will run on `http://localhost:3001`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:3001
```

Start the frontend development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Usage

1. **Upload a Receipt**: Drag and drop a receipt image or click to browse
2. **Wait for Processing**: The AI extracts merchant name, amount, date, and category (5-10 seconds)
3. **View Your Expenses**: Extracted data appears in the expense list
4. **Manage Expenses**: Delete expenses you no longer want to track

## Project Structure

```
Expense_Tracker/
├── backend/
│   ├── server.js           # Express server with OpenAI integration
│   ├── package.json
│   └── .env               # Environment variables (create this)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── UploadZone.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseCard.jsx
│   │   │   └── Toast.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env               # Environment variables (create this)
├── scope.md               # Full project scope
├── mvp.md                 # MVP definition
└── design.md              # UI/UX design specs
```

## API Endpoints

### `GET /api/health`
Health check endpoint to verify server and OpenAI API configuration.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-03T12:00:00.000Z",
  "openaiConfigured": true
}
```

### `POST /api/extract-receipt`
Upload a receipt image and extract expense data.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: `file` (image file)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "merchant": "Whole Foods Market",
    "amount": 42.50,
    "currency": "USD",
    "date": "2025-10-03",
    "category": "Groceries"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Data Storage

All expense data is stored in the browser's localStorage under the key `expenses`. Each expense has:

```javascript
{
  id: "unique-id",
  merchant: "Merchant Name",
  amount: 42.50,
  currency: "USD",
  date: "2025-10-03",
  category: "Groceries",
  createdAt: "2025-10-03T12:00:00.000Z"
}
```

## Deployment

### Backend (Railway)

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables in Railway:
   - `OPENAI_API_KEY`
   - `PORT` (Railway will set this automatically)
   - `FRONTEND_URL` (your frontend URL after deployment)
4. Railway will automatically deploy

### Frontend (Railway or any static host)

**Option 1: Railway**
1. Create another Railway service for the frontend
2. Set build command: `npm run build`
3. Set start command: `npx serve -s dist`

**Option 2: Vercel/Netlify**
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update `VITE_API_URL` to point to your backend URL

## Cost Considerations

- OpenAI Vision API: ~$0.01-0.03 per image
- 100 receipts ≈ $1-3
- Free tiers available on Railway/Vercel for hosting

## Limitations (MVP)

- No user authentication
- No cloud storage
- Data stored only in browser (localStorage)
- No expense editing (delete and re-add)
- No advanced analytics or reports

## Future Enhancements

- User authentication
- Cloud database integration
- Expense editing
- Filtering and sorting
- Data export (CSV, PDF)
- Analytics dashboard
- Recurring expense detection
- Budget tracking

## Troubleshooting

**Backend won't start:**
- Check that `.env` file exists with valid `OPENAI_API_KEY`
- Verify Node.js version (18+)
- Run `npm install` again

**Frontend can't connect to backend:**
- Ensure backend is running on port 3001
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

**Receipt extraction fails:**
- Verify OpenAI API key is valid and has credits
- Check receipt image is clear and readable
- Try a different receipt image
- Check backend console logs for detailed errors

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using OpenAI Vision API


