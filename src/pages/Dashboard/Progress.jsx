import React, { useMemo, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ICONS from '../../assets/constants/icons';
import ProgressDataTable from '../../components/Mists/ProgressDataTable';
import { ProgressServices } from '../../services/progressServices';
import { getUserIdFromToken } from '../../services/authServices';

const Progress = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const userId = getUserIdFromToken();
  const [weight, setWeight] = useState('');
  const [bodyMeasurements, setBodyMeasurements] = useState({
    chest: '',
    waist: '',
    arms: ''
  });
  const [performanceMetrics, setPerformanceMetrics] = useState({
    runTime: '',
    liftingWeights: '',
  });
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isEdit && dataToEdit) {
      setWeight(dataToEdit.weight || '');
      setBodyMeasurements(dataToEdit.bodyMeasurements || {
        chest: '',
        waist: '',
        arms: ''
      });
      setPerformanceMetrics(dataToEdit.performanceMetrics || {
        runTime: '',
        liftingWeights: '',
      });
    }
  }, [isEdit, dataToEdit]);

  const { data: progressData, isLoading: progressLoading } = useQuery(
    ['progress-data', userId],
    () => ProgressServices.getProgress(userId),
    { enabled: !!userId }
  );

  const progressMemoData = useMemo(
    () => progressData?.data?.data || [],
    [progressData]
  );

  const { mutateAsync: deleteProgress, isLoading: deleteLoading } = useMutation(
    ProgressServices.deleteProgress,
    {
      onSuccess: () => queryClient.invalidateQueries('progress-data'),
      onError: (error) => console.error('Error deleting progress:', error),
    }
  );

  const { mutateAsync: saveProgress, isLoading: isSavingProgress } = useMutation(
    isEdit ? ProgressServices.editProgress : ProgressServices.addProgress,
    {
      onSuccess: () => {
        resetForm();
        queryClient.invalidateQueries('progress-data');
        setDrawerOpen(false);
      },
      onError: (err) => console.error('Error saving progress:', err),
    }
  );

  const { mutate: fetchProgressById } = useMutation(
    ProgressServices.getProgressById,
    {
      onSuccess: (data) => {
        setDataToEdit(data?.data);
        setIsEdit(true);
        setDrawerOpen(true);
      },
    }
  );

  const resetForm = () => {
    setWeight('')
    setBodyMeasurements({
      chest: '',
      waist: '',
      arms: ''
    });
    setPerformanceMetrics({
      runTime: '',
      liftingWeights: '',
    });
    setIsEdit(false);
    setDataToEdit(null);
  };

  const toggleDrawer = (open) => {
    if (!open) resetForm();
    setDrawerOpen(open);
  };

  const handleSaveProgress = async (e) => {
    e.preventDefault();
    const progressPayload = {
      userId,
      weight,
      bodyMeasurements,
      performanceMetrics
    };

    try {
      await saveProgress(
        isEdit ? [dataToEdit._id, progressPayload] : progressPayload
      );
      console.log(
        `${isEdit ? 'Progress updated' : 'Progress created'} successfully!`
      );
    } catch (err) {
      console.error(
        `Error ${isEdit ? 'updating' : 'creating'} progress:`,
        err
      );
    }
  };
  const { data: searchedProgress, isLoading: searchLoading, isError: searchError, refetch } = useQuery(
    ['searched-progress-data', searchQuery],
    () => ProgressServices.searchUserProgress(searchQuery),
    {
      onSuccess: () => { setIsSearch(true) },
      onError: (err) => {
        setIsSearch(true)
        if (err.message === 'Request failed with status code 400') {
          setError(`no results for '${searchQuery}'`)
        }
      },
      enabled: false,
    }
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
          Progress
        </p>
        <div className="flex flex-col-reverse md:flex-row">
          <div className="relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="enter weight..."
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
            Add Progress
          </button>
        </div>
      </div>
      {progressLoading || searchLoading ? <ICONS.LOADING className='animate-spin' /> : (error ? <p>{error || error.message}</p> :
        <ProgressDataTable
          data={isSearch ? searchedProgress || [] : progressMemoData || []}
          // isLoading={progressLoading||searchLoading}
          deleteLoading={deleteLoading}
          onDelete={deleteProgress}
          onEdit={(id) => fetchProgressById(id)}
        />)}

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-[#1b1b1c] bg-opacity-50 z-50"
          onClick={() => toggleDrawer(false)}
        >
          <div
            className="fixed right-0 top-0 w-[30rem] h-full bg-white dark:bg-black shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-10 text-black dark:text-white">
                <h2 className="text-xl font-semibold">
                  {isEdit ? 'Edit Progress' : 'Add New Progress'}
                </h2>
                <i
                  className="cursor-pointer"
                  onClick={() => toggleDrawer(false)}
                >
                  <ICONS.CLOSE fontSize={20} />
                </i>
              </div>
              <form onSubmit={handleSaveProgress}>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Weight</label>
                  <input
                    type="number"
                    min={1}
                    name="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                    required
                  />
                </div>

                {['chest', 'waist', 'arms'].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium mt-2">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="number"
                        min={1}
                        name={field}
                        value={bodyMeasurements[field]}
                        onChange={(e) =>
                          setBodyMeasurements({
                            ...bodyMeasurements,
                            [field]: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                        required
                      />
                    </div>
                  )
                )}
                {['runTime', 'liftingWeights'].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium mt-2">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="number"
                        name={field}
                        value={performanceMetrics[field]}
                        onChange={(e) =>
                          setPerformanceMetrics({
                            ...performanceMetrics,
                            [field]: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                        required
                      />
                    </div>
                  )
                )}

                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-4 py-3 rounded-lg bg-[#262135] text-white w-full"
                    disabled={isSavingProgress}
                  >
                    {isSavingProgress ? 'Saving...' : 'Save Progress'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;


