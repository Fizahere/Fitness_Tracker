import React, { useMemo, useState, useEffect } from 'react';
import { isError, useMutation, useQuery, useQueryClient } from 'react-query';
import { WorkoutServices } from '../../services/WorkoutServices';
import ICONS from '../../assets/constants/icons';
import WorkoutDataTable from '../../components/Mists/WorkoutDataTable';
import { getUserIdFromToken } from '../../services/authServices';

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
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [error, setError] = useState(null)
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

  const { data: workoutData, isLoading: workoutLoading, isError } = useQuery(['workout-data', userId],
    () => WorkoutServices.getWorkouts(userId), {
    onError: (err) => { setError(err) },
    enabled: !!userId,
  });
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

  const { data: searchedWorkouts, isLoading: searchLoading, isError: searchError, refetch } = useQuery(
    ['searched-workouts-data', searchQuery],
    () => WorkoutServices.searchUserWorkout(searchQuery),
    {
      onSuccess: () => { setIsSearch(true) },
      onError: (err) => {
        setIsSearch(true)
        if (err.message === 'Request failed with status code 404') {
          setError(`no results for '${searchQuery}'`)
        }
      },
      enabled: false,
    },

  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setIsSearch(false)
      return;
    }
    refetch();
  };


  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <p className="text-3xl font-bold text-black dark:text-white mx-4 mb-6">
          Workouts
        </p>
        <div className="flex flex-col-reverse md:flex-row">
          <div className="relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workouts..."
                className='border-2 border-black p-2 rounded-lg md:mr-4'
              />
              <button type="submit" disabled={searchLoading} className='absolute right-6 text-lg top-3'>
                {searchLoading ? <ICONS.LOADING className='animate-spin' /> : <ICONS.SEARCH />}
              </button>
            </form>
          </div>
          <button
            className="mb-4 md:mb-0 text-white bg-[#262135] dark:text-black dark:bg-white px-5 py-3 text-md rounded-lg"
            onClick={() => toggleDrawer(true)}
          >
            Add Workout
          </button>
        </div>
      </div>
      {workoutLoading || searchLoading ? <ICONS.LOADING className='animate-spin' /> : (error ? <p>{error || error.message}</p> : <WorkoutDataTable
        data={isSearch ? searchedWorkouts || [] : workoutMemoData || []}
        // isLoading={workoutLoading}
        deleteLoading={deleteLoading}
        onDelete={deleteWorkout}
        onEdit={(id) => {
          setIsEdit(true);
          fetchWorkoutById(id);
          toggleDrawer(true);
        }}
      />)}

      {drawerOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end`}
          onClick={() => toggleDrawer(false)}
        >
          <div
            className="bg-white dark:bg-black shadow-xl w-[30rem] h-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 text-black dark:text-white">
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
                  <label className="block text-sm font-medium text-black dark:text-white">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Category</label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
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
                    <label className="block text-sm font-medium text-black dark:text-white">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={(field === 'notes' || field === 'exerciseName') ? 'text' : 'number'}
                      name={field}
                      value={exercises[field]}
                      onChange={(e) =>
                        setExercises({ ...exercises, [field]: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                      required={field !== 'notes'}
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="text-white bg-[#262135] px-4 py-3 rounded-lg w-full"
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
