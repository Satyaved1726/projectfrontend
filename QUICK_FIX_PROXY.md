# Quick Fix: Run CORS Proxy Server

Your backend at `https://project1-backend.onrender.com` is not configured for CORS. This proxy server will fix signup/login immediately.

## 🚀 Option 1: Run Locally (Fastest)

### Step 1: Install dependencies
```bash
npm install express cors axios dotenv
```

### Step 2: Copy the proxy server
The file `backend-proxy-server.js` is already in your project.

### Step 3: Create .env file for proxy
Copy `.env.proxy` and rename to `.env.proxy` (already done)

### Step 4: Start the proxy server in a new terminal
```bash
node backend-proxy-server.js
```

You should see:
```
✅ CORS Proxy Server is running!
📍 URL: http://localhost:5000
🔗 Backend: https://project1-backend.onrender.com
```

### Step 5: Update frontend .env
Change:
```
REACT_APP_API_URL=https://project1-backend.onrender.com
```
To:
```
REACT_APP_API_URL=http://localhost:5000
```

### Step 6: Restart frontend
```bash
npm start
```

### Step 7: Test signup - should work now! ✅

---

## 🌍 Option 2: Deploy Proxy to Production

### Option 2A: Deploy to Render (Free - Same as your backend)

1. Push `backend-proxy-server.js` to GitHub (already done)
2. Go to https://render.com
3. Create New → Web Service
4. Connect your GitHub repo
5. Set settings:
   - **Name**: `trinetra-cors-proxy`
   - **Build Command**: `npm install express cors axios dotenv`
   - **Start Command**: `node backend-proxy-server.js`
   - **Environment**: Node
6. Add Environment Variable:
   - Key: `BACKEND_URL`
   - Value: `https://project1-backend.onrender.com`
7. Deploy

Then update .env:
```
REACT_APP_API_URL=https://trinetra-cors-proxy.onrender.com
```

### Option 2B: Deploy to Railway
Same process as Render, but go to https://railway.app instead.

### Option 2C: Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
heroku config:set BACKEND_URL=https://project1-backend.onrender.com
```

---

## 🛑 Option 3: Fix at the Source (Recommended for Production)

**Why proxy is temporary:**
- Extra latency
- Additional server to maintain
- Not ideal for production

**The right solution:** Configure CORS on your actual backend

Go to your backend code and add CORS configuration. See [CORS_FIX_GUIDE.md](CORS_FIX_GUIDE.md) for your framework (Express, Django, Flask, etc.)

---

## 📊 How It Works

```
Frontend (Vercel) 
    ↓
CORS Proxy Server (localhost:5000 or deployed)
    ↓        
Actual Backend (onrender.com)
```

The proxy:
1. ✅ Accepts requests from your frontend
2. ✅ Adds proper CORS headers
3. ✅ Forwards to your backend
4. ✅ Returns response to frontend

---

## 🧪 Test It

Once running, open browser console and test:

```javascript
// Test proxy is working
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(d => console.log(d));
```

Should show:
```json
{
  "status": "CORS Proxy Server is running ✅",
  "backend": "https://project1-backend.onrender.com"
}
```

---

## ❌ Still Not Working?

### Check 1: Is proxy server running?
```bash
curl http://localhost:5000/health
```
Should return the status JSON.

### Check 2: Can proxy reach backend?
Check the proxy server logs when you try to signup. Should see:
```
🔄 Proxying to: https://project1-backend.onrender.com/api/auth/signup
✅ Response: 201
```

If it shows error connecting to backend, the backend might be down.

### Check 3: Frontend using correct URL?
```javascript
// In browser console
fetch('/api/health')  // This will route through proxy
```

Check Network tab to see if requests are going to `localhost:5000`

---

## 📝 Next Steps

1. **Short term (this week)**: Use the proxy server while testing
2. **Medium term (next week)**: Deploy proxy to production
3. **Long term (permanent)**: Configure CORS on your actual backend

Good luck! 🚀
