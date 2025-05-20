import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ClipboardCheck, Clock, Calendar, Building } from 'lucide-react';

const Home: React.FC = () => {
  const isWFH = useSelector((state: RootState) => state.auth.isWFH);
  const setAttendanceType = useSelector((state: RootState) => state.auth.setAttendanceType);
  
  const attendanceTime = localStorage.getItem('attendance_time') || '00:00:00';
  
  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
  };
  
  const getStatusColor = () => {
    switch (setAttendanceType) {
      case 'success': return 'bg-green-100 text-green-800 border-green-500';
      case 'primary': return 'bg-blue-100 text-blue-800 border-blue-500';
      case 'danger': return 'bg-red-100 text-red-800 border-red-500';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-500';
      default: return 'bg-gray-100 text-gray-800 border-gray-500';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Dashboard</h1>
          
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                  <h2 className="text-xl font-medium text-gray-900">{getCurrentDate()}</h2>
                </div>
                <div className={`px-3 py-1 rounded-full border ${getStatusColor()}`}>
                  {setAttendanceType === 'success' ? 'Present' : 
                   setAttendanceType === 'primary' ? 'Late' : 
                   setAttendanceType === 'danger' ? 'Absent' : 'Unknown'}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Check-in Time</h3>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">{attendanceTime}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <Building className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Work Location</h3>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">{isWFH ? 'Home' : 'Office'}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <ClipboardCheck className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Work Status</h3>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">
                    {isWFH ? 'Remote' : 'On-site'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Activity</h2>
              <div className="h-64 flex items-center justify-center bg-gray-50 border border-gray-200 rounded">
                <p className="text-gray-500">Weekly activity chart would go here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;