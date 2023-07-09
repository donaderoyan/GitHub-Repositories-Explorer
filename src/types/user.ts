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
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}
