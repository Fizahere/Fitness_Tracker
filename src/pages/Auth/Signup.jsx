import React, { useState } from 'react';
import login from '../../assets/images/fitnss-tracker.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AuthServices } from '../../services/authServices';
import ICONS from '../../assets/constants/icons';

const Signup = () => {
  const [isShowPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const { mutateAsync: createAccount, isLoading: signupLoading } = useMutation(
    AuthServices.createAccount,
    {
      onSuccess: () => {
        setFormData({
          username: '',
          email: '',
          password: '',
        });
        setApiError('');
        navigate('/login')
        console.log('Account created successfully.');
      },
      onError: (error) => {
        const errorMsg = error.msg || 'Something went wrong.';
        setApiError(errorMsg);
      },
    }
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required.';
    else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters long.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address.';
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await createAccount(formData);
      navigate('/login')
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex col lg:row h-screen">
      <div className="w-1/2 hidden lg:block">
        <img src={login} alt="Login illustration" className="h-full" />
      </div>
      <div className="flex items-center flex-col justify-center lg:w-1/2 w-screen">
        <h3 className="text-3xl font-bold">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mt-3 font-bold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`bg-[#fafafa] w-72 md:w-96 p-2 border-2 rounded-md ${errors.username ? 'border-red-500' : 'border-[#262135]'
                }`}
              placeholder="Fiza.."
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

            <label className="mt-3 font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-[#fafafa] w-72 md:w-96 p-2 border-2 rounded-md ${errors.email ? 'border-red-500' : 'border-[#262135]'
                }`}
              placeholder="fiza@gmail.com.."
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

            <label className="mt-3 font-bold">Password</label>
            <div className='relative'>
              <i className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword(!isShowPassword)}>
                {isShowPassword ? <ICONS.CLOSEDEYE /> : <ICONS.OPENEYE />}
              </i>
              <input
                type={isShowPassword?"password":"text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`bg-[#fafafa] w-72 md:w-96 p-2 border-2 rounded-md ${errors.password ? 'border-red-500' : 'border-[#262135]'
                  }`}
                placeholder="12345"
              />
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            {apiError && <div className="mt-1 text-red-500">{apiError}</div>}

            <button
              type="submit"
              className={`p-3 text-lg font-bold text-white bg-[#262135] rounded-md mt-4`}
              disabled={signupLoading}
            >
              {signupLoading ? <div className='flex justify-center items-center'><ICONS.LOADING className='animate-spin text-white text-xl' /></div> : <p>Sign Up</p>}
            </button>
            <p className="mt-2">
              Already have an account?
              <Link to="/login" className="text-blue-500 ml-1">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};



export default Signup;
