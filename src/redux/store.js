import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk'

const reducers = combineReducers({
    auth
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);

export default store;