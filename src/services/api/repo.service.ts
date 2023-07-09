import { api } from '@/lib/api';
import { 
    type GetRepoResponse, 
    type GetRepoProps,
} from '@/types/repo';

export const getRepo = async (
    params: GetRepoProps
  ): Promise<GetRepoResponse> => {
    const { repo_url } = params;
    const { data } = await api.get<GetRepoResponse>(
      `${repo_url}`
    );
    return data;
  };