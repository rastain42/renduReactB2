import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import { useDispatch } from "react-redux";
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer, persistStore } from 'redux-persist'
import { AsyncStorage }  from 'react-native';



const reducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  version: 0,
  //...
  storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, reducers)


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
}),
});

export const persistor = persistStore(store);

export default store;



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()