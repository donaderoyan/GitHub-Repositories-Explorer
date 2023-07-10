import React, { useEffect, useMemo, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { formatDate } from '@/lib/helper';
import { useUsersQuery } from '@/services/queries/user.query';
import { useRepoQuery } from '@/services/queries/repo.query';
import { type User } from '@/types/user';
import { type GetRepoProps, type Repo } from '@/types/repo';
import Accordion from '@/components/Accordion';
import { AccordionData } from '@/components/Accordion/accordion.type';
import { date } from 'yup';
/* eslint-disable no-use-before-define */

export type Filter = { page: number; search?: string };
export type Url = { repo_url: string };

export interface UserListProps {
  users: User[];
}

export interface RepoListProps {
  repo: Repo[];
  isLoading: boolean;
}

const RepoList: React.FC<RepoListProps> = ({ repo, isLoading }) => {

  if(isLoading) {
    <div>Loading...</div>
  }

  if (!repo?.length) {
    return <div>No repository found in this user</div>
  }
  
  return (
    <>
      {repo.map((item,key) => (
        <div
          key={key}
          className="my-1 px-1 w-full"
        >
          <article className="overflow-hidden rounded-lg shadow-lg">
            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <a
                    className="no-underline hover:underline text-black"
                    href={item.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                </h1>
                <span className="text-grey-darker text-sm">
                    {formatDate(item.created_at)}
                </span>
              </header>
              <div className="p-2 my-1 md:p-4">
                  <p className="text-sm mb-1">
                    {item.description}
                  </p>
                  <div>
                    <span><strong>Language:</strong> {item.language}</span>
                    <span className="px-1"><strong>Forks:</strong> {item.forks_count}</span>
                    <span className="px-1"><strong>Watcher:</strong> {item.watchers}</span>
                  </div>
              </div>
          </article>
        </div>
      ))}
    </>
  )
}


const UsersAccordion: React.FC<UserListProps> = ({ users }) => {
  if (!users?.length) {
    return <div>No users found</div>;
  }
  let dataUsers: AccordionData[] = []
  let repoUrl: GetRepoProps = {
    repo_url: ''
  }
  let idx: number = 0

  users.map(item => {
    let data: AccordionData = {
      title: item.login,
      url: item.html_url,
      avatar_url: item.avatar_url,
      repos_url: item.repos_url,
      content: (<></>)
    }
    dataUsers.push(data)
  })

  const { isFetching ,isLoading, data, refetch } = useRepoQuery(repoUrl);

  const parentHandleChange = async (e: any) => {
    idx = e
    repoUrl['repo_url'] = dataUsers[e]['repos_url']
    await refetch()
  };
  
  return (
    <>
      <Accordion handleClick={parentHandleChange} items={dataUsers} isLoading={isLoading}> 
        <RepoList repo={data?.items ?? []} isLoading={isFetching}/>
      </Accordion>
    </>
  );
};


const Users = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const filter = useMemo<Filter>(
    () => ({
      page: 1,
      pageSize: 10,
      search: debouncedSearchTerm?.length ? debouncedSearchTerm : "",
    }),
    [debouncedSearchTerm]
  );
  
  const { isLoading, data } = useUsersQuery(filter);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex justify-center w-full">
        <div className="mb-3 xl:w-[40%]">
          <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-auto px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter search term"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => {
                  setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
          <div className="mb-3 xl:w-[40%]">
            <UsersAccordion users={data?.items ?? []}/>
          </div>
          </>
        )}
      </div>

      {/* <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <UserList users={data?.items ?? []} />
          </>
        )}
      </div> */}

    </div>
  );
};

export default Users;
