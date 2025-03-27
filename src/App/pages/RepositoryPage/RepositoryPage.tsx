import * as React from 'react';
import { useParams } from 'react-router';
import PageLayout from 'components/PageLayout';

const RepositoryPage: React.FC = () => {
  const { owner, repo } = useParams();

  return (
    <PageLayout>
      {owner} {repo}
    </PageLayout>
  );
};

export default RepositoryPage;
