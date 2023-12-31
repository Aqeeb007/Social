import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};

export const postReducer = createReducer(initialState, {
    productCreateRequest: (state) => {
        state.isLoading = true;
    },
    productCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
    },
    productCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get all products of shop
    getAllProductsShopRequest: (state) => {
        state.isLoading = true;
    },
    getAllProductsShopSuccess: (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
    },
    getAllProductsShopFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // delete product of a shop
    deleteProductRequest: (state) => {
        state.isLoading = true;
    },
    deleteProductSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteProductFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // get all products
    getAllPostsRequest: (state) => {
        state.isLoading = true;
    },
    getAllPostsSuccess: (state, action) => {
        state.isLoading = false;
        state.allPosts = action.payload;
    },
    getAllPostsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
});
