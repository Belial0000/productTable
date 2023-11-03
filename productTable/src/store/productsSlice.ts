// src/store/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
export interface Products {
    id: number;
    name: string;
    price: number;
    category: string;
}
export interface ProductsState {
    products: Products[];
    filteredProducts: Products[];
    selectedCategory: null | string;
    filterByName: boolean;
    loading: boolean;
    error: null | string;
}

const initialState: ProductsState = {
    products: [],
    filteredProducts: [],
    selectedCategory: null,
    filterByName: false,
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk<Products[]>(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('http://localhost:3000/products');

        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
            const filteredProducts = state.products.filter(
                (product) => product.category === state.selectedCategory
            );
            state.filteredProducts = filteredProducts;
        },
        filterByName(state, action: PayloadAction<boolean>) {
            state.filterByName = action.payload;
            // меняем массив для фильтрации на основе того рендрится ли массив фильтрованный или массив по дефолту
            const productsData = state.selectedCategory
                ? state.filteredProducts
                : state.products;
            let filterByName = [];
            filterByName = productsData.slice().sort((a, b) => {
                if (state.filterByName ? a.name < b.name : a.name > b.name) {
                    return -1;
                }
                if (state.filterByName ? a.name > b.name : a.name < b.name) {
                    return 1;
                }
                return 0;
            });

            state.filteredProducts = filterByName;
            state.products = filterByName;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || '';
            });
    },
});

export const { setSelectedCategory, filterByName } = productSlice.actions;

export default productSlice.reducer;
