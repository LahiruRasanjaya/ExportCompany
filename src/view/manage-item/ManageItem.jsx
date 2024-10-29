import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { getAllEmployees, createAttendance, getAllAttendances, updateAttendance } from '../../service/ApiServices';
import './ManageItem.css';

export function ManageItem() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState({});
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        fetchEmployees();
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
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
            await fetchAttendances(initialAttendance);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendances = async (initialAttendance) => {
        try {
            const response = await getAllAttendances();
            const attendances = response.data;
            const attendanceMap = { ...initialAttendance };

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
                await updateAttendance(attendance[id]._id, attendanceData);
            } else {
                const response = await createAttendance({ ...attendanceData, employee: id });

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
                exitTime: exitTime || null,
                exitTimeMarked: true,
                status: 'Present',
                entryTimeMarked: !!exitTime,
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
    
    //         const updatedAttendance = {
    //             ...attendance[id],
    //             exitTime: exitTime,
    //             exitTimeMarked: true,
    //         };
    
    //         // Immediately save this to the backend
    //         await saveAttendanceToBackend(id, updatedAttendance);
    
    //         // Update state after saving
    //         setAttendance(prev => ({
    //             ...prev,
    //             [id]: updatedAttendance
    //         }));

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

    const exportToExcel = () => {
        const data = filteredEmployees.map(emp => ({
            ...emp,
            ...attendance[emp._id]
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance_Report');
        XLSX.writeFile(wb, 'Attendance_Report.xlsx');
    };

    const printTable = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { padding: 10px; text-align: left; border: 1px solid #ddd; } th { background-color: #f4f4f4; }</style>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(document.querySelector('table').outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

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

                            // Find the employee object based on employeeId (like EMP0001)
            const employee = employees.find(emp => emp.employeeId === employeeId);
            
            if (!employee) {
                console.warn(`Employee with ID ${employeeId} not found.`);
                return; // Skip if employee is not found
            }
            
            const { _id } = employee;

                           // if (exitTimeXl) {
            //     setTimeout(() => handleXlOutTime(id, exitTimeXl), 100); // Process exit time if available
            // }

                if (status === 'Present') {
                    // if (entryTime) handleXlAttendance(employeeId, formatTime(entryTime));
                    // if (exitTime) handleXlOutTime(employeeId, formatTime(exitTime));
                    if (entryTime) handleXlAttendance(_id, entryTime, exitTime);
                    // if (exitTime) {
                    //     setTimeout(() => handleXlOutTime(employeeId, exitTime), 1000);
                    // }
                } else if (status === 'Absent') {
                    markAbsent(employeeId);
                } else {
                    markSpecialDate(employeeId);
                }
            });
        };
        reader.readAsArrayBuffer(selectedFile);
    };
    
    return (
        <div className="p-4 flex">
            {/* Sidebar */}
            <aside className="w-64 p-4 fixed left-0 h-full bg-orange-100 rounded-lg shadow-lg" style={{ maxHeight: '400px' }}>
                <h2 className="text-2xl text-blue-700 font-bold pb-4">Date & Time</h2>
                <div className="mb-4">
                    <span className="text-lg pb-4">Current Time:</span>
                    <div className="text-xl font-bold">{currentTime.toLocaleTimeString()}</div>
                </div>
                <div>
                    <span className="text-lg">Current Date:</span>
                    <div className="text-xl font-bold">{currentTime.toLocaleDateString()}</div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-4 ml-64">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        <button
                            onClick={exportToExcel}
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            Export to Excel
                        </button>
                        <button
                            onClick={printTable}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Print
                        </button>
                    </div>
                </div>

                <h1 className="text-2xl font-bold pb-4">Daily Attendance Management</h1>
                 <div className="mb-4">
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Submit Attendance
                    </button>
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

   // const handleXlAttendance = async (id, entryTimeXl, exitTimeXl) => {
    //     // If the time is a decimal (like 0.354166666666667), convert it to hours and minutes
    //     if (typeof entryTimeXl === 'number') {
    //         const totalMinutes = Math.floor(entryTimeXl * 24 * 60); // Convert days to minutes
    //         const hours = Math.floor(totalMinutes / 60);
    //         const minutes = totalMinutes % 60;
    
    //         // Get today's date
    //         const now = new Date();
    //         // Create a new Date object with today's date and the extracted time
    //         const entryTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            
    //         console.log(`Converted entry time: ${entryTime}`); // Log the converted time
    
    //         const updatedAttendance = {
    //             ...attendance[id],
    //             entryTime: entryTime,
    //             status: 'Present',
    //             entryTimeMarked: true,
    //         };
    
    //         setAttendance(prev => ({
    //             ...prev,
    //             [id]: updatedAttendance,
    //         }));
    
    //         await saveAttendanceToBackend(id, updatedAttendance);
    //         if (exitTimeXl) handleXlOutTime(id, exitTimeXl);
    //     } else {
    //         console.error('Invalid entry time format:', entryTimeXl);
    //     }
    // };
    

    // const handleXlOutTime = async (id, exitTimeXl) => {
    //     // If the time is a decimal (like 0.354166666666667), convert it to hours and minutes
    //     if (typeof exitTimeXl === 'number') {
    //         const totalMinutes = Math.floor(exitTimeXl * 24 * 60); // Convert days to minutes
    //         const hours = Math.floor(totalMinutes / 60);
    //         const minutes = totalMinutes % 60;
    
    //         // Get today's date
    //         const now = new Date();
    //         // Create a new Date object with today's date and the extracted time
    //         const exitTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            
    //         console.log(`Converted exit time: ${exitTime}`); // Log the converted time for debugging
    
    //         const updatedAttendance = {
    //             ...attendance[id],
    //             exitTime: exitTime,
    //             exitTimeMarked: true,
    //         };
    
    //         setAttendance(prev => ({
    //             ...prev,
    //             [id]: updatedAttendance,
    //         }));
    
    //         await saveAttendanceToBackend(id, updatedAttendance);
    //     } else {
    //         console.error('Invalid exit time format:', exitTimeXl);
    //     }
    // };

    // const handleXlAttendance = async (id, entryTimeXl, exitTimeXl) => {
    //     if (typeof entryTimeXl === 'number') {
    //         const totalMinutes = Math.floor(entryTimeXl * 24 * 60);
    //         const hours = Math.floor(totalMinutes / 60);
    //         const minutes = totalMinutes % 60;
    //         const now = new Date();
    //         const entryTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            
    //         console.log(`Converted entry time: ${entryTime}`);

    //         let updatedAttendance ={};
    //         setAttendance(prev => {
    //             updatedAttendance = {
    //                 ...prev[id],
    //                 entryTime: entryTime,
    //                 status: 'Present',
    //                 entryTimeMarked: true,
    //             };
    //             return {
    //                 ...prev,
    //                 [id]: updatedAttendance,
    //             };
    //         });
    
    //         // await saveAttendanceToBackend(id, { entryTime, status: 'Present', entryTimeMarked: true });
    //         await saveAttendanceToBackend(id, updatedAttendance);
            
    //         if (exitTimeXl) handleXlOutTime(id, exitTimeXl);
    //     } else {
    //         console.error('Invalid entry time format:', entryTimeXl);
    //     }
    // };
    
    // const handleXlOutTime = async (id, exitTimeXl) => {
    //     if (typeof exitTimeXl === 'number') {
    //         const totalMinutes = Math.floor(exitTimeXl * 24 * 60);
    //         const hours = Math.floor(totalMinutes / 60);
    //         const minutes = totalMinutes % 60;
    //         const now = new Date();
    //         const exitTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            
    //         console.log(`Converted exit time: ${exitTime}`);

    //         let updatedAttendance ={};
    //         setAttendance(prev => {
    //             updatedAttendance = {
    //                 ...prev[id], // Keep previous data intact, including entryTime
    //                 exitTime: exitTime,
    //                 exitTimeMarked: true,
    //             };
    //             return {
    //                 ...prev,
    //                 [id]: updatedAttendance,
    //             };
    //         });
    
    //         // await saveAttendanceToBackend(id, { exitTime, exitTimeMarked: true });
    //         await saveAttendanceToBackend(id, updatedAttendance);
    //     } else {
    //         console.error('Invalid exit time format:', exitTimeXl);
    //     }
    // };

// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import { getAllEmployees, createAttendance, getAllAttendances, updateAttendance } from '../../service/ApiServices';
// import './ManageItem.css';

// export function ManageItem() {
//     // const [employees, setEmployees] = useState([]);
//     // const [attendance, setAttendance] = useState({});
//     // const [loading, setLoading] = useState(false);
//     // const [currentTime, setCurrentTime] = useState(new Date());
//     // const [selectedTimes, setSelectedTimes] = useState({});
//     // const [searchQuery, setSearchQuery] = useState(''); // 1. Search State
//     const [employees, setEmployees] = useState([]);
//     const [attendance, setAttendance] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [currentTime, setCurrentTime] = useState(new Date());
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [selectedTimes, setSelectedTimes] = useState({});
//     const [searchQuery, setSearchQuery] = useState(''); 

//     useEffect(() => {
//         fetchEmployees();
//         const interval = setInterval(() => setCurrentTime(new Date()), 1000);
//         return () => clearInterval(interval);
//     }, []);

//     const fetchEmployees = async () => {
//         setLoading(true);
//         try {
//             const response = await getAllEmployees();
//             const result = response.data;
//             setEmployees(result);

//             const initialAttendance = {};
//             const today = new Date();
//             today.setHours(0, 0, 0, 0);
//             result.forEach(employee => {
//                 initialAttendance[employee._id] = {
//                     date: today,
//                     status: 'Present',
//                     specialDate: false,
//                     entryTimeMarked: false,
//                     exitTimeMarked: false
//                 };
//             });
//             setAttendance(initialAttendance);
//             await fetchAttendances(initialAttendance);
//         } catch (error) {
//             console.error('Error fetching employees:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchAttendances = async (initialAttendance) => {
//         try {
//             const response = await getAllAttendances();
//             const attendances = response.data;
//             const attendanceMap = { ...initialAttendance };

//             attendances.forEach(att => {
//                 if (attendanceMap[att.employee._id]) {
//                     attendanceMap[att.employee._id] = {
//                         date: att.date,
//                         employee: att.employee._id,
//                         entryTime: att.entryTime,
//                         exitTime: att.exitTime,
//                         status: att.status,
//                         specialDate: att.specialDate,
//                         _id: att._id,
//                         entryTimeMarked: att.entryTimeMarked,
//                         exitTimeMarked: att.exitTimeMarked
//                     };
//                 }
//             });

//             setAttendance(attendanceMap);
//         } catch (error) {
//             console.error('Error fetching attendances:', error);
//         }
//     };

//     const saveAttendanceToBackend = async (id, attendanceData) => {
//         try {
//             if (attendance[id]._id) {
//                 await updateAttendance(attendance[id]._id, attendanceData);
//             } else {
//                 const response = await createAttendance({ ...attendanceData, employee: id });

//                 setAttendance(prev => ({
//                     ...prev,
//                     [id]: { ...attendanceData, _id: response.data._id }
//                 }));
//             }
//         } catch (error) {
//             console.error('Error saving attendance data:', error);
//         }
//     };

//     const handleAttendance = async (id) => {
//         const selectedTime = selectedTimes[id]?.entryTime;
//         console.log("___________");
//         console.log(selectedTime);
        
//         // Use today's date as the base date
//         const now = new Date();
//         const [hours, minutes] = selectedTime.split(':').map(Number);
    
//         // Create a new Date object with today's date and the selected time
//         const entryTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
//         console.log(entryTime);
    
//         const updatedAttendance = {
//             ...attendance[id],
//             entryTime: entryTime,
//             status: 'Present',
//             entryTimeMarked: true
//         };
    
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
    
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const handleOutTime = async (id) => {
//         const selectedTime = selectedTimes[id]?.exitTime;

//         const now = new Date();
//         const [hours, minutes] = selectedTime.split(':').map(Number);
    
//         // Create a new Date object with today's date and the selected time
//         const exitTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

//         const updatedAttendance = {
//             ...attendance[id],
//             exitTime: exitTime,
//             exitTimeMarked: true
//         };

//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));

//         setSelectedTimes ({});

//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markAbsent = async (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             status: 'Absent',
//             entryTime: null,
//             exitTime: null,
//             entryTimeMarked: true,
//             exitTimeMarked: true
//         };
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markSpecialDate = async (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             specialDate: true,
//             status: 'Present',
//             entryTimeMarked: true,
//             exitTimeMarked: true
//         };
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const exportToExcel = () => {
//         const data = filteredEmployees.map(emp => ({
//             ...emp,
//             ...attendance[emp._id]
//         }));
//         const ws = XLSX.utils.json_to_sheet(data);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Attendance_Report');
//         XLSX.writeFile(wb, 'Attendance_Report.xlsx');
//     };

//     const printTable = () => {
//         const printWindow = window.open('', '', 'height=600,width=800');
//         printWindow.document.write('<html><head><title>Print</title>');
//         printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { padding: 10px; text-align: left; border: 1px solid #ddd; } th { background-color: #f4f4f4; }</style>');
//         printWindow.document.write('</head><body >');
//         printWindow.document.write(document.querySelector('table').outerHTML);
//         printWindow.document.write('</body></html>');
//         printWindow.document.close();
//         printWindow.focus();
//         printWindow.print();
//     };

//     const getButtonClass = (enabled) => enabled ? "bg-blue-500 text-white p-2 rounded hover:bg-blue-600" : "bg-gray-400 text-white p-2 rounded cursor-not-allowed";

//     const handleTimeChange = (id, type, event) => {
//         const value = event.target.value;
//         setSelectedTimes(prev => ({
//             ...prev,
//             [id]: {
//                 ...prev[id],
//                 [type]: value
//             }
//         }));
//     };

//     // 2. Filtered Employees based on Search Query
//     const filteredEmployees = employees.filter(emp => {
//         const query = searchQuery.toLowerCase();
//         return (
//             emp.firstName.toLowerCase().includes(query) ||
//             emp.employeeId.toLowerCase().includes(query)
//         );
//     });

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         setSelectedFile(file);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!selectedFile) {
//             alert('Please upload an Excel file');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const data = new Uint8Array(event.target.result);
//             const workbook = XLSX.read(data, { type: 'array' });
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];
//             const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//             jsonData.forEach((row, index) => {
//                 if (index === 0) return; // Skip the header row
//                 const [employeeId, entryTime, exitTime, status] = row;

//                 if (status === 'present') {
//                     if (entryTime) handleAttendance(employeeId, entryTime);
//                     if (exitTime) handleOutTime(employeeId, exitTime);
//                 } else if (status === 'absent') {
//                     markAbsent(employeeId);
//                 } else {
//                     markSpecialDate(employeeId);
//                 }
//             });
//         };
//         reader.readAsArrayBuffer(selectedFile);
//     };

//     return (
//         <div className="p-4 flex">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-200 p-4 fixed left-0 h-full" style={{ maxHeight: '400px' }}>
//                 <h2 className="text-xl font-bold mb-4">Date & Time</h2>
//                 <div className="mb-4">
//                     <span className="text-lg">Current Time:</span>
//                     <div className="text-xl font-bold">{currentTime.toLocaleTimeString()}</div>
//                 </div>
//                 <div>
//                     <span className="text-lg">Current Date:</span>
//                     <div className="text-xl font-bold">{currentTime.toLocaleDateString()}</div>
//                 </div>
//             </aside>

//             {/* Main Content */}
//             <div className="flex-1 p-4 ml-64">
//                 <div className="flex justify-between items-center mb-4">
//                     <div className="flex space-x-2">
//                         <button
//                             onClick={exportToExcel}
//                             className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
//                         >
//                             Export to Excel
//                         </button>
//                         <button
//                             onClick={printTable}
//                             className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                         >
//                             Print
//                         </button>
//                     </div>
//                 </div>

//                 <h1 className="text-2xl font-bold pb-4">Manage Items</h1>
//                  <div className="mb-4">
//                     <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
//                     <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//                         Submit Attendance
//                     </button>
//                 </div>

//                 {/* 3. Search Input */}
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         placeholder="Search by Employee Name or ID"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded"
//                     />
//                 </div>

//                 {/* Table */}
//                 <div className="flex-1 overflow-x-auto" style={{ maxHeight: '400px' }}>
//                     <table className="min-w-full divide-y divide-gray-300 shadow-lg rounded-lg bg-white border fixed-header-table">
//                         <thead className="bg-orange-100">
//                             <tr>
//                                 <th className="px-6 py-3 text-left border uppercase">Employee Id</th>
//                                 <th className="px-6 py-3 text-left border uppercase">Employee Name</th>
//                                 <th className="px-6 py-3 text-left border uppercase">Date</th>
//                                 <th className="px-6 py-3 text-left border uppercase">Entry Time</th>
//                                 <th className="px-6 py-3 text-left border uppercase">Exit Time</th>
//                                 <th className="px-6 py-3 text-left border uppercase">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-300 ">
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="6" className="text-center py-4">Loading...</td>
//                                 </tr>
//                             ) : (
//                                 filteredEmployees.length > 0 ? (
//                                     filteredEmployees.map(emp => (
//                                         <tr
//                                             key={emp._id}
//                                             className={`${
//                                                 attendance[emp._id]?.status === 'Absent' ? 'absent-row' : ''
//                                             } ${
//                                                 attendance[emp._id]?.specialDate === true ? 'specialDate-row' : ''
//                                             }`}
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap border">{emp.employeeId}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap border">{emp.firstName}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap border">
//                                                 {attendance[emp._id]?.date ? new Date(attendance[emp._id].date).toLocaleDateString() : ''}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap border">
//                                                 {!attendance[emp._id]?.entryTimeMarked ? (
//                                                     <input
//                                                         type="time"
//                                                         value={selectedTimes[emp._id]?.entryTime || ''}
//                                                         onChange={(e) => handleTimeChange(emp._id, 'entryTime', e)}
//                                                     />
//                                                 ) : (
//                                                     attendance[emp._id]?.entryTime ? new Date(attendance[emp._id].entryTime).toLocaleTimeString() : ''
//                                                 )}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap border">
//                                                 {!attendance[emp._id]?.exitTimeMarked ? (
//                                                     <input
//                                                         type="time"
//                                                         value={selectedTimes[emp._id]?.exitTime || ''}
//                                                         onChange={(e) => handleTimeChange(emp._id, 'exitTime', e)}
//                                                     />
//                                                 ) : (
//                                                     attendance[emp._id]?.exitTime ? new Date(attendance[emp._id].exitTime).toLocaleTimeString() : ''
//                                                 )}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap border">
//                                                 {!attendance[emp._id]?.entryTimeMarked ? (
//                                                     <button
//                                                         onClick={() => handleAttendance(emp._id)}
//                                                         className={getButtonClass(selectedTimes[emp._id]?.entryTime)}
//                                                         disabled={!selectedTimes[emp._id]?.entryTime}
//                                                     >
//                                                         Mark Present
//                                                     </button>
//                                                 ) : (
//                                                     <button
//                                                         onClick={() => handleOutTime(emp._id)}
//                                                         className={getButtonClass(selectedTimes[emp._id]?.exitTime)}
//                                                         disabled={!selectedTimes[emp._id]?.exitTime}
//                                                     >
//                                                         Mark Out
//                                                     </button>
//                                                 )}
//                                                 <button
//                                                     onClick={() => markAbsent(emp._id)}
//                                                     disabled={attendance[emp._id]?.status === 'Absent' }
//                                                     className="bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-2"
//                                                 >
//                                                     Mark Absent
//                                                 </button>
//                                                 <button
//                                                     onClick={() => markSpecialDate(emp._id)}
//                                                     disabled={attendance[emp._id]?.status === 'Absent'}
//                                                     className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 ml-2"
//                                                 >
//                                                     Mark Special Date
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="text-center py-4">No employees found.</td>
//                                     </tr>
//                                 )
//                             )}
//                         </tbody>

//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }
