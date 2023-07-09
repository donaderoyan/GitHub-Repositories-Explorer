export interface GetRepoResponse {
    items: Repo[];
}

export interface Repo{
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    created_at: [Date,string];
    language: string;
    forks_count: number;
    watchers: number;
}