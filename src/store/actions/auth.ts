import * as actionTypes from './actionTypes';
import instance from '../../services/api';
import { encodeToBase64, calculateExpirationDate } from '../../utils/authUtils';
import { AppDispatch } from '../index'; // ✅ Adjust the path if needed

// Auth action creators
export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token: string, userId: string | null) => ({
  type: actionTypes.AUTH_SUCCESS,
  accessToken: token,
  userId: userId
});

export const authFail = (error: string | null) => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const logout = () => {
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token');
  localStorage.removeItem('attendance_time');
  localStorage.removeItem('stored_attendanceType');
  localStorage.removeItem('isSemiCircle');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: AppDispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authSuccessMarkAttendance = (
  setMarkAttendance: boolean | null,
  isWFH: boolean | null,
  setAttendanceType: string | null,
  isLeaveApplied: boolean | null,
  workOnHoliday: boolean | null,
  hasUnappliedLeave: boolean | null,
  pendingWeeklyPlan: boolean | null,
  extraWorkApproved: boolean | null,
  extraWorkStatus: boolean | null,
  extraWorkMode: number | null,
  projectWeeklyStatus: any[] | null
) => ({
  type: actionTypes.AUTH_MARK_ATTENDANCE,
  setMarkAttendance,
  isWFH,
  extraWorkMode,
  projectWeeklyStatus,
  extraWorkApproved,
  setAttendanceType,
  isLeaveApplied,
  workOnHoliday,
  hasUnappliedLeave,
  pendingWeeklyPlan,
  extraWorkStatus
});

export const authMarkAttendance = (token?: string, userId?: string | null) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await instance.get('/attendance/display_attendance/');
      const data = response.data;

      const setMarkAttendance = data.mark_attendance_status === 0;
      const isWFH = data.is_office === 0? true:false;
      const extraWorkApproved = data.extra_work_approved === 1;
      const extraWorkStatus = data.extra_work_status === 1;
      const extraWorkMode = data.extra_work_mode;
      const projectWeeklyStatus = data.project_weekly_status;

      let isSemiCircle = false;
      const currentTime = new Date();
      const shiftTime = data.shift_start
        ? new Date(`${new Date().toDateString()} ${data.shift_start}`)
        : null;

      const setAttendanceType =
        data.leave_status === 1
          ? 'amazon'
          : data.leave_status === 0.5 || data.leave_status === '0.5'
            ? (() => {
                isSemiCircle = true;
                return data.mark_attendance_type === 1
                  ? 'success'
                  : data.mark_attendance_type === 2
                    ? 'primary'
                    : 'white';
              })()
            : data.leave_status === 0
              ? (shiftTime && shiftTime > currentTime)
                ? data.mark_attendance_type === 1
                  ? 'success'
                  : data.mark_attendance_type === 2
                    ? 'primary'
                    : 'white'
                : data.mark_attendance_type === 1
                  ? 'success'
                  : data.mark_attendance_type === 2
                    ? 'primary'
                    : 'danger'
              : 'danger';

      localStorage.setItem('stored_attendanceType', setAttendanceType);
      localStorage.setItem('isSemiCircle', isSemiCircle.toString());

      const isLeaveApplied = data.leaves_applied;
      const workOnHoliday = data.work_on_holiday;
      const hasUnappliedLeave = data.unapplied_leave;
      const pendingWeeklyPlan = data.pending_weekly_plan;

      dispatch(
        authSuccessMarkAttendance(
          setMarkAttendance,
          isWFH,
          setAttendanceType,
          isLeaveApplied,
          workOnHoliday,
          hasUnappliedLeave,
          pendingWeeklyPlan,
          extraWorkApproved,
          extraWorkStatus,
          extraWorkMode,
          projectWeeklyStatus
        )
      );

      if (token) {
        dispatch(authSuccess(token, userId || null));
      }
    } catch (err) {
      dispatch(
        authSuccessMarkAttendance(
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        )
      );
      if (token) {
        dispatch(authSuccess(token, userId || null));
      }
    }
  };
};

export const auth = (username: string, password: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(authStart());

    const authData = {
      username,
      password: encodeToBase64(password),
      returnSecureToken: true
    };

    const rememberme = localStorage.getItem('rememberme') === 'true';

    if (rememberme) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    } else {
      localStorage.setItem('username', '');
      localStorage.setItem('password', '');
    }

    instance
      .post('/auth/login/', authData)
      .then(response => {
        dispatch(authMarkAttendance(response.data.access_token, null));

        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        const expirationDate = calculateExpirationDate(28800);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(checkAuthTimeout(28800));
      })
      .catch(err => {
        dispatch(authFail(err.response?.data?.detail || 'Authentication failed'));
        setTimeout(() => dispatch(authFail(null)), 8000);
      });
  };
};

export const setAuthRedirectPath = (path: string) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
});

export const authCheckState = () => {
  return (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = localStorage.getItem('expirationDate');
      if (expirationDate && new Date(expirationDate) <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, null));
        if (expirationDate) {
          const expiryTime =
            (new Date(expirationDate).getTime() - new Date().getTime()) / 1000;
          dispatch(checkAuthTimeout(expiryTime));
        }
      }
    }
  };
};
