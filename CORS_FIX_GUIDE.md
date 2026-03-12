# CORS Configuration Fix Guide

## Issue
The frontend on Vercel (`https://projectfrontend17.vercel.app`) is getting blocked when trying to access the backend on Render (`https://project1-backend.onrender.com`) due to **CORS policy restrictions**.

**Console Error:**
```
Access to XMLHttpRequest at 'https://project1-backend.onrender.com/api/auth/signup' 
from origin 'https://projectfrontend17.vercel.app' has been blocked by CORS policy
```

---

## Solution: Backend CORS Configuration

### Option 1: Node.js/Express Backend (Recommended)

Install CORS package:
```bash
npm install cors
```

Update your main server file (e.g., `server.js` or `index.js`):

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'https://projectfrontend17.vercel.app',
    'http://localhost:3000',  // Local development
    'http://localhost:8080'   // Local backend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Your routes...
app.use('/api', require('./routes/auth'));
```

### Option 2: Django Backend

Add to `settings.py`:

```python
INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]

CORS_ALLOWED_ORIGINS = [
    "https://projectfrontend17.vercel.app",
    "http://localhost:3000",
    "http://localhost:8080",
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'POST',
    'PUT',
]
```

### Option 3: Python/Flask Backend

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

cors_config = {
    "origins": [
        "https://projectfrontend17.vercel.app",
        "http://localhost:3000",
        "http://localhost:8080"
    ],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}

CORS(app, resources={r"/api/*": cors_config})

# Your routes...
```

---

## Frontend Changes (Already Applied)

✅ Updated `src/api.js` with:
- `withCredentials: true` for cookie/auth support
- CORS headers in request interceptor
- Error handling for network/CORS errors

✅ Updated `package.json` with:
- Proxy configuration for local development

---

## Testing Locally

1. **Start backend locally** on `http://localhost:8080`
2. **Update `.env` for local development:**
   ```
   REACT_APP_API_URL=http://localhost:8080
   ```
3. **Start frontend:**
   ```bash
   npm start
   ```
4. The proxy in `package.json` will route requests to `localhost:8080`
5. Test signup/login - should work without CORS errors

---

## Production Fix Checklist

- [ ] Deploy backend with CORS headers configured
- [ ] Add your Vercel frontend URL to CORS whitelist
- [ ] Test from production URLs
- [ ] Verify network requests in DevTools (Network tab)
- [ ] Check response headers for `Access-Control-Allow-Origin`

---

## Verify CORS is Working

Open browser DevTools and check the response headers:

1. Go to **Network** tab
2. Submit signup form
3. Click on the failed `/auth/signup` request
4. Look at **Response Headers**
5. Should see:
   ```
   Access-Control-Allow-Origin: https://projectfrontend17.vercel.app
   Access-Control-Allow-Credentials: true
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
   ```

If these headers are missing, the backend CORS is not configured.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Still getting CORS error | Verify backend has CORS package installed and configured |
| 404 errors | Check backend API endpoints match frontend requests |
| 500 errors | Check backend logs for application errors |
| Network timeout | Verify backend is running and accessible via direct URL |
| Browser blocks preflight | Ensure OPTIONS requests are handled by backend |

---

**Last Updated:** March 12, 2026
**Related:** [AUTH_ERROR_LOGGING_GUIDE.md](AUTH_ERROR_LOGGING_GUIDE.md)
