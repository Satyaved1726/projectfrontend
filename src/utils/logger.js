/**
 * Logger utility for tracking errors and important events
 * Logs to console and can be extended for remote logging
 */

const LogLevels = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

const detectErrorType = (error) => {
  if (!error.response) {
    if (error.message === 'Network Error') return 'NETWORK_ERROR';
    if (error.code === 'ERR_NETWORK') return 'NETWORK_ERROR';
    if (error.message?.includes('CORS')) return 'CORS_ERROR';
  }
  
  const status = error.response?.status;
  if (status === 0) return 'CORS_OR_NETWORK_ERROR';
  if (status === 401) return 'UNAUTHORIZED';
  if (status === 403) return 'FORBIDDEN';
  if (status === 404) return 'NOT_FOUND';
  if (status === 409) return 'CONFLICT';
  if (status >= 500) return 'SERVER_ERROR';
  
  return 'UNKNOWN_ERROR';
};

const logError = (context, error, additionalData = {}) => {
  const timestamp = new Date().toISOString();
  const errorType = detectErrorType(error);
  
  const errorLog = {
    timestamp,
    context,
    level: LogLevels.ERROR,
    message: error?.message || String(error),
    errorType,
    stack: error?.stack,
    statusCode: error?.response?.status,
    responseData: error?.response?.data,
    ...additionalData
  };

  console.error(`[${timestamp}] ERROR in ${context}:`, errorLog);
  
  // Special handling for CORS errors
  if (errorType.includes('CORS')) {
    console.error('⚠️  CORS Error detected! Backend needs to configure CORS headers.');
    console.error('📖 See CORS_FIX_GUIDE.md for configuration instructions.');
  }
  
  // Store in localStorage for debugging (keep last 50 errors)
  storeErrorLog(errorLog);
  
  return errorLog;
};

const logInfo = (context, message, additionalData = {}) => {
  const timestamp = new Date().toISOString();
  const infoLog = {
    timestamp,
    context,
    level: LogLevels.INFO,
    message,
    ...additionalData
  };

  console.log(`[${timestamp}] INFO in ${context}:`, infoLog);
  return infoLog;
};

const logDebug = (context, message, additionalData = {}) => {
  const timestamp = new Date().toISOString();
  const debugLog = {
    timestamp,
    context,
    level: LogLevels.DEBUG,
    message,
    ...additionalData
  };

  console.debug(`[${timestamp}] DEBUG in ${context}:`, debugLog);
  return debugLog;
};

const storeErrorLog = (errorLog) => {
  try {
    const existingLogs = JSON.parse(localStorage.getItem('authErrorLogs') || '[]');
    existingLogs.push(errorLog);
    
    // Keep only last 50 errors
    const logsToStore = existingLogs.slice(-50);
    localStorage.setItem('authErrorLogs', JSON.stringify(logsToStore));
  } catch (e) {
    console.error('Failed to store error log in localStorage:', e);
  }
};

const getStoredErrorLogs = () => {
  try {
    return JSON.parse(localStorage.getItem('authErrorLogs') || '[]');
  } catch (e) {
    console.error('Failed to retrieve error logs from localStorage:', e);
    return [];
  }
};

const clearErrorLogs = () => {
  try {
    localStorage.removeItem('authErrorLogs');
    console.log('Error logs cleared');
  } catch (e) {
    console.error('Failed to clear error logs:', e);
  }
};

export {
  logError,
  logInfo,
  logDebug,
  getStoredErrorLogs,
  clearErrorLogs,
  LogLevels,
  detectErrorType
};
