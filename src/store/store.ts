import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {configureStore} from "@reduxjs/toolkit"
import inventoryReducer from "./reducers/inventory"
import userRole from "./reducers/userRole"

export const store = configureStore({
    reducer:{
        inventory: inventoryReducer,
        userRole: userRole
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector