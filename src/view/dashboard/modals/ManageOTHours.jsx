// import React, { useState } from 'react';

// export function ManageOTHours() {
//     const [jobRoles, setJobRoles] = useState([]);
//     const [jobRole, setJobRole] = useState({ roleName: '', roleId: '' });
//     const [otHourTypeActive, setOtHourTypeActive] = useState(false);

//     const handleAddJobRole = () => {
//         setJobRoles([...jobRoles, { ...jobRole, employees: 0 }]);
//         setJobRole({ roleName: '', roleId: '' });
//     };

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Manage OT Hours</h2>
//             <form>
//                 <div className="mb-4 flex space-x-4">
//                     <div className="flex-1">
//                         <label className="block mb-2">OT Hour ID:</label>
//                         <input type="text" className="w-full p-2 border rounded" />
//                     </div>
//                     <div className="flex-1">
//                         <label className="block mb-2">OT Hour Rate:</label>
//                         <input type="text" className="w-full p-2 border rounded" />
//                     </div>
//                 </div>

//                 <div className="mb-4 flex space-x-4">
//                     <div className="flex-1">
//                         <label className="block mb-2">Position Name:</label>
//                         <input 
//                             type="text" 
//                             value={jobRole.roleName} 
//                             onChange={(e) => setJobRole({ ...jobRole, roleName: e.target.value })} 
//                             className="w-full p-2 border rounded" 
//                         />
//                     </div>
//                     <div className="flex-1">
//                         <label className="block mb-2">Role ID:</label>
//                         <input 
//                             type="text" 
//                             value={jobRole.roleId} 
//                             onChange={(e) => setJobRole({ ...jobRole, roleId: e.target.value })} 
//                             className="w-full p-2 border rounded" 
//                         />
//                     </div>
//                 </div>

//                 <button 
//                     type="button" 
//                     onClick={handleAddJobRole} 
//                     className="px-4 py-2 mb-4 bg-green-500 text-white rounded"
//                 >
//                     Add Job Role
//                 </button>

//                 <div className="mb-4">
//                     <h3 className="text-xl font-bold mb-2">Job Roles</h3>
//                     <table className="w-full table-auto border">
//                         <thead>
//                             <tr>
//                                 <th className="px-4 py-2 border">Job Role</th>
//                                 <th className="px-4 py-2 border">Role ID</th>
//                                 <th className="px-4 py-2 border">Number of Employees</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {jobRoles.map((role, index) => (
//                                 <tr key={index}>
//                                     <td className="px-4 py-2 border">{role.roleName}</td>
//                                     <td className="px-4 py-2 border">{role.roleId}</td>
//                                     <td className="px-4 py-2 border">{role.employees}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block mb-2">Activate OT Hour Type:</label>
//                     <input 
//                         type="checkbox" 
//                         checked={otHourTypeActive} 
//                         onChange={() => setOtHourTypeActive(!otHourTypeActive)} 
//                         className="p-2 border rounded"
//                     />
//                 </div>

//                 <button 
//                     type="submit" 
//                     className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// }

// import React, { useState } from 'react';

// export function ManageOTHours() {
//     const [jobRoles, setJobRoles] = useState([]);
//     const [jobRole, setJobRole] = useState({ roleName: '', roleId: '' });
//     const [otHourTypeActive, setOtHourTypeActive] = useState(false);

//     const handleAddJobRole = () => {
//         setJobRoles([...jobRoles, { ...jobRole, employees: 0 }]);
//         setJobRole({ roleName: '', roleId: '' });
//     };

//     const handleRemoveJobRole = (index) => {
//         const updatedJobRoles = jobRoles.filter((_, i) => i !== index);
//         setJobRoles(updatedJobRoles);
//     };

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Manage OT Hours</h2>
//             <form>
//                 <div className="mb-4 flex space-x-4">
//                     <div className="flex-1">
//                         <label className="block mb-2">OT Hour ID:</label>
//                         <input type="text" className="w-full p-2 border rounded" />
//                     </div>
//                     <div className="flex-1">
//                         <label className="block mb-2">OT Hour Rate:</label>
//                         <input type="text" className="w-full p-2 border rounded" />
//                     </div>
//                 </div>

//                 <div className="mb-4 flex space-x-4">
//                     <div className="flex-1">
//                         <label className="block mb-2">Position Name:</label>
//                         <input 
//                             type="text" 
//                             value={jobRole.roleName} 
//                             onChange={(e) => setJobRole({ ...jobRole, roleName: e.target.value })} 
//                             className="w-full p-2 border rounded" 
//                         />
//                     </div>
//                     <div className="flex-1">
//                         <label className="block mb-2">Role ID:</label>
//                         <input 
//                             type="text" 
//                             value={jobRole.roleId} 
//                             onChange={(e) => setJobRole({ ...jobRole, roleId: e.target.value })} 
//                             className="w-full p-2 border rounded" 
//                         />
//                     </div>
//                 </div>

//                 <button 
//                     type="button" 
//                     onClick={handleAddJobRole} 
//                     className="px-4 py-2 mb-4 bg-green-500 text-white rounded"
//                 >
//                     Add Job Role
//                 </button>

//                 <div className="mb-4">
//                     <h3 className="text-xl font-bold mb-2">Job Roles</h3>
//                     <table className="w-full table-auto border">
//                         <thead>
//                             <tr>
//                                 <th className="px-4 py-2 border">Job Role</th>
//                                 <th className="px-4 py-2 border">Role ID</th>
//                                 <th className="px-4 py-2 border">Number of Employees</th>
//                                 <th className="px-4 py-2 border">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {jobRoles.map((role, index) => (
//                                 <tr key={index}>
//                                     <td className="px-4 py-2 border">{role.roleName}</td>
//                                     <td className="px-4 py-2 border">{role.roleId}</td>
//                                     <td className="px-4 py-2 border">{role.employees}</td>
//                                     <td className="px-4 py-2 border text-center">
//                                         <button 
//                                             onClick={() => handleRemoveJobRole(index)} 
//                                             className="text-red-500"
//                                         >
//                                             <i className="fas fa-trash-alt"></i>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block mb-2">Activate OT Hour Type:</label>
//                     <input 
//                         type="checkbox" 
//                         checked={otHourTypeActive} 
//                         onChange={() => setOtHourTypeActive(!otHourTypeActive)} 
//                         className="p-2 border rounded"
//                     />
//                 </div>

//                 <button 
//                     type="submit" 
//                     className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// }

import React, { useState } from 'react';

export function ManageOTHours() {
    const [jobRoles, setJobRoles] = useState([]);
    const [jobRole, setJobRole] = useState({ roleName: '', roleId: '' });
    const [otHourTypeActive, setOtHourTypeActive] = useState(false);
    const [otHourTypes, setOtHourTypes] = useState([]); // To store OT Hour types

    const handleAddJobRole = () => {
        setJobRoles([...jobRoles, { ...jobRole, employees: 0 }]);
        setJobRole({ roleName: '', roleId: '' });
    };

    const handleRemoveJobRole = (index) => {
        const updatedJobRoles = jobRoles.filter((_, i) => i !== index);
        setJobRoles(updatedJobRoles);
    };

    const handleAddOTHourType = () => {
        const otHourId = "OT-" + (otHourTypes.length + 1); // Example ID generation
        const otHourRate = parseFloat(Math.random() * 50).toFixed(2); // Example Rate
        const yesterdayPayment = parseFloat(Math.random() * 1000).toFixed(2); // Example Payment

        setOtHourTypes([...otHourTypes, { otHourId, otHourRate, yesterdayPayment }]);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage OT Hours</h2>
            <form>
                <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                        <label className="block mb-2">OT Hour ID:</label>
                        <input type="text" className="w-full p-2 border rounded" />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2">OT Hour Rate:</label>
                        <input type="text" className="w-full p-2 border rounded" />
                    </div>
                </div>

                <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                        <label className="block mb-2">Position Name:</label>
                        <input 
                            type="text" 
                            value={jobRole.roleName} 
                            onChange={(e) => setJobRole({ ...jobRole, roleName: e.target.value })} 
                            className="w-full p-2 border rounded" 
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2">Role ID:</label>
                        <input 
                            type="text" 
                            value={jobRole.roleId} 
                            onChange={(e) => setJobRole({ ...jobRole, roleId: e.target.value })} 
                            className="w-full p-2 border rounded" 
                        />
                    </div>
                </div>

                <button 
                    type="button" 
                    onClick={handleAddJobRole} 
                    className="px-4 py-2 mb-4 bg-green-500 text-white rounded"
                >
                    Add Job Role
                </button>

                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Job Roles</h3>
                    <table className="w-full table-auto border">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Job Role</th>
                                <th className="px-4 py-2 border">Role ID</th>
                                <th className="px-4 py-2 border">Number of Employees</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobRoles.map((role, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{role.roleName}</td>
                                    <td className="px-4 py-2 border">{role.roleId}</td>
                                    <td className="px-4 py-2 border">{role.employees}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button 
                                            onClick={() => handleRemoveJobRole(index)} 
                                            className="text-red-500"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Activate OT Hour Type:</label>
                    <input 
                        type="checkbox" 
                        checked={otHourTypeActive} 
                        onChange={() => setOtHourTypeActive(!otHourTypeActive)} 
                        className="p-2 border rounded"
                    />
                </div>

                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Submit
                </button>
            </form>

            {/* OT Hour Summary Table */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">OT Hour Summary</h3>
                <table className="w-full table-auto border">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">OT Hour ID</th>
                            <th className="px-4 py-2 border">OT Hour Rate</th>
                            <th className="px-4 py-2 border">Total Payment for Yesterday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {otHourTypes.map((type, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{type.otHourId}</td>
                                <td className="px-4 py-2 border">{type.otHourRate}</td>
                                <td className="px-4 py-2 border">{type.yesterdayPayment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

