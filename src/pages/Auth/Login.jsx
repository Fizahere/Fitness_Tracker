import React, { useState } from 'react';
import login from '../../assets/images/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AuthServices } from '../../services/authServices';
import ICONS from '../../assets/constants/icons';

const Login = () => {
  const [isShowPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    username: 'Khizar',
    password: '123456',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate=useNavigate();

  const { mutateAsync: loginRequest, isLoading: loginLoading} = useMutation(AuthServices.login, {
    onSuccess: () => {
      setFormData({
        username: '',
        password: '',
      })
      navigate('/dashboard/')
      console.log('loggedIn.')
    },
    onError: (error) => {
      const errorMsg = error.msg || 'Something went wrong.';
      setApiError(errorMsg);
    }
  })

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required.';

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      loginRequest(formData)
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
        <h3 className="text-3xl font-bold">Welcome Back,</h3>
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

            <label className="mt-3 font-bold">Password</label>
            <div className='relative'>
              <i className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword(!isShowPassword)}>
                {isShowPassword ? <ICONS.CLOSEDEYE /> : <ICONS.OPENEYE />}
              </i>
              <input
                type={isShowPassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`bg-[#fafafa] w-72 md:w-96 p-2 border-2 rounded-md ${errors.password ? 'border-red-500' : 'border-[#262135]'
                  }`}
                placeholder="12345"
              />
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

            {apiError && <span className="mt-2 text-red-500 text-sm">{apiError}</span>}
            <button
              type="submit"
              className="p-3 text-lg font-bold text-white bg-[#262135] rounded-md mt-4"
              disabled={loginLoading}
            >
              {loginLoading ? <div className='flex justify-center items-center'><ICONS.LOADING className='animate-spin text-white text-xl' /></div> : <p>Login</p>}
            </button>
            <p className="mt-2">
              Don't have an account?
              <Link to="/create-new-account" className="text-blue-500 ml-1">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
