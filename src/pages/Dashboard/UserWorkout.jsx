import React, { useMemo, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { WorkoutServices } from '../../services/WorkoutServices';
import ICONS from '../../assets/constants/icons';
import { jwtDecode } from 'jwt-decode';
import WorkoutDataTable from '../../components/Mists/WorkoutDataTable';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  return decodedToken?.user?.id;
};

const workoutCategories = ['strength', 'cardio', 'flexibility', 'endurance'];

const UserWorkout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [exercises, setExercises] = useState({
    exerciseName: '',
    sets: '',
    reps: '',
    weight: '',
    notes: '',
  });
  const [category, setCategory] = useState('');

  const queryClient = useQueryClient();
  const userId = getUserIdFromToken();

  useEffect(() => {
    if (isEdit && dataToEdit) {
      setTitle(dataToEdit.title || '');
      setCategory(dataToEdit.category || '');
      setExercises(dataToEdit.exercises || {
        exerciseName: '',
        sets: '',
        reps: '',
        weight: '',
        notes: '',
      });
    }
  }, [isEdit, dataToEdit]);

  const { data: workoutData, isLoading: workoutLoading } = useQuery(
    'workout-data',
    WorkoutServices.getWorkouts
  );
  const workoutMemoData = useMemo(() => workoutData?.data?.results || [], [workoutData]);

  const { mutateAsync: deleteWorkout, isLoading: deleteLoading } = useMutation(
    WorkoutServices.deleteWorkout,
    {
      onSuccess: () => queryClient.invalidateQueries('workout-data'),
      onError: (error) => console.error('Error deleting workout:', error),
    }
  );

  const { mutateAsync: saveWorkout, isLoading: isSavingWorkout } = useMutation(
    isEdit ? WorkoutServices.editWorkout : WorkoutServices.addWorkout,
    {
      onSuccess: () => {
        resetForm();
        queryClient.invalidateQueries('workout-data');
        setDrawerOpen(false);
      },
      onError: (err) => console.error('Error saving workout:', err),
    }
  );

  const { mutate: fetchWorkoutById } = useMutation(WorkoutServices.getWorkoutById, {
    onSuccess: (data) => setDataToEdit(data?.results),
  });

  const resetForm = () => {
    setTitle('');
    setExercises({
      exerciseName: '',
      sets: '',
      reps: '',
      weight: '',
      notes: '',
    });
    setCategory('');
    setIsEdit(false);
    setDataToEdit(null);
  };

  const toggleDrawer = (open) => {
    if (!open) resetForm();
    setDrawerOpen(open);
  };

  const handleSaveWorkout = async (e) => {
    e.preventDefault();
    const workoutPayload = {
      userId,
      title,
      exercises,
      category,
    };

    try {
      await saveWorkout(isEdit ? [dataToEdit._id, workoutPayload] : workoutPayload);
      console.log(`${isEdit ? 'Workout updated' : 'Workout created'} successfully!`);
    } catch (err) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} workout:`, err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">Workouts</h1>
        <button
          className="text-white bg-black dark:text-black dark:bg-white px-5 py-3 text-md rounded-lg"
          onClick={() => toggleDrawer(true)}
        >
          Add Workout
        </button>
      </div>

      <WorkoutDataTable
        data={workoutMemoData}
        isLoading={workoutLoading}
        deleteLoading={deleteLoading}
        onDelete={deleteWorkout}
        onEdit={(id) => {
          setIsEdit(true);
          fetchWorkoutById(id);
          toggleDrawer(true);
        }}
      />

      {drawerOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end`}
          onClick={() => toggleDrawer(false)}
        >
          <div
            className="bg-white dark:bg-black shadow-xl w-[30rem] h-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isEdit ? 'Edit Workout' : 'Add New Workout'}
              </h2>
              <button onClick={() => toggleDrawer(false)}>
                <ICONS.CLOSE fontSize={20} />
              </button>
            </div>

            <form onSubmit={handleSaveWorkout}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {workoutCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {['exerciseName', 'sets', 'reps', 'weight', 'notes'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'notes' ? 'textarea' : 'text'}
                      name={field}
                      value={exercises[field]}
                      onChange={(e) =>
                        setExercises({ ...exercises, [field]: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg"
                      required={field !== 'notes'}
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="bg-black text-white dark:bg-white dark:text-black px-4 py-3 rounded-lg w-full"
                  disabled={isSavingWorkout}
                >
                  {isSavingWorkout ? 'Saving...' : 'Save Workout'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserWorkout;
