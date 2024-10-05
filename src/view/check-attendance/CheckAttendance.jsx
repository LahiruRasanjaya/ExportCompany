// import './CheckAttendance.css';
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { getAllEmployees, getAttendanceReportByDateRange } from '../../service/ApiServices'; // Import the necessary functions

// export function CheckAttendance() {
//     const { register, handleSubmit, setFocus, formState } = useForm();
//     const [employees, setEmployees] = useState([]);
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);
//     const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
//     const navigate = useNavigate();

//     // Fetch employees on component mount
//     useEffect(() => {
//         const fetchEmployees = async () => {
//             try {
//                 const response = await getAllEmployees();
//                 setEmployees(response.data); // Assuming response.data contains the employee list
//             } catch (error) {
//                 console.error('Error fetching employees:', error);
//             }
//         };
//         fetchEmployees();
//     }, []);

//     // Fetch attendance records for the selected employee
//     const handleAttendanceFetch = async (employeeId) => {
//         try {
//             const { startDate, endDate } = dateRange;
//             const response = await getAttendanceReportByDateRange(employeeId, startDate, endDate);
//             setAttendanceRecords(response.data); // Assuming response.data contains the attendance records
//             setSelectedEmployee(employeeId);
//         } catch (error) {
//             console.error('Error fetching attendance records:', error);
//             alert('Could not fetch attendance records. Please try again.');
//         }
//     };

//     return (
//         <div className="attendance-container">
//             {/* Left side: Employee list */}
//             <div className="employee-list">
//                 <h2>Employees</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Employee Name</th>
//                             <th>Employee ID</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {employees.map((employee) => (
//                             <tr key={employee.employeeId}>
//                                 <td>{`${employee.firstName} ${employee.secondName}`}</td>
//                                 <td>{employee.employeeId}</td>
//                                 <td>
//                                     <button onClick={() => handleAttendanceFetch(employee.employeeId)}>
//                                         View Attendance
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Right side: Attendance records */}
//             <div className="attendance-records">
//                 <h2>Attendance Records for Employee ID: {selectedEmployee}</h2>
//                 <form onSubmit={handleSubmit(() => handleAttendanceFetch(selectedEmployee))}>
//                     <label htmlFor="startDate">Start Date:</label>
//                     <input
//                         type="date"
//                         {...register('startDate', { required: true })}
//                         onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
//                     />
//                     <label htmlFor="endDate">End Date:</label>
//                     <input
//                         type="date"
//                         {...register('endDate', { required: true })}
//                         onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
//                     />
//                     <button type="submit">Fetch Attendance Records</button>
//                 </form>

//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Entry Time</th>
//                             <th>Exit Time</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {attendanceRecords.length > 0 ? (
//                             attendanceRecords.map((record) => (
//                                 <tr key={record.date}>
//                                     <td>{new Date(record.date).toLocaleDateString()}</td>
//                                     <td>{record.entryTime ? new Date(record.entryTime).toLocaleTimeString() : 'N/A'}</td>
//                                     <td>{record.exitTime ? new Date(record.exitTime).toLocaleTimeString() : 'N/A'}</td>
//                                     <td>{record.status}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4">No attendance records available.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

import './CheckAttendance.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllEmployees, getAttendanceReportByDateRange } from '../../service/ApiServices'; // Import necessary functions

export function CheckAttendance() {
    const { register, handleSubmit, setFocus, formState } = useForm({
        mode: 'onChange',
    });

    const [employees, setEmployees] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await getAllEmployees();
            setEmployees(response.data);
        };
        fetchEmployees();
    }, []);

    const handleViewAttendance = async (employeeId, employeeName) => {
        if (startDate && endDate) {
            try {
                const response = await getAttendanceReportByDateRange(employeeId, startDate, endDate);
                setAttendanceData(response.data);
                setSelectedEmployeeId(employeeId);
                setSelectedEmployeeName(employeeName);
            } catch (error) {
                alert('Error fetching attendance records: ' + error.message);
            }
        } else {
            alert('Please select both start and end dates.');
        }
    };

    return (
        <div className="check-attendance" style={{ display: 'flex', height: '100vh' }}>
            {/* Left Panel - Employee Table */}
            <div className="left-panel" style={{ width: '33%', padding: '20px', overflowY: 'auto' }}>
                <h2>Employees</h2>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.employeeId}>
                                <td>{employee.firstName} {employee.secondName}</td>
                                <td>{employee.employeeId}</td>
                                <td>
                                    <input
                                        type="date"
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleViewAttendance(employee.employeeId, `${employee.firstName} ${employee.secondName}`)}>
                                        View Attendance
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Right Panel - Attendance Records Table */}
            <div className="right-panel" style={{ width: '67%', padding: '20px', overflowY: 'auto' }}>
                <h2>Attendance Records for {selectedEmployeeName}</h2>
                {attendanceData.length > 0 ? (
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Entry Time</th>
                                <th>Exit Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((record, index) => (
                                <tr key={index}>
                                    <td>{new Date(record.date).toLocaleDateString()}</td>
                                    <td>{record.status}</td>
                                    <td>{record.entryTime ? new Date(record.entryTime).toLocaleTimeString() : 'N/A'}</td>
                                    <td>{record.exitTime ? new Date(record.exitTime).toLocaleTimeString() : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No attendance records available.</p>
                )}
            </div>
        </div>
    );
}
