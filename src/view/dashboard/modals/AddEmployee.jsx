import React, { useState, useEffect, useRef} from 'react';
import { createEmployee, getAllEmployees, updateEmployee, deleteEmployee } from '../../../service/ApiServices';
import * as XLSX from 'xlsx'; // Import XLSX library for parsing Excel files


export function AddEmployee() {
    const [totalEmployees, setTotalEmployees] = useState(0); // Holds the total number of employees
    const [employees, setEmployees] = useState([]); // Holds the list of employees
    const [bulkData, setBulkData] = useState([]); // Holds the parsed data from Excel
    const fileInputRef = useRef(null);
    const [editingEmployee, setEditingEmployee] = useState(null); // Holds the employee being edited

    

    // State for form inputs
    const [formData, setFormData] = useState({
        _id:0,
        employeeId: '',
        firstName: '',
        secondName: '',
        district: '',
        address: '',
        phoneNumber: '',
        salaryRate: '',
        otId: '',
    });

    const otIdMapping = {
        JT001: "6 months experience or more",
        JT002: "Less than 6 months experience",
        JT003: "Don't have Attendance allowance",
    };
    

    // Fetch all employees and update state
    const fetchEmployees = async () => {
        try {
            const response = await getAllEmployees();
            setEmployees(response.data);
            setTotalEmployees(response.data.length); // Update total employees count
            generateEmployeeId(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const generateEmployeeId = (employees) => {
        if (employees.length === 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                employeeId: 'EMP0001',
            }));
        } else {
            const lastEmployeeId = employees[employees.length - 1].employeeId;
            const newIdNumber = parseInt(lastEmployeeId.slice(3)) + 1;
            const newEmployeeId = `EMP${String(newIdNumber).padStart(4, '0')}`;
            setFormData((prevFormData) => ({
                ...prevFormData,
                employeeId: newEmployeeId,
            }));
        }
    };

    // Fetch employees on component mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        const newFormData = {
            ...formData,
            salaryRate: parseFloat(formData.salaryRate),  // Convert to number
        };

        const { _id, ...dataToSubmit } = newFormData;
        

        try {
            if (editingEmployee) {
                // Update existing employee
                await updateEmployee(formData._id, dataToSubmit);
            } else {
                // Create new employee
                await createEmployee(dataToSubmit);
            }

            // Fetch updated employees list after adding or updating the employee
            fetchEmployees();

            // Clear form fields after submission
            setFormData({
                _id:0,
                employeeId: '',
                firstName: '',
                secondName: '',
                district: '',
                address: '',
                phoneNumber: '',
                salaryRate: '',
                otId: '',
            });
            setEditingEmployee(null); // Clear editing mode

            // generateEmployeeId(response.data);

        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    // Handle Excel file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            setBulkData(data); // Store the parsed data
        };
        reader.readAsBinaryString(file);
    };

    // Handle bulk upload submission
    const handleBulkUpload = async () => {
        let lastEmployeeId = employees.length > 0 ? employees[employees.length - 1].employeeId : 'EMP0000';
        let newIdNumber = parseInt(lastEmployeeId.slice(3)) + 1;

        const dataToSubmit = bulkData.map((employee) => {
            const employeeId = `EMP${String(newIdNumber).padStart(4, '0')}`;
            newIdNumber++;
            return {
                employeeId,
                ...employee,
            };
        });

        try {
            for (const employee of dataToSubmit) {
                await createEmployee(employee); // Submit each employee to the backend
            }

            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset the file input value
            }

            setBulkData([]); // Clear the bulk data after submission

            // Fetch updated employees list after adding the new employees
            fetchEmployees();
        } catch (error) {
            console.error('Error during bulk upload:', error);
        }
    };

    // Handle editing an employee
    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setFormData({
            ...employee,
            otId: employee.otId || "", // Ensure otId is set correctly
        });
    };
    
    // Handle deleting an employee
    const handleDelete = async () => {
        try {
            await deleteEmployee(formData._id);
            fetchEmployees();
            setFormData({
                _id:0,
                employeeId: '',
                firstName: '',
                secondName: '',
                district: '',
                address: '',
                phoneNumber: '',
                salaryRate: '',
                otId: '',
            });
            setEditingEmployee(null);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="relative">
            {/* Left Side: Add Employee Form */}
            <div className="w-2/3">
                <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    {/* Employee ID and First Name */}
                    <div className="mb-4 flex space-x-4">
                        <div className="flex-1">
                            <label className="block mb-2">Employee ID:</label>
                            <input 
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                readOnly // Make the field read-only
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2">First Name:</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                value={formData.firstName}
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                    </div>

                    {/* Second Name and District */}
                    <div className="mb-4 flex space-x-4">
                        <div className="flex-1">
                            <label className="block mb-2">Second Name:</label>
                            <input 
                                type="text" 
                                name="secondName" 
                                value={formData.secondName}
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2">District:</label>
                            <input 
                                type="text" 
                                name="district" 
                                value={formData.district}
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                    </div>

                    {/* Address and Phone Number */}
                    <div className="mb-4 flex space-x-4">
                        <div className="flex-1">
                            <label className="block mb-2">Address:</label>
                            <input 
                                type="text" 
                                name="address" 
                                value={formData.address}
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2">Phone Number:</label>
                            <input 
                                type="text" 
                                name="phoneNumber" 
                                value={formData.phoneNumber}
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                    </div>

                    {/* Position and OT ID */}
                    <div className="mb-4 flex space-x-4">
                        <div className="flex-1">
                            <label className="block mb-2">Daily Salary Rate:</label>
                            <input 
                                type="number" 
                                name="salaryRate" 
                                step="0.01"  // This ensures the input allows decimal values like 1234.54
                                value={formData.salaryRate}
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2">OT ID:</label>
                            <select 
                                name="otId" 
                                value={formData.otId}
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select OT ID</option>
                                {Object.keys(otIdMapping).map((key) => (
                                    <option key={key} value={key}>
                                        {otIdMapping[key]}
                                    </option>
                                ))}
                            </select>
                            {/* <input 
                                type="text" 
                                name="otId" 
                                value={formData.otId}
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded" 
                            /> */}
                        </div>
                    </div>

                    {/* <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Employee</button> */}
                    {/* Submit, Update, and Delete Buttons */}
                    <div className="mb-4">
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                        >
                            {editingEmployee ? 'Update Employee' : 'Add Employee'}
                        </button>
                        {editingEmployee && (
                            <button 
                                type="button" 
                                onClick={handleDelete} 
                                className="bg-red-500 text-white py-2 px-4 rounded"
                            >
                                Delete Employee
                            </button>
                        )}
                    </div>
                </form>

                {/* Right Side: Total Employees and Bulk Upload */}
                <div className="w-1/3">
                    {/* Total Employees Section */}
                    <div className="absolute top-0 right-0 mt-4 mr-4 p-6 bg-orange-100 rounded-lg shadow-lg">
                        <h3 className="text-3xl font-bold mb-2 text-center">Total Employees: {totalEmployees}</h3>
                    </div>

                    {/* Bulk Upload Section */}
                    <div className="absolute top-10 right-0 mt-28 mr-4 p-6 bg-orange-100 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Bulk Upload (Excel)</h3>
                        <div className="mb-4">
                            <label className="block mb-2">Choose File:</label>
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} ref={fileInputRef} className="w-full p-2 border rounded" />
                        </div>
                        <button onClick={handleBulkUpload} className="px-4 py-2 bg-green-500 text-white rounded w-full">Submit</button>
                    </div>
                </div> 
            </div>

            {/* Table to display employees */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Employee List</h2>
                <table className="w-full table-auto border-collapse rounded-lg shadow-lg">
                    <thead className="bg-orange-100">
                        <tr>
                            <th className="border-4 px-4 py-4">Employee ID</th> {/* Increased padding on y-axis (py-4) */}
                            <th className="border-4 px-4 py-4">First Name</th>
                            <th className="border-4 px-4 py-4">Second Name</th>
                            <th className="border-4 px-4 py-4">District</th>
                            <th className="border-4 px-4 py-4">Address</th>
                            <th className="border-4 px-4 py-4">Phone Number</th>
                            <th className="border-4 px-4 py-4">Salary Rate</th>
                            <th className="border-4 px-4 py-4">OT ID</th>
                            <th className="border-4 py-4 px-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.employeeId}>
                                <td className="border px-4 py-2">{employee.employeeId}</td>
                                <td className="border px-4 py-2">{employee.firstName}</td>
                                <td className="border px-4 py-2">{employee.secondName}</td>
                                <td className="border px-4 py-2">{employee.district}</td>
                                <td className="border px-4 py-2">{employee.address}</td>
                                <td className="border px-4 py-2">{employee.phoneNumber}</td>
                                <td className="border px-4 py-2">{employee.salaryRate}</td>
                                <td className="border px-4 py-2">
                                    {otIdMapping[employee.otId] || "Unknown OT ID"}
                                </td>
                                {/* otIdMapping<td className="border px-4 py-2">{employee.otId}</td> */}
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => handleEdit(employee)}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded"
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
    );
}