export interface GetUserResponse {
  total_count: number;
  items: User[];
}

export interface GetUsersProps {
  search?: string;
  page: number;
}

export interface User {
  avatar_url: string;
  events_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  type: string;
  url: string;
}
