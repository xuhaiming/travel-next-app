
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email;

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.user_metadata?.avatar_url} alt={displayName} />
        <AvatarFallback className="text-xs">
          {displayName ? getInitials(displayName) : 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{displayName}</span>
        <span className="text-xs text-gray-500">{user.email}</span>
      </div>
      <Button 
        onClick={signOut} 
        variant="outline" 
        size="sm"
        className="ml-2"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default UserProfile;
