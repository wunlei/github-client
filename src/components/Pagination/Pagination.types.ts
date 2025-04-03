export type PaginationProps = {
  count: number;
  offset?: number;
  current?: number;
  onChange?: (currPage: number) => void;
};
