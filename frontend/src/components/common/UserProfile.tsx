import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

interface UserProfileProps {
  user: any;
  onSignOut: () => void;
  className?: string;
}

export function UserProfile({ user, onSignOut, className = '' }: UserProfileProps) {
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserName = () => {
    if (user.name) return user.name;
    if (user.full_name) return user.full_name;
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };

  const userName = getUserName();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex flex-col items-center">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-blue-500 text-white">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs text-gray-600 mt-1 max-w-20 truncate">
          {userName}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onSignOut}
        className="text-gray-500 hover:text-gray-700"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
} 