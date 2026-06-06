export interface TeamMember {
  name: string;
  description: string;
}

export interface Team {
  name: string;
  members: TeamMember[];
}
