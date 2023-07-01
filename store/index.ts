import { configureStore, combineReducers, CombinedState, AnyAction } from '@reduxjs/toolkit'
import profileSlice from './slice/profileSlice'
import cartSlice from './slice/cartSlice';
// ...

const combinedReducer = combineReducers({
    profile: profileSlice,
    cart: cartSlice
})

const rootReducer = (state: CombinedState<any>, action: AnyAction) => {
    if (action.type === 'RESET') {
        state = undefined;
    }

    return combinedReducer(state, action);
}
export const store = configureStore({
    reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch