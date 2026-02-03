import React, { useState, useMemo } from 'react';
import { Search, Filter, PlayCircle, BookOpen, Award } from 'lucide-react';
import VideoCard from './VideoCard';

export interface VideoModule {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  progress?: number;
  completed?: boolean;
  author: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface VideoLibraryProps {
  title?: string;
  description?: string;
  modules?: VideoModule[];
}

// Default mock data if no modules are provided
const DEFAULT_MODULES: VideoModule[] = [
  {
    id: '1',
    title: 'Platform Basics: Getting Started',
    description: 'Learn the fundamentals of navigating the dashboard and setting up your profile.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
    duration: '5:20',
    category: 'Onboarding',
    progress: 100,
    completed: true,
    author: 'Sarah Jenkins',
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Advanced Analytics Reporting',
    description: 'Deep dive into creating custom reports and interpreting complex data sets.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    duration: '12:45',
    category: 'Analytics',
    progress: 45,
    completed: false,
    author: 'Mike Ross',
    level: 'Advanced',
  },
  {
    id: '3',
    title: 'Team Management Protocols',
    description: 'Best practices for managing remote teams and ensuring productivity.',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    duration: '8:30',
    category: 'Management',
    progress: 0,
    completed: false,
    author: 'Jessica Pearson',
    level: 'Intermediate',
  },
  {
    id: '4',
    title: 'Security Compliance 101',
    description: 'Understanding the core security requirements for handling sensitive data.',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    duration: '15:00',
    category: 'Compliance',
    progress: 10,
    completed: false,
    author: 'Louis Litt',
    level: 'Beginner',
  },
  {
    id: '5',
    title: 'Customer Success Strategies',
    description: 'Techniques for improving customer retention and satisfaction scores.',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600',
    duration: '10:15',
    category: 'Sales',
    progress: 0,
    completed: false,
    author: 'Donna Paulsen',
    level: 'Intermediate',
  },
  {
    id: '6',
    title: 'API Integration Workshop',
    description: 'Technical walkthrough of integrating third-party services via API.',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600',
    duration: '22:10',
    category: 'Technical',
    progress: 0,
    completed: false,
    author: 'Benjamin Stout',
    level: 'Advanced',
  },
];

const VideoLibrary: React.FC<VideoLibraryProps> = ({
  title = 'Training Library',
  description = 'Browse our collection of training modules to enhance your skills.',
  modules = DEFAULT_MODULES,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from modules
  const categories = useMemo(() => {
    const cats = new Set(modules.map((m) => m.category));
    return ['All', ...Array.from(cats).sort()];
  }, [modules]);

  // Filter modules based on search and category
  const filteredModules = useMemo(() => {
    return modules.filter((module) => {
      const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            module.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [modules, searchQuery, selectedCategory]);

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
          <p className="text-slate-500 mt-2">{description}</p>
        </div>
        
        {/* Stats Summary (Optional Visual) */}
        <div className="flex gap-4 text-sm font-medium text-slate-600">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>{modules.length} Modules</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>{modules.filter(m => m.completed).length} Completed</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-4 h-4" /> Filters:
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <VideoCard
              key={module.id}
              id={module.id}
              title={module.title}
              description={module.description}
              thumbnailUrl={module.thumbnail}
              duration={module.duration}
              progress={module.progress}
              isCompleted={module.completed}
              category={module.category}
              level={module.level}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm">
            <PlayCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No training modules found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-6 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;
