import React, { useState, useMemo } from 'react';   // ✅ added useState + useMemo
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const professionalColors = [
  '#3498db', '#1abc9c', '#9b59b6', '#f1c40f', '#e67e22',
  '#34495e', '#2ecc71', '#e74c3c', '#7f8c8d', '#d35400'
];

const FirmDistributionChart = ({ transactions }) => {
  const [chartType, setChartType] = useState('in');

  const chartData = useMemo(() => {
    const relevantTransactions = transactions.filter(t => t.type === chartType);
    if (relevantTransactions.length === 0) return null;

    const dataByFirm = relevantTransactions.reduce((acc, t) => {
      acc[t.firmName] = (acc[t.firmName] || 0) + t.totalAmount;
      return acc;
    }, {});

    const labels = Object.keys(dataByFirm);
    const data = Object.values(dataByFirm);

    return {
      labels,
      datasets: [
        {
          label: 'Amount',
          data,
          backgroundColor: professionalColors,
          borderColor: '#ffffff',
          borderWidth: 2,
          borderRadius: 4,
          spacing: 2,
        },
      ],
    };
  }, [transactions, chartType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 15, 
          font: {
            size: 10,
          }
        }
      },
      title: {
        display: true,
        text: `Distribution of ${chartType === 'in' ? 'Cash In' : 'Cash Out'} by Firm`,
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              const value = context.parsed;
              const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(2);
              label += `${new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
              }).format(value)} (${percentage}%)`;
            }
            return label;
          }
        }
      }
    },
  };

  return (
    // Increased height to ensure legend fits without shrinking the chart
    <div className="chart-container" style={{ height: '350px' }}>
      <div className="chart-toggle">
        <div className="form-radio-option">
          <input
            type="radio"
            id="chart-type-in"
            name="chart-type"
            value="in"
            checked={chartType === 'in'}
            onChange={() => setChartType('in')}
          />
          <label htmlFor="chart-type-in">Cash In</label>
        </div>
        <div className="form-radio-option">
          <input
            type="radio"
            id="chart-type-out"
            name="chart-type"
            value="out"
            checked={chartType === 'out'}
            onChange={() => setChartType('out')}
          />
          <label htmlFor="chart-type-out">Cash Out</label>
        </div>
      </div>

      {chartData ? (
        <Doughnut options={options} data={chartData} />
      ) : (
        <p className="no-chart-data">
          No {chartType === 'in' ? 'Cash In' : 'Cash Out'} data available to display.
        </p>
      )}
    </div>
  );
};

export default FirmDistributionChart;