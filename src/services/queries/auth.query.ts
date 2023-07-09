import { useMutation } from '@tanstack/react-query';
import { type LoginBody } from '@/types/auth';
import { login } from '../api/auth.service';
import { setItem } from '@/lib/localStorage';
import { error } from 'console';

export const useLoginQuery = () =>
  useMutation(['login'], async (body: LoginBody) => {
    const res = await login(body).catch(error => {})
    if(res) {
      setItem('token', res.token);
    }
    return res;
  });
