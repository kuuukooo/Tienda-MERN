import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Por favor llena todos los campos." };
    }
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    const created = data.product ?? data.data;
    set((state) => ({ products: [...state.products, created] }));
    return { success: true, message: "Producto creado correctamente." };
  },
  fetchProducts: async () => {
    const res = await fetch(`${API_BASE_URL}/api/products`);
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    console.log("Respuesta del backend:", data);
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.product : product
      ),
    }));

    return { success: true, message: data.message };
  },
}));
