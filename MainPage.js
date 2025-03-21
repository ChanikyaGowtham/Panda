import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./MainPage.css";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

function MainPage() {
  const userToken = localStorage.getItem("token");

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(`transactions_${userToken}`);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [formData, setFormData] = useState({
    type: "income",
    description: "",
    amount: "",
  });
  const [report, setReport] = useState({
    totalCredited: 0,
    totalDebited: 0,
    netBalance: 0,
  });
  const [monthlyInsights, setMonthlyInsights] = useState({ credited: 0, debited: 0 });
  const [annualInsights, setAnnualInsights] = useState({ credited: 0, debited: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    const newTransaction = {
      id: Date.now(),
      type: formData.type,
      description: formData.description,
      amount: parseFloat(formData.amount),
      action: formData.type === "income" ? "credited" : "debited",
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
    };
    setTransactions((prevTransactions) => {
      const updatedTransactions = [...prevTransactions, newTransaction];
      localStorage.setItem(`transactions_${userToken}`, JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });
    setFormData({ type: "income", description: "", amount: "" });
  };

  const handleDelete = (id) => {
    setTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.filter((t) => t.id !== id);
      localStorage.setItem(`transactions_${userToken}`, JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });
  };

  useEffect(() => {
    const calculateReport = () => {
      const totalCredited = transactions
        .filter((t) => t.action === "credited")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalDebited = transactions
        .filter((t) => t.action === "debited")
        .reduce((sum, t) => sum + t.amount, 0);
      const netBalance = totalCredited - totalDebited;
      return { totalCredited, totalDebited, netBalance };
    };

    const calculateMonthlyInsights = () => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyCredited = transactions
        .filter((t) => {
          const date = new Date(t.timestamp);
          return t.action === "credited" && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
      const monthlyDebited = transactions
        .filter((t) => {
          const date = new Date(t.timestamp);
          return t.action === "debited" && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
      return { credited: monthlyCredited, debited: monthlyDebited };
    };

    const calculateAnnualInsights = () => {
      const currentYear = new Date().getFullYear();
      const annualCredited = transactions
        .filter((t) => {
          const date = new Date(t.timestamp);
          return t.action === "credited" && date.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
      const annualDebited = transactions
        .filter((t) => {
          const date = new Date(t.timestamp);
          return t.action === "debited" && date.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
      return { credited: annualCredited, debited: annualDebited };
    };

    setReport(calculateReport());
    setMonthlyInsights(calculateMonthlyInsights());
    setAnnualInsights(calculateAnnualInsights());
  }, [transactions]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem(`transactions_${userToken}`); // Uncomment to clear on logout
    setTransactions([]);
    window.location.href = "/login";
  };

  const generateReport = () => {
    let csvContent = "Personal Finance Report\n\n";
    
    csvContent += "Transactions\n";
    csvContent += "Date,Description,Amount (₹),Action\n";
    transactions.forEach((t) => {
      const description = `"${t.description.replace(/"/g, '""')}"`;
      csvContent += `${t.date},${description},${t.amount.toFixed(2)},${t.action}\n`;
    });

    csvContent += "\nFinancial Summary\n";
    csvContent += "Category,Amount (₹)\n";
    csvContent += `Total Credited (Income),${report.totalCredited.toFixed(2)}\n`;
    csvContent += `Total Debited (Expenses),${report.totalDebited.toFixed(2)}\n`;
    csvContent += `Net Balance,${report.netBalance.toFixed(2)}\n`;

    csvContent += "\nMonthly Insights (Current Month)\n";
    csvContent += "Category,Amount (₹)\n";
    csvContent += `Income,${monthlyInsights.credited.toFixed(2)}\n`;
    csvContent += `Expenses,${monthlyInsights.debited.toFixed(2)}\n`;

    csvContent += "\nAnnual Insights (Current Year)\n";
    csvContent += "Category,Amount (₹)\n";
    csvContent += `Income,${annualInsights.credited.toFixed(2)}\n`;
    csvContent += `Expenses,${annualInsights.debited.toFixed(2)}\n`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Financial_Report_${new Date().toLocaleDateString().replace(/\//g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pie Chart Data
  const incomeTransactions = transactions.filter(t => t.action === "credited");
  const expenseTransactions = transactions.filter(t => t.action === "debited");
  const uniqueIncomeDescriptions = [...new Set(incomeTransactions.map(t => t.description))];
  const uniqueExpenseDescriptions = [...new Set(expenseTransactions.map(t => t.description))];

  const incomeColors = ['#28a745', '#218838', '#2ecc71', '#27ae60'];
  const expenseColors = ['#dc3545', '#c82333', '#e74c3c', '#d63031'];

  const pieChartData = {
    labels: [
      ...uniqueIncomeDescriptions,
      ...uniqueExpenseDescriptions
    ],
    datasets: [
      {
        data: [
          ...uniqueIncomeDescriptions.map(desc =>
            incomeTransactions
              .filter(t => t.description === desc)
              .reduce((sum, t) => sum + t.amount, 0)
          ),
          ...uniqueExpenseDescriptions.map(desc =>
            expenseTransactions
              .filter(t => t.description === desc)
              .reduce((sum, t) => sum + t.amount, 0)
          )
        ],
        backgroundColor: [
          ...uniqueIncomeDescriptions.map((_, index) => incomeColors[index % incomeColors.length]),
          ...uniqueExpenseDescriptions.map((_, index) => expenseColors[index % expenseColors.length])
        ],
        hoverBackgroundColor: [
          ...uniqueIncomeDescriptions.map((_, index) => incomeColors[index % incomeColors.length]),
          ...uniqueExpenseDescriptions.map((_, index) => expenseColors[index % expenseColors.length])
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: { font: { size: 14 } },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label;
            const amount = context.parsed;
            const isIncome = uniqueIncomeDescriptions.includes(label);
            return `${isIncome ? 'Income' : 'Expense'} (${label}): ₹${amount.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="main-container">
      <div className="header-container">
        <h1>Personal Finance Manager</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Transaction Form */}
      <div className="transaction-form">
        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            placeholder="Transaction Name"
            required
          />
          <input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder={formData.type === "income" ? "Amount Credited" : "Amount Debited"}
            required
            step="0.01"
          />
          <button type="submit">Add</button>
        </form>
      </div>

      {/* Transaction Table */}
      <div className="transaction-table">
        <h2>Transactions</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Name</th>
                <th>Amount (₹)</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>₹{transaction.amount.toFixed(2)}</td>
                  <td>{transaction.action === "credited" ? "Credited" : "Debited"}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      style={{
                        color: "#dc3545", // Red color for the symbol
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "3px",
                        fontSize: "16px",
                        background: "none" // No background
                      }}
                      title="Delete Transaction"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Report Section */}
      <div className="report-section">
        <h2>Financial Report</h2>
        <p>
          Total Credited (Income): <span style={{ color: "#28a745" }}>₹{report.totalCredited.toFixed(2)}</span>
        </p>
        <p>
          Total Debited (Expenses): <span style={{ color: "#dc3545" }}>₹{report.totalDebited.toFixed(2)}</span>
        </p>
        <p>
          Net Balance: <span style={{ color: report.netBalance >= 0 ? "#28a745" : "#dc3545" }}>
            ₹{report.netBalance.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Pie Chart and Insights */}
      <div className="chart-insights">
        <div className="chart-container">
          <h2>Financial Breakdown by Transaction</h2>
          {(report.totalCredited > 0 || report.totalDebited > 0) ? (
            <Pie data={pieChartData} options={pieChartOptions} />
          ) : (
            <p>No data to display in chart yet.</p>
          )}
        </div>

        <div className="insights-section">
          <h3>Monthly Insights (Current Month)</h3>
          <p>
            Income: <span style={{ color: "#28a745" }}>₹{monthlyInsights.credited.toFixed(2)}</span>
          </p>
          <p>
            Expenses: <span style={{ color: "#dc3545" }}>₹{monthlyInsights.debited.toFixed(2)}</span>
          </p>

          <h3>Annual Insights (Current Year)</h3>
          <p>
            Income: <span style={{ color: "#28a745" }}>₹{annualInsights.credited.toFixed(2)}</span>
          </p>
          <p>
            Expenses: <span style={{ color: "#dc3545" }}>₹{annualInsights.debited.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Generate Report Button */}
      <div className="report-download">
        <button className="generate-report-btn" onClick={generateReport}>
          Generate Financial Report
        </button>
      </div>
    </div>
  );
}

export default MainPage;