import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
    compose
} from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import thunk from 'redux-thunk'
import storage from "redux-persist/lib/storage";

import brands from "./../store/reducers/brands";
import products from "./../store/reducers/products";
import collections from "./../store/reducers/collections";
import attributes from "./../store/reducers/attributes";
import menus from "./../store/reducers/menus"
import orders from "./../store/reducers/OrderReducers/orders";
import customers from "./../store/reducers/customers";
import auth from "./../store/reducers/AuthReducer/auth";
import {applyMiddleware} from "redux";
import modules from "./reducers/modules"
import users from "./reducers/users"
import roles from "./reducers/roles"
import reviews from "./reducers/reviews"
import questions from "./reducers/questions"
import banners from "./reducers/banners"
import variants from "./reducers/variants"

const persistConfig = {
    key: "root",
    storage,
};
const reducers=combineReducers({
    brands:brands,
    collections:collections,
    attributes:attributes,
    products:products,
    menus:menus,
    orders:orders,
    customers:customers,
    auth:auth,
    modules:modules,
    users:users,
    roles:roles,
    reviews:reviews,
    questions:questions,
    banners:banners,
    variants:variants,
})
const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    },
    composeEnhancers(applyMiddleware(thunk))),
});

export default store;
