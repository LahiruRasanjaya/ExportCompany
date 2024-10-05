
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { updateEmployee, getAllEmployees } from '../../../service/ApiServices'; // Adjust the import path as needed

// export function EmployeeAllowance() {
//     const [employees, setEmployees] = useState([]);
//     const [filteredEmployees, setFilteredEmployees] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [editingEmployeeId, setEditingEmployeeId] = useState(null);
//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         getAllEmployees()
//             .then(response => {
//                 setEmployees(response.data);
//                 setFilteredEmployees(response.data);
//             })
//             .catch(error => console.error('Error fetching employees:', error));
//     }, []);

//     const handleSearchChange = (e) => {
//         const query = e.target.value.toLowerCase();
//         setSearchQuery(query);

//         const filtered = employees.filter(employee =>
//             employee.firstName.toLowerCase().includes(query) ||
//             employee.employeeId.toLowerCase().includes(query)
//         );

//         setFilteredEmployees(filtered);
//     };

//     const handleChange = (e, employeeId) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [employeeId]: {
//                 ...prevState[employeeId],
//                 [name]: value
//             }
//         }));
//     };

//     const handleSubmit = (employeeId) => {
//         const data = formData[employeeId];
//         updateEmployee(employeeId, data)
//             .then(() => {
//                 setEditingEmployeeId(null);
//                 return getAllEmployees();
//             })
//             .then(response => {
//                 setEmployees(response.data);
//                 setFilteredEmployees(response.data);
//             })
//             .catch(error => console.error('Error updating employee data:', error));
//     };

//     const handleEdit = (employee) => {
//         setEditingEmployeeId(employee._id);
//         setFormData(prevState => ({
//             ...prevState,
//             [employee._id]: {
//                 attendanceAllowance1: employee.attendanceAllowance1,
//                 attendanceAllowance2: employee.attendanceAllowance2,
//                 riskAllowance1: employee.riskAllowance1,
//                 riskAllowance2: employee.riskAllowance2,
//                 colomboAllowance: employee.colomboAllowance
//             }
//         }));
//     };

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Employee Allowances</h2>
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search by name or ID..."
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     className="border border-gray-300 px-4 py-2 rounded w-full"
//                 />
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-300">
//                     <thead>
//                         <tr>
//                             <th className="border border-gray-300 px-4 py-2">Employee ID</th>
//                             <th className="border border-gray-300 px-4 py-2">Attendance Allowance 1</th>
//                             <th className="border border-gray-300 px-4 py-2">Attendance Allowance 2</th>
//                             <th className="border border-gray-300 px-4 py-2">Risk Allowance 1</th>
//                             <th className="border border-gray-300 px-4 py-2">Risk Allowance 2</th>
//                             <th className="border border-gray-300 px-4 py-2">Colombo Allowance</th>
//                             <th className="border border-gray-300 px-4 py-2 w-32">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredEmployees.map(employee => (
//                             <tr key={employee._id}>
//                                 <td className="border border-gray-300 px-4 py-2">{employee.employeeId}</td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {editingEmployeeId === employee._id ? (
//                                         <input
//                                             type="number"
//                                             name="attendanceAllowance1"
//                                             value={formData[employee._id]?.attendanceAllowance1 || ''}
//                                             onChange={(e) => handleChange(e, employee._id)}
//                                             className="border border-gray-300 px-2 py-1 w-full"
//                                         />
//                                     ) : (
//                                         employee.attendanceAllowance1
//                                     )}
//                                 </td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {editingEmployeeId === employee._id ? (
//                                         <input
//                                             type="number"
//                                             name="attendanceAllowance2"
//                                             value={formData[employee._id]?.attendanceAllowance2 || ''}
//                                             onChange={(e) => handleChange(e, employee._id)}
//                                             className="border border-gray-300 px-2 py-1 w-full"
//                                         />
//                                     ) : (
//                                         employee.attendanceAllowance2
//                                     )}
//                                 </td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {editingEmployeeId === employee._id ? (
//                                         <input
//                                             type="number"
//                                             name="riskAllowance1"
//                                             value={formData[employee._id]?.riskAllowance1 || ''}
//                                             onChange={(e) => handleChange(e, employee._id)}
//                                             className="border border-gray-300 px-2 py-1 w-full"
//                                         />
//                                     ) : (
//                                         employee.riskAllowance1
//                                     )}
//                                 </td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {editingEmployeeId === employee._id ? (
//                                         <input
//                                             type="number"
//                                             name="riskAllowance2"
//                                             value={formData[employee._id]?.riskAllowance2 || ''}
//                                             onChange={(e) => handleChange(e, employee._id)}
//                                             className="border border-gray-300 px-2 py-1 w-full"
//                                         />
//                                     ) : (
//                                         employee.riskAllowance2
//                                     )}
//                                 </td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {editingEmployeeId === employee._id ? (
//                                         <input
//                                             type="number"
//                                             name="colomboAllowance"
//                                             value={formData[employee._id]?.colomboAllowance || ''}
//                                             onChange={(e) => handleChange(e, employee._id)}
//                                             className="border border-gray-300 px-2 py-1 w-full"
//                                         />
//                                     ) : (
//                                         employee.colomboAllowance
//                                     )}
//                                 </td>
//                                 <td className="border border-gray-300 px-4 py-2 w-32">
//                                     {editingEmployeeId === employee._id ? (
//                                         <div className="flex gap-2">
//                                             <button
//                                                 onClick={() => handleSubmit(employee._id)}
//                                                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                                             >
//                                                 Submit
//                                             </button>
//                                             <button
//                                                 onClick={() => setEditingEmployeeId(null)}
//                                                 className="bg-gray-500 text-white px-4 py-2 rounded"
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     ) : (
//                                         <button
//                                             onClick={() => handleEdit(employee)}
//                                             className="bg-yellow-500 text-white px-4 py-2 rounded"
//                                         >
//                                             Edit
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { updateEmployee, getAllEmployees, updateAllowance } from '../../../service/ApiServices'; // Adjust the import path as needed

export function EmployeeAllowance() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const [bulkData, setBulkData] = useState([]);

    useEffect(() => {
        getAllEmployees()
            .then(response => {
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            })
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    useEffect(() => {
        if (bulkData.length > 0) {
            const updatedFormData = bulkData.reduce((acc, emp) => {
                acc[emp._id] = {
                    attendanceAllowance1: emp.attendanceAllowance1,
                    attendanceAllowance2: emp.attendanceAllowance2,
                    riskAllowance1: emp.riskAllowance1,
                    riskAllowance2: emp.riskAllowance2,
                    colomboAllowance: emp.colomboAllowance
                };
                return acc;
            }, {});
            setFormData(updatedFormData);
        }
    }, [bulkData]);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = employees.filter(employee =>
            employee.firstName.toLowerCase().includes(query) ||
            employee.employeeId.toLowerCase().includes(query)
        );

        setFilteredEmployees(filtered);
    };

    const handleChange = (e, employeeId) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [employeeId]: {
                ...prevState[employeeId],
                [name]: value
            }
        }));
    };

    const handleSubmit = (employeeId) => {
        const data = formData[employeeId];
        console.log(data)
        updateAllowance(employeeId, data)
            .then(() => {
                setEditingEmployeeId(null);
                return getAllEmployees();
            })
            .then(response => {
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            })
            .catch(error => console.error('Error updating employee data:', error));
    };

    const handleEdit = (employee) => {
        setEditingEmployeeId(employee._id);
        setFormData(prevState => ({
            ...prevState,
            [employee._id]: {
                attendanceAllowance1: employee.attendanceAllowance1,
                attendanceAllowance2: employee.attendanceAllowance2,
                riskAllowance1: employee.riskAllowance1,
                riskAllowance2: employee.riskAllowance2,
                colomboAllowance: employee.colomboAllowance
            }
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            setBulkData(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleBulkSubmit = () => {
        const promises = bulkData.map(emp => {
            return updateAllowance(emp._id, {
                attendanceAllowance1: emp.attendanceAllowance1,
                attendanceAllowance2: emp.attendanceAllowance2,
                riskAllowance1: emp.riskAllowance1,
                riskAllowance2: emp.riskAllowance2,
                colomboAllowance: emp.colomboAllowance
            });
        });

        Promise.all(promises)
            .then(() => {
                alert("Bulk upload completed successfully");
                setBulkData([]);
                return getAllEmployees();
            })
            .then(response => {
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            })
            .catch(error => console.error('Error during bulk update:', error));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Employee Allowances</h2>
            
            {/* File upload area */}
            <div className="mb-4 flex gap-4">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="border border-gray-300 px-4 py-2 rounded"
                />
                <button
                    onClick={handleUpload}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Upload
                </button>
                {bulkData.length > 0 && (
                    <button
                        onClick={handleBulkSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Submit Bulk Data
                    </button>
                )}
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-gray-300 px-4 py-2 rounded w-full"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Employee ID</th>
                            <th className="border border-gray-300 px-4 py-2">Attendance Allowance 1</th>
                            <th className="border border-gray-300 px-4 py-2">Attendance Allowance 2</th>
                            <th className="border border-gray-300 px-4 py-2">Risk Allowance 1</th>
                            <th className="border border-gray-300 px-4 py-2">Risk Allowance 2</th>
                            <th className="border border-gray-300 px-4 py-2">Colombo Allowance</th>
                            <th className="border border-gray-300 px-4 py-2 w-32">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee._id}>
                                <td className="border border-gray-300 px-4 py-2">{employee.employeeId}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingEmployeeId === employee._id ? (
                                        <input
                                            type="number"
                                            name="attendanceAllowance1"
                                            value={formData[employee._id]?.attendanceAllowance1 || ''}
                                            onChange={(e) => handleChange(e, employee._id)}
                                            className="border border-gray-300 px-2 py-1 w-full"
                                        />
                                    ) : (
                                        employee.attendanceAllowance1
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingEmployeeId === employee._id ? (
                                        <input
                                            type="number"
                                            name="attendanceAllowance2"
                                            value={formData[employee._id]?.attendanceAllowance2 || ''}
                                            onChange={(e) => handleChange(e, employee._id)}
                                            className="border border-gray-300 px-2 py-1 w-full"
                                        />
                                    ) : (
                                        employee.attendanceAllowance2
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingEmployeeId === employee._id ? (
                                        <input
                                            type="number"
                                            name="riskAllowance1"
                                            value={formData[employee._id]?.riskAllowance1 || ''}
                                            onChange={(e) => handleChange(e, employee._id)}
                                            className="border border-gray-300 px-2 py-1 w-full"
                                        />
                                    ) : (
                                        employee.riskAllowance1
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingEmployeeId === employee._id ? (
                                        <input
                                            type="number"
                                            name="riskAllowance2"
                                            value={formData[employee._id]?.riskAllowance2 || ''}
                                            onChange={(e) => handleChange(e, employee._id)}
                                            className="border border-gray-300 px-2 py-1 w-full"
                                        />
                                    ) : (
                                        employee.riskAllowance2
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingEmployeeId === employee._id ? (
                                        <input
                                            type="number"
                                            name="colomboAllowance"
                                            value={formData[employee._id]?.colomboAllowance || ''}
                                            onChange={(e) => handleChange(e, employee._id)}
                                            className="border border-gray-300 px-2 py-1 w-full"
                                        />
                                    ) : (
                                        employee.colomboAllowance
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 w-32">
                                    {editingEmployeeId === employee._id ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleSubmit(employee._id)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                Submit
                                            </button>
                                            <button
                                                onClick={() => setEditingEmployeeId(null)}
                                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(employee)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

