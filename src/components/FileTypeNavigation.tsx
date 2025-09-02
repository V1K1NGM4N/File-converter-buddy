import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, Video, Music, Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FileTypeNavigationProps {
  className?: string;
}

export const FileTypeNavigation = ({ className }: FileTypeNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      path: '/allfiles',
      label: 'All files',
      icon: Zap,
      active: location.pathname === '/allfiles'
    },
    {
      path: '/',
      label: 'Images',
      icon: ImageIcon,
      active: location.pathname === '/'
    },
    {
      path: '/video',
      label: 'Video',
      icon: Video,
      active: location.pathname === '/video'
    },
    {
      path: '/audio',
      label: 'Audio',
      icon: Music,
      active: location.pathname === '/audio'
    }
  ];

  return (
    <div className={cn("flex flex-wrap justify-center gap-6", className)}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.path}
            variant={item.active ? "hero" : "secondary"}
            size="lg"
            className={cn(
              "min-w-32 hover:shadow-glow",
              item.active && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
            onClick={() => navigate(item.path)}
          >
            <Icon className="h-5 w-5 mr-2" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};