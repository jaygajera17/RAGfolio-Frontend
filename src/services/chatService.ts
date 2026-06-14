import { APIService } from "./apiService";

type chatRequestBody = {
  query: string;
};

type chatResponse = {
  content: string;
};

export const getChatResponse = (query: string, token: string) => {
  const response = APIService.post<chatRequestBody, chatResponse>(
    `/api/v1/rag/ask`,
    { query },
    {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
  );
  return response;
};
