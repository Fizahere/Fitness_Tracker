import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { WorkoutServices } from '../../services/WorkoutServices';
import ICONS from '../../assets/constants/icons';
import { jwtDecode } from 'jwt-decode';
import WorkoutDataTable from '../../components/Mists/WorkoutDataTable';

const UserWorkout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState({
    exerciseName: '',
    sets: '',
    reps: '',
    weight: '',
    notes: '',
  });
  const [category, setCategory] = useState('');
  const queryClient = useQueryClient();

  const { data: workoutData, isLoading: workoutLoading } = useQuery(
    'workout-data',
    WorkoutServices.getWorkouts
  );

  const workoutMemoData = useMemo(() => workoutData?.data?.results || [], [workoutData]);

  const workoutCategories = ['strength', 'cardio', 'flexibility', 'endurance'];

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const {
    mutateAsync: createWorkoutRequest,
    isLoading: isCreatingWorkout,
  } = useMutation(WorkoutServices.addWorkout, {
    onSuccess: () => {
      setTitle('');
      setExercises({
        exerciseName: '',
        sets: '',
        reps: '',
        weight: '',
        notes: '',
      });
      setCategory('');
      toggleDrawer(false);

      queryClient.invalidateQueries('workout-data');
    },
    onError: (err) => {
      console.error('Error creating workout:', err);
    },
  });

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user.id;

  const addWorkoutHandler = async (e) => {
    e.preventDefault();

    const workoutData = {
      userId,
      title,
      exercises,
      category,
    };

    try {
      await createWorkoutRequest(workoutData);
      console.log('Workout created:', workoutData);
    } catch (err) {
      console.error('Error creating workout:', err);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <p className="text-3xl font-bold text-black dark:text-white mx-4 mb-6">Workouts</p>
        <button
          className="text-white bg-black dark:text-black dark:bg-white px-5 py-3 text-md rounded-lg"
          onClick={() => toggleDrawer(true)}
        >
          Add Workout
        </button>
      </div>

      <WorkoutDataTable data={workoutMemoData} loading={workoutLoading} />

      <div
        className={`fixed inset-0 bg-[#1b1b1c] bg-opacity-50 z-50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => toggleDrawer(false)}
      >
        <div
          className={`fixed right-0 top-0 w-[30rem] h-full bg-white dark:bg-black shadow-xl transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-semibold text-black dark:text-white">Add New Workout</h2>
              <i className='cursor-pointer' onClick={() => toggleDrawer(false)}><ICONS.CLOSE fontSize={20} /></i>
            </div>
            <form onSubmit={addWorkoutHandler}>
              <div className="flex">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-52 p-2 border rounded-lg bg-white dark:bg-[#1b1b1c]"
                    required
                  />
                </div>
                <div className="relative inline-block w-52 ml-2">
                  <label className="block text-sm font-medium text-black dark:text-white">Category</label>
                  <select
                    className="block w-full px-4 py-2 text-sm text-black dark:text-white bg-white dark:bg-[#1b1b1c] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select category</option>
                    {workoutCategories.map((singleCat, index) => (
                      <option key={index} value={singleCat}>
                        {singleCat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-black dark:text-white">Exercise Name</label>
                <input
                  type="text"
                  name="exerciseName"
                  value={exercises.exerciseName}
                  onChange={(e) => setExercises({ ...exercises, exerciseName: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-[#1b1b1c]"
                  required
                />
              </div>
              <div className="flex mt-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Sets</label>
                  <input
                    type="number"
                    name="sets"
                    value={exercises.sets}
                    onChange={(e) => setExercises({ ...exercises, sets: e.target.value })}
                    className="w-52 p-2 border rounded-lg bg-white dark:bg-[#1b1b1c]"
                    required
                  />
                </div>
                <div className="ml-2">
                  <label className="block text-sm font-medium text-black dark:text-white">Reps</label>
                  <input
                    type="number"
                    name="reps"
                    value={exercises.reps}
                    onChange={(e) => setExercises({ ...exercises, reps: e.target.value })}
                    className="w-52 p-2 border rounded-lg bg-white dark:bg-[#1b1b1c]"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-black dark:text-white">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={exercises.weight}
                  onChange={(e) => setExercises({ ...exercises, weight: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-[#1b1b1c]"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-black dark:text-white">Notes</label>
                <textarea
                  name="notes"
                  value={exercises.notes}
                  onChange={(e) => setExercises({ ...exercises, notes: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-[#1b1b1c]"
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-black text-white dark:bg-white dark:text-black px-4 py-3 rounded-lg w-full"
                  disabled={isCreatingWorkout}
                >
                  {isCreatingWorkout ? <div className='flex justify-center items-center'><ICONS.LOADING className='animate-spin text-white text-xl mr-2' /> Loading..</div> : 'Save Workout'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWorkout;
