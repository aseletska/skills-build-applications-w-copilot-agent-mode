import { useEffect, useState } from 'react';

function extractItems(payload, resource) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.[resource])) {
    return payload[resource];
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
}

export function useApiResource(apiEndpoint, resource) {
  const [items, setItems] = useState([]);
  const [apiUrl, setApiUrl] = useState(apiEndpoint);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setApiUrl(apiEndpoint);
    setLoading(true);
    setError('');

    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        setItems(extractItems(payload, resource));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiEndpoint, resource]);

  return { items, apiUrl, loading, error };
}