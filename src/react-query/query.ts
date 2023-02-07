import { createRetryer } from "./retryer";
import { QueryObserver } from "./observer";
import type { IAction, QueryOptions, IState, Retryer } from "./type";

export class Query {
  queryOptions: QueryOptions;
  state: IState = { loading: true };
  observers: QueryObserver[] = [];
  promise?: Promise<any>;
  private retryer?: Retryer;
  constructor(config: any) {
    this.queryOptions = config;
  }

  addObserver(observer: QueryObserver) {
    this.observers.push(observer);
  }
  fetch() {
    if (!this.retryer) {
      this.retryer = createRetryer({
        fn: this.queryOptions.queryFn,
        onSuccess: (data) => {
          this.dispatch({
            data,
            type: "success",
          });
        },
        onFail: (data) => {
          this.dispatch({
            data,
            type: "failed",
          });
        },
      });
    }
    this.promise = this.retryer.promise;
    return this;
  }
  private dispatch(action: IAction) {
    const reducer = (state: IState = {}) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            loading: false,
            status: "failed" as const,
          };
        case "success":
          return {
            ...state,
            loading: false,
            data: action.data,
            status: "success" as const,
          };
      }
    };
    this.state = reducer(this.state);
    this.observers.forEach((observer) => {
      observer.onQueryUpdate(action);
    });
  }
}
