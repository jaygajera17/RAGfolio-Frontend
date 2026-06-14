import { create } from "zustand";
import { devtools } from "zustand/middleware";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppState {
  // Add global state slices here as the app grows
  // Example:
  // sidebarOpen: boolean;
  // toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    () => ({
      // Define initial state and actions here
    }),
    { name: "app-store" }
  )
);
