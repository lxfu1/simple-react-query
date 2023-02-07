import { QueryCache } from "./cache";
import { QueryOptions } from "./type";
export class QueryClient {
  private queryCache: QueryCache;
  constructor() {
    this.queryCache = new QueryCache();
  }
  mount() {}
  unMount() {}
  getQueryCache(): QueryCache {
    return this.queryCache;
  }
  fetchQuery(options: QueryOptions) {
    const query = this.queryCache.build(this, options);
    return query.fetch();
  }
}
