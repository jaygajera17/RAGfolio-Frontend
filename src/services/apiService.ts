import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosError,
} from "axios";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(
          error.response?.data || error.message || "An unknown error occurred",
        );
      },
    );
  }

  async get<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.api.get<TResponse>(url, config);
    return response.data;
  }

  async post<TRequest, TResponse>(
    url: string,
    body: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.api.post<TResponse>(url, body, config);

    return response.data;
  }

  async put<TRequest, TResponse>(
    url: string,
    body: TRequest,
  ): Promise<TResponse> {
    const response = await this.api.put<TResponse>(url, body);

    return response.data;
  }

  async delete<TResponse>(url: string): Promise<TResponse> {
    const response = await this.api.delete<TResponse>(url);

    return response.data;
  }
}

export const APIService = new ApiService();