import { ref, Ref } from "vue";
import axios, { AxiosError } from "axios";

export const useApi = () => {
  const API_URL = "http://localhost:5000";

  // Types réactifs
  const data: Ref<any | null> = ref(null);
  const error: Ref<string | null> = ref(null);
  const loading: Ref<boolean> = ref(false);

  // GET
  const get = async <T>(endpoint: string): Promise<T | null> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<T>(`${API_URL}${endpoint}`);
      data.value = response.data;
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      error.value = err.response?.data as string || err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  // POST
  const post = async <T, U>(endpoint: string, payload: U): Promise<T | null> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post<T>(`${API_URL}${endpoint}`, payload);
      data.value = response.data;
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      error.value = err.response?.data as string || err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  // PUT
  const put = async <T, U>(endpoint: string, payload: U): Promise<T | null> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.put<T>(`${API_URL}${endpoint}`, payload);
      data.value = response.data;
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      error.value = err.response?.data as string || err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  // DELETE
  const remove = async <T>(endpoint: string): Promise<T | null> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.delete<T>(`${API_URL}${endpoint}`);
      data.value = response.data;
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      error.value = err.response?.data as string || err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    get,
    post,
    put,
    remove,
  };
};
