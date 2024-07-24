import React, { useEffect, useState, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { getCategoriesOrderedByMostSold } from '../../../api/api'; // Import the API function

function OrderedSoldCategory() {
  const [categoriesData, setCategoriesData] = useState([]);
  const chartRef = useRef(null); // Use a ref to store the chart instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoriesOrderedByMostSold();
        setCategoriesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (categoriesData.length > 0) {
      renderChart(categoriesData);
    }

    // Cleanup function to destroy the chart when the component unmounts or before rendering a new chart
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [categoriesData]);

  const renderChart = (data) => {
    const totalSales = data.reduce((acc, category) => acc + parseInt(category.sales_count), 0); // Parse sales_count to integer
    const seriesData = data.map(category => Math.round((category.sales_count / totalSales) * 100)); // Calculate percentages
    const labelsData = data.map(category => category.category_name);

    const options = {
      series: seriesData,
      labels: labelsData,
      chart: {
        type: 'donut',
        width: '500', // Set the chart width
        height: '500', // Set the chart height
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    // Destroy existing chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ApexCharts(document.querySelector("#chart1"), options);
    chartRef.current.render();
  };

  return (
    <div id="chart1"></div>
  );
}

export default OrderedSoldCategory;
