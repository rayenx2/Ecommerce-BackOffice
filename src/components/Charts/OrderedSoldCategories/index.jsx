// orderedSoldCategory.jsx

import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { getCategoriesOrderedByMostSold } from '../../../api/api'; // Import the API function

function OrderedSoldCategory() {
    const [categoriesData, setCategoriesData] = useState([]);

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
        console.log(categoriesData)
        renderChart(categoriesData);
      }
    }, [categoriesData]);
  
    const renderChart = (data) => {
        const totalSales = data.reduce((acc, category) => acc + parseInt(category.sales_count), 0); // Parse sales_count to integer
        const seriesData = data.map(category => Math.round((category.sales_count / totalSales) * 100)); // Calculate percentages
        const labelsData = data.map(category => category.category_name);
       console.log({ seriesData, labelsData});
       console.log('total sales are',totalSales)
      const options = {
        series:seriesData,
        labels:labelsData,
        chart: {
          type: 'donut',
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
  
      const chart = new ApexCharts(document.querySelector("#chart1"), options);
      chart.render();
    };
  
    return (
    
        <div id="chart1"></div>
    
    );
  };

export default OrderedSoldCategory;
