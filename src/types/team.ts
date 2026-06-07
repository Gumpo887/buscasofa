export interface TeamMember {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Team {
  name: string;
  members: TeamMember[];
}