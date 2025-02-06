import React, { useMemo, useState, useEffect } from 'react';
import bgImage from '../../assets/images/mainImage.jpg';
import ICONS from '../../assets/constants/icons';
import { UserServices } from '../../services/userServices';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getUserIdFromToken } from '../../services/authServices';
import { WorkoutServices } from '../../services/WorkoutServices';
import { formatDate } from '../../utilities/changeDateTimeFormate';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [about, setAbout] = useState('')
  const [dataToEdit, setDataToEdit] = useState(null);
  const [file, setFile] = useState(null);
  const queryClient = useQueryClient();
  const [err, setError] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file, 'file')
    if (file) {
      setFile(file);
    }
  };

  const { data: userData } = useQuery(
    'user-data',
    UserServices.getUser
  )
  const userMemoData = useMemo(
    () => userData?.data?.results,
    [userData]
  )

  // const userMemoData = {
  //   username: 'Tabitha',
  //   email: 'tabitha@gmail.com',
  //   about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, aspernatur.',
  //   profileImage: image,
  //   followers: [1, 1, 1, 1, 1, 11, 1],
  //   following: [1, 1, 1, 1, 1, 1, 1]
  // }

  useEffect(() => {
    if (dataToEdit && isModalOpen) {
      setUsername(dataToEdit.username || '');
      setEmail(dataToEdit.email || '');
      setAbout(dataToEdit.about || '');
      setFile(dataToEdit.profileImage || '');
    }
  }, [dataToEdit, isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setDataToEdit(userMemoData);
  };

  const { mutateAsync: editRequest, isLoading: isEditLoading, isError, error } = useMutation(
    UserServices.editUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-data');
        console.log('edited')
      },
      onError: (error) => {
        setError(error.message)
      }
    }
  )

  const editUserHandler = async (e) => {
    e.preventDefault();
    const userId = getUserIdFromToken()
    const payload = new FormData();
    payload.append('username', username);
    payload.append('email', email);
    payload.append('about', about);

    if (file) {
      payload.append('file', file);
    }
    // if (uploadedImages.backgroundImage) {
    //   payload.append('backgroundImage', uploadedImages.backgroundImage);
    // }

    try {
      await editRequest([userId, payload]);
      toggleModal();
    } catch (error) {
      console.error('Edit failed:', error);
    }
  };

  // const handleImageChange = (e, type) => {
  //   const file = e.target.files[0];
  //   setUploadedImages((prevImages) => ({
  //     ...prevImages,
  //     [type]: file,
  //   }));
  // };
  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const userId = getUserIdFromToken(localStorage.getItem('token'))
  const { data: workoutData, isLoading: workoutLoading } = useQuery(
    ['workout-data', userId],
    () => WorkoutServices.getWorkouts(userId)
  );
  const workoutMemoData = useMemo(() => workoutData?.data?.results || [], [workoutData]);
  const printReport = workoutMemoData.slice(1, 4)

  //download pdf code.
  const handleDownloadPDF = async () => {
    const element = document.getElementById('reports-container');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const margin = 10;
      const titleMargin = 20;
      const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const title = "Week Report - December";
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text(title, pdf.internal.pageSize.getWidth() / 2, margin + 5, {
        align: 'center',
      });

      pdf.addImage(imgData, 'PNG', margin, titleMargin, pdfWidth, pdfHeight);
      pdf.save('Week_Reports.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };


  return (
    <div>
      <div className='relative'>
        <img src={bgImage} className='h-72 w-full' alt="" />
        <div className='absolute top-36 left-12 lg:left-20 border-4 border-double dark:border-[#efeeb6] border-[#6a4b5d] rounded-full p-1 h-64 w-64'>
          <img
            // src={userMemoData?.profileImage}
            src={`${userMemoData?.profileImage}`}
            className='h-full w-full bg-contain rounded-full'
            alt=""
          />
        </div>
        <div className='flex flex-col lg:flex-row justify-around mt-4'>
          <div className='lg:w-7/12'>
            <div className='flex justify-center mt-28 lg:mt-0'>
              <p className='dark:text-white text-black font-bold text-3xl lg:ml-[22rem] text-center lg:text-left mr-10 md:mr-4'>{userMemoData?.username}</p>
              {/* <div className="flex w-full justify-end md:justify-evenly text-black dark:text-white"> */}
              <div className='text-center mr-10 md:mr-4'>
                <p className='font-bold text-lg'>Followers</p>
                <p>{userMemoData?.followers.length}</p>
              </div>
              <div className='text-center mr-20 md:mr-4'>
                <p className='font-bold text-lg'>Following</p>
                <p>{userMemoData?.following.length}</p>
              </div>
            </div>
            {/* </div> */}
            <p className='text-zinc-600 dark:text-zinc-300 lg:ml-[22rem] text-center lg:text-left'>
              {/* {userMemoData?.about} */}
            </p>
            <div className='bg-gradient-to-t from-[#efeeb6] to-[#1b1b1c] rounded-3xl p-4 lg:p-8 text-white mt-4 lg:mt-10 flex lg:justify-around'>
              <div className='text-lg font-bold'>
                <p>Name:</p>
                <p>About:</p>
                <p>Email:</p>
              </div>
              <div className='text-lg ml-2 md:ml-0'>
                <p>{userMemoData?.username}</p>
                <p>{userMemoData?.about}</p>
                <p></p>{userMemoData?.email}
                <div className='flex justify-end mt-4 cursor-pointer'>
                  <button
                    className='bg-white px-5 py-2 rounded-full text-black'
                    title='edit your information'
                    onClick={toggleModal}
                  >
                    <i><ICONS.PENCIL /></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div
              id="static-modal"
              data-modal-backdrop="static"
              tabIndex="-1"
              className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-[#1b1b1c]">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Edit Information
                    </h3>
                    <i>
                      <ICONS.CLOSE className='text-xl cursor-pointer text-black dark:text-white' onClick={toggleModal} />
                    </i>
                  </div>
                  <form onSubmit={editUserHandler}>
                    <div className="p-4 md:p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="mt-4">
                          <label className="font-medium text-black dark:text-white">Image</label>
                          <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed rounded-full border-gray-300 bg-white dark:bg-[#1b1b1c] text-black dark:text-white relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                              id="fileInput"
                            />
                            <label
                              htmlFor="fileInput"
                              className="absolute inset-0 flex items-center justify-center cursor-pointer"
                            >
                              {file ? (
                                <img
                                  src={typeof file === "string" ? file : URL.createObjectURL(file)}
                                  alt="Uploaded"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <div className="text-gray-400 flex flex-col items-center">
                                  <ICONS.FOLLOW className="text-3xl mb-2" />
                                  <p>Click to Upload</p>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className='font-medium text-black dark:text-white'>Username</label>
                        <input
                          type="text"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full p-2 border rounded-lg bg-white text-black dark:text-white dark:bg-[#1b1b1c]"
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <label className='font-medium text-black dark:text-white'>Email</label>
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg bg-white text-black dark:text-white dark:bg-[#1b1b1c]"
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <label className='font-medium text-black dark:text-white'>About</label>
                        <textarea
                          rows="3"
                          name="about"
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                          className="w-full p-2 border rounded-lg bg-white text-black dark:text-white dark:bg-[#1b1b1c]"
                        ></textarea>
                      </div>
                    </div>
                    <p className='text-red-500 ml-5 mb-2'>{err && err}</p>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <div className="mt-2">
                        <button
                          type="submit"
                          className="px-4 py-3 rounded-lg bg-[#262135] text-white w-full"
                          disabled={isEditLoading}
                        >
                          {isEditLoading ? 'Saving...' : 'Save Post'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className='p-8 bg-gradient-to-t from-[#fcc6e6] to-[#1b1b1c] rounded-3xl lg:w-2/5 my-4 lg:mt-0'>
            <div id="reports-container">
              <div className='flex text-white justify-between'>
                <p className='text-2xl font-bold'>Month reports</p>
                <p>/2024</p>
              </div>
              <ul>
                {printReport ? (
                  printReport.map((singleData, index) => (
                    <li
                      key={index}
                      className='py-4 mt-6 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#fcc6e6] hover:bg-opacity-90'
                    >
                      <p>
                        {singleData?.title}, {singleData.createdAt ? formatDate(singleData.createdAt) : '-'}
                      </p>
                      <i>
                        <ICONS.RUN />
                      </i>
                    </li>
                  ))
                ) : (
                  <p>no reports</p>
                )}
              </ul>
            </div>
            {printReport.length >= 1 && <button
              onClick={handleDownloadPDF}
              className='mt-6 bg-[#262135] text-white px-4 py-2 rounded-full hover:bg-opacity-90'
            >
              Download PDF
            </button>
            }
          </div>
        </div>
      </div>
    </div >
  );
};

export default UserProfile;
