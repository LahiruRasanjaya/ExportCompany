
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

export const updateAllowance = (employeeId, formData) => {
  return axios.put(`${BASE_URL}/api/allowance/${employeeId}`, formData);
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

export const updateLatMonth = () => {
  return axios.post(`${BASE_URL}/api/employees/update-lat-month`);
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

// Get attendance reports by employee ID and date range
export const getAttendanceReportByDateRange = (employeeId, startDate, endDate) => {
  return axios.get(`${BASE_URL}/api/attendance-reports/employee/${employeeId}`, {
    params: {
      startDate,
      endDate,
    },
  });
};

// Delete an attendance report by report ID
export const deleteAttendanceReport = (attendanceReportId) => {
  return axios.delete(`${BASE_URL}/api/attendance-reports/${attendanceReportId}`);
};

// Get all attendance reports for a specific employee
export const getAllAttendanceReportsForEmployee = (employeeId) => {
  return axios.get(`${BASE_URL}/api/attendance-reports/employee/${employeeId}`);
};

// Delete attendance reports for an employee in a date range
export const deleteAttendanceReportsByDateRange = (employeeId, startDate, endDate) => {
  return axios.delete(`${BASE_URL}/api/attendance-reports/employee/${employeeId}`, {
    params: {
      startDate,
      endDate,
    },
  });
};

// New function to get monthly records
export const getMonthlyRecords = (month) => {
  return axios.get(`${BASE_URL}/api/monthly-records/last-month`, {
    params: { month }
  });
};

// Weekly Attendance Management...................................................

// Get all weekly attendance records for a specific weekDay
export const getAllWeeklyAttendance = (weekDay) => {
  return axios.get(`${BASE_URL}/api/weekly-attendance/${weekDay}`);
};

// Update weekly attendance by ID
export const updateWeeklyAttendance = (attendanceId, formData) => {
  return axios.put(`${BASE_URL}/api/weekly-attendance/${attendanceId}`, formData);
};

export const createWeeklyAttendance = (formData) => {
  return axios.post(`${BASE_URL}/api/weekly-attendance`, formData);
};