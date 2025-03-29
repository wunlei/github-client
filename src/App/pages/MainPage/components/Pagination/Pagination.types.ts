export type PaginationProps = {
  currPage: number;
  onChange: (n: number) => void;
  isLastPage?: boolean;
};
