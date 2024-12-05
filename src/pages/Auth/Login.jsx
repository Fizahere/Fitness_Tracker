import React, { useState } from 'react';
import login from '../../assets/images/login.png';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
const {}=useMutation(Auth)

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

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
//login logic
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
            <label className="mt-3 font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-[#fafafa] w-72 md:w-96 p-2 border-2 rounded-md ${
                errors.email ? 'border-red-500' : 'border-[#262135]'
              }`}
              placeholder="fiza@gmail.com.."
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

            <label className="mt-3 font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`bg-[#fafafa] w-72 md:w-96 p-2 border-2 rounded-md ${
                errors.password ? 'border-red-500' : 'border-[#262135]'
              }`}
              placeholder="12345"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

            <button
              type="submit"
              className="p-3 text-lg font-bold text-white bg-[#262135] rounded-md mt-4"
            >
              Login
            </button>
            <p className="mt-2">
              Don't have an account?{' '}
              <Link to="/create-new-account" className="text-blue-500">
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
