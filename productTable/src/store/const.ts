export interface Products {
    id: number;
    name: string;
    price: number;
    category: string;
}
export interface ProductsState {
    products: Products[];
    selectedCategory: null | string;
    loading: boolean;
    error: null | string;
}
