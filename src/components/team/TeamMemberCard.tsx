import React from 'react';
import { Github, Globe, Linkedin, Twitter } from 'lucide-react';

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'website';
  url: string;
}

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageSrc: string;
  bio?: string;
  socialLinks?: SocialLink[];
  className?: string;
}

const getSocialIcon = (platform: SocialLink['platform']) => {
  switch (platform) {
    case 'twitter':
      return <Twitter className="w-5 h-5" />;
    case 'linkedin':
      return <Linkedin className="w-5 h-5" />;
    case 'github':
      return <Github className="w-5 h-5" />;
    case 'website':
      return <Globe className="w-5 h-5" />;
    default:
      return <Globe className="w-5 h-5" />;
  }
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  imageSrc,
  bio,
  socialLinks = [],
  className = '',
}) => {
  return (
    <div
      className={`group relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${className}`}
    >
      {/* Aspect Ratio Container (e.g., 3:4 portrait) */}
      <div className="aspect-[3/4] w-full relative overflow-hidden">
        {/* Background Image */}
        <img
          src={imageSrc}
          alt={`${name} - ${role}`}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay - Always visible at bottom for text readability, expands on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95 group-hover:from-black/95 group-hover:via-black/70" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          {/* Name & Role */}
          <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-xl font-bold leading-tight md:text-2xl">
              {name}
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-300 md:text-base">
              {role}
            </p>
          </div>

          {/* Divider Line (Expands on hover) */}
          <div className="my-0 h-0 w-12 bg-indigo-500 opacity-0 transition-all duration-300 group-hover:my-4 group-hover:h-1 group-hover:opacity-100" />

          {/* Hidden Content: Bio */}
          {bio && (
            <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-40 group-hover:opacity-100">
              <p className="text-sm text-gray-300 line-clamp-4">
                {bio}
              </p>
            </div>
          )}

          {/* Hidden Content: Social Links */}
          {socialLinks.length > 0 && (
            <div className="mt-0 flex translate-y-4 gap-4 opacity-0 transition-all duration-300 delay-75 group-hover:mt-4 group-hover:translate-y-0 group-hover:opacity-100">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform text-gray-400 transition-colors duration-200 hover:scale-110 hover:text-white"
                  aria-label={`${name}'s ${link.platform}`}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
