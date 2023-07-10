export interface GetRepoResponse {
    items?: Repo[];
}

export interface GetRepoProps {
    repo_url?: string;
}

export interface Repo{
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    created_at: string | Date;
    language: string;
    forks_count: number;
    watchers: number;
}