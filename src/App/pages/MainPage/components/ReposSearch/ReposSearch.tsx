import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Search from 'components/Search';
import { useMainPageStore } from 'store/MainPageStore/';
import { ReposSearchProps } from './ReposSearch.types';

const ReposSearch: React.FC<ReposSearchProps> = observer(({ onChange }) => {
  const store = useMainPageStore();
  const { orgName, setOrgName, fetchRepos } = store;

  const handleGetRepos = (org: string) => {
    if (org === orgName) {
      return;
    }
    setOrgName(org);
    if (org) {
      fetchRepos();
    }
    onChange(org);
  };

  return <Search placeholder="Enter organization name" value={orgName} handleSearch={handleGetRepos} />;
});

export default ReposSearch;
