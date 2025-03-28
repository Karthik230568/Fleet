import { create } from 'zustand';

export const useVehicleStore = create((set) => ({
  vehicles: [],
  setVehicles: (vehicles) => set({ vehicles }),

  createProduct: async (newVehicle) => {
    if (!newVehicle.name || !newVehicle.image || !newVehicle.price) {
        return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newVehicle),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
    },
}));

export default useVehicleStore;
