import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { ProgressServices } from '../../services/progressServices';
import { getUserIdFromToken } from '../../services/authServices';
import ICONS from '../../assets/constants/icons';

// Register Chart.js components
ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ProgressChart = () => {
    const userId = getUserIdFromToken();

    const { data: progressData, isLoading, refetch, isError, error } = useQuery(
        ['progress-data', userId],
        () => ProgressServices.getProgress(userId),
        { enabled: Boolean(userId) }
    );

    const progressMemoData = useMemo(() => {
        if (!progressData || !progressData.data?.data) return [];
        return progressData.data.data;
    }, [progressData]);


    const chartData = useMemo(
        () => ({
            labels: progressMemoData.map((data) =>
                new Date(data?.createdAt).toLocaleDateString()
            ),
            datasets: [
                {
                    label: 'Weight (kg)',
                    data: progressMemoData.map((data) => data?.weight),
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    fill: true,
                },
                {
                    label: 'Run Time (min)',
                    data: progressMemoData.map(
                        (data) => data?.performanceMetrics?.runTime
                    ),
                    borderColor: 'rgba(153,102,255,1)',
                    backgroundColor: 'rgba(153,102,255,0.2)',
                    fill: true,
                },
                {
                    label: 'Lifting Weights (kg)',
                    data: progressMemoData.map(
                        (data) => data?.performanceMetrics?.liftingWeights
                    ),
                    borderColor: '#6a4b5d',
                    backgroundColor: 'rgb(106 75 93 / 62%)',
                    fill: true,
                },
            ],
        }),
        [progressMemoData]
    );

    const chartOptions = useMemo(
        () => ({
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false },
            },
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Value' } },
            },
        }),
        []
    );

    if (isLoading) {
        return (<div className="flex justify-center items-center min-h-[200px]">
            <ICONS.LOADING className="animate-spin text-black text-3xl" />
        </div>)
    }
    if (isError) {
        return (
            <div className="text-center mt-4">
                <p className="text-red-700 mb-2">{error.message ? error.message : 'check your internet'}</p>
                <button
                    className="px-4 py-2 text-3xl text-black dark:text-white rounded"
                    onClick={refetch}
                >
                    <ICONS.REFRESH />
                </button>
            </div>
        );
    }
    if (progressMemoData.length === 0) {
        return (
            <div className="text-center mt-10">
            <p className="text-zinc-800 dark:text-zinc-300 mb-2">No data available.</p>
        </div>
        )
    }

    return <Line data={chartData} options={chartOptions} />;
};

export default ProgressChart;
