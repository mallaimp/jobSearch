import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootReducer";


const Store = configureStore ({
    reducer:RootReducer
});

export default Store;
export type AppDispatch = typeof Store.dispatch;

