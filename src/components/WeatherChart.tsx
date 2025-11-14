import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeatherChartProps {
  forecastData: Array<{
    time: string;
    temp: number;
  }>;
  dark?: boolean;
}

export default function WeatherChart({ forecastData, dark = false }: WeatherChartProps) {
  const primary = dark ? 'rgb(99, 102, 241)' : 'rgb(59, 130, 246)'; // indigo (darker) in dark mode
  const bg = dark ? 'rgba(99,102,241,0.12)' : 'rgba(59,130,246,0.1)';
  const tickColor = dark ? '#cbd5e1' : '#6B7280';
  const gridColor = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

  const data = {
    labels: forecastData.map((item) => item.time),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecastData.map((item) => item.temp),
        borderColor: primary,
        backgroundColor: bg,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: primary,
        pointBorderColor: dark ? '#0f172a' : '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: dark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.8)',
        padding: 12,
        borderColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#fff',
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: tickColor,
          font: { size: 12 },
        },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: tickColor,
          font: { size: 12 },
          callback: (value: number | string) => `${value}°C`,
        },
      },
    },
  };

  return (
    <div className={`${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6`}>
      <h2 className={`${dark ? 'text-gray-100' : 'text-gray-800'} text-lg font-semibold mb-4`}>
        24-Hour Temperature Forecast
      </h2>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
