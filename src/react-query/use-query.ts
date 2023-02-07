import { useSyncExternalStore, useCallback, useContext, useState } from "react";
import { QueryClient } from "./client";
import { ClientContext } from "./client-provider";

import { QueryObserver } from "./observer";

export const useQuery = (
  sign: string | (string | number)[] = [],
  queryFn: () => Promise<any>
) => {
  const queryClient = useContext(ClientContext) as QueryClient;

  const queryKey = typeof sign === "string" ? sign : sign.join("-");

  const options = {
    queryKey,
    queryFn,
  };

  const [observer] = useState(() => new QueryObserver(queryClient, options));

  const result = observer.getOptimisticResult(options);

  const subsrcibe = useCallback(
    (onStoreChange: () => void) => {
      return observer.subScribe(onStoreChange);
    },
    [observer, sign]
  );

  useSyncExternalStore(
    subsrcibe,
    () => observer.getResult(),
    () => observer.getResult()
  );

  return result;
};
