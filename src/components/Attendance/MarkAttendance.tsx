
import { RootState } from '../../store';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home, Clock } from 'lucide-react';
import * as actions from '../../store/actions/auth';
import instance from '../../services/api';
import type { AppDispatch } from '../../store';


const MarkAttendance = () => {
  const [state, setState] = useState({
    mode: 'full',
    type: 'office',
    isHalfDay: false,
    isWFH: false,
    loading: false,
    errorMsg: null,
    isOffice: 1 // Initialize office status as 1 (in-office)
  });

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // const attendanceMarked = useSelector((state: RootState) => state.auth.setMarkAttendance);
  const isWFH = useSelector((state: RootState) => state.auth.isWFH);
  const isLeaveApplied = useSelector((state: RootState) => state.auth.isLeaveApplied);
  // const workOnHoliday = useSelector((state: RootState) => state.auth.workOnHoliday);
  // const extraWorkMode = useSelector((state: RootState) => state.auth.extraWorkMode);
  // const extraWorkStatus = useSelector((state: RootState) => state.auth.extraWorkStatus);
 
  useEffect(() => {
    if (isLeaveApplied === 2) {
      setState(prev => ({ ...prev, isHalfDay: true, mode: 'half' }));
    }

    if (isWFH) {
      setState(prev => ({ ...prev, isWFH: true, type: 'out of office', isOffice: 0 }));
    }

    dispatch(actions.authMarkAttendance());
  }, [isLeaveApplied, isWFH, dispatch]);

  const handleHalfDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setState(prev => ({ 
      ...prev, 
      isHalfDay: isChecked, 
      mode: isChecked ? 'half' : 'full' 
    }));
  };

 const handleWFHChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const isChecked = e.target.checked;
    setState(prev => ({ 
      ...prev, 
      isWFH: isChecked, 
      type: isChecked ? 'out of office' : 'office',
      isOffice: isChecked ? 0 : 1
    }));
  };

  const handleSubmit = () => {
    setState(prev => ({ ...prev, loading: true }));

    const cancelLeave = isLeaveApplied === 1 ? '1' : isLeaveApplied === 2 ? '2' : '0';
    const currentDate = new Date().toString();

    const markAttendanceData = {
      mode: state.mode,
      type: state.type,
      cancel_leave: cancelLeave,
      work_holiday: 0,
      date: currentDate,
      is_office: state.isOffice // Include the office status
    };

    instance
      .post('/attendance/mark_attendance/', markAttendanceData)
      .then(() => {
        setState(prev => ({ ...prev, loading: false }));
        dispatch(actions.authMarkAttendance());
        navigate('/home');
      })
      .catch((err) => {
        setState(prev => ({
          ...prev,
          errorMsg: err.response?.data?.detail || 'An error occurred',
          loading: false
        }));
      });
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-3xl px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b p-4">
            <h2 className="text-xl font-semibold text-center text-gray-800">Mark Your Attendance</h2>
          </div>
          
          <div className="p-6">
            {state.errorMsg && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {state.errorMsg}
              </div>
            )}
            
            <div className="flex items-stretch justify-around mb-6">
              {/* WFH Option */}
              <div className="flex flex-col items-center justify-between">
                <div className="mb-3 p-4 rounded-full bg-gray-100 text-blue-500">
                  <Home size={42} />
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={state.isWFH}
                    onChange={handleWFHChange}
                  />
                  <span className="text-sm font-medium text-gray-700">Working From Home</span>
                </label>
              </div>
              
              {/* Half Day Option */}
              <div className="flex flex-col items-center justify-between">
                <div className="mb-3 p-4 rounded-full bg-gray-100 text-teal-500">
                  <Clock size={42} />
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={state.isHalfDay}
                    onChange={handleHalfDayChange}
                  />
                  <span className="text-sm font-medium text-gray-700">Mark Half Day</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-center">
          <button
            className="w-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleSubmit}
            disabled={state.loading}
          >
            {state.loading ? 'Submitting...' : 'Submit'}
          </button>
          </div>
            
            <div className="mt-6 text-center">
              <div className="text-sm text-gray-500 mb-2">
                If you're not working today, please click 'Skip' to Proceed
              </div>
              <button
                className="inline-flex items-center justify-center px-4 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;