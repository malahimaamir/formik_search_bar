"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [30, 45, 60, 50, 80, 70, 90, 55, 40, 65, 35, 50],
        backgroundColor: "#3b82f6", // Tailwind's blue-500
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Sales Report",
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const [selected, setSelected] = useState<string | null>(null);

  const handleCountryClick = (country: string) => {
    setSelected(country);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white">
        <nav className="p-4">
          <ul>
            <li>
              <a href="/Admin" className="block py-2 px-4 hover:bg-blue-700">
                Dashboard
              </a>
            </li>
            <li>
              <Link
                href="/Admin/products"
                className="block py-2 px-4 hover:bg-blue-700"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/Admin/orders"
                className="block py-2 px-4 hover:bg-blue-700"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/Admin/users"
                className="block py-2 px-4 hover:bg-blue-700"
              >
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Dashboard</h1>

        {/* Welcome Section */}
        <div className="bg-blue-600 text-white rounded-lg p-6 flex items-center justify-between mb-6 shadow">
          <div>
            <h2 className="text-xl font-semibold">Welcome Back!</h2>
            <p className="text-sm"> Dashboard</p>
            <button className="mt-2 px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-100 text-sm">
              View more
            </button>
          </div>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Admin"
            width={96}
            height={96}
            className="w-24 h-24"
          />
        </div>

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Monthly Sale Report */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-600 mb-1">This Month Sale</h3>
            <p className="text-2xl font-semibold text-blue-800">$13,425</p>
            <p className="text-sm text-green-600">+12% from previous period</p>
            <button className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              View more
            </button>
          </div>

          {/* Sales Report Chart Placeholder */}
          <div className="bg-white rounded-lg shadow p-4 col-span-1 lg:col-span-2 h-64">
            <Bar data={salesData} options={salesOptions} />
          </div>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Sales Status */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-600 font-semibold mb-2">Sales Status</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                Number of Sales: <strong>1,625</strong>
              </li>
              <li>
                Sales Revenue: <strong>$42,235</strong>
              </li>
              <li>
                Average Price: <strong>$14.56</strong>
              </li>
              <li>
                Product Sold: <strong>8,235</strong>
              </li>
            </ul>
          </div>

          {/* Social Source */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
            <h3 className="text-gray-600 font-semibold mb-2">Social Source</h3>
            <div className="w-24 h-24 rounded-full border-8 border-blue-300 border-t-yellow-400 border-r-purple-500 animate-spin mb-4"></div>
            <div className="text-center text-sm text-gray-700">
              Facebook: <strong>$1,625</strong>
              <br />
              Twitter: <strong>$1,504</strong>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-600 font-semibold mb-2">
              Recent Activity
            </h3>
            <ul className="text-sm text-gray-700">
              <li className="mb-1">
                Jack - <span className="text-blue-600">03 Jan</span>
              </li>
              <li className="mb-1">
                Thomas - <span className="text-yellow-500">06 Jan</span>
              </li>
              <li className="mb-1">
                David - <span className="text-red-500">08 Jan</span>
              </li>
              <li>
                James - <span className="text-green-500">12 Jan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Transactions */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-600 font-semibold mb-2">
              Latest Transaction
            </h3>
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Transaction ID</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td>#TXN001</td>
                  <td>$234.56</td>
                  <td>
                    <button className="text-blue-600 text-xs">View</button>
                  </td>
                </tr>
                <tr>
                  <td>#TXN002</td>
                  <td>$120.00</td>
                  <td>
                    <button className="text-blue-600 text-xs">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Revenue by Location */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-gray-800 h-72 w-full">
            <h2 className="text-lg font-semibold mb-2">Revenue by Location</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 500"
              className="w-full h-48"
            >
              {/* Example countries using simplified rectangles */}
              <rect
                x="100"
                y="100"
                width="80"
                height="50"
                fill="#60a5fa"
                onClick={() => handleCountryClick("USA")}
              />
              <rect
                x="300"
                y="150"
                width="80"
                height="50"
                fill="#3b82f6"
                onClick={() => handleCountryClick("Brazil")}
              />
              <rect
                x="500"
                y="120"
                width="80"
                height="50"
                fill="#2563eb"
                onClick={() => handleCountryClick("India")}
              />
            </svg>
            {selected && (
              <p className="mt-2 text-sm text-gray-600">Selected: {selected}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
