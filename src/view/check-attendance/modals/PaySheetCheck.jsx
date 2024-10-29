
import React, { useEffect, useState } from 'react';
import { getMonthlyRecords } from '../../../service/ApiServices.js';

export function PaySheetCheck () {
  const [selectedMonth, setSelectedMonth] = useState(''); // State to hold selected month
  const [records, setRecords] = useState([]); // State to hold fetched records
  const [filtedRecords, setFiltedRecords] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(''); // Error state
  const [noMonth, setNoMonth] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown options for months
  const months = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 }
  ];

  // Function to handle dropdown change
  const handleMonthChange = async (event) => {
    const monthValue = event.target.value;
    setSelectedMonth(monthValue);
    
    if (monthValue !== '') {
      try {
        setLoading(true); // Set loading state
        const response = await getMonthlyRecords(monthValue); // Call API
        if (response.data.length === 0) {
          // If the data is empty, show specific message
          setRecords([]);
          setError('This month doesn’t have any records.');
        } else {
          setNoMonth(false)
          setRecords(response.data); // Set records data
          console.log(response.data)
          setError(''); // Clear any previous error
        }
      } catch (err) {
        setNoMonth(true)
        setError('Failed to fetch records.');
      } finally {
        setLoading(false); // Remove loading state
      }
    }
  };

  useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = records.filter(record =>
            record.employee.employeeId.toLowerCase().includes(query) ||
            record.employee.employeeId.toString().includes(query) 
        );
        setFiltedRecords(filtered);
    }, [searchQuery, records]);

  const printPaySheet = (selectedEmployee) => {
    const monthName = months[selectedMonth]?.name || 'Unknown';
    const paysheetContent = `
      <h2 class="text-xl font-bold text-gray-800 mb-4 center">ඩීඑම්සී පලයිවුඩ් - වැටුප් පත්‍රිකාව</h2>
      <table class="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
              <td colSpan="2" className="border border-gray-300 p-2">
                  <div class="flex justify-between p-2 center">
                      <span>සේවකයාගේ නම :</span>
                      <span>${selectedEmployee.employee.firstName} ${selectedEmployee.employee.secondName}</span>
                  </div>
                  <div class="flex justify-between p-2 center">
                      <span>සේවක අංකය :</span>
                      <span>${selectedEmployee.employee.employeeId}</span>
                  </div>
                  <div class="flex justify-between p-2 center">
                      <span>මාසය :</span>
                      <span>${monthName}</span>
                  </div>
              </td>
          </tr>
        </thead>
        <tbody className="table-auto border-collapse w-full" >
        <tr><td class="border border-gray-300 " style="font-size: 7px;">පැමිණි දිනය</td><td class="border border-gray-300 p-1" style="font-size: 7px;">${selectedEmployee.workingDays}</td></tr>
        <tr><td class="border border-gray-300 ">අතිකාල</td><td class="border border-gray-300 ">${selectedEmployee.OTEarning.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-1">පැමිණීමේ දීමනාව</td><td class="border border-gray-300 p-2">${(selectedEmployee.attendanceAllowance1 + selectedEmployee.attendanceAllowance2).toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">අයවැය දීමනාව</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">අමතර අත්තම්</td><td class="border border-gray-300 p-2">${selectedEmployee.doubleShiftEarning.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">දිරි දීමනාව</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">අවදානම් දීමනාව</td><td class="border border-gray-300 p-2">${(selectedEmployee.riskAllowance1 + selectedEmployee.riskAllowance2).toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">කොළඹ</td><td class="border border-gray-300 p-2">${selectedEmployee.colomboAllowance.toFixed(2)}</td></tr>
        <tr>
            <td className="border border-gray-300 p-2" colSpan="2"></td>
        </tr>
        <tr>
            <td className="border border-gray-300 p-2"> දළ වැටුප </td> 
            <td className="border border-gray-300 p-2">${((selectedEmployee.colomboAllowance)+
            (selectedEmployee.riskAllowance1 + selectedEmployee.riskAllowance2)+
            (selectedEmployee.incomeAllowance)+
            (selectedEmployee.doubleShiftEarning)+
            (selectedEmployee.incomeAllowance)+
            (selectedEmployee.attendanceAllowance1 + selectedEmployee.attendanceAllowance2)+
            (selectedEmployee.OTEarning)).toFixed(2)}
            <div className="border-b border-black mt-1 underline"></div>
            </td>
        </tr>
        <tr>
            <td className="border border-gray-300 p-2" colSpan="2"></td>
        </tr>
        <tr><td class="border border-gray-300 p-2">අර්ථ සාදක</td><td class="border border-gray-300 p-2">${selectedEmployee.EPF.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">අත්තිකාරම්</td><td class="border border-gray-300 p-2">${selectedEmployee.advances.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">බැංකු ගිණුම් සඳහා </td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">ණය මුදල</td><td class="border border-gray-300 p-2">${selectedEmployee.loans.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">පසුගිය හිඟ</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">කෑම සඳහා </td><td class="border border-gray-300 p-2">${selectedEmployee.foodConsumptionRecords.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">අවුරුදු අත්තිකාරම්</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">රුහුනු සංවර්ධන ණය</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">රඳවා ගැනීම්</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">බෝනස්</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">සමිති</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr><td class="border border-gray-300 p-2">පොත් ණය</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
        <tr>
            <td className="border border-gray-300 p-2" colSpan="2"></td>
        </tr>
        <tr><td class="border border-gray-300 p-2">මුළු අඩුකිරීම්</td><td class="border border-gray-300 p-2">${(
            parseFloat(selectedEmployee.advances) +
            parseFloat(selectedEmployee.loans) +
            parseFloat(selectedEmployee.foodConsumptionRecords) +
            parseFloat(selectedEmployee.EPF)
        ).toFixed(2)}</td></tr>
        <tr>
            <td className="border border-gray-300 p-2" colSpan="2"></td>
        </tr>
        <tr>
            <td class="border border-gray-300 p-2">ශුද්ධ වැටුප</td><td class="border border-gray-300 p-2">${selectedEmployee.netSalary.toFixed(2)}
                <div className="border-b border-black mt-1"></div>
                <div className="border-b border-black mt-1"></div> 
            </td>
        </tr>
        </tbody>
      </table>
    `;

    const printWindow = window.open('', '', 'width=250,height=600'); // Adjust width for receipt paper
    
    // Write the HTML content to the new window
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Pay Sheet</title>
                <style>
                body {
                    font-family: 'Noto Sans Sinhala', sans-serif;
                    margin: 0;
                    padding: 4px;
                    font-size: 8px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                td {
                    border: 1px solid gray;
                    padding: 4px;
                    font-size: 7px;
                }
                .underline {
                    border-bottom: 2px solid black; /* Line style */
                    margin-top: 2px; /* Space between text and line */
                }
                .center {
                    text-align: center; /* Center text */
                }
            </style>
            </head>
            <body>
                ${paysheetContent}
                <script>
                    window.onload = function() {
                        window.print();  // Trigger print dialog
                        window.close();  // Automatically close the window after printing
                    };
                </script>
            </body>
        </html>
    `);

    // Close the document stream to ensure it loads completely before printing
    printWindow.document.close();
};

const printAllPaySheets = async () => {
  try {
      // Prepare the content for all pay sheets
      const paysheetContents = filtedRecords.map(employee => createPaysheetContent(employee)).join('');
      
      // Print the paysheets to the thermal printer
      await printToThermalPrinter(paysheetContents);
      
      // Call the updateLatMonth function after printing
      const response = await updateLatMonth();
      console.log(response.data.message); // Optionally log the success message

  } catch (error) {
      console.error('Error during printing or updating monthly records:', error.response ? error.response.data.message : error.message);
  }
};

// Function to create the paysheet content for an employee
const createPaysheetContent = (employee) => {
  const monthName = months[selectedMonth]?.name || 'Unknown';
  return `
        <div style="margin-bottom: 20px; page-break-after: always;">
        <h2 class="text-xl font-bold text-gray-800 mb-4 center">ඩීඑම්සී පලයිවුඩ් - වැටුප් පත්‍රිකාව</h2>
        <table class="table-auto border-collapse w-full">
        <table class="table-auto border-collapse w-full">
            <thead>
                <tr>
                    <th class="border border-gray-300 p-2" style="font-size: 9px;">සේවකයාගේ නම :</th>
                    <th class="border border-gray-300 p-2" style="font-size: 9px;">${employee.employee.firstName} ${employee.employee.secondName}</th>
                </tr>
                <tr>
                    <th class="border border-gray-300 p-2" style="font-size: 9px;">සේවක අංකය :</th>
                    <th class="border border-gray-300 p-2" style="font-size: 9px;">${employee.employee.employeeId}</th>
                </tr>
                <tr>
                    <th class="border border-gray-300 p-2" style="font-size: 9px;">මාසය :</th>
                    <th class="border border-gray-300 p-2" style="font-size: 9px;">${monthName}</th>
                </tr>
            </thead>
            <tbody style="font-size: 2px;">
                ${createPaysheetRows(employee)}
            </tbody>
        </table>
      </div>
  `;
}

// Function to create the rows of the paysheet
const createPaysheetRows = (selectedEmployee) => {
  const monthName = months[selectedMonth]?.name || 'Unknown';
  // const month = new Date().toLocaleString('default', { month: 'long' });
  // const advancesTotal = employee.advances.reduce((total, advance) => total + advance.monthlyDeduction, 0);
  // const loansTotal = employee.loans.reduce((total, loan) => total + loan.monthlyDeduction, 0);
  // const foodConsumptionTotal = employee.foodConsumptionRecords.reduce((total, record) => total + record.totalAmount, 0);
  // const deductionsTotal = advancesTotal + loansTotal + foodConsumptionTotal + employee.EPF;

  return `

  
  <tr><td class="border border-gray-300 " style="font-size: 7px;">පැමිණි දිනය</td><td class="border border-gray-300 p-1" style="font-size: 7px;">${selectedEmployee.workingDays}</td></tr>
  <tr><td class="border border-gray-300 ">අතිකාල</td><td class="border border-gray-300 ">${selectedEmployee.OTEarning.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-1">පැමිණීමේ දීමනාව</td><td class="border border-gray-300 p-2">${(selectedEmployee.attendanceAllowance1 + selectedEmployee.attendanceAllowance2).toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">අයවැය දීමනාව</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">අමතර අත්තම්</td><td class="border border-gray-300 p-2">${selectedEmployee.doubleShiftEarning.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">දිරි දීමනාව</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">අවදානම් දීමනාව</td><td class="border border-gray-300 p-2">${(selectedEmployee.riskAllowance1 + selectedEmployee.riskAllowance2).toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">කොළඹ</td><td class="border border-gray-300 p-2">${selectedEmployee.colomboAllowance.toFixed(2)}</td></tr>
  <tr>
      <td className="border border-gray-300 p-2" colSpan="2"></td>
  </tr>
  <tr>
      <td className="border border-gray-300 p-2"> දළ වැටුප </td> 
      <td className="border border-gray-300 p-2">${((selectedEmployee.colomboAllowance)+
      (selectedEmployee.riskAllowance1 + selectedEmployee.riskAllowance2)+
      (selectedEmployee.incomeAllowance)+
      (selectedEmployee.doubleShiftEarning)+
      (selectedEmployee.incomeAllowance)+
      (selectedEmployee.attendanceAllowance1 + selectedEmployee.attendanceAllowance2)+
      (selectedEmployee.OTEarning)).toFixed(2)}
      <div className="border-b border-black mt-1 underline"></div>
      </td>
  </tr>
  <tr>
      <td className="border border-gray-300 p-2" colSpan="2"></td>
  </tr>
  <tr><td class="border border-gray-300 p-2">අර්ථ සාදක</td><td class="border border-gray-300 p-2">${selectedEmployee.EPF.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">අත්තිකාරම්</td><td class="border border-gray-300 p-2">${selectedEmployee.advances.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">බැංකු ගිණුම් සඳහා </td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">ණය මුදල</td><td class="border border-gray-300 p-2">${selectedEmployee.loans.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">පසුගිය හිඟ</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">කෑම සඳහා </td><td class="border border-gray-300 p-2">${selectedEmployee.foodConsumptionRecords.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">අවුරුදු අත්තිකාරම්</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">රුහුනු සංවර්ධන ණය</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">රඳවා ගැනීම්</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">බෝනස්</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">සමිති</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr><td class="border border-gray-300 p-2">පොත් ණය</td><td class="border border-gray-300 p-2">${selectedEmployee.incomeAllowance.toFixed(2)}</td></tr>
  <tr>
      <td className="border border-gray-300 p-2" colSpan="2"></td>
  </tr>
  <tr><td class="border border-gray-300 p-2">මුළු අඩුකිරීම්</td><td class="border border-gray-300 p-2">${(
      parseFloat(selectedEmployee.advances) +
      parseFloat(selectedEmployee.loans) +
      parseFloat(selectedEmployee.foodConsumptionRecords) +
      parseFloat(selectedEmployee.EPF)
  ).toFixed(2)}</td></tr>
  <tr>
      <td className="border border-gray-300 p-2" colSpan="2"></td>
  </tr>
  <tr>
      <td class="border border-gray-300 p-2">ශුද්ධ වැටුප</td><td class="border border-gray-300 p-2">${selectedEmployee.netSalary.toFixed(2)}
          <div className="border-b border-black mt-1"></div>
          <div className="border-b border-black mt-1"></div> 
      </td>
  </tr>
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
                      padding: 4px;
                      font-size: 8px;
                  }
                  table {
                      width: 100%;
                      border-collapse: collapse;
                  }
                  td {
                      border: 1px solid gray;
                      padding: 4px;
                      font-size: 7px;
                  }
                  .underline {
                      border-bottom: 2px solid black; /* Line style */
                      margin-top: 2px; /* Space between text and line */
                  }
                  .center {
                      text-align: center; /* Center text */
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

  // const printAllPaySheets = () => {
  //   console.log(filtedRecords)
  //   filtedRecords.forEach(record => {
  //     console.log(record)
  //     printPaySheet(record);
  //   });
  // };

  // Render table rows with the fetched records
  const renderTableRows = () => {
    if (records.length === 0 || noMonth) {
      return (
        <tr>
          <td colSpan="26">No records found for the selected month.</td>
        </tr>
      );
    }

    return filtedRecords.map((record, index) => (
      <tr key={index}>
        <td className="px-4 py-2 border">{index + 1}</td>
        <td className="px-4 py-2 border">{record.employee.employeeId}</td>
        <td className="px-4 py-2 border">{record.employee.firstName}</td>
        <td className="px-4 py-2 border">{record.workingDays}</td>
        <td className="px-4 py-2 border">{record.employee.salaryRate}</td>
        <td className="px-4 py-2 border">{record.monthPayment}</td>
        <td className="px-4 py-2 border">{record.OTHrs}</td>
        <td className="px-4 py-2 border">{record.OTRate}</td>
        <td className="px-4 py-2 border">{record.OTEarning}</td>
        <td className="px-4 py-2 border">{record.incomeAllowance}</td>
        <td className="px-4 py-2 border">{record.doubleShiftDays}</td>
        <td className="px-4 py-2 border">{record.doubleShiftEarning}</td>
        <td className="px-4 py-2 border">{record.attendanceAllowance1}</td>
        <td className="px-4 py-2 border">{record.attendanceAllowance2}</td>
        <td className="px-4 py-2 border">{record.riskAllowance1}</td>
        <td className="px-4 py-2 border">{record.riskAllowance2}</td>
        <td className="px-4 py-2 border">{record.colomboAllowance}</td>
        <td className="px-4 py-2 border">{record.attendance25}</td>
        <td className="px-4 py-2 border">{record.grossSalary}</td>
        <td className="px-4 py-2 border">{record.EPF}</td>
        <td className="px-4 py-2 border">{record.advances}</td>
        <td className="px-4 py-2 border">{record.loans}</td>
        <td className="px-4 py-2 border">{record.foodConsumptionRecords}</td>
        <td className="px-4 py-2 border">{record.totalDeduction}</td>
        <td className="px-4 py-2 border">{record.netSalary}</td>
        <td className="px-6 py-4 whitespace-nowrap fixed-column border">
          <button onClick={() => printPaySheet(record)}>Print Paysheet</button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="flex space-x-6 mb-6">
        <div className="flex-2/3 w-2/3">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Monthly Records</h2>
            
            {/* Dropdown for selecting month */}
            <div className="right-side flex pb-2 space-x-8">
              <div>
              <label
                  htmlFor="monthSelect"
                  className=" block mb-1"
              >
                  Select Month For Check Month Records
              </label>
              <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-6">
                  <option value="">Select Month</option>
                  {months.map((month) => (
                  <option key={month.value} value={month.value}>
                      {month.name}
                  </option>
                  ))}
              </select>

              </div>


              {/* Loading and Error states */}
              {loading && <p>Loading records...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}

            </div>

    
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
    </div>
  
      {/* Display Table in scrollable container */}
      <div
        style={{
          height: '400px',
          width: '100%',
          overflowY: 'auto',
          overflowX: 'auto',
          border: '1px solid #ccc',
          marginTop: '20px',
        }}
      >
        <table style={{ width: '100%' }}>
          <thead className="bg-orange-100">
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
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
      {/* Print All Paysheets Button */}
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={printAllPaySheets}
        >
          Print All Paysheets
        </button>
      </div>
    </div>
  );
  
};
