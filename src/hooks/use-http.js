import { useCallback, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData = null) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/${requestConfig.url}`, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const responseData = await response.json(); // an object
      if (applyData) {
        applyData(responseData);
      }
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
}

export default useHttp;
