export interface TrainingVideo {
  id: string;
  thumbnail: string;
  title: string;
  url: string;
  duration: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
}

export const trainingVideos: TrainingVideo[] = [
  {
    id: 'v1',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60',
    title: 'Getting Started with the Dashboard',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '05:30',
  },
  {
    id: 'v2',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    title: 'Advanced Analytics & Reporting',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '12:45',
  },
  {
    id: 'v3',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60',
    title: 'Team Collaboration Features',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '08:15',
  },
  {
    id: 'v4',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?w=800&auto=format&fit=crop&q=60',
    title: 'Security Best Practices',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '10:00',
  },
  {
    id: 'v5',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60',
    title: 'Managing User Permissions',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '06:20',
  },
  {
    id: 'v6',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    title: 'Workflow Automation Tutorial',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '15:10',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
    bio: 'Sarah leads the product vision and ensures our features align with user needs. She has over 10 years of experience in SaaS product management.',
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Lead Developer',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
    bio: 'Michael oversees the technical architecture and core development of the platform. He is passionate about clean code and scalable systems.',
  },
  {
    id: 't3',
    name: 'Emily Davis',
    role: 'UX/UI Designer',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
    bio: 'Emily crafts the user interfaces that make our platform intuitive and beautiful. She focuses on accessibility and user-centered design principles.',
  },
  {
    id: 't4',
    name: 'David Wilson',
    role: 'Customer Success',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
    bio: 'David is dedicated to ensuring our clients achieve their goals. He manages onboarding, training, and ongoing support relationships.',
  },
];
