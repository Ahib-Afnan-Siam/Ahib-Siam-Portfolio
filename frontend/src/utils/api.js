// Utility function to get the base URL for API calls
export const getApiBaseUrl = () => {
  // In production, use relative paths which will be handled by the proxy
  // In development, use localhost
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:5000';
  }
  // For production, return empty string to use relative paths
  // This works with Vercel's proxy configuration for /api routes
  return '';
};

// Utility function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  
  try {
    const response = await fetch(url, mergedOptions);
    return response;
  } catch (error) {
    console.error(`API call failed for ${url}:`, error);
    throw error;
  }
};