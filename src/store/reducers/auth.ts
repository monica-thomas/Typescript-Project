import * as actionTypes from '../actions/actionTypes';
import { AuthState } from '../../types';

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  userId: null,
  setMarkAttendance: null,
  isWFH: false,
  extraWorkMode: 0,
  extraWorkApproved: false,
  setAttendanceType: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  isSignedIn: false,
  hasUnappliedLeave: false,
  pendingWeeklyPlan: false,
  projectWeeklyStatus: [],
  isLeaveApplied: 0,        // <-- Add this
  workOnHoliday: 0,
  extraWorkStatus:false     // <-- And this
};

const updateObject = <T extends object, U extends object>(oldObject: T, updatedProperties: U): T & U => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

const authStart = (state: AuthState, action: any): AuthState => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: AuthState, action: any): AuthState => {
  return updateObject(state, {
    token: action.accessToken,
    userId: action.userId,
    error: null,
    loading: false,
    isSignedIn: true,
    isAuthenticated: true
  });
};

const authFail = (state: AuthState, action: any): AuthState => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state: AuthState, action: any): AuthState => {
  return updateObject(state, { 
    token: null, 
    userId: null,
    isSignedIn: false,
    isAuthenticated: false
  });
};

const setAuthRedirectPath = (state: AuthState, action: any): AuthState => {
  return updateObject(state, { authRedirectPath: action.path });
};

const authSuccessMarkAttendance = (state: AuthState, action: any): AuthState => {
  return updateObject(state, { 
    setMarkAttendance: action.setMarkAttendance, 
    isWFH: action.isWFH, 
    extraWorkMode: action.extraWorkMode, 
    projectWeeklyStatus: action.projectWeeklyStatus, 
    extraWorkApproved: action.extraWorkApproved, 
    setAttendanceType: action.setAttendanceType,
    isLeaveApplied: action.isLeaveApplied, 
    workOnHoliday: action.workOnHoliday,
    hasUnappliedLeave: action.hasUnappliedLeave, 
    pendingWeeklyPlan: action.pendingWeeklyPlan, 
    extraWorkStatus: action.extraWorkStatus
  });
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    case actionTypes.AUTH_MARK_ATTENDANCE: return authSuccessMarkAttendance(state, action);
    default: return state;
  }
};

export default authReducer;