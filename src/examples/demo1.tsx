import React from "react";
import { useQuery } from "../react-query";

const asyncFetch = () => {
  return fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
  ).then((res) => res.json());
};

export const Demo1 = ({ tag }: { tag: string }) => {
  const { data = [], loading } = useQuery([tag], asyncFetch);

  return <div style={{ color: "green" }}>component(1): {data.length}</div>;
};
