import { Subscribable } from "./subscribable";
import { QueryClient } from "./client";
import { Query } from "./query";
import { IAction, QueryOptions, IState } from "./type";

export class QueryObserver extends Subscribable {
  private currentResult!: IState;
  private options: QueryOptions;
  private client: QueryClient;
  private currentQuery!: Query;
  constructor(client: QueryClient, options: QueryOptions) {
    super();
    this.client = client;
    this.options = options;
    this.updateQuery();
  }
  onSubscribe(): void {
    if (this.listeners.length === 1) {
      this.currentQuery.addObserver(this);
    }
  }
  updateQuery() {
    const query = this.client.getQueryCache().build(this.client, this.options);
    this.currentQuery = query;
  }
  getResult() {
    return this.currentResult;
  }
  onQueryUpdate(action: IAction) {
    this.currentResult = action;
    this.notify();
  }
  notify(): void {
    this.listeners.forEach((listener) => listener());
  }
  getOptimisticResult(options: QueryOptions) {
    const query = this.client.fetchQuery(options);
    return (this.currentResult = query.state);
  }
}
