import { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface Props {
  users: User[];
  selectedUserId: number | undefined;
  onUserSelect: (user: User) => void;
}

export const UserSelector = ({
  users,
  selectedUserId,
  onUserSelect,
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserSelect = (user: User) => {
    onUserSelect(user);
    setIsDropdownOpen(false);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((user, index) => (
              <a
                key={user.id}
                href={`#user-${index}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUserId === user.id,
                })}
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
