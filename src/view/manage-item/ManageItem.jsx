
// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import { parse } from 'papaparse';
// import './ManageItem.css';

// export function ManageItem() {
//     const [data, setData] = useState([
//         { id: 'E001', name: 'John Doe', address: '123 Elm Street', salary: 50000, otHours: 10, status: 'present' },
//         { id: 'E002', name: 'Jane Smith', address: '456 Oak Avenue', salary: 60000, otHours: 5, status: 'absent' },
//         { id: 'E003', name: 'Alice Johnson', address: '789 Pine Road', salary: 55000, otHours: 8, status: 'present' },
//         { id: 'E004', name: 'Bob Brown', address: '101 Maple Lane', salary: 47000, otHours: 12, status: 'present' }
//     ]);
//     const [loading, setLoading] = useState(false);
//     const [currentTime, setCurrentTime] = useState(new Date());
//     const [manualHours, setManualHours] = useState({});

//     useEffect(() => {
//         const interval = setInterval(() => setCurrentTime(new Date()), 1000);
//         return () => clearInterval(interval);
//     }, []);

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
//                 const reader = new FileReader();
//                 reader.onload = (e) => {
//                     const wb = XLSX.read(e.target.result, { type: 'array' });
//                     const ws = wb.Sheets[wb.SheetNames[0]];
//                     const data = XLSX.utils.sheet_to_json(ws);
//                     setData(data);
//                 };
//                 reader.readAsArrayBuffer(file);
//             } else if (file.type === 'text/csv') {
//                 parse(file, {
//                     complete: (results) => {
//                         const [header, ...rows] = results.data;
//                         const parsedData = rows.map(row => ({
//                             id: row[0],
//                             name: row[1],
//                             address: row[2],
//                             salary: parseFloat(row[3]),
//                             otHours: parseFloat(row[4])
//                         }));
//                         setData(parsedData);
//                     }
//                 });
//             }
//         }
//     };

//     const exportToExcel = () => {
//         const ws = XLSX.utils.json_to_sheet(data);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
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

//     const fetchDataFromBackend = async () => {
//         setLoading(true);
//         try {
//             // Replace with your backend API endpoint
//             const response = await fetch('/api/employees');
//             const result = await response.json();
//             setData(result);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEditOTHours = (id, value) => {
//         setData(data.map(item =>
//             item.id === id ? { ...item, otHours: value } : item
//         ));
//     };

//     const handleAction = (id, action) => {
//         setData(data.map(item =>
//             item.id === id ? { ...item, status: action } : item
//         ));
//     };

//     const handleManualHoursChange = (id, value) => {
//         setManualHours({
//             ...manualHours,
//             [id]: value
//         });
//     };

//     return (
//         <div className="p-4 flex">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-200 p-4">
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
//             <div className="flex-1 p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <input
//                         type="file"
//                         accept=".csv, .xlsx"
//                         onChange={handleFileUpload}
//                         className="p-2 border border-gray-300 rounded"
//                     />
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
//                         <button
//                             onClick={fetchDataFromBackend}
//                             className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                         >
//                             Fetch Data from Backend
//                         </button>
//                     </div>
//                 </div>

//                 <h1 className="text-2xl font-bold pb-4">Manage Items</h1>
                
//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
//                         <thead className="bg-gray-200 text-gray-700">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Address</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Fixed Salary (LKR)</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">OT Hours</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Manual Hours</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-300">
//                             {data.map((item) => (
//                                 <tr key={item.id} className={item.status === 'absent' ? 'bg-red-200' : item.status === 'present' ? 'bg-light-blue-200' : 'bg-white'}>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <input
//                                             type="number"
//                                             value={item.otHours}
//                                             onChange={(e) => handleEditOTHours(item.id, parseFloat(e.target.value))}
//                                             className="p-1 border border-gray-300 rounded"
//                                         />
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <input
//                                             type="number"
//                                             value={manualHours[item.id] || ''}
//                                             onChange={(e) => handleManualHoursChange(item.id, parseFloat(e.target.value))}
//                                             className="p-1 border border-gray-300 rounded"
//                                         />
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <button
//                                             onClick={() => handleAction(item.id, item.status === 'present' ? 'absent' : 'present')}
//                                             className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
//                                         >
//                                             Toggle Status
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import { getAllEmployees, updateEmployee, deleteEmployee, findEmployee, getEmployeeDetails } from '../../service/ApiServices';
// import { createAttendance, getAllAttendances, getAttendanceById, updateAttendance, deleteAttendance } from '../../service/ApiServices';
// import './ManageItem.css';

// export function ManageItem() {
//     const [employees, setEmployees] = useState([]);
//     const [attendance, setAttendance] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [currentTime, setCurrentTime] = useState(new Date());

//     useEffect(() => {
//         fetchEmployees();
//         const interval = setInterval(() => setCurrentTime(new Date()), 1000);
//         return () => clearInterval(interval);
//     }, []);

//     const fetchEmployees = async () => {
//         setLoading(true);
//         try {
//             const response = await getAllEmployees();
//             const result = response.data; // Adjust based on the structure of your response
//             setEmployees(result);

//             // Initialize attendance state
//             const initialAttendance = {};
//             result.forEach(employee => {
//                 initialAttendance[employee.id] = {
//                     entryTime: null,
//                     exitTime: null,
//                     status: 'Absent',
//                     specialDate: false
//                 };
//             });
//             setAttendance(initialAttendance);
//         } catch (error) {
//             console.error('Error fetching employees:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const markAttendance = (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             entryTime: new Date(),
//             status: 'Present'
//         };
//         setAttendance({ ...attendance, [id]: updatedAttendance });
//         saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markOutTime = (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             exitTime: new Date()
//         };
//         setAttendance({ ...attendance, [id]: updatedAttendance });
//         saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markAbsent = (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             status: 'Absent'
//         };
//         setAttendance({ ...attendance, [id]: updatedAttendance });
//         saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markSpecialDate = (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             specialDate: true
//         };
//         setAttendance({ ...attendance, [id]: updatedAttendance });
//         // No need to save this to the backend if not required
//     };

//     const saveAttendanceToBackend = async (id, attendanceData) => {
//         try {
//             await updateAttendance(id, attendanceData);
//         } catch (error) {
//             console.error('Error saving attendance data:', error);
//         }
//     };

//     const exportToExcel = () => {
//         const data = employees.map(emp => ({
//             ...emp,
//             ...attendance[emp.id]
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

//     return (
//         <div className="p-4 flex">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-200 p-4">
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
//             <div className="flex-1 p-4">
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

//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
//                         <thead className="bg-gray-200 text-gray-700">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Attendance</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Out Time</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Absent</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Special Date</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-300">
//                             {employees.map((employee) => (
//                                 <tr key={employee.id}>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.employeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.firstName}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         {attendance[employee.id].entryTime ? (
//                                             <div>{new Date(attendance[employee.id].entryTime).toLocaleTimeString()}</div>
//                                         ) : (
//                                             <button
//                                                 onClick={() => markAttendance(employee.id)}
//                                                 className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
//                                             >
//                                                 Mark Attendance
//                                             </button>
//                                         )}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         {attendance[employee.id].exitTime ? (
//                                             <div>{new Date(attendance[employee.id].exitTime).toLocaleTimeString()}</div>
//                                         ) : (
//                                             <button
//                                                 onClick={() => markOutTime(employee.id)}
//                                                 className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
//                                             >
//                                                 Mark Out Time
//                                             </button>
//                                         )}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <button
//                                             onClick={() => markAbsent(employee.id)}
//                                             className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
//                                         >
//                                             Mark Absent
//                                         </button>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <button
//                                             onClick={() => markSpecialDate(employee.id)}
//                                             className={`p-1 rounded ${attendance[employee.id].specialDate ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'} hover:bg-yellow-600`}
//                                         >
//                                             Special Date
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import { getAllEmployees, createAttendance, getAllAttendances, updateAttendance } from '../../service/ApiServices';
// import './ManageItem.css';

// export function ManageItem() {
//     const [employees, setEmployees] = useState([]);
//     const [attendance, setAttendance] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [currentTime, setCurrentTime] = useState(new Date());

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
//             result.forEach(employee => {
//                 initialAttendance[employee._id] = {
//                     entryTime: null,
//                     exitTime: null,
//                     status: 'Absent',
//                     specialDate: false,
//                     _id: null
//                 };
//             });
//             setAttendance(initialAttendance);
//             await fetchAttendances();
//         } catch (error) {
//             console.error('Error fetching employees:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchAttendances = async () => {
//         try {
//             const response = await getAllAttendances();
//             const attendances = response.data;
//             const attendanceMap = {};
//             attendances.forEach(att => {
//                 attendanceMap[att.employee] = {
//                     entryTime: att.entryTime,
//                     exitTime: att.exitTime,
//                     status: att.status,
//                     specialDate: att.specialDate,
//                     _id: att._id
//                 };
//             });
//             setAttendance(prev => ({ ...prev, ...attendanceMap }));
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

//     const markAttendance = async (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             entryTime: new Date(),
//             status: 'Present'
//         };
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markOutTime = async (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             exitTime: new Date()
//         };
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markAbsent = async (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             status: 'Absent',
//             entryTime: null,
//             exitTime: null
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
//             specialDate: true
//         };
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const exportToExcel = () => {
//         const data = employees.map(emp => ({
//             ...emp,
//             ...attendance[emp.id]
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

//     return (
//         <div className="p-4 flex">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-200 p-4 fixed left-0  h-full" style={{ maxHeight: '400px' }}>
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

//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
//                         <thead className="bg-gray-200 text-gray-700">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Attendance</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Out Time</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Absent</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Special Date</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-300">
//                             {employees.map((employee) => {
//                                 const empAttendance = attendance[employee.id] || {};
//                                 const rowClass = empAttendance.specialDate ? 'bg-gray-200' : empAttendance.status === 'Absent' ? 'bg-red-200' : empAttendance.entryTime ? 'bg-blue-200' : empAttendance.exitTime ? 'bg-green-200' : '';
//                                 return (
//                                     <tr key={employee.id} className={rowClass}>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.employeeId}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.firstName}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {empAttendance.entryTime ? (
//                                                 <div>{new Date(empAttendance.entryTime).toLocaleTimeString()}</div>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => markAttendance(employee.id)}
//                                                     className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
//                                                     disabled={empAttendance.specialDate}
//                                                 >
//                                                     Mark Attendance
//                                                 </button>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {empAttendance.exitTime ? (
//                                                 <div>{new Date(empAttendance.exitTime).toLocaleTimeString()}</div>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => markOutTime(employee.id)}
//                                                     className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
//                                                     disabled={!empAttendance.entryTime || empAttendance.specialDate}
//                                                 >
//                                                     Mark Out Time
//                                                 </button>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {empAttendance.status === 'Absent' ? (
//                                                 <div>Absent</div>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => markAbsent(employee.id)}
//                                                     className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
//                                                     disabled={empAttendance.specialDate}
//                                                 >
//                                                     Mark Absent
//                                                 </button>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {empAttendance.specialDate ? (
//                                                 <div>Special Date</div>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => markSpecialDate(employee.id)}
//                                                     className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
//                                                 >
//                                                     Mark Special Date
//                                                 </button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import { getAllEmployees, createAttendance, getAllAttendances, updateAttendance } from '../../service/ApiServices';
// import './ManageItem.css';

// export function ManageItem() {
//     const [employees, setEmployees] = useState([]);
//     const [attendance, setAttendance] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [currentTime, setCurrentTime] = useState(new Date());

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
//             result.forEach(employee => {
//                 initialAttendance[employee._id] = {
//                     date: new Date(),
//                     entryTime: null,
//                     exitTime: null,
//                     status: 'Absent',
//                     specialDate: false
//                 };
//             });
//             setAttendance(initialAttendance); // Initialize attendance
//             await fetchAttendances(initialAttendance); // Fetch attendances and merge
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
//                         _id: att._id
//                     };
//                 }
//             });
    
//             setAttendance(attendanceMap); // Merge attendance data from backend
//         } catch (error) {
//             console.error('Error fetching attendances:', error);
//         }
//     };
    

//     const saveAttendanceToBackend = async (id, attendanceData) => {
//         try {
//             if (attendance[id]._id) {
//                 await updateAttendance(attendance[id]._id, attendanceData);
//             } else {
//                 console.log({ ...attendanceData, employee: id })
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

//     const markAttendance = async (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             entryTime: new Date(),
//             status: 'Present'
//         };
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markOutTime = async (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             exitTime: new Date()
//         };
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markAbsent = async (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             status: 'Absent',
//             entryTime: null,
//             exitTime: null
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
//             specialDate: true
//         };
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const exportToExcel = () => {
//         const data = employees.map(emp => ({
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

//     return (
//         <div className="p-4 flex">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-200 p-4 fixed left-0  h-full" style={{ maxHeight: '400px' }}>
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

//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
//                         <thead className="bg-gray-200 text-gray-700">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Attendance</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Out Time</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Absent</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Special Date</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-300">
//                             {employees.map((employee) => {
//                                 const empAttendance = attendance[employee._id] || {};
//                                 const rowClass = empAttendance.specialDate ? 'bg-gray-200' : empAttendance.status === 'Absent' ? 'bg-red-200' : empAttendance.entryTime ? 'bg-blue-200' : empAttendance.exitTime ? 'bg-green-200' : '';
//                                 return (
//                                     <tr key={employee._id} className={rowClass}>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.employeeId}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.firstName}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {empAttendance.entryTime ? (
//                                                 <div>{new Date(empAttendance.entryTime).toLocaleTimeString()}</div>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => markAttendance(employee._id)}
//                                                     className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                                                 >
//                                                     Mark Attendance
//                                                 </button>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {empAttendance.exitTime ? (
//                                                 <div>{new Date(empAttendance.exitTime).toLocaleTimeString()}</div>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => markOutTime(employee._id)}
//                                                     className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
//                                                 >
//                                                     Mark Out Time
//                                                 </button>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <button
//                                                 onClick={() => markAbsent(employee._id)}
//                                                 className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
//                                             >
//                                                 Mark Absent
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {empAttendance.specialDate ? (
//                                                 <div>Special Date</div>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => markSpecialDate(employee._id)}
//                                                     className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
//                                                 >
//                                                     Mark Special Date
//                                                 </button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import { getAllEmployees, createAttendance, getAllAttendances, updateAttendance } from '../../service/ApiServices';
// import './ManageItem.css';

// export function ManageItem() {
//     const [employees, setEmployees] = useState([]);
//     const [attendance, setAttendance] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [currentTime, setCurrentTime] = useState(new Date());
//     const [selectedTimes, setSelectedTimes] = useState({}); // Store selected times for attendance and out time

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
//             result.forEach(employee => {
//                 initialAttendance[employee._id] = {
//                     date: new Date(),
//                     entryTime: null,
//                     exitTime: null,
//                     status: 'Absent',
//                     specialDate: false
//                 };
//             });
//             setAttendance(initialAttendance); // Initialize attendance
//             await fetchAttendances(initialAttendance); // Fetch attendances and merge
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
//                         _id: att._id
//                     };
//                 }
//             });
    
//             setAttendance(attendanceMap); // Merge attendance data from backend
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
//         const entryTime = selectedTime ? new Date(selectedTime) : new Date();

//         const updatedAttendance = {
//             ...attendance[id],
//             entryTime: entryTime,
//             status: 'Present'
//         };

//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));

//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const handleOutTime = async (id) => {
//         const selectedTime = selectedTimes[id]?.exitTime;
//         const exitTime = selectedTime ? new Date(selectedTime) : new Date();

//         const updatedAttendance = {
//             ...attendance[id],
//             exitTime: exitTime
//         };

//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));

//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const markAbsent = async (id) => {
//         const updatedAttendance = {
//             ...attendance[id],
//             status: 'Absent',
//             entryTime: null,
//             exitTime: null
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
//             status: 'Present' // Mark as Present
//         };
//         setAttendance(prev => ({
//             ...prev,
//             [id]: updatedAttendance
//         }));
//         await saveAttendanceToBackend(id, updatedAttendance);
//     };

//     const exportToExcel = () => {
//         const data = employees.map(emp => ({
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

//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
//                         <thead className="bg-gray-200 text-gray-700">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Employee ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Attendance</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Out Time</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Absent</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium uppercase">Special Date</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-300">
//                             {employees.map((employee) => {
//                                 const empAttendance = attendance[employee._id] || {};
//                                 const isAttendanceMarked = !!empAttendance.entryTime;
//                                 const isOutTimeMarked = !!empAttendance.exitTime;
//                                 const buttonDisabled = loading;

//                                 return (
//                                     <tr key={employee._id}>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.employeeId}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.fullName}</td>
//                                         {/* <td className="px-6 py-4 whitespace-nowrap">
//                                             <input
//                                                 type="time"
//                                                 className="mr-2"
//                                                 value={selectedTimes[employee._id]?.entryTime || ''}
//                                                 onChange={(e) => handleTimeChange(employee._id, 'entryTime', e)}
//                                             />
//                                             <button
//                                                 className={getButtonClass(!isAttendanceMarked && !buttonDisabled)}
//                                                 disabled={isAttendanceMarked || buttonDisabled}
//                                                 onClick={() => handleAttendance(employee._id)}
//                                             >
//                                                 {isAttendanceMarked ? empAttendance.entryTime.toLocaleTimeString() : 'Mark Attendance'}
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <input
//                                                 type="time"
//                                                 className="mr-2"
//                                                 value={selectedTimes[employee._id]?.exitTime || ''}
//                                                 onChange={(e) => handleTimeChange(employee._id, 'exitTime', e)}
//                                             />
//                                             <button
//                                                 className={getButtonClass(isAttendanceMarked && !isOutTimeMarked)}
//                                                 disabled={!isAttendanceMarked || isOutTimeMarked || buttonDisabled}
//                                                 onClick={() => handleOutTime(employee._id)}
//                                             >
//                                                 {isOutTimeMarked ? empAttendance.exitTime.toLocaleTimeString() : 'Mark Out Time'}
//                                             </button>
//                                         </td> */}
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <input
//                                                 type="time"
//                                                 className="mr-2"
//                                                 value={selectedTimes[employee._id]?.entryTime || ''}
//                                                 onChange={(e) => handleTimeChange(employee._id, 'entryTime', e)}
//                                             />
//                                             <button
//                                                 className={getButtonClass(!isAttendanceMarked && !buttonDisabled)}
//                                                 disabled={isAttendanceMarked || buttonDisabled}
//                                                 onClick={() => handleAttendance(employee._id)}
//                                             >
//                                                 {isAttendanceMarked ? (new Date(empAttendance.entryTime).toLocaleTimeString() || 'Invalid Time') : 'Mark Attendance'}
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <input
//                                                 type="time"
//                                                 className="mr-2"
//                                                 value={selectedTimes[employee._id]?.exitTime || ''}
//                                                 onChange={(e) => handleTimeChange(employee._id, 'exitTime', e)}
//                                             />
//                                             <button
//                                                 className={getButtonClass(isAttendanceMarked && !isOutTimeMarked)}
//                                                 disabled={!isAttendanceMarked || isOutTimeMarked || buttonDisabled}
//                                                 onClick={() => handleOutTime(employee._id)}
//                                             >
//                                                 {isOutTimeMarked ? (new Date(empAttendance.exitTime).toLocaleTimeString() || 'Invalid Time') : 'Mark Out Time'}
//                                             </button>
//                                         </td>

//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <button
//                                                 className={getButtonClass(!buttonDisabled)}
//                                                 disabled={buttonDisabled}
//                                                 onClick={() => markAbsent(employee._id)}
//                                             >
//                                                 Mark Absent
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <button
//                                                 className={getButtonClass(!buttonDisabled)}
//                                                 disabled={buttonDisabled}
//                                                 onClick={() => markSpecialDate(employee._id)}
//                                             >
//                                                 Mark Special Date
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { getAllEmployees, createAttendance, getAllAttendances, updateAttendance } from '../../service/ApiServices';
import './ManageItem.css';

export function ManageItem() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedTimes, setSelectedTimes] = useState({}); // Store selected times for attendance and out time

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
            result.forEach(employee => {
                initialAttendance[employee._id] = {
                    date: new Date(),
                    entryTime: null,
                    exitTime: null,
                    status: 'Absent',
                    specialDate: false
                };
            });
            setAttendance(initialAttendance); // Initialize attendance
            await fetchAttendances(initialAttendance); // Fetch attendances and merge
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
                        _id: att._id
                    };
                }
            });
    
            setAttendance(attendanceMap); // Merge attendance data from backend
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
        const entryTime = selectedTime ? new Date(selectedTime) : new Date();

        const updatedAttendance = {
            ...attendance[id],
            entryTime: entryTime,
            status: 'Present'
        };

        setAttendance(prev => ({
            ...prev,
            [id]: updatedAttendance
        }));

        await saveAttendanceToBackend(id, updatedAttendance);
    };

    const handleOutTime = async (id) => {
        const selectedTime = selectedTimes[id]?.exitTime;
        const exitTime = selectedTime ? new Date(selectedTime) : new Date();

        const updatedAttendance = {
            ...attendance[id],
            exitTime: exitTime
        };

        setAttendance(prev => ({
            ...prev,
            [id]: updatedAttendance
        }));

        await saveAttendanceToBackend(id, updatedAttendance);
    };

    const markAbsent = async (id) => {
        const updatedAttendance = {
            ...attendance[id],
            status: 'Absent',
            entryTime: null,
            exitTime: null
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
            status: 'Present' // Mark as Present
        };
        setAttendance(prev => ({
            ...prev,
            [id]: updatedAttendance
        }));
        await saveAttendanceToBackend(id, updatedAttendance);
    };

    const exportToExcel = () => {
        const data = employees.map(emp => ({
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

    return (
        <div className="p-4 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-200 p-4 fixed left-0 h-full" style={{ maxHeight: '400px' }}>
                <h2 className="text-xl font-bold mb-4">Date & Time</h2>
                <div className="mb-4">
                    <span className="text-lg">Current Time:</span>
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

                <h1 className="text-2xl font-bold pb-4">Manage Items</h1>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Employee ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Attendance</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Out Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Absent</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Special Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-300">
                            {employees.map((employee) => {
                                const empAttendance = attendance[employee._id] || {};
                                const isAttendanceMarked = !!empAttendance.entryTime;
                                const isOutTimeMarked = !!empAttendance.exitTime;
                                const buttonDisabled = loading;

                                return (
                                    <tr key={employee._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.employeeId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.fullName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="time"
                                                className="mr-2"
                                                value={selectedTimes[employee._id]?.entryTime || ''}
                                                onChange={(e) => handleTimeChange(employee._id, 'entryTime', e)}
                                            />
                                            <button
                                                className={getButtonClass(!buttonDisabled)}
                                                onClick={() => handleAttendance(employee._id)}
                                                disabled={buttonDisabled}
                                            >
                                                {isAttendanceMarked ? 'Update' : 'Mark'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="time"
                                                className="mr-2"
                                                value={selectedTimes[employee._id]?.exitTime || ''}
                                                onChange={(e) => handleTimeChange(employee._id, 'exitTime', e)}
                                            />
                                            <button
                                                className={getButtonClass(!buttonDisabled)}
                                                onClick={() => handleOutTime(employee._id)}
                                                disabled={buttonDisabled || !isAttendanceMarked}
                                            >
                                                {isOutTimeMarked ? 'Update' : 'Mark'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                className={getButtonClass(!buttonDisabled)}
                                                onClick={() => markAbsent(employee._id)}
                                                disabled={buttonDisabled}
                                            >
                                                Mark Absent
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                className={getButtonClass(!buttonDisabled)}
                                                onClick={() => markSpecialDate(employee._id)}
                                                disabled={buttonDisabled}
                                            >
                                                {empAttendance.specialDate ? 'Special Date' : 'Mark'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
