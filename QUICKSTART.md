# 🚀 Quick Start Guide

Get your Expense Tracker running in 5 minutes!

## Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (in a new terminal)
cd frontend
npm install
```

## Step 2: Set Up OpenAI API Key

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create `backend/.env` file:

```env
OPENAI_API_KEY=sk-proj-your-key-here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

3. Create `frontend/.env` file:

```env
VITE_API_URL=http://localhost:3001
```

## Step 3: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 4: Test It Out!

1. Open http://localhost:5173 in your browser
2. Drag and drop a receipt image (or click to browse)
3. Wait 5-10 seconds for AI extraction
4. See your expense data appear! 🎉

## Troubleshooting

❌ **"OpenAI API key not configured"**
- Check your `.env` file has `OPENAI_API_KEY=sk-proj-...`
- Restart the backend server

❌ **CORS errors in browser console**
- Make sure backend is running on port 3001
- Check `FRONTEND_URL` in backend `.env`

❌ **"Failed to extract receipt data"**
- Verify your OpenAI API key is valid
- Check if you have API credits
- Try a clearer receipt image

## What to Upload

✅ **Good receipts:**
- Clear, well-lit photos
- Readable text
- Total amount visible
- Date and merchant name clear

❌ **Avoid:**
- Blurry or dark images
- Cropped receipts missing key info
- Receipts in very unusual formats

## Next Steps

- Upload multiple receipts to build your expense history
- Click the trash icon to delete expenses
- All data saves automatically in your browser
- Check out `README.md` for deployment instructions

---

**Need help?** Open an issue or check the full README.md


