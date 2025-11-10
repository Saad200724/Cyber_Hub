
export interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: React.ElementType;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}