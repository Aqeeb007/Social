import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js";
import { postReducer } from "./reducers/post.js";




const Store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,

    },
});

export default Store;
