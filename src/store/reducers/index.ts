import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.ts';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
