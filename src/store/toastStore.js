import { create } from "zustand";

import { uuid } from "../common/utils";

const toastStore = create((set, get) => ({
  notifications: [],

  // function
  /**
   * Create a new toast notification
   * @param notification notification details
   */
  add: (notification) => {
    const notifications = [
      ...get().notifications,
      { ...notification, id: uuid() },
    ];
    set((state) => ({ ...state, notifications }));
  },

  delete: (id) => {
    const notifications = get().notifications.filter(
      (notification) => notification.id !== id
    );
    set((state) => ({ ...state, notifications }));
  },
}));

export default toastStore;
