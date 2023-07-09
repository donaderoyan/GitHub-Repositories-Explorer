import { api } from '@/lib/api';
import { newsApiKey } from '@/lib/config';
import {
  type GetUserResponse,
  type GetUsersProps,
} from '@/types/user';
import { config } from 'process';

export const getUsers = async (
  params: GetUsersProps
): Promise<GetUserResponse> => {
  const { search, page } = params;
  const { data } = await api.get<GetUserResponse>(
    `/search/users?q=${search}&per_page=6`
  );
  return data;
};
