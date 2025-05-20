import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import * as actions from './store/actions/auth';

import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import MarkAttendance from './components/Attendance/MarkAttendance';
import Home from './components/Home/Home';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const setMarkAttendance = useSelector((state: RootState) => state.auth.setMarkAttendance);
  
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);
  
  let routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
  
  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/login" element={<Navigate to={setMarkAttendance ? "/mark-attendance" : "/home"} replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to={setMarkAttendance ? "/mark-attendance" : "/home"} replace />} />
      </Routes>
    );
  }
  
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
};

export default App;
