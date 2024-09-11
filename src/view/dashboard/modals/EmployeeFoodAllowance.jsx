

// import React, { useState, useEffect } from 'react';
// import { createFoodItem, getAllFoodItems, updateFoodItem, deleteFoodItem } from '../../../service/ApiServices';

// export function EmployeeFoodAllowance() {
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [foodItems, setFoodItems] = useState([]);
//     const [selectedFoodItemId, setSelectedFoodItemId] = useState(null);

//     useEffect(() => {
//         fetchFoodItems();
//     }, []);

//     const fetchFoodItems = async () => {
//         try {
//             const response = await getAllFoodItems();
//             setFoodItems(response.data);
//         } catch (error) {
//             console.error('Error fetching food items:', error);
//         }
//     };

//     const handleAddOrUpdateFoodItem = async () => {
//         if (name && price) {
//             try {
//                 if (selectedFoodItemId) {
//                     // Update food item
//                     await updateFoodItem(selectedFoodItemId, { name, price });
//                 } else {
//                     // Add new food item
//                     await createFoodItem({ name, price });
//                 }
//                 setName('');
//                 setPrice('');
//                 setSelectedFoodItemId(null);
//                 fetchFoodItems(); // Refresh the list after adding/updating a new item
//             } catch (error) {
//                 console.error('Error adding/updating food item:', error);
//             }
//         } else {
//             alert('Please enter both name and price');
//         }
//     };

//     const handleDeleteFoodItem = async () => {
//         if (selectedFoodItemId) {
//             try {
//                 await deleteFoodItem(selectedFoodItemId);
//                 setName('');
//                 setPrice('');
//                 setSelectedFoodItemId(null);
//                 fetchFoodItems(); // Refresh the list after deleting the item
//             } catch (error) {
//                 console.error('Error deleting food item:', error);
//             }
//         }
//     };

//     const handleItemClick = (item) => {
//         setName(item.name);
//         setPrice(item.price);
//         setSelectedFoodItemId(item._id);
//     };

//     return (
//         <div className="flex">
//             {/* Form for adding/updating food items */}
//             <div className="w-2/3 p-4">
//                 <h2 className="text-2xl font-bold mb-4">{selectedFoodItemId ? 'Update' : 'Add'} Food Item</h2>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Food Item Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         placeholder="Enter food item name"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Price</label>
//                     <input
//                         type="number"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         placeholder="Enter price"
//                     />
//                 </div>
//                 <div className="space-x-2">
//                     <button
//                         onClick={handleAddOrUpdateFoodItem}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                     >
//                         {selectedFoodItemId ? 'Update Food Item' : 'Add Food Item'}
//                     </button>
//                     {selectedFoodItemId && (
//                         <button
//                             onClick={handleDeleteFoodItem}
//                             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                         >
//                             Delete Food Item
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Display food items menu */}
//             <div className="w-1/3 p-4 bg-orange-100 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold mb-4">Food Menu</h2>
//                 <ul className="list-disc pl-5">
//                     {foodItems.map((item) => (
//                         <li
//                             key={item._id}
//                             onClick={() => handleItemClick(item)}
//                             className="mb-2 cursor-pointer text-blue-500 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 ease-in-out rounded-md p-2"
//                         >
//                             <span className="font-semibold">{item.name}:</span> LKR{item.price.toFixed(2)}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import {
//     getAllEmployees,
//     createFoodConsumption,
//     getAllFoodItems,
//     createFoodItem,
//     updateFoodItem,
//     deleteFoodItem
// } from '../../../service/ApiServices';

// export function EmployeeFoodAllowance() {
//     const [employees, setEmployees] = useState([]);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);
//     const [foodItems, setFoodItems] = useState([]);
//     const [selectedFoodItems, setSelectedFoodItems] = useState({});
//     const [totalAmount, setTotalAmount] = useState(0);

//     // State for managing food item creation/updating
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [selectedFoodItemId, setSelectedFoodItemId] = useState(null);

//     useEffect(() => {
//         fetchEmployees();
//         fetchFoodItems();
//     }, []);

//     const fetchEmployees = async () => {
//         try {
//             const response = await getAllEmployees();
//             setEmployees(response.data);
//         } catch (error) {
//             console.error('Error fetching employees:', error);
//         }
//     };

//     const fetchFoodItems = async () => {
//         try {
//             const response = await getAllFoodItems();
//             setFoodItems(response.data);
//         } catch (error) {
//             console.error('Error fetching food items:', error);
//         }
//     };

//     const handleAddFood = (employee) => {
//         setSelectedEmployee(employee);
//         setSelectedFoodItems({});
//         setTotalAmount(0);
//     };

//     const handleAddQuantity = (foodItem) => {
//         const updatedFoodItems = { ...selectedFoodItems };
//         if (updatedFoodItems[foodItem._id]) {
//             updatedFoodItems[foodItem._id].quantity += 1;
//         } else {
//             updatedFoodItems[foodItem._id] = { ...foodItem, quantity: 1 };
//         }
//         setSelectedFoodItems(updatedFoodItems);
//         calculateTotalAmount(updatedFoodItems);
//     };

//     const handleRemoveQuantity = (foodItem) => {
//         const updatedFoodItems = { ...selectedFoodItems };
//         if (updatedFoodItems[foodItem._id]) {
//             updatedFoodItems[foodItem._id].quantity -= 1;
//             if (updatedFoodItems[foodItem._id].quantity <= 0) {
//                 delete updatedFoodItems[foodItem._id];
//             }
//             setSelectedFoodItems(updatedFoodItems);
//             calculateTotalAmount(updatedFoodItems);
//         }
//     };

//     const calculateTotalAmount = (foodItems) => {
//         const total = Object.values(foodItems).reduce(
//             (acc, item) => acc + item.price * item.quantity,
//             0
//         );
//         setTotalAmount(total);
//     };

//     const handleCreateFoodConsumption = async () => {
//         const foodConsumption = {
//             employee: selectedEmployee._id,
//             date: new Date(),
//             foodItems: Object.values(selectedFoodItems).map(item => ({
//                 item: item._id,
//                 quantity: item.quantity
//             })),
//             totalAmount: totalAmount
//         };

//         try {
//             await createFoodConsumption(foodConsumption);
//             alert('Food consumption added successfully');
//             setSelectedEmployee(null);
//         } catch (error) {
//             console.error('Error creating food consumption:', error);
//         }
//     };

//     // Functions for managing food items
//     const handleAddOrUpdateFoodItem = async () => {
//         if (name && price) {
//             try {
//                 if (selectedFoodItemId) {
//                     await updateFoodItem(selectedFoodItemId, { name, price });
//                 } else {
//                     await createFoodItem({ name, price });
//                 }
//                 setName('');
//                 setPrice('');
//                 setSelectedFoodItemId(null);
//                 fetchFoodItems();
//             } catch (error) {
//                 console.error('Error adding/updating food item:', error);
//             }
//         } else {
//             alert('Please enter both name and price');
//         }
//     };

//     const handleDeleteFoodItem = async () => {
//         if (selectedFoodItemId) {
//             try {
//                 await deleteFoodItem(selectedFoodItemId);
//                 setName('');
//                 setPrice('');
//                 setSelectedFoodItemId(null);
//                 fetchFoodItems();
//             } catch (error) {
//                 console.error('Error deleting food item:', error);
//             }
//         }
//     };

//     const handleItemClick = (item) => {
//         setName(item.name);
//         setPrice(item.price);
//         setSelectedFoodItemId(item._id);
//     };

//     return (
//         <div className="flex">
//             <div className="w-3/4 p-4">
//                 {/* Employee Food Consumption Section */}
//                 <div className="p-4 bg-white shadow-md rounded-md">
//                     <h2 className="text-2xl font-bold mb-4">Employee Food Allowance</h2>
//                     <div className="overflow-y-scroll" style={{ maxHeight: '400px' }}>
//                         <table className="min-w-full bg-white border">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Employee ID</th>
//                                     <th className="px-4 py-2 border">Employee Name</th>
//                                     <th className="px-4 py-2 border">Total Food Consumption</th>
//                                     <th className="px-4 py-2 border">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {employees.map(employee => (
//                                     <tr key={employee._id} className="text-center">
//                                         <td className="px-4 py-2 border">{employee.employeeId}</td>
//                                         <td className="px-4 py-2 border">{employee.firstName}</td>
//                                         <td className="px-4 py-2 border">
//                                             {employee.foodConsumptionRecords.reduce((acc, record) => acc + record.totalAmount, 0).toFixed(2)}
//                                         </td>
//                                         <td className="px-4 py-2 border">
//                                             <button
//                                                 onClick={() => handleAddFood(employee)}
//                                                 className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
//                                             >
//                                                 Add Food
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Add Food Section */}
//                     {selectedEmployee && (
//                         <div className="mt-4 p-4 bg-gray-100 rounded-md">
//                             <h2 className="text-2xl font-bold mb-4">Add Food for {selectedEmployee.firstName}</h2>
//                             <p className="mb-4">Employee ID: {selectedEmployee.employeeId}</p>

//                             <div className="grid grid-cols-2 gap-4">
//                                 {foodItems.map(item => (
//                                     <div key={item._id} className="border p-4 rounded-md bg-white shadow-sm flex justify-between items-center">
//                                         <div>
//                                             <h3 className="font-bold">{item.name}</h3>
//                                             <p>LKR{item.price.toFixed(2)}</p>
//                                         </div>
//                                         <div className="flex items-center space-x-2">
//                                             <button
//                                                 onClick={() => handleRemoveQuantity(item)}
//                                                 className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
//                                             >
//                                                 -
//                                             </button>
//                                             <span>{selectedFoodItems[item._id]?.quantity || 0}</span>
//                                             <button
//                                                 onClick={() => handleAddQuantity(item)}
//                                                 className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
//                                             >
//                                                 +
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="mt-4">
//                                 <p className="text-lg font-bold">Total Amount: LKR{totalAmount.toFixed(2)}</p>
//                                 <button
//                                     onClick={handleCreateFoodConsumption}
//                                     className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
//                                 >
//                                     Submit Food Consumption
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {/* Food Item Management Section */}
//                 <div className="p-4 bg-white shadow-md rounded-md">
//                     <h2 className="text-2xl font-bold mb-4">{selectedFoodItemId ? 'Update' : 'Add'} Food Item</h2>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Food Item Name</label>
//                         <input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             placeholder="Enter food item name"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Price</label>
//                         <input
//                             type="number"
//                             value={price}
//                             onChange={(e) => setPrice(e.target.value)}
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             placeholder="Enter price"
//                         />
//                     </div>
//                     <div className="space-x-2">
//                         <button
//                             onClick={handleAddOrUpdateFoodItem}
//                             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                         >
//                             {selectedFoodItemId ? 'Update Food Item' : 'Add Food Item'}
//                         </button>
//                         {selectedFoodItemId && (
//                             <button
//                                 onClick={handleDeleteFoodItem}
//                                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                             >
//                                 Delete Food Item
//                             </button>
//                         )}
//                     </div>
//                 </div>

//             </div>
//             {/* Display food items menu */}
//             <div className="w-1/4 p-4">
//                 <div className="p-4 bg-orange-100 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-bold mb-4">Food Menu</h2>
//                     <ul className="list-disc pl-5">
//                         {foodItems.map((item) => (
//                             <li
//                                 key={item._id}
//                                 onClick={() => handleItemClick(item)}
//                                 className="mb-2 cursor-pointer text-blue-500 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 ease-in-out rounded-md p-2"
//                             >
//                                 <span className="font-semibold">{item.name}:</span> LKR{item.price.toFixed(2)}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
            
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import {
    getAllEmployees,
    createFoodConsumption,
    getAllFoodItems,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem
} from '../../../service/ApiServices';

export function EmployeeFoodAllowance() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [selectedFoodItems, setSelectedFoodItems] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [employeeFoodRecords, setEmployeeFoodRecords] = useState([]);

    // State for managing food item creation/updating
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedFoodItemId, setSelectedFoodItemId] = useState(null);

    useEffect(() => {
        fetchEmployees();
        fetchFoodItems();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await getAllEmployees();
            setEmployees(response.data);
            setFilteredEmployees(response.data); // Set filteredEmployees initially
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchFoodItems = async () => {
        try {
            const response = await getAllFoodItems();
            setFoodItems(response.data);
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };

    const fetchFoodConsumptionRecords = async (employee) => {
        setEmployeeFoodRecords(employee.foodConsumptionRecords);
        console.log(employeeFoodRecords)
        
    };

    const handleAddFood = (employee) => {
        setSelectedEmployee(employee);
        setSelectedFoodItems({});
        setTotalAmount(0);
    };

    const handleAddQuantity = (foodItem) => {
        const updatedFoodItems = { ...selectedFoodItems };
        if (updatedFoodItems[foodItem._id]) {
            updatedFoodItems[foodItem._id].quantity += 1;
        } else {
            updatedFoodItems[foodItem._id] = { ...foodItem, quantity: 1 };
        }
        setSelectedFoodItems(updatedFoodItems);
        calculateTotalAmount(updatedFoodItems);
    };

    const handleRemoveQuantity = (foodItem) => {
        const updatedFoodItems = { ...selectedFoodItems };
        if (updatedFoodItems[foodItem._id]) {
            updatedFoodItems[foodItem._id].quantity -= 1;
            if (updatedFoodItems[foodItem._id].quantity <= 0) {
                delete updatedFoodItems[foodItem._id];
            }
            setSelectedFoodItems(updatedFoodItems);
            calculateTotalAmount(updatedFoodItems);
        }
    };

    const calculateTotalAmount = (foodItems) => {
        const total = Object.values(foodItems).reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotalAmount(total);
    };

    const handleCreateFoodConsumption = async () => {
        const foodConsumption = {
            employee: selectedEmployee._id,
            date: new Date(),
            foodItems: Object.values(selectedFoodItems).map(item => ({
                item: item._id,
                quantity: item.quantity
            })),
            totalAmount: totalAmount
        };

        try {
            await createFoodConsumption(foodConsumption);
            alert('Food consumption added successfully');
            setSelectedEmployee(null);
            fetchEmployees()
        } catch (error) {
            console.error('Error creating food consumption:', error);
        }
    };

    // Functions for managing food items
    const handleAddOrUpdateFoodItem = async () => {
        if (name && price) {
            try {
                if (selectedFoodItemId) {
                    await updateFoodItem(selectedFoodItemId, { name, price });
                } else {
                    await createFoodItem({ name, price });
                }
                setName('');
                setPrice('');
                setSelectedFoodItemId(null);
                fetchFoodItems();
            } catch (error) {
                console.error('Error adding/updating food item:', error);
            }
        } else {
            alert('Please enter both name and price');
        }
    };

    const handleDeleteFoodItem = async () => {
        if (selectedFoodItemId) {
            try {
                await deleteFoodItem(selectedFoodItemId);
                setName('');
                setPrice('');
                setSelectedFoodItemId(null);
                fetchFoodItems();
            } catch (error) {
                console.error('Error deleting food item:', error);
            }
        }
    };

    const handleItemClick = (item) => {
        setName(item.name);
        setPrice(item.price);
        setSelectedFoodItemId(item._id);
    };

    // Search functionality
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = employees.filter(employee =>
            employee.employeeId.toLowerCase().includes(e.target.value.toLowerCase()) ||
            employee.firstName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    // Function to get the name of a food item by its _id
    const getFoodItemNameById = (id) => {
        const foodItem = foodItems.find(item => item._id === id);
        return foodItem ? foodItem.name : 'Unknown'; // Return 'Unknown' if the item is not found
    };

    return (
        <div className="flex">
            <div className="w-1.7/3 p-4">
                {/* Employee Food Consumption Section */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4">Employee Food Allowance</h2>
                    
                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Search by Employee ID or Name"
                        />
                    </div>

                    <div className="overflow-y-scroll" style={{ maxHeight: '400px' }}>
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Employee ID</th>
                                    <th className="px-4 py-2 border">Employee Name</th>
                                    <th className="px-4 py-2 border">Total Food Consumption</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {filteredEmployees.map(employee => (
                                <tr key={employee._id} className="text-center">
                                    <td className="px-4 py-2 border">{employee.employeeId}</td>
                                    <td className="px-4 py-2 border">{employee.firstName}</td>
                                    <td className="px-4 py-2 border">
                                        {employee.foodConsumptionRecords.reduce((acc, record) => acc + record.totalAmount, 0).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 border flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleAddFood(employee)}
                                            className="bg-blue-500 text-white px-2 py-1 text-sm rounded-md hover:bg-blue-600"
                                        >
                                            Add Food
                                        </button>
                                        <button
                                            onClick={() => fetchFoodConsumptionRecords(employee)}
                                            className="bg-gray-500 text-white px-2 py-1 text-sm rounded-md hover:bg-gray-600"
                                        >
                                            Records
                                        </button>
                                    </td>
                                </tr>
                            ))}


                            </tbody>
                        </table>
                    </div>

                    {/* Add Food Section */}
                    {selectedEmployee && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-md">
                            <h2 className="text-2xl font-bold mb-4">Add Food for {selectedEmployee.firstName}</h2>
                            <p className="mb-4">Employee ID: {selectedEmployee.employeeId}</p>

                            <div className="grid grid-cols-2 gap-4">
                                {foodItems.map(item => (
                                    <div key={item._id} className="border p-4 rounded-md bg-white shadow-sm flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold">{item.name}</h3>
                                            <p>LKR{item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleRemoveQuantity(item)}
                                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                            >
                                                -
                                            </button>
                                            <span>{selectedFoodItems[item._id]?.quantity || 0}</span>
                                            <button
                                                onClick={() => handleAddQuantity(item)}
                                                className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <p className="text-lg font-bold">Total Amount: LKR{totalAmount.toFixed(2)}</p>
                                <button
                                    onClick={handleCreateFoodConsumption}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
                                >
                                    Submit Food Consumption
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <hr className="my-8 border-t-4 border-orange-600" />
                
                {/* Food Item Management Section */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4">Food Item Management</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (LKR)</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={handleAddOrUpdateFoodItem}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            {selectedFoodItemId ? 'Update Food Item' : 'Add Food Item'}
                        </button>
                        {selectedFoodItemId && (
                            <button
                                onClick={handleDeleteFoodItem}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Delete Food Item
                            </button>
                        )}
                    </div>
                    <div className="mt-4">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Food Item</th>
                                    <th className="px-4 py-2 border">Price (LKR)</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodItems.map(item => (
                                    <tr key={item._id}>
                                        <td className="px-4 py-2 border">{item.name}</td>
                                        <td className="px-4 py-2 border">{item.price.toFixed(2)}</td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                onClick={() => handleItemClick(item)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
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
            </div>
            <div className="w-1/3 p-4">
                {employeeFoodRecords.length > 0 && (
                    <div className="mt-4 p-4 bg-orange-100 rounded-lg shadow-lg border">
                        <h3 className="text-xl font-bold mb-2">Food Consumption Records</h3>
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Food Items</th>
                                    <th className="px-4 py-2 border">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeFoodRecords.map(record => (
                                    <tr key={record._id}>
                                        <td className="px-4 py-2 border">{new Date(record.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 border">
                                            {/* Flex container to keep items in a single column */}
                                            <div className="flex flex-col gap-1">
                                                {record.foodItems.map(item => (
                                                    <div className="bg-orange-100 px-2 py-1 rounded-md" key={item.item}>
                                                        {getFoodItemNameById(item.item)} x {item.quantity}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 border">LKR {record.totalAmount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}

