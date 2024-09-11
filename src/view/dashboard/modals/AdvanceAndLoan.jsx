
import './AdvanceAndLoan.css';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { findEmployee, getEmployeeDetails, createLoan, createAdvance, updateLoan, updateAdvance, deleteAdvance, deleteLoan, updateEmployee  } from '../../../service/ApiServices';

export function AdvanceAndLoan() {
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [error, setError] = useState('');
    const [showLoanForm, setShowLoanForm] = useState(false);
    const [showAdvanceForm, setShowAdvanceForm] = useState(false);
    const [loanForm, setLoanForm] = useState({ amount: '', date: '', duration: '', monthlyDeduction: '', isDeductionActive: true, remainingAmount: '', name: '' });
    const [advanceForm, setAdvanceForm] = useState({ amount: '', date: '', isDeducted: true, remainingAmount: '' });
    const [empNotes, setEmpNotes] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const loanType = {
        LT001: "Socity Loan",
        LT002: "Noraml Loan",
    };

    // Debounced search function
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const handleSearch = async (name) => {
        try {
            if (!name) {
                setEmployees([]);
                return;
            }
            const response = await findEmployee({ name, limit: 3 });
            setEmployees(response.data);
            setError('');
        } catch (err) {
            setError('Employee not found or an error occurred');
            setEmployees([]);
        }
    };

    const debouncedSearch = debounce(handleSearch, 300);

    const handleEmployeeSelect = async (id) => {
        try {
            const response = await getEmployeeDetails(id);
            setSelectedId(id)
            setSelectedEmployee(response.data);
            setName(`${response.data.firstName} ${response.data.secondName}`);
            setEmployees([]);
            setEmpNotes(response.data.notes);
        } catch (err) {
            setError('Error fetching employee details');
        }
    };


    const handleInput = (e) => {
        setEmpNotes(e.target.value)
    }


    const handleNoteSubmit = async (e) => {

        const newEmployee = {
            ...selectedEmployee,
            notes: empNotes,  
        };
        try {
            await updateEmployee(selectedId, newEmployee);
            handleEmployeeSelect(selectedId);
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    const handleAdvanceFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAdvanceForm({
            ...advanceForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLoanFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoanForm({
            ...loanForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLoanFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await createLoan({ ...loanForm, employee: selectedEmployee._id });
            setShowLoanForm(false);
            setLoanForm({ amount: '', date: '', duration: '', monthlyDeduction: '', isDeductionActive: true, remainingAmount: '', name: ''});
            // Optionally refresh employee details to reflect changes
            const response = await getEmployeeDetails(selectedEmployee._id);
            setSelectedEmployee(response.data);
        } catch (err) {
            setError('Error creating loan');
        }
    };

    const handleAdvanceFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAdvance({ ...advanceForm, employee: selectedEmployee._id });
            setShowAdvanceForm(false);
            setAdvanceForm({ amount: '', date: '', isDeducted: true, remainingAmount: '' });
            // Optionally refresh employee details to reflect changes
            const response = await getEmployeeDetails(selectedEmployee._id);
            setSelectedEmployee(response.data);
        } catch (err) {
            setError('Error creating advance');
        }
    };

    const toggleAdvanceDeduction = async (advanceId) => {
        try {
            const advanceToUpdate = selectedEmployee.advances.find(advance => advance._id === advanceId);
            const updatedAdvance = { ...advanceToUpdate, isDeducted: !advanceToUpdate.isDeducted };
            await updateAdvance(advanceId, updatedAdvance);
            // Refresh employee details to reflect changes
            const response = await getEmployeeDetails(selectedEmployee._id);
            setSelectedEmployee(response.data);
        } catch (err) {
            setError('Error updating advance');
        }
    };

    const toggleLoanDeduction = async (loanId) => {
        try {
            const loanToUpdate = selectedEmployee.loans.find(loan => loan._id === loanId);
            const updatedLoan = { ...loanToUpdate, isDeductionActive: !loanToUpdate.isDeductionActive };
            await updateLoan(loanId, updatedLoan);
            // Refresh employee details to reflect changes
            const response = await getEmployeeDetails(selectedEmployee._id);
            setSelectedEmployee(response.data);
        } catch (err) {
            setError('Error updating loan');
        }
    };

    const handleLoanDelete = async (loanId) => {
        try {
            await deleteLoan(loanId);
            // Refresh employee details to reflect changes
            const response = await getEmployeeDetails(selectedEmployee._id);
            setSelectedEmployee(response.data);
        } catch (err) {
            setError('Error deleting loan');
        }
    };
    
    const handleAdvanceDelete = async (advanceId) => {
        try {
            await deleteAdvance(advanceId);
            // Refresh employee details to reflect changes
            const response = await getEmployeeDetails(selectedEmployee._id);
            setSelectedEmployee(response.data);
        } catch (err) {
            setError('Error deleting advance');
        }
    };
    

    

    return (
        
        <div className="flex">
            <div className="w-3/4 p-4">
                <h2 className="text-2xl font-bold mb-4">Manage Employee Advance & Loan</h2>
                
                <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="name" className="block text-lg font-medium mb-1">Enter Employee Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                debouncedSearch(e.target.value);
                            }}
                            className="border p-2 w-full"
                        />
                    </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="dropdown-container">
                    {employees.length > 0 && (
                        <div className="dropdown-list">
                            {employees.map(emp => (
                                <div
                                    key={emp._id}
                                    className="dropdown-item"
                                    onClick={() => handleEmployeeSelect(emp._id)}
                                >
                                    {emp.firstName} {emp.secondName} - {emp.employeeId}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedEmployee && (
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">Employee Details</h3>
                        <table className="mt-2 border-collapse border border-gray-200 w-full">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2">Employee ID</th>
                                    <th className="border border-gray-300 p-2">First Name</th>
                                    <th className="border border-gray-300 p-2">Total Socity Loan Amount (LKR)</th>
                                    <th className="border border-gray-300 p-2">Total Other Loan Amount (LKR)</th>
                                    <th className="border border-gray-300 p-2">Total Advance Amount (LKR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2">{selectedEmployee.employeeId}</td>
                                    <td className="border border-gray-300 p-2">{selectedEmployee.firstName}</td>
                                    <td className="border border-gray-300 p-2">
                                        {selectedEmployee.loans
                                        .filter(loan => loan.name === "LT001")  // Filter loans where name is "LT001"
                                        .reduce((total, loan) => total + loan.amount, 0)}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {selectedEmployee.loans
                                        .filter(loan => loan.name === "LT002")  // Filter loans where name is "LT001"
                                        .reduce((total, loan) => total + loan.amount, 0)}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {selectedEmployee.advances.reduce((total, advance) => total + advance.amount, 0)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h4 className="text-lg font-semibold mt-4">
                            <button 
                                className="bg-blue-500 text-white py-1 px-3 rounded"
                                onClick={() => setShowLoanForm(!showLoanForm)}
                            >
                                {showLoanForm ? 'Cancel' : 'Take Loan'}
                            </button>
                        </h4>

                        {showLoanForm && (
                            <form onSubmit={handleLoanFormSubmit} className="mt-4">
                                <div className="flex flex-col space-y-2">
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="Loan Amount"
                                        value={loanForm.amount}
                                        onChange={handleLoanFormChange}
                                        className="border p-2"
                                        required
                                    />
                                    <select 
                                        type="text"
                                        name="name" 
                                        value={loanForm.name}
                                        onChange={handleLoanFormChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select loan Type</option>
                                        {Object.keys(loanType).map((key) => (
                                            <option key={key} value={key}>
                                                {loanType[key]}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="date"
                                        name="date"
                                        placeholder="Date"
                                        value={loanForm.date}
                                        onChange={handleLoanFormChange}
                                        className="border p-2"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="duration"
                                        placeholder="Duration (months)"
                                        value={loanForm.duration}
                                        onChange={handleLoanFormChange}
                                        className="border p-2"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="monthlyDeduction"
                                        placeholder="Monthly Deduction"
                                        value={loanForm.monthlyDeduction}
                                        onChange={handleLoanFormChange}
                                        className="border p-2"
                                        required
                                    />
                                    
                                    <div className="flex items-center">
                                        <label htmlFor="isDeductionActive" className="mr-2">Deduction Active</label>
                                        <label className="toggle-switch">
                                            <input 
                                                id="isDeductionActive" 
                                                type="checkbox" 
                                                name="isDeductionActive"
                                                checked={loanForm.isDeductionActive}
                                                onChange={handleLoanFormChange}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <input
                                        type="number"
                                        name="remainingAmount"
                                        placeholder="Remaining Amount"
                                        value={loanForm.remainingAmount}
                                        onChange={handleLoanFormChange}
                                        className="border p-2"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white py-2 px-4 rounded"
                                    >
                                        Submit Loan
                                    </button>
                                </div>
                            </form>
                        )}

                        <h4 className="text-lg font-semibold mt-4">
                            <button 
                                className="bg-blue-500 text-white py-1 px-3 rounded"
                                onClick={() => setShowAdvanceForm(!showAdvanceForm)}
                            >
                                {showAdvanceForm ? 'Cancel' : 'Take Advance'}
                            </button>
                        </h4>

                        {showAdvanceForm && (
                            <form onSubmit={handleAdvanceFormSubmit} className="mt-4">
                                <div className="flex flex-col space-y-2">
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="Advance Amount"
                                        value={advanceForm.amount}
                                        onChange={handleAdvanceFormChange}
                                        className="border p-2"
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        placeholder="Date"
                                        value={advanceForm.date}
                                        onChange={handleAdvanceFormChange}
                                        className="border p-2"
                                        required
                                    />
                                    
                                    <div className="flex items-center">
                                        <label htmlFor="isDeducted" className="mr-2">Deducted</label>
                                        <label className="toggle-switch">
                                            <input 
                                                id="isDeducted" 
                                                type="checkbox" 
                                                name="isDeducted"
                                                checked={advanceForm.isDeducted}
                                                onChange={handleAdvanceFormChange}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <input
                                        type="number"
                                        name="remainingAmount"
                                        placeholder="Remaining Amount"
                                        value={advanceForm.remainingAmount}
                                        onChange={handleAdvanceFormChange}
                                        className="border p-2"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white py-2 px-4 rounded"
                                    >
                                        Submit Advance
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Here you can display the existing loans and advances */}
                        <div className="mt-4 mr-30 w-full ">
                            <h4 className="text-2xl font-semibold text-blue-800">Existing Loans</h4>
                            {selectedEmployee.loans.length > 0 ? (
                                <div className='flex flex-wrap gap-4'>
                                    {selectedEmployee.loans.map((loan, index) => (
                                        <div key={index} className="w-1/3 bg-orange-100 rounded-lg shadow-lg border border-gray-300 p-4 mb-4" style={{ height: '300px', overflow: 'auto' }}>
                                            <p><strong>Employee Name:</strong> {name}</p>
                                            <p><strong>Loan Type:</strong> {loanType[loan.name] || "Unknown Loan"}</p>
                                            <p><strong>Amount:</strong> {loan.amount}</p>
                                            <p><strong>Date:</strong> {new Date(loan.date).toLocaleDateString()}</p>
                                            <p><strong>Duration:</strong> {loan.duration} months</p>
                                            <p><strong>Monthly Deduction:</strong> {loan.monthlyDeduction}</p>
                                            <p><strong>Remaining Amount:</strong> {loan.remainingAmount}</p>
                                            <button
                                                onClick={() => toggleLoanDeduction(loan._id)}
                                                className={`px-4 py-2 rounded ${loan.isDeductionActive ? 'bg-green-500' : 'bg-gray-500'}`}
                                            >
                                                {loan.isDeductionActive ? 'Deducting' : 'Not Deducting'}
                                            </button>
                                            <button
                                                onClick={() => handleLoanDelete(loan._id)}
                                                style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
                                            >
                                                Delete Loan
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No loans available.</p>
                            )}
                        </div>

                        <div className="mt-4">
                        <h4 className="text-2xl font-semibold text-blue-800">Existing Advances</h4>
                            {selectedEmployee.advances.length > 0 ? (
                                <div className='flex flex-wrap gap-4'>
                                    {selectedEmployee.advances.map((advance, index) => (
                                        <div key={index} className="w-1/3 bg-orange-100 rounded-lg shadow-lg border-gray-300 p-4 mb-4" style={{ height: '250px', overflow: 'auto' }}>
                                            <p><strong>Employee Name:</strong> {name}</p>
                                            <p><strong>Amount:</strong> {advance.amount}</p>
                                            <p><strong>Date:</strong> {new Date(advance.date).toLocaleDateString()}</p>
                                            <p><strong>Remaining Amount:</strong> {advance.remainingAmount}</p>
                                            <button
                                                onClick={() => toggleAdvanceDeduction(advance._id)}
                                                className={`px-4 py-2 rounded ${advance.isDeducted ? 'bg-green-500' : 'bg-gray-500'}`}
                                            >
                                                {advance.isDeducted ? 'Deducting' : 'Not Deducting'}
                                            </button>
                                            <button
                                                onClick={() => handleAdvanceDelete(advance._id)}
                                                style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
                                            >
                                                Delete Advance
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No advances available.</p>
                            )}
                        </div>

                    </div>
                )}
            </div>

            <div className="w-1/4 p-4">
                <div>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="calendar"
                    />
                </div>
                <form onSubmit={handleNoteSubmit} className="mt-4">
                    <p><strong className="text-2xl font-semibold text-blue-800">Employee Notes:</strong> {name}</p>
                    <textarea
                        className="bg-orange-100 rounded-lg shadow-lg border border-gray-300 p-4 w-full"
                        style={{ height: '550px', overflowY: 'auto', marginTop: '20px' }}
                        value={empNotes}
                        onChange={handleInput}
                    />
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded border-t-8">
                        Update Note
                    </button>
                </form>
            </div>
        </div>
    );
}
