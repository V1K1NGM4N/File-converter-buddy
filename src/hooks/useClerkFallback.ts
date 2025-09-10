import { useState, useEffect } from 'react';

export const useClerkFallback = () => {
  const [clerkError, setClerkError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to detect if Clerk fails to load
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Clerk loading timeout - falling back to app without authentication');
        setClerkError(true);
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    // Listen for Clerk-specific errors
    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.includes('Clerk') || 
        event.filename?.includes('clerk') ||
        event.message?.includes('ERR_SSL_VERSION_OR_CIPHER_MISMATCH')
      ) {
        console.warn('Clerk loading error detected:', event.message);
        setClerkError(true);
        setIsLoading(false);
      }
    };

    // Listen for unhandled promise rejections (common with Clerk loading failures)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason?.message?.includes('Clerk') ||
        event.reason?.toString().includes('Clerk')
      ) {
        console.warn('Clerk promise rejection detected:', event.reason);
        setClerkError(true);
        setIsLoading(false);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Check if Clerk is available after a short delay
    const checkClerk = setTimeout(() => {
      if (typeof window !== 'undefined' && !window.clerk && !clerkError) {
        console.warn('Clerk not available after delay - falling back');
        setClerkError(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(checkClerk);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [isLoading, clerkError]);

  const retry = () => {
    setRetryCount(prev => prev + 1);
    setClerkError(false);
    setIsLoading(true);
    // Force reload to retry Clerk loading
    window.location.reload();
  };

  const continueWithoutAuth = () => {
    setClerkError(false);
    setIsLoading(false);
  };

  return {
    clerkError,
    retryCount,
    isLoading,
    retry,
    continueWithoutAuth,
    maxRetries: 2
  };
};
