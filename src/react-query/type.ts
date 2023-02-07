export type IAction = {
  type: "success" | "failed";
  data?: any;
};

export type QueryOptions = {
  queryKey: string;
  queryFn: () => Promise<any>;
};

export type IState = {
  status?: "success" | "failed";
  loading?: boolean;
  data?: any;
};

export interface CancelOptions {
  revert?: boolean;
  silent?: boolean;
}

export interface Retryer<TData = unknown> {
  promise: Promise<TData>;
}

export type IRetry = {
  fn: QueryOptions["queryFn"];
  onFail?: (action: IAction) => void;
  onSuccess?: (action: IAction) => void;
};
