import React from 'react';
import { TeamMemberCard } from './TeamMemberCard';

// Define the data structure for a team member
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
  };
}

// Sample data for the team grid
const defaultTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'Sarah has over 15 years of experience in technology leadership and strategic planning. She founded the company with a vision to revolutionize the industry.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'A full-stack architect with a passion for scalable systems. Michael oversees all technical strategies and development protocols.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'Emily brings creative brilliance to our user interfaces. She believes that good design is invisible and intuitive.',
    social: {
      linkedin: '#',
      dribbble: '#',
    },
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'David specializes in frontend performance and React ecosystems. He ensures our applications are fast, accessible, and robust.',
    social: {
      twitter: '#',
      github: '#',
    },
  },
  {
    id: '5',
    name: 'Jessica Wright',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'Jessica bridges the gap between client needs and technical execution, ensuring every feature adds real value.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: '6',
    name: 'Marcus Johnson',
    role: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'With a knack for storytelling, Marcus drives our brand narrative and connects our solutions with the people who need them.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

interface TeamGridProps {
  members?: TeamMember[];
  title?: string;
  subtitle?: string;
}

export const TeamGrid: React.FC<TeamGridProps> = ({
  members = defaultTeamMembers,
  title = 'Meet the Team',
  subtitle = 'Our talented team of experts is dedicated to delivering the best results for your business.',
}) => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-12">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <TeamMemberCard
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
                social={member.social}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
