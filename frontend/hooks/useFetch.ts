import { useState, useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, options = {}) => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const get = async (url) => {
    await fetchData(url);
  };

  const post = async (url, body) => {
    await fetchData(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const put = async (url, body) => {
    await fetchData(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const remove = async (url) => {
    await fetchData(url, {
      method: "DELETE",
    });
  };

  return { data, loading, error, get, post, put, remove };
};

export default useFetch;
