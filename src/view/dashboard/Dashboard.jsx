import React, { useState } from 'react';
import './Dashboard.css';
import { AddEmployee } from './modals/AddEmployee';
import { ManageOTHours } from './modals/ManageOTHours';
import { EmployeeAllowance } from './modals/EmployeeAllowance';
import { EmployeeFoodAllowance } from './modals/EmployeeFoodAllowance';
import { ManageJobType } from './modals/ManageJobType';
import { AdvanceAndLoan} from './modals/AdvanceAndLoan';

export function Dashboard() {
    const [selectedMenu, setSelectedMenu] = useState('add-employee');

    const renderContent = () => {
        switch (selectedMenu) {
            case 'add-employee':
                return <AddEmployee />;
            case 'advance-and-loan':
                return <AdvanceAndLoan />;
            case 'employee-allowance':
                return <EmployeeAllowance />;
            case 'employee-food':
                return <EmployeeFoodAllowance />;
            case 'manage-ot-hours':
                return <ManageOTHours />;
            case 'manage-job-type':
                return <ManageJobType />;
            default:
                return <AddEmployee />;
        }
    };

    return (
        <div className="main-content">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="text-xl font-bold mb-4">Employee Management</h2>
                <ul className="space-y-2">
                    <li>
                        <a href="#add-employee" 
                           className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded"
                           onClick={() => setSelectedMenu('add-employee')}>
                            Add Employee
                        </a>
                    </li>
                    <li>
                        <a href="#advance-and-loan" 
                           className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded"
                           onClick={() => setSelectedMenu('advance-and-loan')}>
                            Employee Advance & loarn
                        </a>
                    </li>
                    <li>
                        <a href="#employee-allowance" 
                           className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded"
                           onClick={() => setSelectedMenu('employee-allowance')}>
                            Manage Allowance
                        </a>
                    </li>
                    <li>
                        <a href="#employee-food" 
                           className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded"
                           onClick={() => setSelectedMenu('employee-food')}>
                            Employee Food
                        </a>
                    </li>
                    <li>
                        <a href="#manage-ot-hours" 
                           className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded"
                           onClick={() => setSelectedMenu('manage-ot-hours')}>
                            Manage OT Hours
                        </a>
                    </li>
                    <li>
                        <a href="#manage-job-type" 
                           className="block px-4 py-2 text-blue-700 hover:bg-blue-100 rounded"
                           onClick={() => setSelectedMenu('manage-job-type')}>
                            Manage Job Type
                        </a>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="main-area">
                {renderContent()}
            </main>
        </div>
    );
}

