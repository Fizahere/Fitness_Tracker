import React, { useMemo, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ICONS from '../../assets/constants/icons';
import { getUserIdFromToken } from '../../services/authServices';
import { PostServices } from '../../services/postServices';
import PostDataTable from '../../components/Mists/PostDataTable';
import { ToastContainer } from 'react-toastify';

const Posts = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const author = getUserIdFromToken();
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isEdit && dataToEdit) {
      setContent(dataToEdit.content || '');
      setFile(dataToEdit.file || '');
    }
  }, [isEdit, dataToEdit]);

  // const { data: postsData, isLoading: postsLoading } = useQuery(
  //   'posts-data',
  //   PostServices.getPosts
  // );
  const { data: postsData, isLoading: postsLoading } = useQuery(['posts-data', author],
    () => PostServices.getPosts(author), {
    enabled: !!author,
  });

  const postsMemoData = useMemo(
    () => postsData?.data?.results || [],
    [postsData]
  );

  const { mutateAsync: deletepost, isLoading: deleteLoading } = useMutation(
    PostServices.deletePost,
    {
      onSuccess: () => queryClient.invalidateQueries('posts-data'),
      onError: (error) => console.error('Error deleting post:', error),
    }
  );

  const { mutateAsync: savepost, isLoading: isSavingPost } = useMutation(
    isEdit ? PostServices.editPosts : PostServices.addPost,
    {
      onSuccess: () => {
        resetForm();
        queryClient.invalidateQueries('posts-data');
        setDrawerOpen(false);
      },
      onError: (err) => console.error('Error saving post:', err),
    }
  );

  const { mutate: fetchpostById } = useMutation(
    PostServices.getPostById,
    {
      onSuccess: (data) => {
        setDataToEdit(data?.results);
        setIsEdit(true);
        setDrawerOpen(true);
      },
    }
  );

  const resetForm = () => {
    setContent('');
    setFile('');
    setIsEdit(false);
    setDataToEdit(null);
  };

  const toggleDrawer = (open) => {
    if (!open) resetForm();
    setDrawerOpen(open);
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    const postPayload = new FormData();
    postPayload.append('author', author);
    postPayload.append('content', content);
    if (file) {
      postPayload.append('file', file);
    }
    try {
      await savepost(
        isEdit ? [dataToEdit._id, postPayload] : postPayload
      );
      console.log(
        `${isEdit ? 'post updated' : 'post created'} successfully!`
      );
    } catch (err) {
      console.error(
        `Error ${isEdit ? 'updating' : 'creating'} post:`,
        err
      );
    }
  };
  const { data: searchedPosts, isLoading: searchLoading, isError: searchError, refetch } = useQuery(
    ['searched-posts-data', searchQuery],
    () => PostServices.searchUserPost(searchQuery),
    {
      onSuccess: () => { setIsSearch(true) },
      onError: (err) => {
        setIsSearch(true)
        if (err.message === "Request failed with status code 400") {
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
          Posts
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
            Add Post
          </button>
        </div>
      </div>

      {postsLoading || searchLoading ? <i><ICONS.LOADING className='animate-spin text-xl text-center text-black dark:text-white' /></i> : (error ? <p>{error || error.message}</p> : <PostDataTable
        data={isSearch ? searchedPosts || [] : postsMemoData || []}
          // isLoading={postsLoading}
          deleteLoading={deleteLoading}
          onDelete={deletepost}
          onEdit={(id) => fetchpostById(id)}
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
                  {isEdit ? 'Edit posts' : 'Add New posts'}
                </h2>
                <i
                  className="cursor-pointer"
                  onClick={() => toggleDrawer(false)}
                >
                  <ICONS.CLOSE fontSize={20} />
                </i>
              </div>
              <form onSubmit={handleSavePost} encType='multipart/form-data'>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Content
                  </label>
                  <input
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) =>
                      setContent(e.target.value)
                    }
                    className="w-full p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                    required
                  />
                </div>
                <div className='mt-4'>
                  <label className='font-medium'>Image</label>
                  <div className="w-full h-64 flex items-center justify-center border-2 border-dashed rounded-md border-gray-300 bg-white dark:bg-[#1b1b1c] text-black dark:text-white relative">
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
                          src={URL.createObjectURL(file)}
                          alt="Uploaded"
                          className="w-full h-full object-cover rounded-md"
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
                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-4 py-3 rounded-lg bg-[#262135] text-white w-full"
                    disabled={isSavingPost}
                  >
                    {isSavingPost ? 'Saving...' : 'Save Post'}
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

export default Posts;
