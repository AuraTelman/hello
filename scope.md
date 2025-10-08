# Expense Tracker - Project Scope

## Project Overview
A web-based expense tracker that leverages OpenAI's Vision API to automatically extract expense data from receipt images. Users can upload receipts via drag-and-drop, view extracted information, and manage their expense history.

## Goals & Objectives
- Simplify expense tracking by automating data extraction from receipt images
- Provide an intuitive, modern interface for managing expenses
- Minimize user input by leveraging AI to parse receipt information
- Create a lightweight, deployable solution without database dependencies

## Core Features

### 1. Receipt Upload
- **Drag & Drop Interface**: Users can drag receipt images directly into the upload zone
- **File Picker Alternative**: Traditional file selection button for users who prefer clicking
- **Supported Formats**: JPEG, PNG, HEIC, and other common image formats
- **Visual Feedback**: Clear indicators during upload process (loading states, progress)
- **File Validation**: Check file size limits and image format before upload

### 2. AI-Powered Data Extraction
- **OpenAI Vision API Integration**: Send receipt images to OpenAI's Vision API
- **Automatic Parsing**: Extract key information from receipts:
  - Merchant/Vendor name
  - Total amount (with currency detection)
  - Transaction date
  - Optional: Category suggestion (food, transportation, office supplies, etc.)
- **Error Handling**: Gracefully handle cases where data cannot be extracted
- **Manual Override**: Allow users to edit extracted data if AI makes mistakes

### 3. Expense Management
- **Expense List View**: Display all tracked expenses in a clean, organized table/card view
- **Sorting & Filtering**: 
  - Sort by date, amount, or merchant
  - Filter by date range or merchant
  - Optional: Filter by category
- **Edit Functionality**: Users can modify expense details after extraction
- **Delete Functionality**: Users can remove expenses they no longer want to track
- **Expense Summary**: Display total expenses and count of receipts

### 4. Data Persistence
- **LocalStorage Implementation**: Store all expense data in browser's localStorage
- **No Backend Database**: All data persists on client-side only
- **Data Structure**: JSON format for easy serialization/deserialization
- **Export Capability**: Allow users to download their expense data as CSV/JSON

### 5. User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern & Clean**: Intuitive layout with good UX practices
- **Loading States**: Visual feedback during API calls and data processing
- **Error Messages**: Clear, user-friendly error notifications
- **Success Confirmations**: Feedback when expenses are successfully added/updated/deleted

## Technical Architecture

### Backend (Node.js + Express)
- **API Server**: RESTful API endpoints for handling receipt uploads
- **OpenAI Integration**: Server-side calls to OpenAI Vision API
- **Image Processing**: Handle multipart form data for image uploads
- **Environment Variables**: Secure storage of OpenAI API key
- **CORS Configuration**: Allow frontend requests from deployed domain
- **Error Handling**: Proper HTTP status codes and error responses

### Frontend (React)
- **Component-Based Architecture**: Modular, reusable components
- **State Management**: React hooks (useState, useEffect, useContext if needed)
- **File Upload Component**: Drag-and-drop zone with visual feedback
- **Expense List Component**: Display and manage expenses
- **Edit Modal/Form**: Interface for editing expense details
- **LocalStorage Hook**: Custom hook for localStorage operations
- **API Client**: Axios or fetch for backend communication

### Deployment (Railway)
- **Backend Deployment**: Express server on Railway
- **Frontend Deployment**: Static React build served via Railway or separate static hosting
- **Environment Configuration**: Railway environment variables for API keys
- **Build Process**: Automated builds from Git repository

## User Flow

1. **Landing Page**: User sees upload zone and existing expenses (if any)
2. **Upload Receipt**: User drags image or clicks to select file
3. **Processing**: Frontend sends image to backend, shows loading indicator
4. **Backend Processing**: Server forwards image to OpenAI Vision API with extraction prompt
5. **Data Display**: Extracted data appears in editable form for user review
6. **Confirmation**: User confirms or edits the extracted data
7. **Storage**: Expense is saved to localStorage and appears in expense list
8. **Management**: User can view, sort, filter, edit, or delete expenses

## API Endpoints

### POST /api/upload
- **Purpose**: Upload receipt image and extract data
- **Input**: Multipart form data with image file
- **Output**: JSON object with extracted expense data
- **Response Format**:
  ```json
  {
    "success": true,
    "data": {
      "merchant": "Store Name",
      "amount": 45.99,
      "currency": "USD",
      "date": "2025-10-03",
      "category": "Groceries"
    }
  }
  ```

### GET /api/health
- **Purpose**: Health check endpoint for monitoring
- **Output**: Server status and API availability

## Data Structure

### Expense Object
```json
{
  "id": "unique-id-string",
  "merchant": "Merchant Name",
  "amount": 45.99,
  "currency": "USD",
  "date": "YYYY-MM-DD",
  "category": "Category Name",
  "imagePreview": "base64-string-or-url",
  "createdAt": "ISO-timestamp",
  "updatedAt": "ISO-timestamp"
}
```

### LocalStorage Key
- **Key**: `expenseTracker_expenses`
- **Value**: JSON stringified array of expense objects

## Non-Functional Requirements

### Performance
- Receipt processing should complete within 5-10 seconds
- UI should remain responsive during API calls
- Expense list should handle 100+ entries smoothly

### Security
- OpenAI API key must be stored securely on backend (environment variables)
- No API keys exposed to frontend
- Input validation for file uploads (size, type)
- Sanitize extracted data before storage

### Usability
- Clear error messages for failed extractions
- Intuitive UI that requires minimal learning curve
- Mobile-friendly responsive design

### Reliability
- Graceful degradation if OpenAI API is unavailable
- Data validation to prevent corrupted localStorage
- Clear feedback for all user actions

## Out of Scope (For Initial Version)

- User authentication and multi-user support
- Cloud storage or backend database
- Receipt image storage (only extract data, not store images long-term)
- Expense reports and analytics (can be added later)
- Budget tracking and alerts
- Multi-currency conversion
- OCR fallback if OpenAI Vision fails
- Receipt image editing/cropping before upload
- Expense categories management (use predefined categories)
- Collaborative features or sharing expenses
- Mobile native apps (web-only)

## Success Criteria

- User can successfully upload a receipt image
- OpenAI Vision API extracts merchant, amount, and date with >80% accuracy
- Extracted data is editable before saving
- All expenses persist in localStorage across sessions
- User can view, edit, and delete expenses
- Application is deployed and accessible via Railway URL
- Responsive design works on mobile and desktop browsers

## Future Enhancements (Post-MVP)

- User authentication for multi-device sync
- Cloud database integration
- Receipt image storage
- Analytics dashboard with spending trends
- Export to accounting software (QuickBooks, Xero)
- Recurring expense detection
- Budget tracking and notifications
- Mobile app versions (React Native)


