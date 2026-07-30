import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // fetch the users
  useEffect(() => {
    const fetchUsers = async () => {
      const usersResponse = await client.get<User[]>('/users');

      setUsers(usersResponse);
    };

    fetchUsers();
  }, []);

  // fetch the posts of the selected user
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!selectedUser) {
        return;
      }

      try {
        setHasError(false);
        setisLoading(true);

        const postsResponse = await client.get<Post[]>(
          `/posts?userId=${selectedUser.id}`,
        );

        setUserPosts(postsResponse);
      } catch {
        setHasError(true);
      } finally {
        setisLoading(false);
      }
    };

    fetchUserPosts();
  }, [selectedUser]);

  const isNoPostsAvailable =
    !hasError && !isLoading && selectedUser && userPosts.length === 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} onUserSelect={setSelectedUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostsAvailable ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : null}

                <PostsList />
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
