import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import avatarReducer from './avatarSlice'
import storage from 'redux-persist/lib/storage';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
    avatar: avatarReducer,
    // add more reducers
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['avatar'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
    configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false, // Required for redux-persist
            }),
    });

export const wrapper = createWrapper(makeStore);