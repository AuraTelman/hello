# LLM.md - Expense Tracker Project Guide

## 📋 Project Overview

**Expense Tracker** is an AI-powered web application that automatically extracts expense data from receipt images using OpenAI's Vision API. Users can upload receipts via drag-and-drop, and the AI extracts merchant name, amount, date, and category automatically.

### Technology Stack
- **Backend**: Node.js + Express + OpenAI Vision API
- **Frontend**: React + Vite
- **Data Storage**: Browser localStorage (no database)
- **Deployment**: Railway (both backend and frontend)

---

## 📁 Project Structure

```
Expense_Tracker/
├── backend/                    # Express API server
│   ├── server.js              # Main server file with OpenAI integration
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables (not in repo)
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Header.jsx     # App header with title
│   │   │   ├── UploadZone.jsx # Drag-and-drop upload component
│   │   │   ├── ExpenseList.jsx # List of all expenses
│   │   │   ├── ExpenseCard.jsx # Individual expense card
│   │   │   └── Toast.jsx      # Notification toast
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # React entry point
│   │   ├── index.css          # Global styles
│   │   └── App.css            # App-specific styles
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── .env                   # Environment variables (not in repo)
│
└── Documentation Files:
    ├── README.md              # Main documentation
    ├── QUICKSTART.md          # 5-minute setup guide
    ├── design.md              # UI/UX design specifications
    ├── mvp.md                 # MVP scope definition
    └── scope.md               # Full project scope
```

---

## 🔧 Backend Files

### **server.js** - Express Server with OpenAI Integration

**Purpose**: Main backend server that handles receipt uploads and communicates with OpenAI Vision API.

**Key Components**:

1. **Dependencies**:
   - `express`: Web server framework
   - `cors`: Cross-origin resource sharing
   - `multer`: File upload handling (memory storage)
   - `openai`: Official OpenAI SDK
   - `dotenv`: Environment variable management

2. **Configuration**:
   - Port: 3001 (configurable via `process.env.PORT`)
   - CORS: Allows requests from frontend (`http://localhost:5173` by default)
   - File size limit: 20MB (OpenAI maximum)
   - Supported formats: JPG, PNG, GIF, WebP

3. **API Endpoints**:

   **GET /api/health**
   - Health check endpoint
   - Returns server status and OpenAI configuration status
   
   **POST /api/extract-receipt**
   - Accepts multipart form data with image file
   - Converts image to base64
   - Sends to OpenAI Vision API (model: `gpt-4o-mini`)
   - Extracts: merchant, amount, currency, date, category
   - Returns structured JSON response

4. **OpenAI Prompt Strategy**:
   ```
   Extract from receipt:
   - Merchant name
   - Total amount (number only)
   - Currency code (USD, EUR, etc.)
   - Date (YYYY-MM-DD format)
   - Category (Groceries, Restaurant, Gas, etc.)
   ```

5. **Error Handling**:
   - Invalid file type/size
   - OpenAI API quota exceeded
   - Invalid API key
   - JSON parsing errors
   - Generic server errors

### **backend/package.json**

**Dependencies**:
- `express`: ^4.18.2 - Web framework
- `cors`: ^2.8.5 - CORS middleware
- `multer`: ^1.4.5-lts.1 - File upload handling
- `openai`: ^4.20.1 - OpenAI SDK
- `dotenv`: ^16.3.1 - Environment variables

**Scripts**:
- `npm start` - Run server in production
- `npm run dev` - Run server with auto-restart (Node.js --watch flag)

**Module Type**: ES Modules (`"type": "module"`)

---

## 🎨 Frontend Files

### **App.jsx** - Main Application Component

**Purpose**: Root component that manages application state and coordinates all child components.

**State Management**:
- `expenses` - Array of expense objects
- `isUploading` - Boolean for upload status
- `toast` - Notification message object

**Key Functions**:

1. **Load/Save to localStorage**:
   - `useEffect` hook loads expenses on mount
   - Auto-saves to localStorage when expenses change

2. **handleFileUpload(file)**:
   - Creates FormData with uploaded file
   - Sends POST request to backend
   - Creates expense object with unique ID
   - Adds to expenses array (newest first)
   - Shows success/error toast

3. **handleDeleteExpense(id)**:
   - Shows confirmation dialog
   - Removes expense from array
   - Shows success toast

4. **Total Calculation**:
   - `totalAmount` computed from expenses array

**Component Structure**:
```jsx
<div className="app">
  <Header />
  <main className="container">
    <UploadZone onFileUpload={handleFileUpload} isUploading={isUploading} />
    <ExpenseList expenses={expenses} totalAmount={totalAmount} onDeleteExpense={handleDeleteExpense} />
  </main>
  {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
</div>
```

### **main.jsx** - React Entry Point

**Purpose**: Renders the root React component to the DOM.

- Uses `React.StrictMode` for development warnings
- Mounts to `#root` element in HTML

### **components/Header.jsx**

**Purpose**: Simple header component displaying app title and tagline.

**Content**:
- 💰 Expense Tracker (title)
- "Track expenses with AI magic" (subtitle)

### **components/UploadZone.jsx**

**Purpose**: Drag-and-drop file upload component with multiple interaction states.

**Features**:
- Drag-and-drop support
- Click to browse
- File validation (type and size)
- Visual feedback for different states

**States**:
1. **Default** - Shows camera icon, "Drag & Drop" text
2. **Drag Over** - Shows arrow down icon, blue border
3. **Uploading** - Shows spinner, "Processing" message
4. **Error** - Shows error message (via alert)

**File Validation**:
- Allowed types: JPEG, JPG, PNG, GIF, WebP
- Max size: 20MB
- Client-side validation before upload

**Accessibility**:
- Proper ARIA labels
- Keyboard accessible (tabIndex, role="button")
- Status announcements for screen readers

### **components/ExpenseList.jsx**

**Purpose**: Displays list of expenses or empty state.

**Empty State**:
- Shows when no expenses exist
- Displays 📭 icon
- Encouraging message to upload first receipt

**Populated State**:
- Header with count and total
- Maps through expenses array
- Renders ExpenseCard for each expense

**Props**:
- `expenses` - Array of expense objects
- `totalAmount` - Calculated total
- `onDeleteExpense` - Delete handler function

### **components/ExpenseCard.jsx**

**Purpose**: Displays individual expense with all details.

**Category Icons Mapping**:
```javascript
{
  'Groceries': '🛒',
  'Restaurant': '🍽️',
  'Gas': '⛽',
  'Shopping': '🛍️',
  'Transportation': '🚗',
  'Healthcare': '🏥',
  'Entertainment': '🎬',
  'Utilities': '💡',
  'Other': '🏪',
}
```

**Display Elements**:
- Category icon + Merchant name
- Amount with currency
- Formatted date (e.g., "Oct 3, 2025")
- Category label (if not "Other")
- Delete button (trash icon)

**Date Formatting**:
- Uses `toLocaleDateString()` with `en-US` locale
- Format: Month abbreviation, day, year

### **components/Toast.jsx**

**Purpose**: Notification component for user feedback.

**Features**:
- Auto-dismiss after 5 seconds
- Manual close button
- Type-based styling (success/error)
- Positioned top-right (via CSS)

**Props**:
- `message` - Text to display
- `type` - 'success' or 'error'
- `onClose` - Close handler

**Accessibility**:
- `role="alert"` for screen readers
- Close button with aria-label

### **vite.config.js** - Vite Configuration

**Purpose**: Configure Vite dev server and build process.

**Settings**:
- React plugin enabled
- Dev server port: 5173
- Auto-open browser on start

### **frontend/package.json**

**Dependencies**:
- `react`: ^18.2.0 - React library
- `react-dom`: ^18.2.0 - React DOM renderer

**Dev Dependencies**:
- `@vitejs/plugin-react`: ^4.2.1 - Vite React plugin
- `vite`: ^5.0.8 - Build tool
- TypeScript types for React

**Scripts**:
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 📄 Documentation Files

### **README.md** - Main Documentation

**Sections**:
1. **Project Overview** - Description and features
2. **Tech Stack** - Backend and frontend technologies
3. **Prerequisites** - Node.js and OpenAI API key
4. **Getting Started** - Step-by-step setup
5. **Project Structure** - File organization
6. **API Endpoints** - Detailed API documentation
7. **Data Storage** - LocalStorage structure
8. **Deployment** - Railway deployment guide
9. **Cost Considerations** - OpenAI API costs
10. **Limitations** - MVP constraints
11. **Future Enhancements** - Planned features
12. **Troubleshooting** - Common issues and fixes

**Key Information**:
- OpenAI Vision API costs ~$0.01-0.03 per image
- No database - uses localStorage only
- No user authentication in MVP
- Data persists only in browser

### **QUICKSTART.md** - 5-Minute Setup Guide

**Purpose**: Get the app running quickly with minimal reading.

**Steps**:
1. Install dependencies (backend + frontend)
2. Set up OpenAI API key in `.env` files
3. Start both servers
4. Test with receipt upload

**Troubleshooting Section**:
- OpenAI API key not configured
- CORS errors
- Failed extraction issues
- Receipt quality tips

### **design.md** - UI/UX Design Specifications

**Purpose**: Complete visual design system and component specifications.

**Contents**:
1. **Layout Diagrams** - ASCII art mockups for desktop/mobile
2. **Component Breakdown** - Detailed specs for each component
3. **States & Interactions** - All UI states (hover, loading, error, etc.)
4. **Color Palette** - Primary and neutral colors with hex codes
5. **Typography** - Font sizes, weights, and usage
6. **Spacing System** - Padding, margins, and layout spacing
7. **Responsive Breakpoints** - Desktop, tablet, mobile specs
8. **Animations** - Transition durations and effects
9. **Accessibility Notes** - WCAG compliance guidelines

**Design Principles**:
- Clarity First - Obvious upload zone
- Instant Feedback - Visual response to every action
- Minimal Cognitive Load - No unnecessary options
- Progressive Disclosure - Show only what's needed
- Mobile-First - Touch-friendly, readable
- Forgiving - Easy error recovery
- Delightful - Smooth animations, clean aesthetics

### **mvp.md** - MVP Definition

**Purpose**: Define the absolute minimum viable product.

**Core Features** (Only 4):
1. Upload Receipt - Drag/drop or click
2. Extract Data - OpenAI Vision API call
3. Display Results - Show in list
4. Delete Expenses - With confirmation

**Technical Constraints**:
- Backend: 3 files maximum
- Frontend: 4 components maximum
- Single API endpoint
- localStorage only (no database)
- No complex state management
- Basic CSS only

**What's NOT in MVP**:
- ❌ Edit expenses
- ❌ Filter/sort
- ❌ Categories management
- ❌ Image preview/storage
- ❌ Export functionality
- ❌ Analytics
- ❌ User authentication
- ❌ Search functionality

**Success Metrics**:
- Upload works
- Extraction < 10 seconds
- Data persists
- Works on mobile/desktop
- Deploys successfully

**Development Timeline**: 4-6 hours total

### **scope.md** - Full Project Scope

**Purpose**: Complete project specification including future features.

**Goals**:
- Simplify expense tracking with AI
- Intuitive modern interface
- Minimize user input
- Lightweight deployable solution

**Detailed Feature Breakdown**:
1. **Receipt Upload** - Drag/drop, file picker, validation
2. **AI Extraction** - OpenAI integration, error handling, manual override
3. **Expense Management** - List view, sorting, filtering, editing, deleting
4. **Data Persistence** - localStorage, export capability
5. **User Interface** - Responsive, modern, loading states, notifications

**Technical Architecture**:
- Backend: Express + OpenAI + Multer + CORS
- Frontend: React + Hooks + localStorage
- Deployment: Railway for both

**Data Structure**:
```json
{
  "id": "unique-id",
  "merchant": "Store Name",
  "amount": 45.99,
  "currency": "USD",
  "date": "YYYY-MM-DD",
  "category": "Category",
  "imagePreview": "base64-or-url",
  "createdAt": "ISO-timestamp",
  "updatedAt": "ISO-timestamp"
}
```

**Future Enhancements**:
- User authentication
- Cloud database
- Receipt image storage
- Analytics dashboard
- Export to accounting software
- Recurring expense detection
- Budget tracking
- Mobile apps

---

## 🔄 Data Flow

### User Flow (Complete Journey)

1. **User Lands on App**
   - `App.jsx` loads expenses from localStorage
   - Displays Header, UploadZone, and ExpenseList

2. **User Uploads Receipt**
   - User drags/drops or clicks to select image
   - `UploadZone.jsx` validates file (type, size)
   - Calls `handleFileUpload()` in `App.jsx`
   - Sets `isUploading` to true (shows spinner)

3. **Backend Processing**
   - Frontend sends POST to `/api/extract-receipt`
   - Backend receives file via Multer
   - Converts to base64
   - Sends to OpenAI Vision API
   - Parses JSON response
   - Returns structured data

4. **Display Results**
   - Frontend receives response
   - Creates expense object with unique ID
   - Adds to expenses array (newest first)
   - Shows success toast
   - Auto-saves to localStorage

5. **View & Manage**
   - `ExpenseList.jsx` displays all expenses
   - Each expense shown via `ExpenseCard.jsx`
   - User can delete with confirmation
   - Changes auto-save to localStorage

### API Data Flow

**Request** (Frontend → Backend):
```javascript
FormData {
  file: [Binary image data]
}
```

**Backend → OpenAI**:
```javascript
{
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Extract data from receipt...' },
        { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,...' } }
      ]
    }
  ]
}
```

**Response** (Backend → Frontend):
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

**LocalStorage Structure**:
```javascript
localStorage.setItem('expenses', JSON.stringify([
  {
    id: "abc-123",
    merchant: "Whole Foods Market",
    amount: 42.50,
    currency: "USD",
    date: "2025-10-03",
    category: "Groceries",
    createdAt: "2025-10-03T12:00:00.000Z"
  },
  // ... more expenses
]));
```

---

## 🔐 Environment Variables

### **Backend (.env)**

```env
OPENAI_API_KEY=sk-proj-your-key-here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**Variables**:
- `OPENAI_API_KEY` - **Required** - Your OpenAI API key
- `PORT` - Optional - Server port (default: 3001)
- `FRONTEND_URL` - Optional - Frontend URL for CORS (default: http://localhost:5173)

### **Frontend (.env)**

```env
VITE_API_URL=http://localhost:3001
```

**Variables**:
- `VITE_API_URL` - Optional - Backend API URL (default: http://localhost:3001)

---

## 🚀 Setup & Running

### Quick Start Commands

```bash
# Backend setup
cd backend
npm install
# Create .env file with OPENAI_API_KEY
npm run dev  # Runs on port 3001

# Frontend setup (new terminal)
cd frontend
npm install
# Create .env file with VITE_API_URL
npm run dev  # Runs on port 5173
```

### Development Workflow

1. **Start Backend First** - Ensures API is ready
2. **Start Frontend** - Auto-opens browser
3. **Upload Test Receipt** - Verify extraction works
4. **Check Browser Console** - For any errors
5. **Check Backend Logs** - For API responses

---

## 🧪 Testing

### Manual Testing Checklist

**Upload Functionality**:
- [ ] Drag and drop image
- [ ] Click to browse and select
- [ ] Upload different formats (JPG, PNG)
- [ ] Try oversized file (should reject)
- [ ] Try non-image file (should reject)

**Data Extraction**:
- [ ] Clear receipt with all info
- [ ] Partial receipt (missing some fields)
- [ ] Blurry receipt
- [ ] Non-receipt image
- [ ] Very old receipt

**Expense Management**:
- [ ] View expense list
- [ ] Delete expense (with confirmation)
- [ ] Refresh page (data persists)
- [ ] Clear localStorage (starts fresh)

**UI/UX**:
- [ ] Responsive on mobile
- [ ] Loading states work
- [ ] Toast notifications appear
- [ ] Empty state shows correctly
- [ ] Error messages are clear

---

## 🐛 Common Issues & Solutions

### Backend Issues

**"OpenAI API key not configured"**
- Check `.env` file exists in backend folder
- Verify `OPENAI_API_KEY=sk-proj-...` format
- Restart server after adding .env

**CORS errors**
- Ensure `FRONTEND_URL` matches frontend dev server
- Check CORS middleware is configured
- Verify frontend is on correct port (5173)

**"Failed to extract receipt data"**
- Check OpenAI API key is valid
- Verify you have API credits
- Check backend console for detailed error
- Try different receipt image

### Frontend Issues

**Can't connect to backend**
- Ensure backend is running (port 3001)
- Check `VITE_API_URL` in frontend .env
- Open Network tab in DevTools

**Data not persisting**
- Check localStorage in DevTools
- Verify browser allows localStorage
- Check for errors in console

**Upload not working**
- Verify file type is supported
- Check file size < 20MB
- Ensure `isUploading` state updates

---

## 📊 Cost Analysis

### OpenAI Vision API Costs

**Pricing** (approximate):
- **gpt-4o-mini**: ~$0.01-0.03 per image
- **100 receipts**: ~$1-3
- **1000 receipts**: ~$10-30

**Cost Optimization**:
- Lower temperature (0.2) for consistent results
- Max tokens: 500 (enough for extraction)
- Use mini model (cheaper than full GPT-4)

### Hosting Costs

**Railway**:
- Backend: $5-10/month (starter plan)
- Frontend: Can be served from backend (same cost)
- **Alternative**: Vercel/Netlify free tier for frontend

**Total Monthly Cost** (estimate):
- Hosting: $5-10
- API usage: Depends on volume (~$3 for 100 receipts/month)
- **Total**: $8-15/month for light usage

---

## 🔮 Future Development Roadmap

### Phase 1 - MVP Enhancements
- Edit expense functionality
- Better error messages
- Image preview before upload
- Category management

### Phase 2 - Data Features
- Filter and sort expenses
- Date range selection
- Search functionality
- Export to CSV/PDF

### Phase 3 - Advanced Features
- User authentication
- Cloud database (MongoDB/PostgreSQL)
- Multi-device sync
- Receipt image storage

### Phase 4 - Analytics
- Spending trends
- Category breakdown
- Budget tracking
- Alerts and notifications

### Phase 5 - Integrations
- QuickBooks export
- Bank statement matching
- Tax report generation
- Mobile apps (React Native)

---

## 🎯 Key Takeaways for AI/LLM

### Project Philosophy
- **Simplicity First**: MVP focuses on core user flow
- **AI-Powered**: OpenAI Vision does the heavy lifting
- **No Database**: localStorage for MVP simplicity
- **Modern Stack**: React + Express + OpenAI
- **User-Centric**: Clear feedback, error handling, accessibility

### Code Patterns to Follow

**State Management**:
- Use React hooks (useState, useEffect)
- Lift state to parent (App.jsx)
- Pass props down to children
- localStorage for persistence

**Error Handling**:
- Try-catch blocks for async operations
- User-friendly error messages
- Toast notifications for feedback
- Graceful degradation

**File Organization**:
- Component per file
- CSS modules or separate CSS files
- Clear naming conventions
- Single responsibility

**API Design**:
- RESTful endpoints
- Consistent JSON responses
- Proper HTTP status codes
- Error objects with details

### When Modifying This Project

1. **Backend Changes**:
   - Test OpenAI integration with different prompts
   - Handle edge cases (blurry images, foreign receipts)
   - Add rate limiting for production
   - Implement caching if needed

2. **Frontend Changes**:
   - Maintain component simplicity
   - Keep accessibility features
   - Test on mobile devices
   - Preserve localStorage structure

3. **Adding Features**:
   - Follow MVP principles (simple first)
   - Don't break existing functionality
   - Update documentation
   - Test thoroughly

---

## 📞 Support & Resources

### Documentation Files to Reference
- `README.md` - General setup and usage
- `QUICKSTART.md` - Fast setup guide
- `design.md` - UI/UX specifications
- `mvp.md` - MVP scope and constraints
- `scope.md` - Full project scope

### External Resources
- [OpenAI Vision API Docs](https://platform.openai.com/docs/guides/vision)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Railway Deployment](https://docs.railway.app)

### Useful Commands

```bash
# Check backend health
curl http://localhost:3001/api/health

# View localStorage in browser console
localStorage.getItem('expenses')

# Clear all expenses
localStorage.removeItem('expenses')

# Test OpenAI API from backend
# (Add test endpoint in server.js)
```

---

## ✅ Quick Reference

### File Purposes Summary

| File | Purpose | Key Features |
|------|---------|--------------|
| `backend/server.js` | Express API server | OpenAI integration, file upload, data extraction |
| `frontend/App.jsx` | Main React app | State management, localStorage, API calls |
| `frontend/components/Header.jsx` | App header | Title and tagline display |
| `frontend/components/UploadZone.jsx` | File upload UI | Drag-drop, validation, loading states |
| `frontend/components/ExpenseList.jsx` | Expense display | List view, empty state, total calculation |
| `frontend/components/ExpenseCard.jsx` | Single expense | Display details, delete button, formatting |
| `frontend/components/Toast.jsx` | Notifications | Success/error messages, auto-dismiss |
| `README.md` | Main docs | Complete setup and usage guide |
| `QUICKSTART.md` | Fast setup | 5-minute getting started |
| `design.md` | Design system | UI/UX specs, colors, typography |
| `mvp.md` | MVP definition | Core features only, no extras |
| `scope.md` | Full scope | Complete feature list, future plans |

### Technology Versions

```json
{
  "node": "18+",
  "express": "4.18.2",
  "react": "18.2.0",
  "vite": "5.0.8",
  "openai": "4.20.1",
  "multer": "1.4.5",
  "cors": "2.8.5"
}
```

---

**Last Updated**: October 6, 2025
**Version**: 1.0.0
**Status**: MVP Complete ✅

