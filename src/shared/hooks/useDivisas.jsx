import { useState } from 'react';
import { convertCurrency, getAvailableCurrencies } from "../../services/api";

export const useCurrencyConverter = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  const fetchCurrencies = async () => {
    try {
      setLoading(true);
      const data = await getAvailableCurrencies();
      setCurrencies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const convert = async (from, to, amount) => {
    try {
      setLoading(true);
      setError(null);
      const data = await convertCurrency(from, to, amount);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error converting currency');
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    error,
    currencies,
    fetchCurrencies,
    convert,
  };
};