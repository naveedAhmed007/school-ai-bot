import apiClient from "./apiClient";

// Generic GET
export const getRequest = async <T>(url: string, params?: object): Promise<T> => {
  const { data } = await apiClient.get<T>(url, { params });
  return data;
};

// Generic POST
export const postRequest = async <T>(url: string, body?: any, config?: object): Promise<T> => {
  const { data } = await apiClient.post<T>(url, body, config);
  return data;
};

// Generic PUT
export const putRequest = async <T>(url: string, body?: any): Promise<T> => {
  const { data } = await apiClient.put<T>(url, body);
  return data;
};

// Generic DELETE
export const deleteRequest = async <T>(url: string, params?: object): Promise<T> => {
  const { data } = await apiClient.delete<T>(url, { params });
  return data;
};
