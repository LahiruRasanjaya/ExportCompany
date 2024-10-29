import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { getAllEmployees, createWeeklyAttendance, getAllWeeklyAttendance, updateWeeklyAttendance } from '../../../service/ApiServices';
import './ManageDilyAttendance.css';

export function ManageDilyAttendance() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedWeekDay, setSelectedWeekDay] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    // const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState({});
    const [searchQuery, setSearchQuery] = useState(''); 

      // Weekday options (this can be dynamic or fetched if needed)
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        fetchEmployees();
        // const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        // return () => clearInterval(interval);
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await getAllEmployees();
            const result = response.data;
            setEmployees(result);

            const initialAttendance = {};
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            result.forEach(employee => {
                initialAttendance[employee._id] = {
                    date: today,
                    status: 'Present',
                    specialDate: false,
                    entryTimeMarked: false,
                    exitTimeMarked: false
                };
            });
            setAttendance(initialAttendance);
            await fetchWeeklyAttendance(initialAttendance);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeeklyAttendance = async (initialAttendance) => {
        try {
            let response = "";
            if (selectedWeekDay) {
                response = await getAllWeeklyAttendance(selectedWeekDay);
            }
            
            console.log('Response:', response);  // Log the response for debugging
    
            // Ensure attendances is an array even if response.data is undefined
            const attendances = response?.data || [];
    
            const attendanceMap = { ...initialAttendance };

            // Loop through attendances if not empty
            attendances.forEach(att => {
                if (attendanceMap[att.employee._id]) {
                    attendanceMap[att.employee._id] = {
                        date: att.date,
                        employee: att.employee._id,
                        entryTime: att.entryTime,
                        exitTime: att.exitTime,
                        status: att.status,
                        specialDate: att.specialDate,
                        _id: att._id,
                        entryTimeMarked: att.entryTimeMarked,
                        exitTimeMarked: att.exitTimeMarked
                    };
                }
            });
    
            setAttendance(attendanceMap);
        } catch (error) {
            console.error('Error fetching attendances:', error);
        }
    };
    

    const saveAttendanceToBackend = async (id, attendanceData) => {
        try {
            if (attendance[id]._id) {
                await updateWeeklyAttendance(attendance[id]._id, attendanceData);
            } else {
                const response = await createWeeklyAttendance({ ...attendanceData, employee: id, weekDay: selectedWeekDay });

                setAttendance(prev => ({
                    ...prev,
                    [id]: { ...attendanceData, _id: response.data._id }
                }));
            }
        } catch (error) {
            console.error('Error saving attendance data:', error);
        }
    };

    const handleAttendance = async (id) => {
        const selectedTime = selectedTimes[id]?.entryTime;
        console.log("___________");
        console.log(selectedTime);
        
        // Use today's date as the base date
        const now = new Date();
        const [hours, minutes] = selectedTime.split(':').map(Number);
    
        // Create a new Date object with today's date and the selected time
        const entryTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        console.log(entryTime);
    
        const updatedAttendance = {
            ...attendance[id],
            entryTime: entryTime,
            status: 'Present',
            entryTimeMarked: true
        };
    
        setAttendance(prev => ({
            ...prev,
            [id]: updatedAttendance
        }));
    
        await saveAttendanceToBackend(id, updatedAttendance);
    };


    const handleOutTime = async (id) => {
        const selectedTime = selectedTimes[id]?.exitTime;

        const now = new Date();
        const [hours, minutes] = selectedTime.split(':').map(Number);
    
        // Create a new Date object with today's date and the selected time
        const exitTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        const updatedAttendance = {
            ...attendance[id],
            exitTime: exitTime,
            exitTimeMarked: true
        };

        setAttendance(prev => ({
            ...prev,
            [id]: updatedAttendance
        }));

        setSelectedTimes ({});

        await saveAttendanceToBackend(id, updatedAttendance);
    };

    const handleXlAttendance = async (id, entryTimeXl, exitTimeXl) => {
        if (typeof entryTimeXl === 'number') {
            const totalMinutes = Math.floor(entryTimeXl * 24 * 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const now = new Date();
            const entryTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

            const totalMinutesExit = Math.floor(exitTimeXl * 24 * 60);
            const hoursexit = Math.floor(totalMinutesExit / 60);
            const minutesrxit = totalMinutesExit % 60;
            // const now = new Date();
            const exitTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hoursexit, minutesrxit);
    
            console.log(`Converted entry time: ${entryTime}`);
    
            const updatedAttendance = {
                ...attendance[id],
                entryTime: entryTime,
                exitTime: exitTime,
                exitTimeMarked: true,
                status: 'Present',
                entryTimeMarked: true,
            };
    
            // Immediately save this to the backend instead of relying on setAttendance
            await saveAttendanceToBackend(id, updatedAttendance);
    
            // Update state after saving
            setAttendance(prev => ({
                ...prev,
                [id]: updatedAttendance
            }));
            
            // handleXlOutTime(id, exitTimeXl)
            // if (exitTimeXl) {
            //     setTimeout(() => handleXlOutTime(id, exitTimeXl), 100); // Process exit time if available
            // }
             
        } else {
            console.error('Invalid entry time format:', entryTimeXl);
        }
    };
    
    // const handleXlOutTime = async (id, exitTimeXl) => {
    //     if (typeof exitTimeXl === 'number') {
    //         const totalMinutes = Math.floor(exitTimeXl * 24 * 60);
    //         const hours = Math.floor(totalMinutes / 60);
    //         const minutes = totalMinutes % 60;
    //         const now = new Date();
    //         const exitTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            
    //         console.log(`Converted exit time: ${exitTime}`);
    
    //         setAttendance(prev => {
    //             const updatedAttendance = {
    //                 ...prev[id], // Keep previous data intact, including entryTime
    //                 exitTime: exitTime,
    //                 exitTimeMarked: true,
    //             };
    //             return {
    //                 ...prev,
    //                 [id]: updatedAttendance,
    //             };
    //         });
    
    //         await saveAttendanceToBackend(id, { exitTime, exitTimeMarked: true });
    //     } else {
    //         console.error('Invalid exit time format:', exitTimeXl);
    //     }
    // };
    
    
    const markAbsent = async (id) => {
        const updatedAttendance = {
            ...attendance[id],
            status: 'Absent',
            entryTime: null,
            exitTime: null,
            entryTimeMarked: true,
            exitTimeMarked: true
        };
        setAttendance(prev => ({
            ...prev,
            [id]: updatedAttendance
        }));
        await saveAttendanceToBackend(id, updatedAttendance);
    };

    const markSpecialDate = async (id) => {
        const updatedAttendance = {
            ...attendance[id],
            specialDate: true,
            status: 'Present',
            entryTimeMarked: true,
            exitTimeMarked: true
        };
        setAttendance(prev => ({
            ...prev,
            [id]: updatedAttendance
        }));
        await saveAttendanceToBackend(id, updatedAttendance);
    };

    // const exportToExcel = () => {
    //     const data = filteredEmployees.map(emp => ({
    //         ...emp,
    //         ...attendance[emp._id]
    //     }));
    //     const ws = XLSX.utils.json_to_sheet(data);
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Attendance_Report');
    //     XLSX.writeFile(wb, 'Attendance_Report.xlsx');
    // };

    // const printTable = () => {
    //     const printWindow = window.open('', '', 'height=600,width=800');
    //     printWindow.document.write('<html><head><title>Print</title>');
    //     printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { padding: 10px; text-align: left; border: 1px solid #ddd; } th { background-color: #f4f4f4; }</style>');
    //     printWindow.document.write('</head><body >');
    //     printWindow.document.write(document.querySelector('table').outerHTML);
    //     printWindow.document.write('</body></html>');
    //     printWindow.document.close();
    //     printWindow.focus();
    //     printWindow.print();
    // };

    const getButtonClass = (enabled) => enabled ? "bg-blue-500 text-white p-2 rounded hover:bg-blue-600" : "bg-gray-400 text-white p-2 rounded cursor-not-allowed";

    const handleTimeChange = (id, type, event) => {
        const value = event.target.value;
        setSelectedTimes(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [type]: value
            }
        }));
    };

    // 2. Filtered Employees based on Search Query
    const filteredEmployees = employees.filter(emp => {
        const query = searchQuery.toLowerCase();
        return (
            emp.firstName.toLowerCase().includes(query) ||
            emp.employeeId.toLowerCase().includes(query)
        );
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please upload an Excel file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            jsonData.forEach((row, index) => {
                if (index === 0) return; // Skip the header row
                const [employeeId, EmployeeName, entryTime, exitTime, status] = row;

                const employee = employees.find(emp => emp.employeeId === employeeId);
            
            if (!employee) {
                console.warn(`Employee with ID ${employeeId} not found.`);
                return; // Skip if employee is not found
            }
            
            const { _id } = employee;

                if (status === 'Present') {
                    // if (entryTime) handleXlAttendance(employeeId, formatTime(entryTime));
                    // if (exitTime) handleXlOutTime(employeeId, formatTime(exitTime));
                    if (entryTime) handleXlAttendance(_id, entryTime, exitTime);
                    // if (exitTime) handleXlOutTime(employeeId, exitTime);
                } else if (status === 'Absent') {
                    markAbsent(employeeId);
                } else {
                    markSpecialDate(employeeId);
                }
            });
        };
        reader.readAsArrayBuffer(selectedFile);
    };
    
    //   // Function to fetch weekly attendance
    // const fetchWeeklyAttendance = async () => {
    //     if (selectedWeekDay) {
    //     const data = await getAllWeeklyAttendance(selectedWeekDay);
    //     setAttendanceData(data);
    //     setIsSubmitted(true); // Indicate that the form is submitted
    //     }
    // };

    // Function to handle day selection
    const handleWeekDayChange = (e) => {
        setSelectedWeekDay(e.target.value);
    };
        
    return (
        <div className="p-4 flex">
            {/* Main Content */}
            <div className="flex-1 p-4 ">
                <h1 className="text-3xl font-bold pb-4">Manage Employee Attendances</h1>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        <label className="text-2xl font-bold pb-4" htmlFor="weekday">Select Week Day:</label>
                        <select
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            id="weekday"
                            value={selectedWeekDay}
                            onChange={handleWeekDayChange}
                        >
                        <option value="" disabled>Select a day</option>
                            {weekDays.map((day) => (
                        <option key={day} value={day}>{day}</option>
                        ))}
                        </select>
                        <button
                            onClick={() => fetchWeeklyAttendance(attendance)}
                            disabled={!selectedWeekDay}
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                            >
                            Submit
                        </button>
                    </div>
                    
                    <div className="mx-4 h-16 border-l-4 border-black"></div>
                    
                    {/* Right Section */}
                    <div className="flex space-x-2">
                        <div>
                            <label className="text-2xl font-bold pb-4" htmlFor="weekday">Select xl:</label>
                        </div>
                        <div>
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                            Submit Attendance
                            </button>

                        </div>
                        
                    </div>
                </div>

                {/* 3. Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by Employee Name or ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Table */}
                <div className="flex-1 overflow-x-auto" style={{ maxHeight: '400px' }}>
                    <table className="min-w-full divide-y divide-gray-300 shadow-lg rounded-lg bg-white border fixed-header-table">
                        <thead className="bg-orange-100">
                            <tr>
                                <th className="px-6 py-3 text-left border uppercase">Employee Id</th>
                                <th className="px-6 py-3 text-left border uppercase">Employee Name</th>
                                <th className="px-6 py-3 text-left border uppercase">Date</th>
                                <th className="px-6 py-3 text-left border uppercase">Entry Time</th>
                                <th className="px-6 py-3 text-left border uppercase">Exit Time</th>
                                <th className="px-6 py-3 text-left border uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-300 ">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : (
                                filteredEmployees.length > 0 ? (
                                    filteredEmployees.map(emp => (
                                        <tr
                                            key={emp._id}
                                            className={`${
                                                attendance[emp._id]?.status === 'Absent' ? 'absent-row' : ''
                                            } ${
                                                attendance[emp._id]?.specialDate === true ? 'specialDate-row' : ''
                                            }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap border">{emp.employeeId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border">{emp.firstName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border">
                                                {attendance[emp._id]?.date ? new Date(attendance[emp._id].date).toLocaleDateString() : ''}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap border">
                                                {!attendance[emp._id]?.entryTimeMarked ? (
                                                    <input
                                                        type="time"
                                                        value={selectedTimes[emp._id]?.entryTime || ''}
                                                        onChange={(e) => handleTimeChange(emp._id, 'entryTime', e)}
                                                    />
                                                ) : (
                                                    attendance[emp._id]?.entryTime ? new Date(attendance[emp._id].entryTime).toLocaleTimeString() : ''
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap border">
                                                {!attendance[emp._id]?.exitTimeMarked ? (
                                                    <input
                                                        type="time"
                                                        value={selectedTimes[emp._id]?.exitTime || ''}
                                                        onChange={(e) => handleTimeChange(emp._id, 'exitTime', e)}
                                                    />
                                                ) : (
                                                    attendance[emp._id]?.exitTime ? new Date(attendance[emp._id].exitTime).toLocaleTimeString() : ''
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap border">
                                                {!attendance[emp._id]?.entryTimeMarked ? (
                                                    <button
                                                        onClick={() => handleAttendance(emp._id)}
                                                        className={getButtonClass(selectedTimes[emp._id]?.entryTime)}
                                                        disabled={!selectedTimes[emp._id]?.entryTime}
                                                    >
                                                        Mark Present
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleOutTime(emp._id)}
                                                        className={getButtonClass(selectedTimes[emp._id]?.exitTime)}
                                                        disabled={!selectedTimes[emp._id]?.exitTime}
                                                    >
                                                        Mark Out
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => markAbsent(emp._id)}
                                                    disabled={attendance[emp._id]?.status === 'Absent' }
                                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-2"
                                                >
                                                    Mark Absent
                                                </button>
                                                <button
                                                    onClick={() => markSpecialDate(emp._id)}
                                                    disabled={attendance[emp._id]?.status === 'Absent'}
                                                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 ml-2"
                                                >
                                                    Mark Special Date
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">No employees found.</td>
                                    </tr>
                                )
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}