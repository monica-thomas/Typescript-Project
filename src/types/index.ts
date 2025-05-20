// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  userId: string | null;
  loading: boolean;
  error: string | null;
  isSignedIn: boolean;
  setMarkAttendance: boolean | null;
  extraWorkMode: number;
  extraWorkApproved: boolean;
  setAttendanceType: string | null;
  isWFH: boolean;
  isLeaveApplied: number;       // Assuming values like 0, 1, 2
  workOnHoliday: number; 
  hasUnappliedLeave: boolean;
  pendingWeeklyPlan: boolean;
  projectWeeklyStatus: any[];
  extraWorkStatus: boolean;     // Assuming values like 0, 1, 2
}

// Attendance types
export interface AttendanceData {
  mode: string;
  type: string;
  cancel_leave?: string;
  work_holiday?: number;
  date: string;
}