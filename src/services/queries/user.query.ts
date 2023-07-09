import { useQuery } from '@tanstack/react-query';
import {
  type GetUserResponse,
  type GetUsersProps,
} from '@/types/user';
import { getUsers } from '../api/user.service';

export const useUsersQuery = (params: GetUsersProps) =>
  useQuery<GetUserResponse>(['getUsers', { params }], async () => {
    if(params.search?.length == 0) {return {}}
    const res = await getUsers(params);
    return res;
  });
