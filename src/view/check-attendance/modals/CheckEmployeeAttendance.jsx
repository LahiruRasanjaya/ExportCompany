
import React, { useState, useEffect } from 'react';
import { getAllEmployees, getAttendanceReportByDateRange } from '../../../service/ApiServices'; // Adjust the import path as needed
import DatePicker from 'react-datepicker'; // Ensure you've installed this package
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker styles
import './CheckEmployeeAttendance.css';

export function CheckEmployeeAttendance() {
  const [employees, setEmployees] = useState([]); // Initialize as an empty array
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [attendanceReport, setAttendanceReport] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await getAllEmployees();
  
        // Directly set employees assuming response.data is always an array
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }
  
    fetchEmployees();
  }, []);

  // Handle employee search/filter
  const handleEmployeeSearch = (inputValue) => {
    if (Array.isArray(employees)) {
      const filtered = employees.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
          employee.employeeId.includes(inputValue)
      );
      setFilteredEmployees(filtered);
    } else {
      console.error('Employees state is not an array');
    }
  };

  // Handle selecting an employee from the dropdown
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setFilteredEmployees([]); // Clear filtered employees when one is selected
  };

  // Handle submitting to get attendance reports
  const handleSubmit = async () => {
    if (!selectedEmployee || !startDate || !endDate) {
      alert('Please select an employee and both dates.');
      return;
    }

    try {
      const attendance = await getAttendanceReportByDateRange(
        selectedEmployee._id,
        startDate.toISOString(),
        endDate.toISOString()
      );

      const allReports = attendance.data.flatMap(record => record.reports);
      setAttendanceReport(allReports); // Update attendance report
      console.log(attendance)
    } catch (error) {
      console.error('Error fetching attendance report:', error);
    }
  };

  // Function to generate the calendar days
  const generateCalendarDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const calendarDays = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null); // Empty cell
    }

    // Fill in the calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day));
    }

    return calendarDays;
  };

  // Get the current month and year
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Generate calendar days for the current month
  const calendarDays = generateCalendarDays(currentYear, currentMonth);

  // Create a map for attendance statuses
  const attendanceMap = attendanceReport.reduce((acc, report) => {
    acc[new Date(report.date).toDateString()] = report.status;
    return acc;
  }, {});

  return (
    <div className="check-attendance-container">
      <h1 className="text-3xl font-bold pb-4">Check Employee Attendance</h1>
      <div className="left-side pb-4">
        {/* Employee search input */}
        <input
          type="text"
          placeholder="Search employee by name or ID"
          onChange={(e) => handleEmployeeSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Dropdown for filtered employees */}
        {filteredEmployees.length > 0 && (
          <ul className="dropdown">
            {filteredEmployees.map((employee) => (
              <li 
                className="cursor-pointer hover:bg-cyan-700 hover:text-white"
                key={employee._id}
                onClick={() => handleEmployeeSelect(employee)}
              >
                {employee.firstName} ({employee.employeeId})
              </li>
            ))}
          </ul>
        )}

        {/* Selected employee display */}
        {selectedEmployee && (
          <div className="text-2xl font-bold pb-4 mt-4 bg-cyan-600 text-white">
            Selected Employee: {selectedEmployee.firstName} ({selectedEmployee.employeeId})
          </div>
        )}
      </div>

      <div className="right-side flex pb-4 space-x-8"> {/* Adds space between child elements */}
        {/* Date pickers for start and end date */}
        <div>
          <label className="block mb-1">Select Start Date:</label> {/* Margin bottom for spacing */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border border-gray-300 rounded p-2" // Optional styling for the DatePicker
          />
        </div>
        <div>
          <label className="block mb-1">Select End Date:</label> {/* Margin bottom for spacing */}
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border border-gray-300 rounded p-2" // Optional styling for the DatePicker
          />
        </div>
      </div>


      {/* Submit button */}
      <div>
        <button 
          onClick={handleSubmit} 
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 pb-4"
          >Submit
        </button>
      </div>

      <div className="my-4 w-full border-b-4 border-black"></div>


      {/* Calendar and table to display attendance reports */}
      {attendanceReport.length > 0 && (
        <>
          <div className="flex justify-between items-center pb-4">
            <h3 className="text-2xl font-bold">Attendance Calendar</h3>
            <h4 className="text-lg font-semibold">
              {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h4>
          </div>


          {/* Days of the Week */}
          <div className="grid grid-cols-7 gap-2 text-center font-semibold rounded-lg shadow-lg">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div key={index} className={`h-16 flex items-center justify-center border bg-orange-100`}>
                {day}
              </div>
            ))}
          </div>

          <div className="calendar grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (day) {
                const statusColor =
                  attendanceMap[day.toDateString()] === 'Present' ? 'bg-green-500' : // Use Tailwind color classes
                  attendanceMap[day.toDateString()] === 'Absent' ? 'bg-red-500' :
                  attendanceMap[day.toDateString()] === 'Server Down' ? 'bg-yellow-300' : // Use yellow for Server Down
                  'bg-transparent'; // No color if no report

                return (
                  <div
                    key={index}
                    className={`calendar-day h-16 flex items-center justify-center border ${statusColor}`}
                  >
                    {day.getDate()}
                  </div>
                );
              }
              return (
                <div key={index} className="calendar-day h-16 flex items-center justify-center border bg-transparent">
                  {/* Empty cell */}
                </div>
              );
            })}
          </div>

          {/* Legend for Color Codes */}
          <div className="mt-4 flex space-x-4 rounded-lg shadow-lg">
            <div className="flex items-center rounded-lg shadow-lg">
              <div className="w-4 h-4 bg-green-500 mr-2 rounded-lg shadow-lg"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2 rounded-lg shadow-lg"></div>
              <span>Absent</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-300 mr-2 rounded-lg shadow-lg"></div>
              <span>Server Down</span>
            </div>
          </div>
          <div className="my-4 w-full border-b-4 border-black"></div>


          <h3 className="text-3xl font-bold pb-4">Attendance Report</h3>
          <div className="flex-1 overflow-x-auto" style={{ maxHeight: '400px' }}>
            <table className="min-w-full divide-y divide-gray-300 shadow-lg rounded-lg bg-white border fixed-header-table">
              <thead className="bg-orange-100">
                <tr>
                  <th className="px-6 py-3 text-left border uppercase">Date</th>
                  <th className="px-6 py-3 text-left border uppercase">Status</th>
                  <th className="px-6 py-3 text-left border uppercase">Entry Time</th>
                  <th className="px-6 py-3 text-left border uppercase">Exit Time</th>
                  <th className="px-6 py-3 text-left border uppercase">Working Hours</th>
                  <th className="px-6 py-3 text-left border uppercase">OT Hours</th>
                </tr>
              </thead>
              {/* <tbody className="bg-white divide-y divide-gray-300 ">
                {attendanceReport.map((report) => (
                  <tr key={report.date}>
                    <td className="px-6 py-4 whitespace-nowrap border">{new Date(report.date).toDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap border">{report.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap border">{report.entryTime ? new Date(report.entryTime).toLocaleTimeString() : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap border">{report.exitTime ? new Date(report.exitTime).toLocaleTimeString() : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap border">{report.workingHours.toFixed(1) || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap border">{report.OTHours.toFixed(1) || 0}</td>
                  </tr>
                ))}
              </tbody> */}
              <tbody className="bg-white divide-y divide-gray-300 ">
                {attendanceReport.map((report) => {
                  // Determine the class based on the report status
                  let statusClass = '';
                  switch (report.status) {
                    case 'Present':
                      statusClass = 'status-present';
                      break;
                    case 'Absent':
                      statusClass = 'status-absent';
                      break;
                    case 'Server Down':
                      statusClass = 'status-server-down';
                      break;
                    default:
                      statusClass = ''; // Default class if needed
                  }

                  return (
                    <tr key={report.date}>
                      <td className="px-6 py-4 whitespace-nowrap border">{new Date(report.date).toDateString()}</td>
                      <td className={`px-6 py-4 whitespace-nowrap border ${statusClass}`}>
                        {report.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        {report.entryTime ? new Date(report.entryTime).toLocaleTimeString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        {report.exitTime ? new Date(report.exitTime).toLocaleTimeString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">{report.workingHours.toFixed(1) || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap border">{report.OTHours.toFixed(1) || 0}</td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </>
      )}
    </div>
  );
}
