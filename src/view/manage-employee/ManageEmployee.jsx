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
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Salary (LKR)</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OT Hours</th>
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
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OT Rate</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OT Hours</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary (LKR)</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OT Rate</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OT Hours</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fixed Salary (LKR)</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary with OT (LKR)</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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

import React, { useState, useEffect } from 'react';
import './ManageEmployee.css';

export function ManageEmployee() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    // Dummy data
    const dummyData = [
        {
            id: 1,
            name: 'John Doe',
            position: 'Software Engineer',
            otRate: 500, // OT rate per hour
            otHours: 10, // Number of OT hours
            salary: 100000, // Fixed monthly salary
        },
        {
            id: 2,
            name: 'Jane Smith',
            position: 'Project Manager',
            otRate: 600,
            otHours: 5,
            salary: 120000,
        },
        {
            id: 3,
            name: 'Michael Brown',
            position: 'Data Analyst',
            otRate: 450,
            otHours: 8,
            salary: 90000,
        },
        {
            id: 4,
            name: 'Emily Davis',
            position: 'UI/UX Designer',
            otRate: 550,
            otHours: 12,
            salary: 110000,
        }
    ];

    useEffect(() => {
        // Set dummy data to state
        setEmployees(dummyData);
        setFilteredEmployees(dummyData);
    }, []);

    useEffect(() => {
        // Filter employees based on search query
        const query = searchQuery.toLowerCase();
        const filtered = employees.filter(employee =>
            employee.name.toLowerCase().includes(query) ||
            employee.id.toString().includes(query) ||
            employee.position.toLowerCase().includes(query)
        );
        setFilteredEmployees(filtered);
    }, [searchQuery, employees]);

    const calculateSalaryWithOT = (salary, otRate, otHours) => {
        return salary + (otRate * otHours);
    };

    const totalPayment = filteredEmployees.reduce((acc, employee) =>
        acc + calculateSalaryWithOT(employee.salary, employee.otRate, employee.otHours), 0);

    const totalEmployees = filteredEmployees.length;

    return (
        <div className="flex flex-col p-6 bg-gray-100">
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
                <div className="flex-1">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
                            <thead className="bg-blue-100 text-blue-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Employee ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Position</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">OT Rate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">OT Hours</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Fixed Salary (LKR)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Salary with OT (LKR)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300">
                                {filteredEmployees.map(employee => (
                                    <tr key={employee.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.otRate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.otHours}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.salary}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {calculateSalaryWithOT(employee.salary, employee.otRate, employee.otHours)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={() => handleEdit(employee.id)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar for totals */}
                <div className="w-1/3 ml-6 bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-700">Total Payment (LKR):</span>
                        <span className="font-bold text-gray-900">{totalPayment}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Total Employees:</span>
                        <span className="font-bold text-gray-900">{totalEmployees}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Placeholder function for handling edit action
const handleEdit = (id) => {
    console.log('Edit employee with ID:', id);
};
