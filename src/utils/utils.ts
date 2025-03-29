export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  return date.toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
