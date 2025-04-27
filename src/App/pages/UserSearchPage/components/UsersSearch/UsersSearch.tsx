import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Search from 'components/Search';
import { useUserSearchPageStore } from 'store/UserSearchPageStore';
import { UsersSearchProps } from './UsersSearch.types';

const UsersSearch: React.FC<UsersSearchProps> = observer(({ onChange }) => {
  const store = useUserSearchPageStore();
  const { username, setUsername, fetchUsers } = store;

  const handleGetUsers = (name: string) => {
    if (name === username) {
      return;
    }
    setUsername(name);
    if (name) {
      fetchUsers();
    }
    onChange(name);
  };

  return <Search placeholder="Enter username" value={username} handleSearch={handleGetUsers} />;
});

export default UsersSearch;
