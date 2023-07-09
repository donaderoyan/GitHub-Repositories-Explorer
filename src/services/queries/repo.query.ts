import { useQuery } from '@tanstack/react-query';
import { 
    type GetRepoResponse, 
    type GetRepoProps,
} from '@/types/repo';
import { getRepo } from '../api/repo.service';

export const useRepoQuery = (params: GetRepoProps) => 
    useQuery<GetRepoResponse>(['getRepo', { params }], async () => {
        console.log('PARAM REPO', params)
        if(params.repo_url?.length == 0) {return {}}
        const res = await getRepo(params);
        return res;
    }, {manual: true,});