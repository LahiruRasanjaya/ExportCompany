// import './ManageEmployee.css';

// export function ManageEmployee() {
//     return (
//         <div className="flex">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-200 p-4">
//                 <h2 className="text-xl font-bold mb-4">Employee Management</h2>
//                 <ul className="space-y-2">
//                     <li>
//                         <a href="#add-employee" className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded">Add Employee</a>
//                     </li>
//                     <li>
//                         <a href="#manage-ot-hours" className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded">Manage OT Hours</a>
//                     </li>
//                     <li>
//                         <a href="#remove-employee" className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded">Remove Employee</a>
//                     </li>
//                     <li>
//                         <a href="#change-position" className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded">Change Employee Position</a>
//                     </li>
//                 </ul>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 p-4 text-center">
//                 <h1 className="text-2xl font-bold pb-4">Manage Employees</h1>
                
//                 {/* Table */}
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Employee ID</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Email</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Phone</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Monthly Salary (LKR)</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Position</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">OT Hours</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         <tr>
//                             <td className="px-6 py-4 whitespace-nowrap">1</td>
//                             <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
//                             <td className="px-6 py-4 whitespace-nowrap">johndoe@example.com</td>
//                             <td className="px-6 py-4 whitespace-nowrap">123-456-7890</td>
//                             <td className="px-6 py-4 whitespace-nowrap">100,000</td>
//                             <td className="px-6 py-4 whitespace-nowrap">Software Engineer</td>
//                             <td className="px-6 py-4 whitespace-nowrap">10</td>
//                         </tr>
//                         <tr>
//                             <td className="px-6 py-4 whitespace-nowrap">2</td>
//                             <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
//                             <td className="px-6 py-4 whitespace-nowrap">janesmith@example.com</td>
//                             <td className="px-6 py-4 whitespace-nowrap">987-654-3210</td>
//                             <td className="px-6 py-4 whitespace-nowrap">120,000</td>
//                             <td className="px-6 py-4 whitespace-nowrap">Project Manager</td>
//                             <td className="px-6 py-4 whitespace-nowrap">5</td>
//                         </tr>
//                         {/* Add more rows as needed */}
//                     </tbody>
//                 </table>
//             </main>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import './ManageEmployee.css';

// export function ManageEmployee() {
//     const [employees, setEmployees] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredEmployees, setFilteredEmployees] = useState([]);

//     useEffect(() => {
//         // Fetch employee data from the backend
//         fetch('YOUR_BACKEND_API_ENDPOINT/employees') // Replace with your API endpoint
//             .then(response => response.json())
//             .then(data => {
//                 setEmployees(data);
//                 setFilteredEmployees(data);
//             })
//             .catch(error => console.error('Error fetching employee data:', error));
//     }, []);

//     useEffect(() => {
//         // Filter employees based on search query
//         const query = searchQuery.toLowerCase();
//         const filtered = employees.filter(employee =>
//             employee.name.toLowerCase().includes(query) ||
//             employee.id.toString().includes(query) ||
//             employee.position.toLowerCase().includes(query)
//         );
//         setFilteredEmployees(filtered);
//     }, [searchQuery, employees]);

//     return (
//         <div className="flex flex-col p-4">
//             {/* Search Bar */}
//             <div className="mb-4">
//                 <label htmlFor="search" className="block text-gray-700">Search employee name / ID / position:</label>
//                 <input
//                     id="search"
//                     type="text"
//                     placeholder="Enter search term"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="mt-1 p-2 border border-gray-300 rounded"
//                 />
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Employee ID</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Position</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">OT Rate</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">OT Hours</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Salary (LKR)</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredEmployees.map(employee => (
//                             <tr key={employee.id}>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.id}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.otRate}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.otHours}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.salary}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <button
//                                         className="text-blue-500 hover:text-blue-700"
//                                         onClick={() => handleEdit(employee.id)}
//                                     >
//                                         Edit
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// // Placeholder function for handling edit action
// const handleEdit = (id) => {
//     console.log('Edit employee with ID:', id);
// };

// import React, { useState, useEffect } from 'react';
// import './ManageEmployee.css';

// export function ManageEmployee() {
//     const [employees, setEmployees] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredEmployees, setFilteredEmployees] = useState([]);

//     // Dummy data
//     const dummyData = [
//         {
//             id: 1,
//             name: 'John Doe',
//             position: 'Software Engineer',
//             otRate: 500, // OT rate per hour
//             otHours: 10, // Number of OT hours
//             salary: 100000, // Fixed monthly salary
//         },
//         {
//             id: 2,
//             name: 'Jane Smith',
//             position: 'Project Manager',
//             otRate: 600,
//             otHours: 5,
//             salary: 120000,
//         },
//         {
//             id: 3,
//             name: 'Michael Brown',
//             position: 'Data Analyst',
//             otRate: 450,
//             otHours: 8,
//             salary: 90000,
//         },
//         {
//             id: 4,
//             name: 'Emily Davis',
//             position: 'UI/UX Designer',
//             otRate: 550,
//             otHours: 12,
//             salary: 110000,
//         }
//     ];

//     useEffect(() => {
//         // Set dummy data to state
//         setEmployees(dummyData);
//         setFilteredEmployees(dummyData);
//     }, []);

//     useEffect(() => {
//         // Filter employees based on search query
//         const query = searchQuery.toLowerCase();
//         const filtered = employees.filter(employee =>
//             employee.name.toLowerCase().includes(query) ||
//             employee.id.toString().includes(query) ||
//             employee.position.toLowerCase().includes(query)
//         );
//         setFilteredEmployees(filtered);
//     }, [searchQuery, employees]);

//     const calculateSalaryWithOT = (salary, otRate, otHours) => {
//         return salary + (otRate * otHours);
//     };

//     return (
//         <div className="flex flex-col p-4">
//             {/* Search Bar */}
//             <div className="mb-4">
//                 <label htmlFor="search" className="block text-gray-700">Search employee name / ID / position:</label>
//                 <input
//                     id="search"
//                     type="text"
//                     placeholder="Enter search term"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="mt-1 p-2 border border-gray-300 rounded"
//                 />
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Employee ID</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Position</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">OT Rate</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">OT Hours</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Fixed Salary (LKR)</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Salary with OT (LKR)</th>
//                             <th className="px-4 py-2 border text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredEmployees.map(employee => (
//                             <tr key={employee.id}>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.id}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.otRate}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.otHours}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{employee.salary}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     {calculateSalaryWithOT(employee.salary, employee.otRate, employee.otHours)}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <button
//                                         className="text-blue-500 hover:text-blue-700"
//                                         onClick={() => handleEdit(employee.id)}
//                                     >
//                                         Edit
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// // Placeholder function for handling edit action
// const handleEdit = (id) => {
//     console.log('Edit employee with ID:', id);
// };

// import React, { useState, useEffect } from 'react';
// import './ManageEmployee.css';

// export function ManageEmployee() {
//     const [employees, setEmployees] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredEmployees, setFilteredEmployees] = useState([]);

//     // Dummy data
//     const dummyData = [
//         {
//             id: 1,
//             name: 'John Doe',
//             position: 'Software Engineer',
//             otRate: 500, // OT rate per hour
//             otHours: 10, // Number of OT hours
//             salary: 100000, // Fixed monthly salary
//         },
//         {
//             id: 2,
//             name: 'Jane Smith',
//             position: 'Project Manager',
//             otRate: 600,
//             otHours: 5,
//             salary: 120000,
//         },
//         {
//             id: 3,
//             name: 'Michael Brown',
//             position: 'Data Analyst',
//             otRate: 450,
//             otHours: 8,
//             salary: 90000,
//         },
//         {
//             id: 4,
//             name: 'Emily Davis',
//             position: 'UI/UX Designer',
//             otRate: 550,
//             otHours: 12,
//             salary: 110000,
//         }
//     ];

//     useEffect(() => {
//         // Set dummy data to state
//         setEmployees(dummyData);
//         setFilteredEmployees(dummyData);
//     }, []);

//     useEffect(() => {
//         // Filter employees based on search query
//         const query = searchQuery.toLowerCase();
//         const filtered = employees.filter(employee =>
//             employee.name.toLowerCase().includes(query) ||
//             employee.id.toString().includes(query) ||
//             employee.position.toLowerCase().includes(query)
//         );
//         setFilteredEmployees(filtered);
//     }, [searchQuery, employees]);

//     const calculateSalaryWithOT = (salary, otRate, otHours) => {
//         return salary + (otRate * otHours);
//     };

//     const totalPayment = filteredEmployees.reduce((acc, employee) =>
//         acc + calculateSalaryWithOT(employee.salary, employee.otRate, employee.otHours), 0);

//     const totalEmployees = filteredEmployees.length;

//     return (
//         <div className="flex flex-col p-6 bg-gray-100">
//             {/* Page Title */}
//             <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Employee Management Dashboard</h1>
            
//             {/* Search Bar */}
//             <div className="mb-6">
//                 <label htmlFor="search" className="block text-lg font-medium text-gray-700">Search employee name / ID / position:</label>
//                 <input
//                     id="search"
//                     type="text"
//                     placeholder="Enter search term"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             {/* Main Content */}
//             <div className="flex">
//                 {/* Table */}
//                 <div className="flex-1">
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
//                             <thead className="bg-blue-100 text-blue-700">
//                                 <tr>
//                                     <th className="px-4 py-2 border uppercase">Employee ID</th>
//                                     <th className="px-4 py-2 border uppercase">Name</th>
//                                     <th className="px-4 py-2 border uppercase">Position</th>
//                                     <th className="px-4 py-2 border uppercase">OT Rate</th>
//                                     <th className="px-4 py-2 border uppercase">OT Hours</th>
//                                     <th className="px-4 py-2 border uppercase">Fixed Salary (LKR)</th>
//                                     <th className="px-4 py-2 border uppercase">Salary with OT (LKR)</th>
//                                     <th className="px-4 py-2 border uppercase">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-300">
//                                 {filteredEmployees.map(employee => (
//                                     <tr key={employee.id}>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.id}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.otRate}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.otHours}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{employee.salary}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {calculateSalaryWithOT(employee.salary, employee.otRate, employee.otHours)}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <button
//                                                 className="text-blue-500 hover:text-blue-700"
//                                                 onClick={() => handleEdit(employee.id)}
//                                             >
//                                                 Edit
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Sidebar for totals */}
//                 <div className="w-1/3 ml-6 bg-white shadow-lg rounded-lg p-4">
//                     <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
//                     <div className="flex justify-between mb-2">
//                         <span className="font-medium text-gray-700">Total Payment (LKR):</span>
//                         <span className="font-bold text-gray-900">{totalPayment}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="font-medium text-gray-700">Total Employees:</span>
//                         <span className="font-bold text-gray-900">{totalEmployees}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // Placeholder function for handling edit action
// const handleEdit = (id) => {
//     console.log('Edit employee with ID:', id);
// };

// import React, { useState, useEffect } from 'react';
// import {
//     getAllEmployees,
//     updateEmployee,
// } from '../../service/ApiServices.js';  // Ensure this path is correct based on your project structure
// import './ManageEmployee.css';


// export function ManageEmployee() {
//     const [employees, setEmployees] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredEmployees, setFilteredEmployees] = useState([]);
//     const [editingId, setEditingId] = useState(null);

//     // Fetch employees from API
//     useEffect(() => {
//         async function fetchEmployees() {
//             try {
//                 const response = await getAllEmployees(); // Using apiService function
//                 setEmployees(response.data);
//                 setFilteredEmployees(response.data);
//             } catch (error) {
//                 console.error("Error fetching employees:", error);
//             }
//         }
//         fetchEmployees();
//     }, []);

//     // Filter employees based on search query
//     useEffect(() => {
//         const query = searchQuery.toLowerCase();
//         const filtered = employees.filter(employee =>
//             employee.firstName.toLowerCase().includes(query) ||
//             employee.employeeId.toString().includes(query) ||
//             employee.position?.toLowerCase().includes(query)
//         );
//         setFilteredEmployees(filtered);
//     }, [searchQuery, employees]);

//     const handleEdit = (id) => {
//         setEditingId(id);
//     };

//     const handleSave = async (id) => {
//         try {
//             const updatedEmployee = employees.find(emp => emp._id === id);
//             await updateEmployee(id, updatedEmployee); // Using apiService function
//             setEditingId(null);
//         } catch (error) {
//             console.error("Error updating employee:", error);
//         }
//     };

//     const calculateSalaryWithOT = (salaryRate, OTRate, OTHrs) => {
//         return salaryRate + (OTRate * OTHrs);
//     };

//     const totalPayment = filteredEmployees.reduce((acc, employee) =>
//         acc + calculateSalaryWithOT(employee.salaryRate, employee.OTRate, employee.OTHrs), 0);

//     const totalEmployees = filteredEmployees.length;

//     return (
//         <div className="flex flex-col p-6 bg-gray-100">
//             {/* Page Title */}
//             <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Employee Management Dashboard</h1>
            
//             {/* Search Bar */}
//             <div className="mb-6">
//                 <label htmlFor="search" className="block text-lg font-medium text-gray-700">Search employee name / ID / position:</label>
//                 <input
//                     id="search"
//                     type="text"
//                     placeholder="Enter search term"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             {/* Main Content */}
//             <div className="flex">
//                 {/* Table */}
//                 <div className="flex-1 overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
//                         <thead className="bg-blue-100 text-blue-700">
//                             <tr>
//                                 <th className="px-4 py-2 border uppercase">Serial No</th>
//                                 <th className="px-4 py-2 border uppercase">Employee ID</th>
//                                 <th className="px-4 py-2 border uppercase">Employee Name</th>
//                                 <th className="px-4 py-2 border uppercase">Working Days</th>
//                                 {/* Add more columns as per your requirement */}
//                                 <th className="px-4 py-2 border uppercase">Net Salary</th>
//                                 <th className="px-4 py-2 border uppercase">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-300">
//                             {filteredEmployees.map((employee, index) => (
//                                 <tr key={employee._id}>
//                                     <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.employeeId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{`${employee.firstName} ${employee.secondName}`}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.workingDays}</td>
//                                     {/* Display more columns here */}
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.netSalary}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap fixed-column">
//                                         {editingId === employee._id ? (
//                                             <button
//                                                 className="text-green-500 hover:text-green-700"
//                                                 onClick={() => handleSave(employee._id)}
//                                             >
//                                                 Submit
//                                             </button>
//                                         ) : (
//                                             <>
//                                                 <button
//                                                     className="text-blue-500 hover:text-blue-700"
//                                                     onClick={() => handleEdit(employee._id)}
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     className="text-purple-500 hover:text-purple-700 ml-4"
//                                                     onClick={() => handlePaySheet(employee)}
//                                                 >
//                                                     Show Pay Sheet
//                                                 </button>
//                                             </>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Sidebar for totals */}
//                 <div className="w-1/3 ml-6 bg-white shadow-lg rounded-lg p-4">
//                     <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
//                     <div className="flex justify-between mb-2">
//                         <span className="font-medium text-gray-700">Total Payment (LKR):</span>
//                         <span className="font-bold text-gray-900">{totalPayment}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="font-medium text-gray-700">Total Employees:</span>
//                         <span className="font-bold text-gray-900">{totalEmployees}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // Placeholder function for handling pay sheet action
// const handlePaySheet = (employee) => {
//     console.log('Display pay sheet for employee:', employee);
// };

import React, { useState, useEffect } from 'react';
import {
    getAllEmployees,
    updateEmployee,
} from '../../service/ApiServices.js';  // Ensure this path is correct based on your project structure
import './ManageEmployee.css';

export function ManageEmployee() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({});

    // Fetch employees from API
    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await getAllEmployees(); // Using apiService function
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        }
        fetchEmployees();
    }, []);

    // Filter employees based on search query
    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = employees.filter(employee =>
            employee.firstName.toLowerCase().includes(query) ||
            employee.employeeId.toString().includes(query) ||
            employee.position?.toLowerCase().includes(query)
        );
        setFilteredEmployees(filtered);
    }, [searchQuery, employees]);

    const handleEdit = (employee) => {
        setEditingId(employee._id);
        setEditedEmployee({ ...employee }); // Set the employee's current details in the state
    };
    const handlePaySheet = () => {
        console.log("emp")
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
    };

    const handleSave = async (id) => {
        try {
            await updateEmployee(id, editedEmployee); // Update the employee with the edited details
            setEmployees(employees.map(emp => emp._id === id ? editedEmployee : emp));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    const calculateSalaryWithOT = (salaryRate, OTRate, OTHrs) => {
        return salaryRate + (OTRate * OTHrs);
    };

    const totalPayment = filteredEmployees.reduce((acc, employee) =>
        acc + calculateSalaryWithOT(employee.salaryRate, employee.OTRate, employee.OTHrs), 0);

    const totalEmployees = filteredEmployees.length;

    return (
        <div className="flex p-6 bg-gray-100 w-full">
            <div className="w-3/4 p-4">
                {/* Page Title */}
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Employee Management Dashboard</h1>
                
                {/* Search Bar */}
                <div className="mb-6">
                    <label htmlFor="search" className="block text-lg font-medium text-gray-700">Search employee name / ID / position:</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Enter search term"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Main Content */}
                <div className="flex">
                    {/* Table */}
                    <div className="flex-1 overflow-x-auto" style={{ maxHeight: '400px' }}>
                        <table className="min-w-full divide-y divide-gray-300 shadow-lg rounded-lg bg-white border fixed-header-table">
                            <thead className="bg-orange-100 " >
                                <tr>
                                    <th className="px-4 py-2 border uppercase">Serial No</th>
                                    <th className="px-4 py-2 border uppercase">Employee ID</th>
                                    <th className="px-4 py-2 border uppercase">Employee Name</th>
                                    <th className="px-4 py-2 border uppercase">Working Days</th>
                                    <th className="px-4 py-2 border uppercase">Salary Rate</th>
                                    <th className="px-4 py-2 border uppercase">Month Payment</th>
                                    <th className="px-4 py-2 border uppercase">OT Hrs</th>
                                    <th className="px-4 py-2 border uppercase">OT Rate</th>
                                    <th className="px-4 py-2 border uppercase">OT Earning</th>
                                    <th className="px-4 py-2 border uppercase">Income Allowance</th>
                                    <th className="px-4 py-2 border uppercase">Double Shift Days</th>
                                    <th className="px-4 py-2 border uppercase">Double Shift Earning</th>
                                    <th className="px-4 py-2 border uppercase">Attendance Allowance 1</th>
                                    <th className="px-4 py-2 border uppercase">Attendance Allowance 2</th>
                                    <th className="px-4 py-2 border uppercase">Risk Allowance 1</th>
                                    <th className="px-4 py-2 border uppercase">Risk Allowance 2</th>
                                    <th className="px-4 py-2 border uppercase">Colombo Allowance</th>
                                    <th className="px-4 py-2 border uppercase">Attendance 25</th>
                                    <th className="px-4 py-2 border uppercase">Gross Salary</th>
                                    <th className="px-4 py-2 border uppercase">EPF</th>
                                    <th className="px-4 py-2 border uppercase">Advance</th>
                                    <th className="px-4 py-2 border uppercase">Loans</th>
                                    <th className="px-4 py-2 border uppercase">Food</th>
                                    <th className="px-4 py-2 border uppercase">Total Deduction</th>
                                    <th className="px-4 py-2 border uppercase">Net Salary</th>
                                    <th className="px-4 py-2 border uppercase fixed-column bg-orange-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300 ">
                                {filteredEmployees.map((employee, index) => (
                                    <tr key={employee._id}>
                                        <td className="px-6 py-4 whitespace-nowrap border">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="text"
                                                    name="employeeId"
                                                    value={editedEmployee.employeeId}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.employeeId
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={editedEmployee.firstName}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                `${employee.firstName} ${employee.secondName}`
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="workingDays"
                                                    value={editedEmployee.workingDays}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.workingDays
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="salaryRate"
                                                    value={editedEmployee.salaryRate}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.salaryRate
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="monthPayment"
                                                    value={editedEmployee.monthPayment}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.monthPayment
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="OTHrs"
                                                    value={editedEmployee.OTHrs}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.OTHrs
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="OTRate"
                                                    value={editedEmployee.OTRate}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.OTRate
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="OTEarning"
                                                    value={editedEmployee.OTEarning}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.OTEarning
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="incomeAllowance"
                                                    value={editedEmployee.incomeAllowance}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.incomeAllowance
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="doubleShiftDays"
                                                    value={editedEmployee.doubleShiftDays}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.doubleShiftDays
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="doubleShiftEarning"
                                                    value={editedEmployee.doubleShiftEarning}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.doubleShiftEarning
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="attendanceAllowance1"
                                                    value={editedEmployee.attendanceAllowance1}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.attendanceAllowance1
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="attendanceAllowance2"
                                                    value={editedEmployee.attendanceAllowance2}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.attendanceAllowance2
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="riskAllowance1"
                                                    value={editedEmployee.riskAllowance1}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.riskAllowance1
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="riskAllowance2"
                                                    value={editedEmployee.riskAllowance2}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.riskAllowance2
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="colomboAllowance"
                                                    value={editedEmployee.colomboAllowance}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.colomboAllowance
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="attendance25"
                                                    value={editedEmployee.attendance25}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.attendance25
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="grossSalary"
                                                    value={editedEmployee.grossSalary}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.grossSalary
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="EPF"
                                                    value={editedEmployee.EPF}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.EPF
                                            )}
                                        </td>
                                        
                                        <td className="border border-gray-300 p-2">
                                            {employee.advances.reduce((total, advance) => total + advance.amount, 0).toFixed(2)}
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            {employee.loans.reduce((total, loan) => total + loan.amount, 0).toFixed(2)}
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            {employee.foodConsumptionRecords.reduce((acc, record) => acc + record.totalAmount, 0).toFixed(2)}
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="totalDeduction"
                                                    value={editedEmployee.totalDeduction}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.totalDeduction
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border">
                                            {editingId === employee._id ? (
                                                <input
                                                    type="number"
                                                    name="netSalary"
                                                    value={editedEmployee.netSalary}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg p-2"
                                                />
                                            ) : (
                                                employee.netSalary
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap fixed-column border">
                                            {editingId === employee._id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleSave(employee._id)}
                                                        className="text-green-600 hover:text-green-900 font-bold"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="ml-4 text-red-600 hover:text-red-900 font-bold"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                <button
                                                    onClick={() => handleEdit(employee)}
                                                    className="text-blue-600 hover:text-blue-900 font-bold"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                className="text-purple-500 hover:text-purple-700 ml-4"
                                                    onClick={() => handlePaySheet(employee)}
                                                >
                                                    Show Pay Sheet
                                                </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="w-1/4 p-4">
                {/* Sidebar */}
                <div className="ml-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Employee Summary</h2>
                        <p className="text-gray-700">
                            Total Employees: <span className="font-semibold">{totalEmployees}</span>
                        </p>
                        <p className="text-gray-700">
                            Total Monthly Payment: <span className="font-semibold">{totalPayment}</span>
                        </p>
                    </div>
                    <button
                        onClick={handlePaySheet}
                        className="bg-green-500 text-white py-2 px-4 rounded border-t-8"
                    >
                        Print Pay Sheet
                    </button>
                </div>
            </div>
        </div>
    );
}
