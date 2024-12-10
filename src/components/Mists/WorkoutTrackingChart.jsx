import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useQuery } from 'react-query';
import { WorkoutServices } from '../../services/WorkoutServices';
import ICONS from '../../assets/constants/icons';

const WorkoutTrackingChart = () => {
    const today = new Date();

    const { data: workoutData, isLoading } = useQuery('workout-data', WorkoutServices.getWorkouts);

    if (isLoading)
        return (
            <i>
                <ICONS.LOADING className="animate-spin text-2xl m-10 text-white text-center" />
            </i>
        );

    const workouts = workoutData?.data?.results || [];

    const workoutDates = workouts.reduce((acc, workout) => {
        const date = new Date(workout.createdAt).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1; 
        return acc;
    }, {});

    const heatmapData = Object.entries(workoutDates).map(([date, count]) => ({ date, count }));

    return (
        <div>
            <h1 className='text-white text-2xl mb-4'>Workout Tracking</h1>
            <CalendarHeatmap
                startDate={new Date(today.getFullYear(), 0, 6)}
                endDate={new Date(today.getFullYear(), 12, 30)}
                values={heatmapData}
                classForValue={(value) => {
                    if (!value) return 'color-empty';
                    if (value.count > 4) return 'color-github-4';
                    return `color-github-${value.count}`;
                }}
            />
            <style>
                {`
                .color-empty {
                    fill: #ebedf0!important;
                }
                .color-github-1 {
                    fill: #cdbfe7!important;
                }
                .color-github-2 {
                    fill: #efeeb6!important;
                }
                .color-github-3 {
                    fill: #d6ebeb!important;
                }
                .color-github-4 {
                    fill: #6a4b5d!important;
                }

                .react-calendar-heatmap {
                    // height: 100px!important; 
                    // width: 2000px!important; 
                }
                `}
            </style>
        </div>
    );
};

export default WorkoutTrackingChart;
