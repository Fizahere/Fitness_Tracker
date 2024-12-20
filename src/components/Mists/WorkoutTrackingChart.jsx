// import React from 'react';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';
// import { useQuery } from 'react-query';
// import { WorkoutServices } from '../../services/WorkoutServices';
// import ICONS from '../../assets/constants/icons';

// const WorkoutTrackingChart = () => {
//     const today = new Date();

//     const { data: workoutData, isLoading } = useQuery('workout-data', WorkoutServices.getWorkouts);

//     if (isLoading)
//         return (
//             <i>
//                 <ICONS.LOADING className="animate-spin text-2xl m-10 text-white text-center" />
//             </i>
//         );

//     const workouts = workoutData?.data?.results || [];

//     const workoutDates = workouts.reduce((acc, workout) => {
//         const date = new Date(workout.createdAt).toISOString().split('T')[0];
//         acc[date] = (acc[date] || 0) + 1; 
//         return acc;
//     }, {});

//     const heatmapData = Object.entries(workoutDates).map(([date, count]) => ({ date, count }));

//     return (
//         <div>
//             <h1 className='text-white text-2xl mb-4'>Workout Tracking</h1>
//             <CalendarHeatmap
//                 startDate={new Date(today.getFullYear(), 0, 6)}
//                 endDate={new Date(today.getFullYear(), 12, 30)}
//                 values={heatmapData}
//                 classForValue={(value) => {
//                     if (!value) return 'color-empty';
//                     if (value.count > 4) return 'color-github-4';
//                     return `color-github-${value.count}`;
//                 }}
//             />
//             <style>
//                 {`
//                 .color-empty {
//                     fill: #ebedf0!important;
//                 }
//                 .color-github-1 {
//                     fill: #cdbfe7!important;
//                 }
//                 .color-github-2 {
//                     fill: #efeeb6!important;
//                 }
//                 .color-github-3 {
//                     fill: #d6ebeb!important;
//                 }
//                 .color-github-4 {
//                     fill: #6a4b5d!important;
//                 }

//                 .react-calendar-heatmap {
//                     // height: 100px!important; 
//                     // width: 2000px!important; 
//                 }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default WorkoutTrackingChart;
import React, { useMemo } from 'react';
import { Bubble } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { WorkoutServices } from '../../services/WorkoutServices';
import dayjs from 'dayjs'; // Install using `npm install dayjs`

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import ICONS from '../../assets/constants/icons';
import { getUserIdFromToken } from '../../services/authServices';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);
const userId=getUserIdFromToken()

const WorkoutBubbleChart = () => {
    const { data: workoutData, isLoading, error } = useQuery(
            ['workout-data', userId],
            () => WorkoutServices.getWorkouts(userId),
            {
                enabled: !!userId,
                staleTime: 1000 * 60,
            }
        );
     const workoutMemoData = useMemo(
          () => workoutData?.data?.results || [],
          [workoutData]
      );
    if (isLoading) return <ICONS.LOADING className='text-2xl text-white animate-spin' />;
    if (error) return <p>Error fetching workout data: {error.message}</p>;

    const chartData = workoutMemoData.map((workout, index) => {
        const date = dayjs(workout.createdAt);
        const day = date.format('dddd');
        return {
            x: index + 1,
            y: workout.exercises.reps,
            r: workout.exercises.reps / 0.5,
            day,
        };
    });

    const data = {
        datasets: [
            {
                label: 'Workout Days',
                data: chartData,
                backgroundColor: '#fcc6e6',
                borderColor: '#cdbfe7',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const workout = chartData[context.dataIndex];
                        return `Day: ${workout.day}, Duration: ${workout.y} mins`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Workout Order',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Workout Duration (mins)',
                },
            },
        },
    };

    return <Bubble data={data} options={options} />;
};

export default WorkoutBubbleChart;
