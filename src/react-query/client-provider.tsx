import React, { useEffect } from "react";
import { QueryClient } from "./client";

export const ClientContext = React.createContext<QueryClient | undefined>(
  undefined
);

interface IQueryClientProvider {
  children: React.ReactNode;
  client: QueryClient;
}
export const QueryClientProvider: React.FC<IQueryClientProvider> = ({
  client,
  children,
}) => {
  useEffect(() => {
    client.mount();
    return () => client.unMount();
  }, []);

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};
