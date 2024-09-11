
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { parse } from 'papaparse';
import './ManageItem.css';

export function ManageItem() {
    const [data, setData] = useState([
        { id: 'E001', name: 'John Doe', address: '123 Elm Street', salary: 50000, otHours: 10, status: 'present' },
        { id: 'E002', name: 'Jane Smith', address: '456 Oak Avenue', salary: 60000, otHours: 5, status: 'absent' },
        { id: 'E003', name: 'Alice Johnson', address: '789 Pine Road', salary: 55000, otHours: 8, status: 'present' },
        { id: 'E004', name: 'Bob Brown', address: '101 Maple Lane', salary: 47000, otHours: 12, status: 'present' }
    ]);
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [manualHours, setManualHours] = useState({});

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const wb = XLSX.read(e.target.result, { type: 'array' });
                    const ws = wb.Sheets[wb.SheetNames[0]];
                    const data = XLSX.utils.sheet_to_json(ws);
                    setData(data);
                };
                reader.readAsArrayBuffer(file);
            } else if (file.type === 'text/csv') {
                parse(file, {
                    complete: (results) => {
                        const [header, ...rows] = results.data;
                        const parsedData = rows.map(row => ({
                            id: row[0],
                            name: row[1],
                            address: row[2],
                            salary: parseFloat(row[3]),
                            otHours: parseFloat(row[4])
                        }));
                        setData(parsedData);
                    }
                });
            }
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
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

    const fetchDataFromBackend = async () => {
        setLoading(true);
        try {
            // Replace with your backend API endpoint
            const response = await fetch('/api/employees');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditOTHours = (id, value) => {
        setData(data.map(item =>
            item.id === id ? { ...item, otHours: value } : item
        ));
    };

    const handleAction = (id, action) => {
        setData(data.map(item =>
            item.id === id ? { ...item, status: action } : item
        ));
    };

    const handleManualHoursChange = (id, value) => {
        setManualHours({
            ...manualHours,
            [id]: value
        });
    };

    return (
        <div className="p-4 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-200 p-4">
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
            <div className="flex-1 p-4">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="file"
                        accept=".csv, .xlsx"
                        onChange={handleFileUpload}
                        className="p-2 border border-gray-300 rounded"
                    />
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
                        <button
                            onClick={fetchDataFromBackend}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Fetch Data from Backend
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
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Fixed Salary (LKR)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">OT Hours</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Manual Hours</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-300">
                            {data.map((item) => (
                                <tr key={item.id} className={item.status === 'absent' ? 'bg-red-200' : item.status === 'present' ? 'bg-light-blue-200' : 'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="number"
                                            value={item.otHours}
                                            onChange={(e) => handleEditOTHours(item.id, parseFloat(e.target.value))}
                                            className="p-1 border border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="number"
                                            value={manualHours[item.id] || ''}
                                            onChange={(e) => handleManualHoursChange(item.id, parseFloat(e.target.value))}
                                            className="p-1 border border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleAction(item.id, item.status === 'present' ? 'absent' : 'present')}
                                            className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                                        >
                                            Toggle Status
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
