import React from 'react';
import { Play, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VideoCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  description?: string;
  progress?: number;
  isCompleted?: boolean;
  className?: string;
  onClick?: (id: string) => void;
}

export function VideoCard({
  id,
  title,
  thumbnailUrl,
  duration,
  description,
  progress = 0,
  isCompleted = false,
  className,
  onClick,
}: VideoCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-950',
        className
      )}
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for ${title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-5 w-5 fill-primary text-primary" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-[2px]">
          {duration}
        </div>

        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute left-2 top-2 rounded-full bg-green-500/90 p-1 shadow-sm backdrop-blur-[2px]">
            <CheckCircle className="h-4 w-4 text-white" />
          </div>
        )}

        {/* Progress Bar (visible if started but not completed) */}
        {!isCompleted && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-primary dark:text-gray-100">
            {title}
          </h3>
          
          {description && (
            <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
          
          {isCompleted ? (
            <span className="font-medium text-green-600 dark:text-green-500">Completed</span>
          ) : progress > 0 ? (
            <span className="font-medium text-primary">{progress}% Complete</span>
          ) : (
            <span>Start Training</span>
          )}
        </div>
      </div>
    </div>
  );
}
