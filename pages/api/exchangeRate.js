import { useQuery } from "react-query";
import React from "react";

const createUserApi = async (_, currency) => {
  const res = await fetch(`https://api.exchangeratesapi.io/latest?base=${currency}`, {
    method: "GET",
  });

  return res.json()
};

export const useGetCurrency = ({ currency } = {}) => {
  return useQuery(["getCurrencyExchange", currency], createUserApi, {enabled: currency != 'CAD'});
};
