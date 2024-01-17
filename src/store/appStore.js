import { persist } from "zustand/middleware";
import { create } from "zustand";

import { storeName } from "../common/utils";

const appStore = create(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      refresh_token: null,
      token: null,

      setUser: (data) => {
        set((state) => ({ ...state, ...data }));
      },

      setIsLogin: (mode) => set((state) => ({ ...state, isLogin: mode })),

      logout: () => {
        set((state) => ({
          ...state,
          token: null,
          refresh_token: null,
          user: null,
          expires_at: 0,
          isLogin: false,
        }));

        return true;
      },
    }),
    { name: storeName("user"), version: 1 }
  )
);

export default appStore;
