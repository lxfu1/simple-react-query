import { Subscribable } from "./subscribable";
import { Query } from "./query";
import { QueryClient } from "./client";
import { QueryOptions } from "./type";

type QueriesMap = Map<string, Query>;

export class QueryCache {
  private queriesMap: QueriesMap;
  constructor() {
    this.queriesMap = new Map();
  }
  build(client: QueryClient, options: QueryOptions) {
    const { queryFn, queryKey } = options;
    let query = this.get(queryKey);

    if (!query) {
      query = new Query({
        cache: this,
        queryFn,
        queryKey,
        client,
      });
      this.add(queryKey, query);
    }

    return query;
  }
  get(queryKey: string) {
    return this.queriesMap.get(queryKey);
  }
  add(queryKey: string, query: Query) {
    this.queriesMap.set(queryKey, query);
  }
  remove() {}
  find() {}
  clear() {}
}
