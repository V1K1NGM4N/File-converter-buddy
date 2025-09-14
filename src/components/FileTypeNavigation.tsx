import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, Video, Music, Zap, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FileTypeNavigationProps {
  className?: string;
}

export const FileTypeNavigation = ({ className }: FileTypeNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainNavigationItems = [
    // Universal converter hidden due to bugs - keeping route for testing
    // {
    //   path: '/universal-converter',
    //   label: 'All files',
    //   icon: Zap,
    //   active: location.pathname === '/universal-converter'
    // },
    {
      path: '/images',
      label: 'Images',
      icon: ImageIcon,
      active: location.pathname === '/images'
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

  const productFeedItem = {
    path: '/product-feed-image-downloader',
    label: 'Product Feed Image Downloader',
    icon: Package,
    active: location.pathname === '/product-feed-image-downloader'
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Main navigation row */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
        {mainNavigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.path}
              variant={item.active ? "hero" : "secondary"}
              size="lg"
              className={cn(
                "min-w-24 sm:min-w-32 hover:shadow-glow",
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
      
      {/* Product Feed Image Downloader - centered on its own row */}
      <div className="flex justify-center">
        <Button
          variant={productFeedItem.active ? "hero" : "secondary"}
          size="lg"
          className={cn(
            "min-w-24 sm:min-w-32 hover:shadow-glow",
            productFeedItem.active && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          )}
          onClick={() => navigate(productFeedItem.path)}
        >
          <Package className="h-5 w-5 mr-2" />
          {productFeedItem.label}
        </Button>
      </div>
    </div>
  );
};