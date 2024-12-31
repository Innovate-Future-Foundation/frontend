import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MockGetResponse {
  title: string;
  body: string;
}

interface Store {
  data: MockGetResponse | null;
  isLoading: boolean;
  error: Error | null;
  setData: (data: MockGetResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useStore = create<Store>()(
  devtools(set => ({
    data: null,
    isLoading: false,
    error: null,
    setData: data => set({ data }),
    setLoading: loading => set({ isLoading: loading }),
    setError: error => set({ error })
  }))
);
