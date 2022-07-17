import { configureStore } from '@reduxjs/toolkit'
import dogReducer from './dogSlice';

export default configureStore({
  reducer: dogReducer,
})
