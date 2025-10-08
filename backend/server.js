import express from 'express';
import cors from 'cors';
import multer from 'multer';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Configure Multer for file uploads (memory storage for temporary processing)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit (OpenAI max)
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.'));
    }
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    openaiConfigured: !!process.env.OPENAI_API_KEY,
  });
});

// Extract receipt data endpoint
app.post('/api/extract-receipt', upload.single('file'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'OpenAI API key not configured',
      });
    }

    console.log(`Processing receipt: ${req.file.originalname} (${req.file.size} bytes)`);

    // Convert buffer to base64
    const base64Image = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this receipt image and extract the following information in JSON format:
              
{
  "merchant": "the store/business name",
  "amount": the total amount as a number (just the number, no currency symbol),
  "currency": "the currency code (e.g., USD, EUR, GBP)",
  "date": "the date in YYYY-MM-DD format",
  "category": "a suggested category (e.g., Groceries, Restaurant, Gas, Shopping, Transportation, Healthcare, Entertainment, Utilities, Other)"
}

IMPORTANT:
- Extract the TOTAL amount (not subtotals or individual items)
- If you can't find specific information, use reasonable defaults:
  - merchant: "Unknown Merchant"
  - amount: 0
  - currency: "USD"
  - date: today's date
  - category: "Other"
- Return ONLY the JSON object, no additional text or explanation
- Make sure the JSON is valid and properly formatted`
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
      temperature: 0.2, // Lower temperature for more consistent extraction
    });

    // Parse the response
    const content = response.choices[0]?.message?.content?.trim();
    
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    console.log('OpenAI Response:', content);

    // Try to parse JSON from the response
    let extractedData;
    try {
      // Remove markdown code blocks if present
      const jsonString = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      extractedData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Failed to parse receipt data');
    }

    // Validate and sanitize the extracted data
    const receiptData = {
      merchant: extractedData.merchant || 'Unknown Merchant',
      amount: parseFloat(extractedData.amount) || 0,
      currency: extractedData.currency || 'USD',
      date: extractedData.date || new Date().toISOString().split('T')[0],
      category: extractedData.category || 'Other',
    };

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(receiptData.date)) {
      receiptData.date = new Date().toISOString().split('T')[0];
    }

    console.log('Extracted data:', receiptData);

    // Return the extracted data
    res.json({
      success: true,
      data: receiptData,
    });

  } catch (error) {
    console.error('Error processing receipt:', error);

    // Handle specific error types
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({
        success: false,
        error: 'OpenAI API quota exceeded. Please check your billing.',
      });
    }

    if (error.status === 401) {
      return res.status(401).json({
        success: false,
        error: 'Invalid OpenAI API key',
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to extract receipt data',
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 20MB.',
      });
    }
  }
  
  res.status(500).json({
    success: false,
    error: error.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔑 OpenAI API Key configured: ${!!process.env.OPENAI_API_KEY}`);
});


