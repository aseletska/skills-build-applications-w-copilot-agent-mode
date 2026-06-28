import { useEffect, useState } from 'react';

const API_PORT = 8000;

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${API_PORT}.app.github.dev/api`;
  }

  const codespacesMatch = window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/);

  if (codespacesMatch?.[1]) {
    return `https://${codespacesMatch[1]}-${API_PORT}.app.github.dev/api`;
  }

  return `http://localhost:${API_PORT}/api`;
}

export function getApiUrl(resource) {
  return `${getApiBaseUrl()}/${resource}/`;
}

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

export function useApiResource(resource) {
  const [items, setItems] = useState([]);
  const [apiUrl, setApiUrl] = useState(getApiUrl(resource));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = getApiUrl(resource);
    setApiUrl(url);
    setLoading(true);
    setError('');

    fetch(url)
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
  }, [resource]);

  return { items, apiUrl, loading, error };
}