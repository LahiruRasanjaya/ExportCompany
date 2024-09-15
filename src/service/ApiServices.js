
// import axios from "axios";
// import { BASE_URL } from "../environment";

// // User Authentication............................................................

// export const createUser = ({ username, password }) => {
//   return axios.post("http://localhost:5000/api/users/register", {
//     username,
//     password,
//   });
// };

// export const authenticateUser = ({ username, password }) => {
//   return axios.post("http://localhost:5000/api/users/login", {
//     username,
//     password,
//   });
// };

// // Employee Management............................................................

// export const createEmployee = (formData) => {
//   return axios.post("http://localhost:5000/api/employees", formData);
// };

// export const getAllEmployees = () => {
//   return axios.get("http://localhost:5000/api/employees");
// };

// export const updateEmployee = (employeeId, formData) => {
//   return axios.put(`http://localhost:5000/api/employees/${employeeId}`, formData);
// };

// export const deleteEmployee = (employeeId) => {
//   return axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
// };

// export const findEmployee = (query) => {
//   return axios.get("http://localhost:5000/api/employees/find", { params: query });
// };

// export const getEmployeeDetails = (id) => {
//   return axios.get(`http://localhost:5000/api/exist/employees/${id}`);
// };

// // Loan Management............................................................

// export const createLoan = (formData) => {
//   return axios.post("http://localhost:5000/api/loans", formData);
// };

// export const getAllLoans = () => {
//   return axios.get("http://localhost:5000/api/loans");
// };

// export const updateLoan = (loanId, formData) => {
//   return axios.put(`http://localhost:5000/api/loans/${loanId}`, formData);
// };

// export const deleteLoan = (loanId) => {
//   return axios.delete(`http://localhost:5000/api/loans/${loanId}`);
// };

// export const getLoanById = (loanId) => {
//   return axios.get(`http://localhost:5000/api/loans/${loanId}`);
// };

// // Advance Management............................................................

// export const createAdvance = (formData) => {
//   return axios.post("http://localhost:5000/api/advances", formData);
// };

// export const getAllAdvances = () => {
//   return axios.get("http://localhost:5000/api/advances");
// };

// export const updateAdvance = (advanceId, formData) => {
//   return axios.put(`http://localhost:5000/api/advances/${advanceId}`, formData);
// };

// export const deleteAdvance = (advanceId) => {
//   return axios.delete(`http://localhost:5000/api/advances/${advanceId}`);
// };

// export const getAdvanceById = (advanceId) => {
//   return axios.get(`http://localhost:5000/api/advances/${advanceId}`);
// };

// // Create a new food item
// export const createFoodItem = (formData) => {
//   return axios.post("http://localhost:5000/api/foodItems", formData);
// };

// // Get all food items
// export const getAllFoodItems = () => {
//   return axios.get("http://localhost:5000/api/food-items");
// };

// // Get a food item by ID
// export const getFoodItemById = (foodItemId) => {
//   return axios.get(`http://localhost:5000/api/food-items/${foodItemId}`);
// };

// // Update a food item by ID
// export const updateFoodItem = (foodItemId, formData) => {
//   return axios.put(`http://localhost:5000/api/food-items/${foodItemId}`, formData);
// };

// // Delete a food item by ID
// export const deleteFoodItem = (foodItemId) => {
//   return axios.delete(`http://localhost:5000/api/food-items/${foodItemId}`);
// };

// // Food Consumption Management............................................................

// // Create a new food consumption record
// export const createFoodConsumption = (formData) => {
//   return axios.post("http://localhost:5000/api/foodConsumption", formData);
// };

// // Get all food consumption records
// export const getAllFoodConsumptions = () => {
//   return axios.get("http://localhost:5000/api/foodConsumption");
// };

// // Get a food consumption record by ID
// export const getFoodConsumptionById = (foodConsumptionId) => {
//   return axios.get(`http://localhost:5000/api/foodConsumption/${foodConsumptionId}`);
// };

// // Update a food consumption record by ID
// export const updateFoodConsumption = (foodConsumptionId, formData) => {
//   return axios.put(`http://localhost:5000/api/foodConsumption/${foodConsumptionId}`, formData);
// };

// // Delete a food consumption record by ID
// export const deleteFoodConsumption = (foodConsumptionId) => {
//   return axios.delete(`http://localhost:5000/api/foodConsumption/${foodConsumptionId}`);
// };

import axios from "axios";
import { BASE_URL } from "../environment";

// User Authentication............................................................

export const createUser = ({ username, password }) => {
  return axios.post(`${BASE_URL}/api/users/register`, {
    username,
    password,
  });
};

export const authenticateUser = ({ username, password }) => {
  return axios.post(`${BASE_URL}/api/users/login`, {
    username,
    password,
  });
};

// Employee Management............................................................

export const createEmployee = (formData) => {
  return axios.post(`${BASE_URL}/api/employees`, formData);
};

export const getAllEmployees = () => {
  return axios.get(`${BASE_URL}/api/employees`);
};

export const updateEmployee = (employeeId, formData) => {
  return axios.put(`${BASE_URL}/api/employees/${employeeId}`, formData);
};

export const deleteEmployee = (employeeId) => {
  return axios.delete(`${BASE_URL}/api/employees/${employeeId}`);
};

export const findEmployee = (query) => {
  return axios.get(`${BASE_URL}/api/employees/find`, { params: query });
};

export const getEmployeeDetails = (id) => {
  return axios.get(`${BASE_URL}/api/exist/employees/${id}`);
};

// Loan Management............................................................

export const createLoan = (formData) => {
  return axios.post(`${BASE_URL}/api/loans`, formData);
};

export const getAllLoans = () => {
  return axios.get(`${BASE_URL}/api/loans`);
};

export const updateLoan = (loanId, formData) => {
  return axios.put(`${BASE_URL}/api/loans/${loanId}`, formData);
};

export const deleteLoan = (loanId) => {
  return axios.delete(`${BASE_URL}/api/loans/${loanId}`);
};

export const getLoanById = (loanId) => {
  return axios.get(`${BASE_URL}/api/loans/${loanId}`);
};

// Advance Management............................................................

export const createAdvance = (formData) => {
  return axios.post(`${BASE_URL}/api/advances`, formData);
};

export const getAllAdvances = () => {
  return axios.get(`${BASE_URL}/api/advances`);
};

export const updateAdvance = (advanceId, formData) => {
  return axios.put(`${BASE_URL}/api/advances/${advanceId}`, formData);
};

export const deleteAdvance = (advanceId) => {
  return axios.delete(`${BASE_URL}/api/advances/${advanceId}`);
};

export const getAdvanceById = (advanceId) => {
  return axios.get(`${BASE_URL}/api/advances/${advanceId}`);
};

// Food Item Management............................................................

export const createFoodItem = (formData) => {
  return axios.post(`${BASE_URL}/api/food-items`, formData);
};

export const getAllFoodItems = () => {
  return axios.get(`${BASE_URL}/api/food-items`);
};

export const getFoodItemById = (foodItemId) => {
  return axios.get(`${BASE_URL}/api/food-items/${foodItemId}`);
};

export const updateFoodItem = (foodItemId, formData) => {
  return axios.put(`${BASE_URL}/api/food-items/${foodItemId}`, formData);
};

export const deleteFoodItem = (foodItemId) => {
  return axios.delete(`${BASE_URL}/api/food-items/${foodItemId}`);
};

// Food Consumption Management............................................................

export const createFoodConsumption = (formData) => {
  return axios.post(`${BASE_URL}/api/food-consumptions`, formData);
};

export const getAllFoodConsumptions = () => {
  return axios.get(`${BASE_URL}/api/food-consumptions`);
};

export const getFoodConsumptionById = (foodConsumptionId) => {
  return axios.get(`${BASE_URL}/api/food-consumptions/${foodConsumptionId}`);
};

export const updateFoodConsumption = (foodConsumptionId, formData) => {
  return axios.put(`${BASE_URL}/api/food-consumptions/${foodConsumptionId}`, formData);
};

export const deleteFoodConsumption = (foodConsumptionId) => {
  return axios.delete(`${BASE_URL}/api/food-consumptions/${foodConsumptionId}`);
};

// Create a new attendance record
export const createAttendance = (formData) => {
  return axios.post(`${BASE_URL}/api/attendance`, formData);
};

// Get all attendance records
export const getAllAttendances = () => {
  return axios.get(`${BASE_URL}/api/attendance`);
};

// Get a specific attendance record by ID
export const getAttendanceById = (attendanceId) => {
  return axios.get(`${BASE_URL}/api/attendance/${attendanceId}`);
};

// Update an existing attendance record
export const updateAttendance = (attendanceId, formData) => {
  return axios.put(`${BASE_URL}/api/attendance/${attendanceId}`, formData);
};

// Delete an attendance record
export const deleteAttendance = (attendanceId) => {
  return axios.delete(`${BASE_URL}/api/attendance/${attendanceId}`);
};

