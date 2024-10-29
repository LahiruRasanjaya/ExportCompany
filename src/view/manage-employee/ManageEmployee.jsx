
import React, { useState, useEffect } from 'react';
import {
    getAllEmployees,
    updateEmployee,
    updateLatMonth,
} from '../../service/ApiServices.js';  // Ensure this path is correct based on your project structure
import './ManageEmployee.css';

export function ManageEmployee() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [editingId, setEditingId] = useState(null);
    // const [editedEmployee, setEditedEmployee] = useState({});
    const [editedEmployee, setEditedEmployee] = useState({
        OTHrs: 0.00, // Default to 0 for OTHrs
        workingDays: 0.00, // Default value for other fields
        salaryRate: 0.00,
        // Add other fields with default values here as needed
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);

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
    }, [employees]);

    // Filter employees based on search query
    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = employees.filter(employee =>
            employee.firstName.toLowerCase().includes(query) ||
            employee.employeeId.toString().includes(query) ||
            employee.position?.toLowerCase().includes(query)
        );
        setFilteredEmployees(filtered);
    }, [searchQuery]);

    const handleEdit = (employee) => {
        setEditingId(employee._id);
        setEditedEmployee({ ...employee }); // Set the employee's current details in the state
    };
    const handlePaySheet = (employee) => {
        setSelectedEmployee(employee);
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
    };

    // const handleSave = async (id) => {
    //     try {
    //         await updateEmployee(id, editedEmployee); // Update the employee with the edited details
    //         setEmployees(employees.map(emp => emp._id === id ? editedEmployee : emp));
    //         setEditingId(null);
    //     } catch (error) {
    //         console.error("Error updating employee:", error);
    //     }
    // };

    const handleSave = async (id) => {
        try {
            // Check for null or empty string values in editedEmployee
            const hasNullValues = Object.entries(editedEmployee).some(
                ([key, value]) => value === null || value === ''
            );
    
            if (hasNullValues) {
                alert("Null or empty values cannot be updated."); // Show alert for null values
                return; // Exit the function without saving
            }
    
            await updateEmployee(id, editedEmployee); // Update the employee with the edited details
            setEmployees(employees.map(emp => emp._id === id ? editedEmployee : emp));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };
    

    const totalPayment = filteredEmployees.reduce((acc, employee) => acc + employee.netSalary, 0).toLocaleString('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 2 });
    const totalEmployees = filteredEmployees.length;

    const handlePrint = () => {
        // Get the content of the paysheet div
        const paysheetContent = document.getElementById('paysheet-content').innerHTML;
    
        // Open a new window with dimensions closer to receipt paper size
        const printWindow = window.open('', '', 'width=250,height=600'); // Adjust width for receipt paper
    
        // Write the HTML content to the new window
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Pay Sheet</title>
                    <style>
                        /* Simplified styles for receipt printer */
                        body {
                            font-family: 'Noto Sans Sinhala', sans-serif;
                            margin: 0;
                            padding: 10px;
                            font-size: 10px; /* Smaller font for receipt */
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid gray;
                            padding: 4px; /* Reduced padding */
                            text-align: left;
                            font-size: 9px; /* Smaller font for table content */
                        }
                        th {
                            background-color: #f4f4f4;
                            font-size: 9px;
                        }
                        .underline {
                            border-bottom: 2px solid black; /* Line style */
                            margin-top: 2px; /* Space between text and line */
                        }
                        .center {
                            text-align: center; /* Center text */
                        }
                    </style>
                </head>
                <body>
                    ${paysheetContent}
                    <script>
                        window.onload = function() {
                            window.print();  // Trigger print dialog
                            window.close();  // Automatically close the window after printing
                        };
                    </script>
                </body>
            </html>
        `);
    
        // Close the document stream to ensure it loads completely before printing
        printWindow.document.close();
    };
    

    const handlePrintAll = async () => {
        try {
            // Prepare the content for all pay sheets
            const paysheetContents = employees.map(employee => createPaysheetContent(employee)).join('');
            
            // Print the paysheets to the thermal printer
            await printToThermalPrinter(paysheetContents);
            
            // Call the updateLatMonth function after printing
            const response = await updateLatMonth();
            console.log(response.data.message); // Optionally log the success message
    
        } catch (error) {
            console.error('Error during printing or updating monthly records:', error.response ? error.response.data.message : error.message);
        }
    };
    
    // Function to create the paysheet content for an employee
    const createPaysheetContent = (employee) => {
        const month = new Date().toLocaleString('default', { month: 'long' });
        return `
            <div style="margin-bottom: 20px; page-break-after: always;">
                <h2 class="text-xl font-bold text-gray-800 mb-4 center">ඩීඑම්සී පලයිවුඩ් - වැටුප් පත්‍රිකාව</h2>
                <table class="table-auto border-collapse w-full">
                <table class="table-auto border-collapse w-full">
                    <thead>
                        <tr>
                            <th class="border border-gray-300 p-2" style="font-size: 9px;">සේවකයාගේ නම :</th>
                            <th class="border border-gray-300 p-2" style="font-size: 9px;">${employee.firstName} ${employee.secondName}</th>
                        </tr>
                        <tr>
                            <th class="border border-gray-300 p-2" style="font-size: 9px;">සේවක අංකය :</th>
                            <th class="border border-gray-300 p-2" style="font-size: 9px;">${employee.employeeId}</th>
                        </tr>
                        <tr>
                            <th class="border border-gray-300 p-2" style="font-size: 9px;">මාසය :</th>
                            <th class="border border-gray-300 p-2" style="font-size: 9px;">${month}</th>
                        </tr>
                    </thead>
                    <tbody style="font-size: 2px;">
                        ${createPaysheetRows(employee)}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Function to create the rows of the paysheet
    const createPaysheetRows = (employee) => {
        const advancesTotal = employee.advances.reduce((total, advance) => total + advance.monthlyDeduction, 0);
        const loansTotal = employee.loans.reduce((total, loan) => total + loan.monthlyDeduction, 0);
        const foodConsumptionTotal = employee.foodConsumptionRecords.reduce((total, record) => total + record.totalAmount, 0);
        const deductionsTotal = advancesTotal + loansTotal + foodConsumptionTotal + employee.EPF;
    
        return `
            <tr><td class="border border-gray-300 " style="font-size: 7px;">පැමිණි දිනය</td><td class="border border-gray-300 p-1" style="font-size: 7px;">${employee.workingDays}</td></tr>
            <tr><td class="border border-gray-300 ">අතිකාල</td><td class="border border-gray-300 ">${employee.OTEarning.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-1">පැමිණීමේ දීමනාව</td><td class="border border-gray-300 p-2">${(employee.attendanceAllowance1 + employee.attendanceAllowance2).toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">අයවැය දීමනාව</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">අමතර අත්තම්</td><td class="border border-gray-300 p-2">${employee.doubleShiftEarning.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">දිරි දීමනාව</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">අවදානම් දීමනාව</td><td class="border border-gray-300 p-2">${(employee.riskAllowance1 + employee.riskAllowance2).toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">කොළඹ</td><td class="border border-gray-300 p-2">${employee.colomboAllowance.toFixed(2)}</td></tr>
            <tr>
                <td className="border border-gray-300 p-2" colSpan="2"></td>
            </tr>
            <tr>
                <td className="border border-gray-300 p-2"> දළ වැටුප </td> 
                <td className="border border-gray-300 p-2">${((employee.colomboAllowance)+
                (employee.riskAllowance1 + employee.riskAllowance2)+
                (employee.incomeAllowance)+
                (employee.doubleShiftEarning)+
                (employee.incomeAllowance)+
                (employee.attendanceAllowance1 + employee.attendanceAllowance2)+
                (employee.OTEarning)).toFixed(2)}
                <div className="border-b border-black mt-1 underline"></div>
                </td>
            </tr>
            <tr>
                <td className="border border-gray-300 p-2" colSpan="2"></td>
            </tr>
            <tr><td class="border border-gray-300 p-2">අර්ථ සාදක</td><td class="border border-gray-300 p-2">${employee.EPF.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">අත්තිකාරම්</td><td class="border border-gray-300 p-2">${employee.advances.reduce((total, advance) => total + advance.monthlyDeduction, 0).toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">බැංකු ගිණුම් සඳහා </td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">ණය මුදල</td><td class="border border-gray-300 p-2">${employee.loans.reduce((total, loan) => total + loan.monthlyDeduction, 0).toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">පසුගිය හිඟ</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">කෑම සඳහා </td><td class="border border-gray-300 p-2">${employee.foodConsumptionRecords.reduce((total, record) => total + record.totalAmount, 0).toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">අවුරුදු අත්තිකාරම්</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">රුහුනු සංවර්ධන ණය</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">රඳවා ගැනීම්</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">බෝනස්</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">සමිති</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">පොත් ණය</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr>
                <td className="border border-gray-300 p-2" colSpan="2"></td>
            </tr>
            <tr><td class="border border-gray-300 p-2">මුළු අඩුකිරීම්</td><td class="border border-gray-300 p-2">${(
                parseFloat(employee.advances.reduce((total, advance) => total + advance.monthlyDeduction, 0)) +
                parseFloat(employee.loans.reduce((total, loan) => total + loan.monthlyDeduction, 0)) +
                parseFloat(employee.foodConsumptionRecords.reduce((total, record) => total + record.totalAmount, 0)) +
                parseFloat(employee.EPF)
            ).toFixed(2)}</td></tr>
            <tr>
                <td className="border border-gray-300 p-2" colSpan="2"></td>
            </tr>
            <tr>
                <td class="border border-gray-300 p-2">ශුද්ධ වැටුප</td><td class="border border-gray-300 p-2">${employee.netSalary.toFixed(2)}
                    <div className="border-b border-black mt-1"></div>
                    <div className="border-b border-black mt-1"></div> 
                </td>
            </tr>
        `;
    }
    
    // Function to print content to the thermal printer
    const printToThermalPrinter = async (content) => {
        // Create a new window for printing
        const printWindow = window.open('', '', 'width=400,height=400');
    
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Pay Sheet</title>
                    <style>
                        body {
                            font-family: 'Noto Sans Sinhala', sans-serif;
                            margin: 0;
                            padding: 4px;
                            font-size: 8px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        td {
                            border: 1px solid gray;
                            padding: 4px;
                            font-size: 7px;
                        }
                        .underline {
                            border-bottom: 2px solid black; /* Line style */
                            margin-top: 2px; /* Space between text and line */
                        }
                        .center {
                            text-align: center; /* Center text */
                        }
                    </style>
                </head>
                <body>
                    ${content}
                </body>
                <script>
                    window.onload = function() {
                        window.print();
                        window.close();
                    };
                </script>
            </html>
        `);
        
        printWindow.document.close();
    }
    
    

    return (
        <div className="flex p-6 bg-gray-100 w-full">
            <div className="w-3/4 p-4">

                <div className="flex space-x-6 mb-6">
                    <div className="flex-2/3 w-2/3">
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Employee Management Dashboard</h1>
                
                        <label htmlFor="search" className="block text-lg font-medium text-gray-700">
                            Search employee name / ID / position:
                        </label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Enter search term"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>
                    <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Employee Summary</h2>
                        <p className="text-gray-700">
                            Total Employees: <span className="font-semibold">{totalEmployees}</span>
                        </p>
                        <p className="text-gray-700">
                            Total Monthly Payment: <span className="font-semibold">{totalPayment}</span>
                        </p>
                    </div>
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
                                                employee.salaryRate.toFixed(2)
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
                                                employee.monthPayment.toFixed(2)
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
                                                employee.OTHrs.toFixed(2)
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
                                                employee.OTRate.toFixed(2)
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
                                                employee.OTEarning.toFixed(2)
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
                                                employee.incomeAllowance.toFixed(2)
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
                                                employee.doubleShiftEarning.toFixed(2)
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
                                                employee.attendanceAllowance1.toFixed(2)
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
                                                employee.attendanceAllowance2.toFixed(2)
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
                                                employee.riskAllowance1.toFixed(2)
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
                                                employee.riskAllowance2.toFixed(2)
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
                                                employee.colomboAllowance.toFixed(2)
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
                                                employee.attendance25.toFixed(2)
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
                                                employee.grossSalary.toFixed(2)
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
                                                employee.EPF.toFixed(2)
                                            )}
                                        </td>
                                        
                                        <td className="border border-gray-300 p-2">
                                            {employee.advances.reduce((total, advance) => total + advance.monthlyDeduction, 0).toFixed(2)}
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            {employee.loans.reduce((total, loan) => total + loan.monthlyDeduction, 0).toFixed(2)}
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
                                                employee.totalDeduction.toFixed(2)
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
                                                employee.netSalary.toFixed(2)
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
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded border-t-8 mt-4"
                    onClick={handlePrintAll}
                >
                    සියලු වැටුප් පත්‍රය මුද්‍රණය කරන්න {/* Print All Pay Sheets */}
                </button>
            </div>
            <div  className="w-1/4 p-4 sinhala-font"> {/* Apply the sinhala-font class here */}
                <div className="ml-8">
                    <div id="paysheet-content" className="bg-white p-6 rounded-lg shadow-md">
                        {selectedEmployee ? (
                            <div className="text-gray-700">
                                <h2 class="text-xl font-bold text-gray-800 mb-4 center">ඩීඑම්සී පලයිවුඩ් - වැටුප් පත්‍රිකාව</h2>
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <td colSpan="2" className="border border-gray-300 p-2">
                                                <div className="flex justify-between p-2">
                                                    <span>සේවකයාගේ නම :</span>
                                                    <span>{`${selectedEmployee.firstName} ${selectedEmployee.secondName}`}</span>
                                                </div>
                                                <div className="flex justify-between p-2">
                                                    <span>සේවක අංකය :</span>
                                                    <span>{selectedEmployee.employeeId}</span>
                                                </div>
                                                <div className="flex justify-between p-2">
                                                    <span>මාසය :</span>
                                                    <span>{new Date().toLocaleString('default', { month: 'long' })}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody className="table-auto border-collapse w-full" >
                                        <tr>
                                            <td className="border border-gray-300 p-2"> පැමිණි දිනය</td> {/* Working Days */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.workingDays}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">අතිකාල</td> {/* OT Earnings */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.OTEarning.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">පැමිණීමේ දීමනාව</td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{(selectedEmployee.attendanceAllowance1 + selectedEmployee.attendanceAllowance2).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">අයවැය දීමනාව </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">අමතර අත්තම් </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.doubleShiftEarning.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">දිරි දීමනාව </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">අවදානම් දීමනාව </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{(selectedEmployee.riskAllowance1 + selectedEmployee.riskAllowance2).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">කොළඹ </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.colomboAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2" colSpan="2"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2"> දළ වැටුප </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{((selectedEmployee.colomboAllowance)+
                                            (selectedEmployee.riskAllowance1 + selectedEmployee.riskAllowance2)+
                                            (selectedEmployee.incomeAllowance)+
                                            (selectedEmployee.doubleShiftEarning)+
                                            (selectedEmployee.incomeAllowance)+
                                            (selectedEmployee.attendanceAllowance1 + selectedEmployee.attendanceAllowance2)+
                                            (selectedEmployee.OTEarning)).toFixed(2)}
                                            <div className="border-b border-black mt-1 underline"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2" colSpan="2"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">අර්ථ සාදක </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.EPF.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">අත්තිකාරම් </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">
                                                {selectedEmployee.advances.reduce((total, advance) => total + advance.monthlyDeduction, 0).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">බැංකු ගිණුම් සඳහා </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">ණය මුදල </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">
                                                {selectedEmployee.loans.reduce((total, loan) => total + loan.monthlyDeduction, 0).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">පසුගිය හිඟ </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">කෑම සඳහා </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">
                                                {selectedEmployee.foodConsumptionRecords.reduce((total, record) => total + record.totalAmount, 0).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">අවුරුදු අත්තිකාරම් </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">රුහුනු සංවර්ධන ණය </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">රඳවා ගැනීම් </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">බෝනස් </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">සමිති </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">පොත් ණය </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2" colSpan="2"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">මුළු අඩුකිරීම් </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">
                                                {(
                                                    parseFloat(selectedEmployee.advances.reduce((total, advance) => total + advance.monthlyDeduction, 0)) +
                                                    parseFloat(selectedEmployee.loans.reduce((total, loan) => total + loan.monthlyDeduction, 0)) +
                                                    parseFloat(selectedEmployee.foodConsumptionRecords.reduce((total, record) => total + record.totalAmount, 0)) +
                                                    parseFloat(selectedEmployee.EPF)
                                                ).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-4" colSpan="2"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">ශුද්ධ වැටුප </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">
                                                {selectedEmployee.netSalary.toFixed(2)}
                                                <div className="border-b border-black mt-1 underline"></div> {/* First underline */}
                                                <div className="border-b border-black mt-1 underline"></div> {/* Second underline */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500">සේවකයෙකු තෝරාගෙන වැටුප් පත්‍රය බලන්න.</p> 
                        )}
                    </div>
                    {selectedEmployee && (
                        <button
                            onClick={() => handlePrint()}
                            className="bg-green-500 text-white py-2 px-4 rounded border-t-8 mt-4"
                        >
                            වැටුප් පත්‍රය මුද්‍රණය කරන්න {/* Print Pay Sheet */}
                        </button>
                    )}
                </div>
            </div>
        </div>   
    );
}
