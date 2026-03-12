# Error Logging Guide - Auth Pages

## Overview
Comprehensive error logging has been implemented for the login and signup pages. All errors are logged to the browser console and stored in localStorage for debugging purposes.

## What Gets Logged

### Login Page (`src/pages/auth/Login.jsx`)
- **Page Lifecycle**: When the login page loads and unmounts
- **Form Validation Errors**: 
  - Missing email or password
  - Invalid email format
- **Authentication Errors**:
  - Failed login attempts with status codes
  - Role validation errors (non-ADMIN users)
  - Network errors
- **Storage Errors**: localStorage access issues
- **Success Events**: Successful login with user ID

### Signup Page (`src/pages/auth/Signup.jsx`)
- **Page Lifecycle**: When the signup page loads and unmounts
- **Form Validation Errors**:
  - Missing fields (name, email, password, confirmPassword)
  - Invalid email format
  - Password mismatch
  - Password length validation
- **Authentication Errors**:
  - Failed signup attempts with status codes
  - Missing authentication token
  - Network errors
- **Storage Errors**: localStorage access issues
- **Success Events**: Successful signup with user ID

## How to Access Logs

### Method 1: Browser Console
1. Open Developer Tools (`F12` or `Ctrl+Shift+I`)
2. Go to the **Console** tab
3. Perform actions on the login/signup pages
4. All errors and info logs will appear with `[timestamp]` and log level (ERROR, INFO, DEBUG)

### Method 2: Browser Storage (localStorage)
To view stored error logs programmatically:

```javascript
// Run this in the browser console to view all stored error logs
JSON.parse(localStorage.getItem('authErrorLogs'))

// View last few errors
const logs = JSON.parse(localStorage.getItem('authErrorLogs') || '[]');
console.table(logs.slice(-10));

// Clear error logs when needed
localStorage.removeItem('authErrorLogs');
```

Or use the logger utility functions:

```javascript
// Import in any page/component
import { getStoredErrorLogs, clearErrorLogs } from './utils/logger';

// Get all stored logs
const logs = getStoredErrorLogs();
console.log(logs);

// Clear logs
clearErrorLogs();
```

## Log Data Structure

Each error log contains:
```javascript
{
  timestamp: "2026-03-12T10:30:45.123Z",
  context: "LOGIN_PAGE" or "SIGNUP_PAGE",
  level: "ERROR" | "INFO" | "DEBUG",
  message: "Error description",
  stack: "Error stack trace (if available)",
  statusCode: 401,           // HTTP status code
  responseData: {...},       // Server response data
  errorType: "LOGIN_FAILED",
  email: "user@example.com",
  isNetworkError: false,
  // ... other contextual data
}
```

## Common Error Scenarios

### Login Errors
- **"Email is required"** - User didn't enter email
- **"Please enter a valid email address"** - Invalid email format
- **"Password is required"** - User didn't enter password
- **"Only administrators can login here..."** - Non-admin user tried to login
- **HTTP 401** - Invalid credentials
- **Network error** - Backend server unreachable

### Signup Errors
- **"Passwords do not match"** - Confirmation password doesn't match
- **"Password must be at least 6 characters"** - Weak password
- **"Full name is required"** - Empty name field
- **"Please enter a valid email address"** - Invalid email format
- **"No authentication token received"** - Server didn't return valid token
- **HTTP 409** - Email already exists
- **Network error** - Backend server unreachable

## Browser Console Output Examples

### Success Login
```
[2026-03-12T10:30:45.123Z] INFO in LOGIN_PAGE: 
{timestamp: "...", context: "LOGIN_PAGE", level: "INFO", message: "Login successful and token stored", userId: "123", role: "ADMIN"}
```

### Failed Password Validation
```
[2026-03-12T10:30:45.123Z] ERROR in SIGNUP_PAGE: 
{timestamp: "...", context: "SIGNUP_PAGE", level: "ERROR", message: "Passwords do not match", field: "passwordMatch", passwordLength: 8, confirmPasswordLength: 6}
```

### Network Error
```
[2026-03-12T10:30:45.123Z] ERROR in LOGIN_PAGE: 
{timestamp: "...", context: "LOGIN_PAGE", level: "ERROR", message: "Network Error", statusCode: undefined, isNetworkError: true}
```

## Storage Limits
- Maximum 50 error logs are stored in localStorage
- Older logs are automatically removed when the limit is exceeded
- Each log record takes approximately 0.5-1 KB of storage

## Tips for Debugging

1. **Clear logs before testing**: Call `localStorage.removeItem('authErrorLogs')` before each test session
2. **Monitor in real-time**: Keep the Console tab open while testing
3. **Export logs**: Copy logs to a text file for bug reports:
   ```javascript
   const logs = JSON.parse(localStorage.getItem('authErrorLogs') || '[]');
   console.log(JSON.stringify(logs, null, 2));
   ```
4. **Check network requests**: Go to **Network** tab to see API requests and responses
5. **Use Application tab**: Check Application > Local Storage to view `authErrorLogs` directly

## Integration with Monitoring Service (Future)

The logger is designed to be easily extended to send logs to a remote monitoring service:

```javascript
// In logger.js, modify logError() to:
const sendToMonitoringService = async (errorLog) => {
  await fetch('https://your-monitoring-service.com/logs', {
    method: 'POST',
    body: JSON.stringify(errorLog)
  });
};
```

---
**Last Updated**: March 12, 2026
