import React, { useState, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { getProductsOrderedByMostSold } from '../../../api/api';

function OrderedSoldProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductsOrderedByMostSold();
        console.log('Fetched products:', products); // Debugging: log the fetched products
        setData(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const productNames = data.map(product => product.title);
      const salesCounts = data.map(product => product.sales_count);

      console.log('Product Names:', productNames, data);
      console.log('Sales Counts:', salesCounts);

      const options = {
        series: [{
          name: 'Sales Count',
          data: salesCounts
        }],
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: productNames,
        },
        yaxis: {
          title: {
            text: 'Sales Count'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " sales";
            }
          }
        }
      };

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new ApexCharts(document.querySelector("#chart"), options);
      chartRef.current.render();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div id="chart"></div>;
}

export default OrderedSoldProduct;
