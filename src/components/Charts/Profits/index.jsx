// src/components/Profit.jsx
import React, { useState, useEffect } from 'react';
import { getSumOfAllOrders } from '../../../api/api';

function Profit() {
  const [totalSum, setTotalSum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalSum = async () => {
      try {
        const sum = await getSumOfAllOrders();
        // Assuming sum is an object with a 'totalsum' key
        setTotalSum(sum.totalsum);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSum();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
        <span className="rounded-full bg-blue-100 p-3 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            width={50}
            height={100}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>

        <div>
          <p className="text-xl sm:text-2xl font-medium text-gray-900">${totalSum}</p>
          <p className="text-sm text-gray-500">Total Sales</p>
        </div>
      </article>
    </div>
  );
}

export default Profit;
