
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import GoogleSignInButton from './GoogleSignInButton';
import UserProfile from './UserProfile';

const AuthContainer: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {user ? (
        <UserProfile />
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Welcome to Travel Next</h3>
            <p className="text-gray-600 mb-4">Sign in to save your favorite destinations and track your travel preferences</p>
          </div>
          <GoogleSignInButton />
        </div>
      )}
    </div>
  );
};

export default AuthContainer;
