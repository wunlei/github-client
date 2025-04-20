export type PaginationProps = {
  count: number;
  offset?: number;
  current?: number;
  className?: string;
  onChange?: (currPage: number) => void;
};
