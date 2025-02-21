interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: any; // Optional body for POST, PUT, etc.
  headers?: { [key: string]: string }; // Optional headers
}
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const fetchApi = async <T>({
  method,
  url,
  body,
  headers,
}: RequestOptions): Promise<T> => {
  const requestHeaders = { ...defaultHeaders, ...headers };

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${BASE_API_URL}${url}`, requestOptions);

    if (!response.ok) {
      // Handle HTTP errors (like 4xx, 5xx)
      const errorText = await response.text();
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    // Try to parse JSON response
    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    console.error("API call failed", error);
    throw error; // Re-throw to handle in the calling function
  }
};

export default fetchApi;
