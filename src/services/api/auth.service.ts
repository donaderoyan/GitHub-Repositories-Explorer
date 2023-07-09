import { type LoginBody } from '@/types/auth';

// Dummy login request that will resolve in 2 seconds
// response token get from env
export const login = async (body: LoginBody) => {
  const res = new Promise<any>((resolve, reject) => {
    if (body.username !== 'user' || body.password !== 'user') {
      reject(new Error('Invalid username or password'));
    } else {
      setTimeout(() => {
        const obj: Record<string, any> = {};
        // use github token 
        obj["token"] = import.meta.env.VITE_API_GITHUB_READ_TOKEN
        obj["authenticated"] = true
        resolve(obj);
      }, 2000);
    }
    
  });
  return await res;
};
