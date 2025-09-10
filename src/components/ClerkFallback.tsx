import React from 'react';

interface ClerkFallbackProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ClerkFallback: React.FC<ClerkFallbackProps> = ({ 
  children, 
  fallback = (
    <div style={{ 
      padding: '10px', 
      backgroundColor: '#f8f9fa', 
      border: '1px solid #dee2e6', 
      borderRadius: '4px',
      textAlign: 'center',
      color: '#6c757d'
    }}>
      Authentication temporarily unavailable
    </div>
  ) 
}) => {
  const [clerkAvailable, setClerkAvailable] = React.useState(false);

  React.useEffect(() => {
    // Check if Clerk is available
    const checkClerk = () => {
      if (typeof window !== 'undefined' && window.clerk) {
        setClerkAvailable(true);
      } else {
        // Check again after a short delay
        setTimeout(checkClerk, 1000);
      }
    };

    checkClerk();
  }, []);

  // If Clerk is not available, show fallback
  if (!clerkAvailable) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Export individual Clerk components with fallbacks
export const SignedInFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ClerkFallback fallback={null}>
    {children}
  </ClerkFallback>
);

export const SignedOutFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ClerkFallback fallback={children}>
    {children}
  </ClerkFallback>
);

export const UserButtonFallback: React.FC = () => (
  <ClerkFallback fallback={
    <button 
      style={{
        padding: '8px 16px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'not-allowed',
        opacity: 0.6
      }}
      disabled
    >
      Sign In (Unavailable)
    </button>
  }>
    {/* This will be replaced by the actual UserButton when Clerk loads */}
    <div style={{ display: 'none' }} />
  </ClerkFallback>
);

export const SignInButtonFallback: React.FC = () => (
  <ClerkFallback fallback={
    <button 
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'not-allowed',
        opacity: 0.6
      }}
      disabled
    >
      Sign In (Unavailable)
    </button>
  }>
    {/* This will be replaced by the actual SignInButton when Clerk loads */}
    <div style={{ display: 'none' }} />
  </ClerkFallback>
);

export const SignUpButtonFallback: React.FC = () => (
  <ClerkFallback fallback={
    <button 
      style={{
        padding: '8px 16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'not-allowed',
        opacity: 0.6
      }}
      disabled
    >
      Sign Up (Unavailable)
    </button>
  }>
    {/* This will be replaced by the actual SignUpButton when Clerk loads */}
    <div style={{ display: 'none' }} />
  </ClerkFallback>
);
