// src/modals/ManageJobType.js

import React, { useState, useEffect } from 'react';

export function ManageJobType() {
    const [jobTypes, setJobTypes] = useState([]);
    const [jobId, setJobId] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [editingJobId, setEditingJobId] = useState(null);

    useEffect(() => {
        // Fetch job types from backend on component mount
        fetchJobTypes();
    }, []);

    const fetchJobTypes = async () => {
        // Fetch job types from backend
        // Example: const response = await fetch('/api/job-types');
        // setJobTypes(await response.json());
        // Here, you'll replace this with actual API call
        setJobTypes([
            { jobId: '001', jobPosition: 'Developer', salary: '5000' },
            { jobId: '002', jobPosition: 'Manager', salary: '7000' },
        ]);
    };

    const handleAddOrUpdateJobType = async (e) => {
        e.preventDefault();
        if (editingJobId) {
            // Update job type API call
            // Example: await fetch(`/api/job-types/${editingJobId}`, { method: 'PUT', body: JSON.stringify({ jobPosition, salary }) });
        } else {
            // Add job type API call
            // Example: await fetch('/api/job-types', { method: 'POST', body: JSON.stringify({ jobId, jobPosition, salary }) });
        }
        fetchJobTypes(); // Refresh job types after adding/updating
        resetForm();
    };

    const handleEditJobType = (jobType) => {
        setEditingJobId(jobType.jobId);
        setJobId(jobType.jobId);
        setJobPosition(jobType.jobPosition);
        setSalary(jobType.salary);
    };

    const handleRemoveJobType = async (jobId) => {
        // Remove job type API call
        // Example: await fetch(`/api/job-types/${jobId}`, { method: 'DELETE' });
        fetchJobTypes(); // Refresh job types after removal
    };

    const resetForm = () => {
        setEditingJobId(null);
        setJobId('');
        setJobPosition('');
        setSalary('');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Job Types</h2>
            <form onSubmit={handleAddOrUpdateJobType} className="mb-4">
                <div className="mb-4">
                    <label className="block mb-2">Job ID:</label>
                    <input type="text" value={jobId} onChange={(e) => setJobId(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Job Position:</label>
                    <input type="text" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Salary (without OT hours):</label>
                    <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        {editingJobId ? 'Update Job' : 'Add Job'}
                    </button>
                    {editingJobId && (
                        <button type="button" onClick={resetForm} className="px-4 py-2 bg-red-500 text-white rounded">
                            Remove Job
                        </button>
                    )}
                </div>
            </form>
            
            <table className="w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Job ID</th>
                        <th className="border px-4 py-2">Job Position</th>
                        <th className="border px-4 py-2">Salary per Month</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {jobTypes.map((jobType) => (
                        <tr key={jobType.jobId}>
                            <td className="border px-4 py-2">{jobType.jobId}</td>
                            <td className="border px-4 py-2">{jobType.jobPosition}</td>
                            <td className="border px-4 py-2">{jobType.salary}</td>
                            <td className="border px-4 py-2">
                                <button 
                                    className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                                    onClick={() => handleEditJobType(jobType)}>
                                    Edit
                                </button>
                                <button 
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                    onClick={() => handleRemoveJobType(jobType.jobId)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
