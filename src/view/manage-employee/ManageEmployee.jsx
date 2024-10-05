
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
    const handlePaySheet = (employee) => {
        setSelectedEmployee(employee);
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

    const totalPayment = filteredEmployees.reduce((acc, employee) => acc + employee.netSalary, 0).toLocaleString('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 2 });
    const totalEmployees = filteredEmployees.length;

    const handlePrint = () => {
        // Get the content of the paysheet div
        const paysheetContent = document.getElementById('paysheet-content').innerHTML;
    
        // Open a new window
        const printWindow = window.open('', '', 'width=400,height=600');
    
        // Write the HTML content to the new window
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Pay Sheet</title>
                    <style>
                        /* Add any custom styles for the print version */
                        body {
                            font-family: 'Noto Sans Sinhala', sans-serif;
                            margin: 0;
                            padding: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid gray;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f4f4f4;
                        }
                    </style>
                </head>
                <body>
                    ${paysheetContent}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.close();
                        };
                    </script>
                </body>
            </html>
        `);
    
        // Close the document stream to ensure it loads completely before printing
        printWindow.document.close();
    };

    const handlePrintAll = async () => {
        // Prepare the content for all pay sheets
        const paysheetContents = employees.map(employee => createPaysheetContent(employee)).join('');
    
        // Print the paysheets to the thermal printer
        await printToThermalPrinter(paysheetContents);
    }
    
    // Function to create the paysheet content for an employee
    const createPaysheetContent = (employee) => {
        return `
            <div style="margin-bottom: 20px; page-break-after: always;">
                <h2 class="text-xl font-bold text-gray-800 mb-4">වැටුප් පත්‍රය - ${employee.firstName} ${employee.secondName}</h2>
                <table class="table-auto border-collapse w-full">
                    <thead>
                        <tr>
                            <th class="border border-gray-300 p-2">ක්ෂේත‍්‍රය</th>
                            <th class="border border-gray-300 p-2">අගය</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${createPaysheetRows(employee)}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Function to create the rows of the paysheet
    const createPaysheetRows = (employee) => {
        const month = new Date().toLocaleString('default', { month: 'long' });
        const advancesTotal = employee.advances.reduce((total, advance) => total + advance.monthlyDeduction, 0);
        const loansTotal = employee.loans.reduce((total, loan) => total + loan.monthlyDeduction, 0);
        const foodConsumptionTotal = employee.foodConsumptionRecords.reduce((total, record) => total + record.totalAmount, 0);
        const deductionsTotal = advancesTotal + loansTotal + foodConsumptionTotal + employee.EPF;
    
        return `
            <tr><td class="border border-gray-300 p-2">සේවකයාගේ නම</td><td class="border border-gray-300 p-2">${employee.firstName} ${employee.secondName}</td></tr>
            <tr><td class="border border-gray-300 p-2">සේවක අංකය</td><td class="border border-gray-300 p-2">${employee.employeeId}</td></tr>
            <tr><td class="border border-gray-300 p-2">මාසය</td><td class="border border-gray-300 p-2">${month}</td></tr>
            <tr><td class="border border-gray-300 p-2">කටයුතු කළ දින</td><td class="border border-gray-300 p-2">${employee.workingDays}</td></tr>
            <tr><td class="border border-gray-300 p-2">උපරිම ආදායම්</td><td class="border border-gray-300 p-2">${employee.OTEarning.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">ආදායම් ලැබීම්</td><td class="border border-gray-300 p-2">${employee.incomeAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">දුණු සංගම ආදායම්</td><td class="border border-gray-300 p-2">${employee.doubleShiftEarning.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">ආපසුගිය භාණ්ඩ</td><td class="border border-gray-300 p-2">${(employee.attendanceAllowance1 + employee.attendanceAllowance2).toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">අවදානම් භාණ්ඩ</td><td class="border border-gray-300 p-2">${(employee.riskAllowance1 + employee.riskAllowance2).toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">කොළඹ භාණ්ඩ</td><td class="border border-gray-300 p-2">${employee.colomboAllowance.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">මුළු වැටුප</td><td class="border border-gray-300 p-2">${employee.grossSalary.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">අත්‍යාවශ්‍ය දීමනා</td><td class="border border-gray-300 p-2">${advancesTotal.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">ණය</td><td class="border border-gray-300 p-2">${loansTotal.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">ආහාර පරිභෝජනය</td><td class="border border-gray-300 p-2">${foodConsumptionTotal.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">EPF</td><td class="border border-gray-300 p-2">${employee.EPF.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">මුළු අඩුකම්</td><td class="border border-gray-300 p-2">${deductionsTotal.toFixed(2)}</td></tr>
            <tr><td class="border border-gray-300 p-2">නිවැරදි වැටුප</td><td class="border border-gray-300 p-2">${employee.netSalary.toFixed(2)}</td></tr>
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
                            padding: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        td {
                            border: 1px solid gray;
                            padding: 8px;
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
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded border-t-8 mt-4"
                            onClick={handlePrintAll}
                        >
                            සියලු වැටුප් පත්‍රය මුද්‍රණය කරන්න {/* Print All Pay Sheets */}
                        </button>
                    </div>
                </div>
            </div>
            <div  className="w-1/4 p-4 sinhala-font"> {/* Apply the sinhala-font class here */}
                <div className="ml-8">
                    <div id="paysheet-content" className="bg-white p-6 rounded-lg shadow-md">
                        {selectedEmployee ? (
                            <div className="text-gray-700">
                                <h2 class="text-xl font-bold text-gray-800 mb-4">වැටුප් පත්‍රය - ${selectedEmployee.firstName} ${selectedEmployee.secondName}</h2>
                                <table className="table-auto border-collapse w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 p-2">ක්ෂේත‍්‍රය</th> {/* Field */}
                                            <th className="border border-gray-300 p-2">අගය</th> {/* Value */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 p-2"> සේවකයාගේ නම </td> {/* Employee Name */}
                                            <td className="border border-gray-300 p-2">{`${selectedEmployee.firstName} ${selectedEmployee.secondName}`}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2"> සේවක අංකය </td> {/* Employee Number */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.employeeId}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2"> මාසය </td> {/* Month */}
                                            <td className="border border-gray-300 p-2">{new Date().toLocaleString('default', { month: 'long' })}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2"> කටයුතු කළ දින </td> {/* Working Days */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.workingDays}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">උපරිම ආදායම් </td> {/* OT Earnings */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.OTEarning.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">ආදායම් ලැබීම් </td> {/* Income Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.incomeAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">දුණු සංගම ආදායම් </td> {/* Double Shift Earnings */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.doubleShiftEarning.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">ආපසුගිය භාණ්ඩ </td> {/* Attendance Allowance */}
                                            <td className="border border-gray-300 p-2">{(selectedEmployee.attendanceAllowance1 + selectedEmployee.attendanceAllowance2).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">අවදානම් භාණ්ඩ </td> {/* Risk Allowance */}
                                            <td className="border border-gray-300 p-2">{(selectedEmployee.riskAllowance1 + selectedEmployee.riskAllowance2).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">කොළඹ භාණ්ඩ </td> {/* Colombo Allowance */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.colomboAllowance.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">මුළු වැටුප </td> {/* Gross Salary */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.grossSalary.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">අත්‍යාවශ්‍ය දීමනා </td> {/* Advances */}
                                            <td className="border border-gray-300 p-2">
                                                {selectedEmployee.advances.reduce((total, advance) => total + advance.monthlyDeduction, 0).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">ණය </td> {/* Loans */}
                                            <td className="border border-gray-300 p-2">
                                                {selectedEmployee.loans.reduce((total, loan) => total + loan.monthlyDeduction, 0).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">ආහාර පරිභෝජනය </td> {/* Food Consumption */}
                                            <td className="border border-gray-300 p-2">
                                                {selectedEmployee.foodConsumptionRecords.reduce((total, record) => total + record.totalAmount, 0).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">EPF </td> {/* EPF */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.EPF.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2">මුළු අඩුකම් </td> {/* Total Deductions */}
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
                                            <td className="border border-gray-300 p-2">නිවැරදි වැටුප </td> {/* Net Salary */}
                                            <td className="border border-gray-300 p-2">{selectedEmployee.netSalary.toFixed(2)}</td>
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
