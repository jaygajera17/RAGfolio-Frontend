import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
  // Add global state slices here as the app grows
  // Example:
  // sidebarOpen: boolean;
  // toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (_set) => ({
      // Define initial state and actions here
    }),
    { name: "mmrag-app-store" }
  )
);
