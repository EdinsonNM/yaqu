import { Restaurant } from "@domain/restaurant/models/restaurant.model";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CurrentRestaurantState = {
  currentRestaurant: Restaurant | null;
  setCurrentRestaurant: (restaurant: Restaurant) => void;
  removeCurrentRestaurant: () => void;
};

const useRestaurantStore = create<CurrentRestaurantState>()(
  persist(
    (set) => ({
      currentRestaurant: null,
      setCurrentRestaurant: (restaurant: Restaurant) =>
        set({ currentRestaurant: restaurant }),
      removeCurrentRestaurant: () => set({ currentRestaurant: null }),
    }),
    {
      name: "restaurant",
    }
  )
);

export default useRestaurantStore;
